"use server";

import { logout as libLogout, getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail, getResetTemplate } from "@/lib/email";

export async function logout() {
    await libLogout();
    revalidatePath("/dashboard");
}

export async function forgotPassword(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal if user exists for security, just say if successful email is sent
            return { success: true }; 
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        await prisma.passwordResetToken.upsert({
            where: { token }, // This is unlikely to collide but token is unique
            create: {
                email,
                token,
                expiresAt
            },
            update: {
                token,
                expiresAt
            }
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://ranknexis.com'}/dashboard/reset-password/${token}`;
        
        await sendEmail({
            to: email,
            subject: "RankNexis Password Reset",
            html: getResetTemplate(resetLink)
        });

        return { success: true };
    } catch (error) {
        console.error("Forgot Pass Error:", error);
        return { error: "Failed to process request" };
    }
}

export async function resetPassword(token: string, password: string) {
    try {
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token }
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return { error: "Invalid or expired token" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email: resetToken.email },
            data: { 
                password: hashedPassword,
                passwordSet: true
            }
        });

        // Delete used token
        await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

        return { success: true };
    } catch (error) {
        return { error: "Failed to reset password" };
    }
}

export async function changePassword(data: { old: string; new: string }) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({ where: { id: session.id } });
        if (!user) return { error: "User not found" };

        const isValid = await bcrypt.compare(data.old, user.password);
        if (!isValid) return { error: "Current password is incorrect" };

        const hashedPassword = await bcrypt.hash(data.new, 10);
        await prisma.user.update({
            where: { id: session.id },
            data: { password: hashedPassword }
        });

        return { success: true };
    } catch (error) {
        return { error: "Failed to change password" };
    }
}

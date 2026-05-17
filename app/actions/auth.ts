"use server";

import { getSession, login as libLogin, logout as libLogout } from "@/lib/auth";
import { getResetTemplate, sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginUser(data: { email: string; password: string }) {
    let shouldRedirect = false;

    try {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: "Invalid credentials" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { error: "Invalid credentials" };
        }

        const allowedRoles = ["ADMIN", "TEAM_MEMBER"];
        if (!allowedRoles.includes(user.role)) {
            return { error: "Unauthorized access" };
        }

        await libLogin({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: user.permissions
        });

        shouldRedirect = true;
    } catch (error) {
        return { error: "Authentication failed" };
    }

    if (shouldRedirect) {
        revalidatePath("/dashboard");
        return { success: true, redirectUrl: "/dashboard" };
    }
}

export async function logout() {
    await libLogout();
    revalidatePath("/dashboard");
}

export async function forgotPassword(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            
            return { success: true };
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); 

        await prisma.passwordResetToken.upsert({
            where: { token }, 
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

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ranknexis.com'}/dashboard/reset-password/${token}`;

        await sendEmail({
            to: email,
            subject: "RankNexis Password Reset",
            html: getResetTemplate(resetLink)
        });

        return { success: true };
    } catch (error) {
        
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

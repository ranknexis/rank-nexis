"use server";

import { getSession } from "@/lib/auth";
import { getInviteTemplate, sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        const users = await prisma.user.findMany({
            include: {
                teamProfile: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, users };
    } catch (error) {
        return { error: "Failed to fetch users" };
    }
}

export async function createUser(data: { name: string; email: string; role: string }) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return { error: "User already exists" };

        // Create with a random temporary password
        const tempPassword = Math.random().toString(36).slice(-12);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                role: data.role,
                password: hashedPassword,
                passwordSet: false,
                // Default permissions based on role
                permissions: data.role === "ADMIN" ? ["all"] : ["manage_own_content"]
            }
        });

        if (data.role !== "ADMIN") {
            await prisma.teamMember.create({
                data: {
                    name: data.name,
                    role: "TEAM_MEMBER",
                    userId: user.id
                }
            });
        }

        // Send Email
        const setupLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://ranknexis.com'}/dashboard/login`;
        await sendEmail({
            to: data.email,
            subject: "RankNexis Node Invitation",
            html: getInviteTemplate(data.name, setupLink)
        });

        revalidatePath("/dashboard/users");
        return { success: true, user };
    } catch (error) {
        console.error("Create User Error:", error);
        return { error: "Failed to create user" };
    }
}

export async function updateUserRole(userId: string, role: string) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role }
        });
        revalidatePath("/dashboard/users");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update user" };
    }
}

export async function deleteUser(userId: string) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        await prisma.user.delete({ where: { id: userId } });
        revalidatePath("/dashboard/users");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete user" };
    }
}

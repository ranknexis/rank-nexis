"use server";

import { getSession } from "@/lib/auth";
import { getInviteTemplate, sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "./audit";

export async function getAllUsers() {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        const users = await prisma.user.findMany({
            include: {
                teamProfile: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, users, data: users };
    } catch (error) {
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function createUser(data: { name: string; email: string; role: string }) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return { success: false, error: "User already exists" };

        const defaultPassword = "RankNexis@2026";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                role: data.role,
                password: hashedPassword,
                passwordSet: true,
                permissions: data.role === "ADMIN" ? ["all"] : ["manage_blog", "manage_work", "manage_own_content"]
            }
        });

        if (data.role !== "ADMIN") {
            await prisma.teamMember.create({
                data: {
                    name: data.name,
                    role: "Digital Strategist", 
                    userId: user.id
                }
            });
        }

        const setupLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ranknexis.com'}/dashboard/login`;
        await sendEmail({
            to: data.email,
            subject: "RankNexis Node Invitation",
            html: getInviteTemplate(data.name, setupLink)
        });

        await createAuditLog("USER_CREATED", data.email, `Role: ${data.role}`);

        revalidatePath("/dashboard/users");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true, user, data: user };
    } catch (error) {
        return { success: false, error: "Failed to create user" };
    }
}

export async function updateUserRole(userId: string, role: string) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role }
        });
        await createAuditLog("USER_ROLE_UPDATED", user.email, `New Role: ${role}`);
        revalidatePath("/dashboard/users");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update user" };
    }
}

export async function updateUserPermissions(userId: string, permissions: string[]) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { permissions }
        });
        await createAuditLog("USER_PERMISSIONS_UPDATED", user.email, `Permissions: ${permissions.join(", ")}`);
        revalidatePath("/dashboard/users");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update permissions" };
    }
}

export async function updateUser(userId: string, data: { name?: string; email?: string; role?: string }) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        if (data.email) {
            const existing = await prisma.user.findFirst({
                where: {
                    email: data.email,
                    NOT: { id: userId }
                }
            });
            if (existing) return { success: false, error: "Email address is already in use" };
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
                ...(data.role && { role: data.role })
            }
        });

        await createAuditLog("USER_UPDATED", user.email, `Updated Fields: ${Object.keys(data).join(", ")}`);
        revalidatePath("/dashboard/users");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true, user, data: user };
    } catch (error) {
        return { success: false, error: "Failed to update user profile" };
    }
}

export async function deleteUser(userId: string) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            await prisma.user.delete({ where: { id: userId } });
            await createAuditLog("USER_DELETED", user.email);
        }
        revalidatePath("/dashboard/users");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete user" };
    }
}


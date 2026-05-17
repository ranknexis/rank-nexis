"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getMyProfile() {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.id },
            include: { teamProfile: true }
        });
        return { success: true, user, data: user };
    } catch (error) {
        return { success: false, error: "Failed to fetch profile" };
    }
}

export async function updateMyProfile(data: any) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        if (data.email) {
            const existing = await prisma.user.findFirst({
                where: {
                    email: data.email,
                    NOT: { id: session.id }
                }
            });
            if (existing) return { success: false, error: "Email address is already in use by another account" };
        }

        await prisma.user.update({
            where: { id: session.id },
            data: { 
                name: data.name,
                ...(data.email && { email: data.email })
            }
        });

        if (session.role !== "ADMIN") {
            await prisma.teamMember.upsert({
                where: { userId: session.id },
                create: {
                    userId: session.id,
                    name: data.name,
                    role: data.role || "Expert",
                    bio: data.bio,
                    image: data.image,
                    socials: data.socials || []
                },
                update: {
                    name: data.name,
                    role: data.role,
                    bio: data.bio,
                    image: data.image,
                    socials: data.socials
                }
            });
        }

        revalidatePath("/dashboard/profile");
        revalidatePath("/team");
        revalidatePath("/about");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update profile" };
    }
}

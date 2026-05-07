"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getMyProfile() {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.id },
            include: { teamProfile: true }
        });
        return { success: true, user };
    } catch (error) {
        return { error: "Failed to fetch profile" };
    }
}

export async function updateMyProfile(data: any) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        
        await prisma.user.update({
            where: { id: session.id },
            data: { name: data.name }
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
        
        return { error: "Failed to update profile" };
    }
}

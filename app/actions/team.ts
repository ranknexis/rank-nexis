"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkTeamPermission() {
  const session = await getSession();
  if (!session) return { allowed: false };
  const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
  const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_team");
  return { allowed: isAllowed };
}

export async function createTeamMember(data: any) {
  const { allowed } = await checkTeamPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio,
        order: parseInt(data.order) || 0,
        socials: data.socials || [],
      }
    });
    revalidatePath("/dashboard/team");
    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/team", "page");
    revalidatePath("/about", "page");
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTeamMember(id: string, data: any) {
  const { allowed } = await checkTeamPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    const currentMember = await prisma.teamMember.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (currentMember?.userId && data.userEmail) {
      const existing = await prisma.user.findFirst({
        where: {
          email: data.userEmail,
          NOT: { id: currentMember.userId }
        }
      });
      if (existing) {
        return { success: false, error: "Email address is already in use by another operator" };
      }

      await prisma.user.update({
        where: { id: currentMember.userId },
        data: { email: data.userEmail, name: data.name }
      });
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio,
        order: parseInt(data.order) || 0,
        socials: data.socials || [],
      }
    });
    revalidatePath("/dashboard/team");
    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/team", "page");
    revalidatePath("/about", "page");
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id: string) {
  const { allowed } = await checkTeamPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    await prisma.teamMember.delete({
      where: { id }
    });
    revalidatePath("/dashboard/team");
    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/team", "page");
    revalidatePath("/about", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

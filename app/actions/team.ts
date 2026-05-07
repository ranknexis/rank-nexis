"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTeamMember(data: any) {
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
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTeamMember(id: string, data: any) {
  try {
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
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id }
    });
    revalidatePath("/dashboard/team");
    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkLeadsPermission() {
  const session = await getSession();
  if (!session) return { allowed: false };
  const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
  const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_leads");
  return { allowed: isAllowed };
}

export async function updateLeadStatus(id: string, status: string) {
  const { allowed } = await checkLeadsPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    await prisma.lead.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update lead status." };
  }
}

export async function deleteLead(id: string) {
  const { allowed } = await checkLeadsPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    await prisma.lead.delete({
      where: { id }
    });
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete lead." };
  }
}


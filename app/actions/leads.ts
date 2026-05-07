"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    
    return { success: false };
  }
}

export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id }
    });
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    
    return { success: false };
  }
}


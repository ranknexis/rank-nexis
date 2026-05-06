"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" }
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          siteName: "RankNexis",
          siteTitleSuffix: "RankNexis Strategy & Vision"
        }
      });
    }

    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export async function updateSettings(data: any) {
  try {
    const updated = await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        ...data,
      },
      create: {
        id: "global",
        ...data,
      }
    });

    revalidatePath("/", "layout");
    revalidatePath("/dashboard/settings");
    
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Failed to update configuration." };
  }
}


"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

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
    
    return null;
  }
}

export async function updateSettings(data: any) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };
  const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
  const hasPermission = session.role === "ADMIN" || userPermissions.includes("manage_settings");
  if (!hasPermission) return { success: false, error: "Unauthorized" };

  try {
    const updated = await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        siteName: data.siteName,
        siteTitleSuffix: data.siteTitleSuffix,
        siteDescription: data.siteDescription,
        ogImage: data.ogImage,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        facebookUrl: data.facebookUrl,
        twitterUrl: data.twitterUrl,
        linkedinUrl: data.linkedinUrl,
        instagramUrl: data.instagramUrl,
        youtubeUrl: data.youtubeUrl,
        gtmId: data.gtmId,
        gaId: data.gaId,
        pixelId: data.pixelId,
        linkedinInsightId: data.linkedinInsightId,
        hotjarId: data.hotjarId,
        clarityId: data.clarityId,
        pinterestId: data.pinterestId,
        tiktokId: data.tiktokId,
        twitterId: data.twitterId,
        snapchatId: data.snapchatId,
        redditId: data.redditId,
        quoraId: data.quoraId,
        googleAdsId: data.googleAdsId
      },
      create: {
        id: "global",
        siteName: data.siteName,
        siteTitleSuffix: data.siteTitleSuffix,
        siteDescription: data.siteDescription,
        ogImage: data.ogImage,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        facebookUrl: data.facebookUrl,
        twitterUrl: data.twitterUrl,
        linkedinUrl: data.linkedinUrl,
        instagramUrl: data.instagramUrl,
        youtubeUrl: data.youtubeUrl,
        gtmId: data.gtmId,
        gaId: data.gaId,
        pixelId: data.pixelId,
        linkedinInsightId: data.linkedinInsightId,
        hotjarId: data.hotjarId,
        clarityId: data.clarityId,
        pinterestId: data.pinterestId,
        tiktokId: data.tiktokId,
        twitterId: data.twitterId,
        snapchatId: data.snapchatId,
        redditId: data.redditId,
        quoraId: data.quoraId,
        googleAdsId: data.googleAdsId
      }
    });

    revalidatePath("/", "layout");
    revalidatePath("/dashboard/settings");
    
    const { createAuditLog } = await import("./audit");
    await createAuditLog("SETTINGS_UPDATED", "global", "Site-wide configuration push");

    return { success: true, data: updated };

  } catch (error) {
    return { success: false, error: "Failed to update configuration." };
  }
}


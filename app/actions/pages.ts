"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { createAuditLog } from "./audit";

/**
 * ── PAGE LEVEL OPERATIONS ──
 */

export async function getAllPages() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    const pages = await prisma.pageContent.findMany({
      include: {
        _count: {
          select: { sections: true }
        }
      },
      orderBy: { title: 'asc' }
    });
    return { success: true, pages };
  } catch (error) {
    console.error("Get All Pages Error:", error);
    return { error: "Failed to fetch pages." };
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const page = await prisma.pageContent.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      }
    });
    return { success: true, page };
  } catch (error) {
    console.error("Get Page Error:", error);
    return { error: "Failed to fetch page content." };
  }
}

export async function updatePageSeo(slug: string, data: any) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    const page = await prisma.pageContent.update({
      where: { slug },
      data: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
        noIndex: data.noIndex,
      }
    });
    
    await createAuditLog("PAGE_SEO_UPDATED", slug, `Meta Title: ${data.metaTitle}`);
    
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true, page };
  } catch (error) {
    console.error("Update SEO Error:", error);
    return { error: "Failed to update SEO." };
  }
}

export async function updatePageStatus(slug: string, status: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { status }
    });
    
    await createAuditLog("PAGE_STATUS_UPDATED", slug, `Status: ${status}`);
    
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}

export async function updateInternalLinks(slug: string, links: any[]) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { internalLinks: links }
    });
    
    await createAuditLog("PAGE_LINKS_UPDATED", slug, `${links.length} links`);
    
    return { success: true };
  } catch (error) {
    return { error: "Failed to update internal links" };
  }
}

/**
 * ── SECTION LEVEL OPERATIONS ──
 */

export async function addSection(pageId: string, data: { label: string, sectionType: string, content: any }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    // Get highest order
    const lastSection = await prisma.pageSection.findFirst({
      where: { pageId },
      orderBy: { order: 'desc' }
    });
    const order = (lastSection?.order || 0) + 1;

    // Create unique key
    const sectionKey = `${data.sectionType}_${Date.now()}`;

    const section = await prisma.pageSection.create({
      data: {
        pageId,
        sectionKey,
        sectionType: data.sectionType,
        label: data.label,
        content: data.content,
        order
      },
      include: { page: true }
    });

    await createAuditLog("SECTION_ADDED", `${section.page.slug}:${data.sectionType}`, `Label: ${data.label}`);

    return { success: true, section };
  } catch (error) {
    console.error("Add Section Error:", error);
    return { error: "Failed to create section" };
  }
}

export async function deleteSection(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    const section = await prisma.pageSection.findUnique({ where: { id }, include: { page: true } });
    if (section) {
        await prisma.pageSection.delete({ where: { id } });
        await createAuditLog("SECTION_DELETED", `${section.page.slug}:${section.sectionType}`);
    }
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete section" };
  }
}

export async function updateSection(sectionId: string, content: any, isVisible?: boolean) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    const section = await prisma.pageSection.update({
      where: { id: sectionId },
      data: { 
        content,
        ...(isVisible !== undefined && { isVisible })
      },
      include: { page: true }
    });
    
    await createAuditLog("SECTION_UPDATED", `${section.page.slug}:${section.sectionType}`);
    
    revalidatePath(`/${section.page.slug === 'home' ? '' : section.page.slug}`);
    return { success: true, section };
  } catch (error) {
    console.error("Update Section Error:", error);
    return { error: "Failed to update section content." };
  }
}


export async function toggleSectionVisibility(sectionId: string, isVisible: boolean) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    const section = await prisma.pageSection.update({
      where: { id: sectionId },
      data: { isVisible },
      include: { page: true }
    });
    revalidatePath(`/${section.page.slug === 'home' ? '' : section.page.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Toggle Visibility Error:", error);
    return { error: "Failed to toggle section visibility." };
  }
}

export async function reorderSections(pageId: string, sectionIds: string[]) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    await prisma.$transaction(
      sectionIds.map((id, index) => 
        prisma.pageSection.update({
          where: { id },
          data: { order: index }
        })
      )
    );
    return { success: true };
  } catch (error) {
    console.error("Reorder Error:", error);
    return { error: "Failed to reorder sections." };
  }
}

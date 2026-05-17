"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { createAuditLog } from "./audit";

async function checkPagesPermission() {
  const session = await getSession();
  if (!session) return { allowed: false, session: null };
  const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
  const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_pages");
  return { allowed: isAllowed, session };
}

export async function getAllPages() {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    const pages = await prisma.pageContent.findMany({
      include: {
        _count: {
          select: { sections: true }
        }
      },
      orderBy: { title: 'asc' }
    });
    return { success: true, pages, data: pages };
  } catch (error) {
    return { success: false, error: "Failed to fetch pages." };
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
    return { success: true, page, data: page };
  } catch (error) {
    return { success: false, error: "Failed to fetch page content." };
  }
}

export async function updatePageSeo(slug: string, data: any) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

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
    return { success: true, page, data: page };
  } catch (error) {
    return { success: false, error: "Failed to update SEO." };
  }
}

export async function updatePageStatus(slug: string, status: string) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { status }
    });
    
    await createAuditLog("PAGE_STATUS_UPDATED", slug, `Status: ${status}`);
    
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateInternalLinks(slug: string, links: any[]) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { internalLinks: links }
    });
    
    await createAuditLog("PAGE_LINKS_UPDATED", slug, `${links.length} links`);
    
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update internal links" };
  }
}

export async function addSection(pageId: string, data: { label: string, sectionType: string, content: any }) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    const lastSection = await prisma.pageSection.findFirst({
      where: { pageId },
      orderBy: { order: 'desc' }
    });
    const order = (lastSection?.order || 0) + 1;

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

    revalidatePath(`/${section.page.slug === 'home' ? '' : section.page.slug}`);
    return { success: true, section, data: section };
  } catch (error) {
    return { success: false, error: "Failed to create section" };
  }
}

export async function deleteSection(id: string) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    const section = await prisma.pageSection.findUnique({ where: { id }, include: { page: true } });
    if (section) {
        await prisma.pageSection.delete({ where: { id } });
        await createAuditLog("SECTION_DELETED", `${section.page.slug}:${section.sectionType}`);
        revalidatePath(`/${section.page.slug === 'home' ? '' : section.page.slug}`);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete section" };
  }
}

export async function updateSection(sectionId: string, content: any, isVisible?: boolean) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

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
    return { success: true, section, data: section };
  } catch (error) {
    return { success: false, error: "Failed to update section content." };
  }
}

export async function toggleSectionVisibility(sectionId: string, isVisible: boolean) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    const section = await prisma.pageSection.update({
      where: { id: sectionId },
      data: { isVisible },
      include: { page: true }
    });
    revalidatePath(`/${section.page.slug === 'home' ? '' : section.page.slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to toggle section visibility." };
  }
}

export async function reorderSections(pageId: string, sectionIds: string[]) {
  const { allowed, session } = await checkPagesPermission();
  if (!allowed || !session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.$transaction(
      sectionIds.map((id, index) => 
        prisma.pageSection.update({
          where: { id },
          data: { order: index }
        })
      )
    );
    const page = await prisma.pageContent.findUnique({ where: { id: pageId } });
    if (page) {
      revalidatePath(`/${page.slug === 'home' ? '' : page.slug}`);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to reorder sections." };
  }
}

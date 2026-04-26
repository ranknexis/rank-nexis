"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * ── PAGE LEVEL OPERATIONS ──
 */

export async function getAllPages() {
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
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    revalidatePath(`/admin/pages/${slug}`);
    return { success: true, page };
  } catch (error) {
    console.error("Update SEO Error:", error);
    return { error: "Failed to update SEO settings." };
  }
}

export async function updatePageStatus(slug: string, status: "published" | "draft") {
  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { status }
    });
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    console.error("Update Status Error:", error);
    return { error: "Failed to update page status." };
  }
}

export async function updateInternalLinks(slug: string, links: any[]) {
  try {
    await prisma.pageContent.update({
      where: { slug },
      data: { internalLinks: links }
    });
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    console.error("Update Links Error:", error);
    return { error: "Failed to update internal links." };
  }
}

/**
 * ── SECTION LEVEL OPERATIONS ──
 */

export async function updateSection(sectionId: string, content: any, isVisible?: boolean) {
  try {
    const section = await prisma.pageSection.update({
      where: { id: sectionId },
      include: { page: true },
      data: { 
        content,
        ...(isVisible !== undefined && { isVisible })
      }
    });
    
    // Revalidate public page
    const slug = section.page.slug;
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    revalidatePath(`/admin/pages/${slug}`);
    
    return { success: true, section };
  } catch (error) {
    console.error("Update Section Error:", error);
    return { error: "Failed to update section content." };
  }
}

export async function toggleSectionVisibility(id: string, isVisible: boolean) {
  try {
    const section = await prisma.pageSection.update({
      where: { id },
      include: { page: true },
      data: { isVisible }
    });
    
    const slug = section.page.slug;
    revalidatePath(`/${slug === 'home' ? '' : slug}`);
    return { success: true };
  } catch (error) {
    console.error("Toggle Visibility Error:", error);
    return { error: "Failed to toggle visibility." };
  }
}

export async function reorderSections(pageId: string, orderedIds: string[]) {
  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
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
    console.error("Reorder Sections Error:", error);
    return { error: "Failed to reorder sections." };
  }
}


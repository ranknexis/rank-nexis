import prisma from "@/lib/prisma";
import { cache } from "react";
import { unstable_cache } from "next/cache";

/**
 * Fetch all sections for a page and return them as a map keyed by sectionKey.
 * Memoized per request using React cache() and cross-request using unstable_cache().
 */
export const getPageData = cache(async (slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      try {
        const page = await prisma.pageContent.findUnique({
          where: { slug },
          include: {
            sections: {
              where: { isVisible: true },
              orderBy: { order: 'asc' }
            }
          }
        });

        if (!page) return null;

        // Convert sections to a map for easy lookup: sectionsMap["hero"]
        const sectionsMap: Record<string, any> = {};
        page.sections.forEach(section => {
          // Key by specific key
          sectionsMap[section.sectionKey] = section.content;
          // Also key by type for general lookup (first one of type wins)
          if (!sectionsMap[section.sectionType]) {
            sectionsMap[section.sectionType] = section.content;
          }
        });

        return {
          ...page,
          sectionsMap
        };
      } catch (error) {
        console.error(`Error fetching page data for ${slug}:`, error);
        return null;
      }
    },
    [`page-data-${slug}`],
    {
      revalidate: 3600, // Cache for 1 hour, but we use revalidatePath to purge
      tags: [`page-${slug}`]
    }
  )(slug);
});


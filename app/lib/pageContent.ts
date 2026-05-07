import prisma from "@/lib/prisma";

/**
 * Fetch all sections for a page and return them as a map keyed by sectionKey.
 */
export async function getPageData(slug: string) {
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
}


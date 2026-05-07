import prisma from "@/lib/prisma";
import { cache } from "react";
import { unstable_cache } from "next/cache";

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

        const sectionsMap: Record<string, any> = {};
        page.sections.forEach(section => {
          
          sectionsMap[section.sectionKey] = section.content;
          
          if (!sectionsMap[section.sectionType]) {
            sectionsMap[section.sectionType] = section.content;
          }
        });

        return {
          ...page,
          sectionsMap
        };
      } catch (error) {
        
        return null;
      }
    },
    [`page-data-${slug}`],
    {
      revalidate: 3600, 
      tags: [`page-${slug}`]
    }
  )(slug);
});


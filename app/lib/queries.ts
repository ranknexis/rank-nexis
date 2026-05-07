import prisma from "@/lib/prisma";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const getPostBySlug = cache(async (slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      return prisma.blog.findUnique({
        where: { slug },
        include: { 
          category: true, 
          author: {
            include: { teamProfile: true }
          } 
        }
      });
    },
    [`blog-post-${slug}`],
    {
      revalidate: 3600,
      tags: [`blog-${slug}`, 'blog-posts']
    }
  )(slug);
});

export const getSiteSettings = cache(async () => {
  return unstable_cache(
    async () => {
      return prisma.siteSettings.findUnique({ where: { id: "global" } });
    },
    ['site-settings-global'],
    {
      revalidate: 3600,
      tags: ['settings']
    }
  )();
});

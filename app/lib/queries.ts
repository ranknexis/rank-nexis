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

export async function getRecommendations(recommendationsJson: any) {
  if (!recommendationsJson) return [];
  const recs = Array.isArray(recommendationsJson) 
    ? recommendationsJson 
    : JSON.parse(typeof recommendationsJson === 'string' ? recommendationsJson : '[]');
  
  if (recs.length === 0) return [];

  const resolved = await Promise.all(
    recs.map(async (rec: any) => {
      try {
        if (rec.type === "service") {
          const service = await prisma.service.findUnique({ where: { id: rec.id } });
          if (service) return { ...service, type: "service" };
        } else if (rec.type === "blog") {
          const blog = await prisma.blog.findUnique({
            where: { id: rec.id },
            include: { category: true, author: { include: { teamProfile: true } } }
          });
          if (blog) return { ...blog, type: "blog" };
        } else if (rec.type === "work") {
          const study = await prisma.caseStudy.findUnique({ where: { id: rec.id } });
          if (study) return { ...study, type: "work" };
        }
      } catch (err) {
        console.error("Failed to resolve recommendation:", rec, err);
      }
      return null;
    })
  );

  return resolved.filter(Boolean);
}

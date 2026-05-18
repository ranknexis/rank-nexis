import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getCachedSiteSettings = unstable_cache(
  async () => {
    return prisma.siteSettings.findUnique({
      where: { id: "global" }
    });
  },
  ["site-settings-global"],
  { revalidate: 3600, tags: ["site-settings"] }
);

export const getCachedHomeData = unstable_cache(
  async () => {
    const [studies, posts, testimonials] = await Promise.all([
      prisma.caseStudy.findMany({ take: 2, orderBy: { createdAt: 'desc' } }),
      prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' }, include: { category: true } }),
      prisma.testimonial.findMany({ where: { status: 'published' }, orderBy: { createdAt: 'desc' } })
    ]);
    return { studies, posts, testimonials };
  },
  ["home-dynamic-data"],
  { revalidate: 1800, tags: ["home-data"] }
);

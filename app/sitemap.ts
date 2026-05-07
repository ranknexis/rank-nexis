import { MetadataRoute } from 'next';
import prisma from './lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ranknexis.com';

  const blogs = await prisma.blog.findMany({ select: { slug: true, updatedAt: true } });
  const services = await prisma.service.findMany({ where: { active: true }, select: { slug: true } });
  const caseStudies = await prisma.caseStudy.findMany({ select: { slug: true, createdAt: true } });
  const pages = await prisma.pageContent.findMany({ select: { slug: true, updatedAt: true } });
  const categories = await prisma.blogCategory.findMany({ select: { slug: true } });

  const staticPaths = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.8, freq: 'weekly' as const },
    { path: '/services', priority: 0.8, freq: 'weekly' as const },
    { path: '/work', priority: 0.8, freq: 'weekly' as const },
    { path: '/blog', priority: 0.8, freq: 'weekly' as const },
    { path: '/careers', priority: 0.7, freq: 'weekly' as const },
    { path: '/contact', priority: 0.7, freq: 'weekly' as const },
    { path: '/privacy', priority: 0.4, freq: 'monthly' as const },
    { path: '/terms', priority: 0.4, freq: 'monthly' as const },
  ];

  const staticRoutes = staticPaths.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: cs.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticSlugs = staticPaths.map(s => s.path.replace('/', ''));
  const customPageRoutes = pages
    .filter(page => !staticSlugs.includes(page.slug))
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes, ...caseStudyRoutes, ...customPageRoutes, ...categoryRoutes];
}

import prisma from "@/lib/prisma";
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ranknexis.com';

    // Fetch dynamic slugs
    const posts = await prisma.blog.findMany({ select: { slug: true, updatedAt: true } });
    const studies = await prisma.caseStudy.findMany({ select: { slug: true, createdAt: true } });
    const services = await prisma.service.findMany({ select: { slug: true } });

    const postUrls = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
    }));

    const studyUrls = studies.map((study: any) => ({
        url: `${baseUrl}/work/${study.slug}`,
        lastModified: study.createdAt,
    }));

    const serviceUrls = services.map((service: any) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
    }));

    const staticUrls = [
        '',
        '/about',
        '/services',
        '/work',
        '/blog',
        '/careers',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...staticUrls, ...postUrls, ...studyUrls, ...serviceUrls];
}

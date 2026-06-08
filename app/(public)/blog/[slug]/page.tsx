import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "../components/BlogDetailClient";
import InternalLinksSection from "@/components/InternalLinksSection";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import { getPostBySlug, getSiteSettings, getRecommendations } from "@/lib/queries";
import { generateBlogSchema } from "@/lib/seo";
import Script from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings()
  ]);

  if (!post) return { title: "Article Not Found" };

  const suffix = settings?.siteTitleSuffix || "RankNexis Publication";

  return buildSeoMetadata(
    post,
    {
      title: `${post.title} | ${suffix}`,
      description: post.metaDescription || `Read our latest insights on ${post.category?.name || 'Strategy'}.`,
      ogImage: post.image || undefined
    },
    "blog"
  );
}

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, pageData] = await Promise.all([
    getPostBySlug(slug),
    getPageData("blog")
  ]);

  if (!post) notFound();

  const [relatedPosts, resolvedRecommendations] = await Promise.all([
    prisma.blog.findMany({
      where: { categoryId: post.categoryId, NOT: { id: post.id } },
      include: { 
        category: true, 
        author: {
          include: { teamProfile: true }
        } 
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    }),
    getRecommendations((post as any).recommendations)
  ]);

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema(post)) }}
      />
      <BlogDetailClient 
        post={JSON.parse(JSON.stringify(post))} 
        relatedPosts={JSON.parse(JSON.stringify(relatedPosts))} 
        recommendations={JSON.parse(JSON.stringify(resolvedRecommendations))}
      />
      <InternalLinksSection links={post.internalLinks as any[] || []} />
    </>
  );
}


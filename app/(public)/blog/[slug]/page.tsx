import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "../components/BlogDetailClient";
import InternalLinksSection from "@/components/InternalLinksSection";
import { getPageData } from "@/lib/pageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    prisma.blog.findUnique({
      where: { slug },
      include: { 
        category: true, 
        author: {
          include: { teamProfile: true }
        } 
      }
    }),
    prisma.siteSettings.findUnique({ where: { id: "global" } })
  ]);

  if (!post) return { title: "Article Not Found" };

  const suffix = settings?.siteTitleSuffix || "RankNexis Publication";

  return {
    title: `${post.title} | ${suffix}`,
    description: post.metaDescription || `Read our latest insights on ${post.category.name}.`,
    openGraph: {
      title: post.title,
      description: post.metaDescription || "",
      images: post.image ? [{ url: post.image }] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  };
}

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, pageData] = await Promise.all([
    prisma.blog.findUnique({
      where: { slug },
      include: { 
        category: true, 
        author: {
          include: { teamProfile: true }
        } 
      }
    }),
    getPageData("blog")
  ]);

  if (!post) notFound();

  const relatedPosts = await prisma.blog.findMany({
    where: { categoryId: post.categoryId, NOT: { id: post.id } },
    include: { 
      category: true, 
      author: {
        include: { teamProfile: true }
      } 
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <BlogDetailClient 
        post={JSON.parse(JSON.stringify(post))} 
        relatedPosts={JSON.parse(JSON.stringify(relatedPosts))} 
      />
      <InternalLinksSection links={pageData?.internalLinks as any[] || []} />
    </>
  );
}


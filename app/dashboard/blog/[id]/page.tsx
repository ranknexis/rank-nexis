import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditor from "../components/BlogEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  
  const [post, categories, authors, allServices, allBlogs, allCaseStudies] = await Promise.all([
    id === "new" ? null : prisma.blog.findUnique({
      where: { id },
      include: { category: true }
    }),
    prisma.blogCategory.findMany(),
    prisma.user.findMany({
      select: { id: true, name: true, role: true }
    }),
    prisma.service.findMany({ select: { id: true, title: true, slug: true } }),
    prisma.blog.findMany({ select: { id: true, title: true, slug: true } }),
    prisma.caseStudy.findMany({ select: { id: true, title: true, slug: true } })
  ]);

  if (id !== "new" && !post) {
    notFound();
  }

  return (
    <BlogEditor 
      initialData={post} 
      categories={categories} 
      authors={authors} 
      allServices={allServices}
      allBlogs={allBlogs}
      allCaseStudies={allCaseStudies}
    />
  );
}


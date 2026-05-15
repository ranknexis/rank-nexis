import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditor from "../components/BlogEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  
  const [post, categories, authors] = await Promise.all([
    id === "new" ? null : prisma.blog.findUnique({
      where: { id },
      include: { category: true }
    }),
    prisma.blogCategory.findMany(),
    prisma.user.findMany({
      select: { id: true, name: true, role: true }
    })
  ]);

  if (id !== "new" && !post) {
    notFound();
  }

  return (
    <BlogEditor 
      initialData={post} 
      categories={categories} 
      authors={authors} 
    />
  );
}


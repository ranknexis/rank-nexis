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
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
            {id === "new" ? "New" : "Edit"} <span className="text-brand">Publication.</span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">
            {id === "new" ? "Create a new strategic insight node." : `Editing: ${post?.title}`}
          </p>
        </div>
      </div>

      <BlogEditor 
        initialData={post} 
        categories={categories} 
        authors={authors} 
      />
    </div>
  );
}


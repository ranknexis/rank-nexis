import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import BlogList from "./components/BlogList";

export default async function AdminBlogPage() {
  const posts = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Blog</h1>
          <p className="text-sm text-text-muted">Create and manage your blog posts.</p>
        </div>
        <Link href="/dashboard/blog/new" className="btn-primary h-12 px-6 text-xs font-bold flex items-center gap-2 shadow-md">
          <Plus size={18} /> New Post
        </Link>
      </div>

      <BlogList initialPosts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}


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
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Blog <span className="text-brand">Archive.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Manage your strategic publications and insights.</p>
        </div>
        <Link href="/dashboard/blog/new" className="btn-primary h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3 shadow-xl shadow-brand/10">
          <Plus size={18} /> New Publication
        </Link>
      </div>

      <BlogList initialPosts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}


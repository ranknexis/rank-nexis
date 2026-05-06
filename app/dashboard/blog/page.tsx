import prisma from "@/lib/prisma";
import { Edit2, Eye, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

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

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
        <div className="p-8 border-b border-stroke flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Filter articles..." className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
             {["All", "Published", "Drafts", "Archived"].map(t => (
               <button key={t} className="px-5 py-2 whitespace-nowrap border border-stroke rounded-lg text-[9px] font-bold uppercase hover:border-brand hover:text-brand transition-all">{t}</button>
             ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/10">
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Article Node</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Category</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-surface/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-stroke hidden sm:block">
                        <img src={post.image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"} alt="" className="w-full h-full object-cover transition-all duration-700" />
                      </div>
                      <div className="max-w-md">
                        <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors line-clamp-1">{post.title}</p>
                        <p className="text-[10px] font-bold uppercase text-text-muted">Slug: {post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase border border-brand/10">
                      {post.category.name}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-bold uppercase text-text-muted whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="p-3 bg-surface hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted"><Eye size={16} /></Link>
                      <Link href={`/dashboard/blog/${post.id}`} className="p-3 bg-surface hover:bg-emerald-500 hover:text-white rounded-lg transition-all text-text-muted"><Edit2 size={16} /></Link>
                      <button className="p-3 bg-surface hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted"><Trash2 size={16} /></button>
                    </div>
                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <p className="text-text-muted font-bold uppercase text-[10px]">No publications found in the database.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-stroke flex justify-between items-center bg-surface/10">
           <p className="text-[9px] font-bold uppercase text-text-muted">Showing {posts.length} of {posts.length} Publications</p>
           <div className="flex gap-2">
              <button disabled className="btn-outline h-10 px-4 text-[9px] font-bold uppercase opacity-40">Prev</button>
              <button disabled className="btn-outline h-10 px-4 text-[9px] font-bold uppercase opacity-40">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}


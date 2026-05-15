"use client";

import { useState } from "react";
import { Edit2, Eye, MoreVertical, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteBlogPost } from "@/actions/blog";

export default function BlogList({ initialPosts }: { initialPosts: any[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             post.slug.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

    const handleDelete = async () => {
        if (!deleteConfirm.id) return;
        const res = await deleteBlogPost(deleteConfirm.id);
        if (res.success) {
            setPosts(posts.filter(p => p.id !== deleteConfirm.id));
            toast.success("Post deleted.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
            <div className="p-8 border-b border-stroke flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-sm focus:outline-none focus:border-brand transition-all" 
                    />
                </div>
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {["All", "Published", "Drafts", "Archived"].map(t => (
                        <button 
                            key={t} 
                            onClick={() => setStatusFilter(t)}
                            className={`px-5 py-2 whitespace-nowrap border rounded-lg text-[9px] font-bold uppercase transition-all ${
                                statusFilter === t 
                                ? "bg-brand text-white border-brand shadow-lg shadow-brand/10" 
                                : "border-stroke bg-white text-text-muted hover:border-brand/30"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-6 md:px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Post Title</th>
                            <th className="px-6 md:px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Category</th>
                            <th className="px-6 md:px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Date</th>
                            <th className="px-6 md:px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredPosts.map((post: any) => (
                            <tr key={post.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-6 md:px-10 py-8">
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
                                <td className="px-6 md:px-10 py-8">
                                    <span className="px-4 py-1.5 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase border border-brand/10">
                                        {post.category?.name || "Uncategorized"}
                                    </span>
                                </td>
                                <td className="px-6 md:px-10 py-8 text-[10px] font-bold uppercase text-text-muted whitespace-nowrap">
                                    {new Date(post.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 md:px-10 py-8 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-3 bg-surface hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted"><Eye size={16} /></Link>
                                        <Link href={`/dashboard/blog/${post.id}`} className="p-3 bg-surface hover:bg-emerald-500 hover:text-white rounded-lg transition-all text-text-muted"><Edit2 size={16} /></Link>
                                        <button 
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: post.id })}
                                            className="p-3 bg-surface hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredPosts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 md:px-10 py-24 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No posts found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-8 border-t border-stroke flex justify-between items-center bg-surface/10">
                <p className="text-[9px] font-bold uppercase text-text-muted">Showing {filteredPosts.length} of {posts.length} posts</p>
                <div className="flex gap-2">
                    <button disabled className="btn-outline h-10 px-4 text-[9px] font-bold uppercase opacity-40">Prev</button>
                    <button disabled className="btn-outline h-10 px-4 text-[9px] font-bold uppercase opacity-40">Next</button>
                </div>
            </div>
            <ConfirmationModal 
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Delete Post"
                message="Are you sure you want to remove this article from the Knowledge Base? This action is immutable."
                confirmText="Delete"
            />
        </div>
    );
}

import ConfirmationModal from "../../components/ConfirmationModal";

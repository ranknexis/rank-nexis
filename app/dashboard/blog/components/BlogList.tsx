"use client";

import { useState, useEffect } from "react";
import { Edit2, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteBlogPost } from "@/actions/blog";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function BlogList({ initialPosts }: { initialPosts: any[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const categories = ["All", ...Array.from(new Set(posts.map((p: any) => p.category?.name).filter(Boolean)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             post.slug.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "All" || 
                               post.category?.name === selectedCategory;

        return matchesSearch && matchesCategory;
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
            toast.success("Post deleted successfully.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete post.");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 border-b border-stroke flex flex-col md:flex-row justify-between items-center gap-4 bg-surface/30">
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-text-muted/40" 
                    />
                </div>
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {categories.map(c => (
                        <button 
                            type="button"
                            key={c} 
                            onClick={() => setSelectedCategory(c)}
                            className={`px-5 py-2 whitespace-nowrap border rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${
                                selectedCategory === c 
                                ? "bg-brand text-white border-brand shadow-lg shadow-brand/10" 
                                : "border-stroke bg-white text-text-muted hover:border-brand/30"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Post Title</th>
                            <th className="w-48 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Category</th>
                            <th className="w-44 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Date</th>
                            <th className="w-36 px-8 py-5 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredPosts.map((post: any) => (
                            <tr key={post.id} className="group">
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div className="flex items-center gap-6 min-w-0">
                                        <div className="w-16 h-12 rounded-xl overflow-hidden border border-stroke hidden sm:block shrink-0 shadow-inner">
                                            <img src={post.image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"} alt="" className="w-full h-full object-cover transition-all duration-700" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors truncate">{post.title}</p>
                                            <p className="text-[10px] font-bold uppercase text-text-muted truncate">Slug: {post.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <span className="px-4 py-1.5 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase border border-brand/10">
                                        {post.category?.name || "Uncategorized"}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-[10px] font-bold uppercase text-text-muted whitespace-nowrap transition-colors group-hover:bg-surface/30">
                                    {new Date(post.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right transition-colors group-hover:bg-surface/30">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2.5 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0">
                                            <Eye size={14} />
                                        </Link>
                                        <Link href={`/dashboard/blog/${post.id}`} className="p-2.5 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0">
                                            <Edit2 size={14} />
                                        </Link>
                                        <button 
                                            type="button"
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: post.id })}
                                            className="p-2.5 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all text-text-muted hover:text-red-500 shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredPosts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No posts found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-5 sm:p-6 border-t border-stroke flex justify-between items-center bg-surface/10">
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
                title="Delete Blog Post"
                message="Are you sure you want to permanently delete this blog post? This action cannot be undone."
                confirmText="Delete"
            />
        </div>
    );
}

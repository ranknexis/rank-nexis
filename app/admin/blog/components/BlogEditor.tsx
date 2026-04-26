"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/actions/cms";
import { toast } from "sonner";
import { 
  Save, 
  Trash2, 
  ArrowLeft, 
  Eye, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Link2, 
  Settings,
  ChevronRight,
  User,
  Tags
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../../pages/components/RichTextEditor";

interface Props {
  initialData: any;
  categories: any[];
  authors: any[];
}

export default function BlogEditor({ initialData, categories, authors }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData || {
    title: "",
    slug: "",
    content: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    categoryId: categories[0]?.id || "",
    authorId: authors[0]?.id || "",
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  // Auto-slug generator
  useEffect(() => {
    if (!initialData && data.title) {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setData((prev: any) => ({ ...prev, slug }));
    }
  }, [data.title, initialData]);

  const handleSave = async () => {
    if (!data.title || !data.slug || !data.content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateBlogPost(initialData.id, data)
      : await createBlogPost(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Publication updated" : "Publication created");
      if (!initialData?.id && res.data) router.push(`/admin/blog/${res.data.id}`);
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure? This will decommission this publication permanently.")) return;
    const res = await deleteBlogPost(initialData.id);
    if (res.success) {
      toast.success("Publication removed");
      router.push("/admin/blog");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sidebar Controls */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-[2rem] border border-stroke p-8 shadow-sm space-y-6">
           <button 
            onClick={() => setActiveTab("content")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-tight ${
              activeTab === "content" 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-surface text-text-muted hover:bg-brand/5 hover:text-brand"
            }`}
          >
            <Type size={18} /> Content Body
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-tight ${
              activeTab === "settings" 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-surface text-text-muted hover:bg-brand/5 hover:text-brand"
            }`}
          >
            <Settings size={18} /> Meta Settings
          </button>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-16 bg-black text-white rounded-2xl text-[11px] font-bold uppercase hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Processing..." : "Deploy Publication"}
          </button>
          
          <Link href="/admin/blog" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-3">
            <ArrowLeft size={18} /> Exit Editor
          </Link>

          {initialData?.id && (
             <button 
              onClick={handleDelete}
              className="w-full h-16 bg-white border border-red-100 text-red-400 rounded-2xl text-[11px] font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-3"
            >
              <Trash2 size={18} /> Delete Article
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9">
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "content" && (
              <div className="p-10 space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Publication Heading</label>
                    <input 
                      type="text" 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="ENTER IMPACTFUL TITLE..."
                      className="w-full h-20 bg-surface border border-stroke rounded-2xl px-10 text-2xl font-bold uppercase tracking-tighter focus:outline-none focus:border-brand transition-all"
                    />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Knowledge Content</label>
                    <div className="min-h-[500px]">
                      <RichTextEditor 
                        value={data.content} 
                        onChange={content => setData({...data, content})} 
                      />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-10 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Article Slug (URL)</label>
                        <div className="relative">
                          <Link2 size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="text" 
                            value={data.slug} 
                            onChange={e => setData({...data, slug: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[11px] font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                          />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">SEO Meta Title</label>
                        <input 
                          type="text" 
                          value={data.metaTitle} 
                          onChange={e => setData({...data, metaTitle: e.target.value})}
                          placeholder="SEARCH ENGINE TITLE..."
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Publication Category</label>
                        <div className="relative">
                          <Tags size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                          <select 
                            value={data.categoryId}
                            onChange={e => setData({...data, categoryId: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all appearance-none"
                          >
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Assigned Author</label>
                        <div className="relative">
                          <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                          <select 
                            value={data.authorId}
                            onChange={e => setData({...data, authorId: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all appearance-none"
                          >
                            {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">SEO Meta Description</label>
                    <textarea 
                      value={data.metaDescription} 
                      onChange={e => setData({...data, metaDescription: e.target.value})}
                      placeholder="BRIEF SUMMARY FOR SEARCH RESULTS..."
                      className="w-full h-32 bg-surface border border-stroke rounded-xl p-6 text-[11px] font-bold text-text-primary focus:outline-none focus:border-brand transition-all resize-none"
                    />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Feature Image URL</label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="text" 
                        value={data.image} 
                        onChange={e => setData({...data, image: e.target.value})}
                        className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                 </div>

                 {data.image && (
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase text-text-muted px-2">Image Preview</label>
                       <div className="aspect-video rounded-3xl overflow-hidden border border-stroke bg-surface">
                          <img src={data.image} className="w-full h-full object-cover" alt="" />
                       </div>
                    </div>
                 )}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}



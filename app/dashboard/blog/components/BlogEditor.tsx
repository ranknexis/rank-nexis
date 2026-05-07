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
  Settings2,
  ChevronLeft,
  User,
  Tags,
  Globe,
  FileText,
  Cloud
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../../pages/components/RichTextEditor";
import CloudinaryUpload from "../../components/CloudinaryUpload";

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
      toast.error("Node integrity check failed. Please ensure Title, Slug and Content are configured.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateBlogPost(initialData.id, data)
      : await createBlogPost(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Content Node Synchronized" : "New Node Deployed Successfully");
      if (!initialData?.id && res.data) router.push(`/dashboard/blog/${res.data.id}`);
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("CRITICAL: Decommission this node permanently?")) return;
    const res = await deleteBlogPost(initialData.id);
    if (res.success) {
      toast.success("Node Terminated");
      router.push("/dashboard/blog");
    }
  };

  return (
    <div className="min-h-screen bg-surface/30 -m-8 md:-m-12 p-8 md:p-12">

      <div className="max-w-[1600px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <Link 
            href="/dashboard/blog" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-all group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
          </Link>
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
            {initialData?.id ? "Refine" : "Forge"} <span className="text-brand">Publication.</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleSave}
             disabled={loading}
             className="px-10 h-16 rounded-[1.5rem] bg-brand text-white shadow-2xl shadow-brand/20 text-[11px] font-bold uppercase flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
           >
              <Save size={18} /> {loading ? 'Synchronizing...' : 'Deploy Changes'}
           </button>
           
           {initialData?.id && (
              <button 
                onClick={handleDelete}
                className="w-16 h-16 rounded-[1.5rem] border border-red-100 bg-white text-red-400 flex items-center justify-center hover:bg-red-50 transition-all shadow-sm"
              >
                <Trash2 size={20} />
              </button>
           )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3rem] border border-stroke shadow-premium overflow-hidden min-h-[900px] flex flex-col">
              <div className="p-12 md:p-20 flex-grow space-y-16">

                 <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase text-brand tracking-[0.3em] ml-2">Publication Heading</p>
                    <textarea 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="ENTER IMPACTFUL TITLE..."
                      rows={2}
                      className="w-full bg-transparent border-none text-5xl md:text-6xl font-black uppercase tracking-tighter text-text-primary focus:outline-none focus:ring-0 placeholder:text-surface/50 resize-none leading-[0.95]"
                    />
                 </div>

                 <div className="space-y-6">
                    <p className="text-[10px] font-bold uppercase text-brand tracking-[0.3em] ml-2">Core Manuscript</p>
                    <div className="min-h-[600px] prose-slate max-w-none">
                       <RichTextEditor 
                         value={data.content} 
                         onChange={content => setData({...data, content})} 
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">

           <div className="bg-white rounded-[2.5rem] border border-stroke shadow-premium p-10 space-y-10">
              <div className="flex items-center gap-4 pb-6 border-b border-stroke">
                 <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <Settings2 size={20} />
                 </div>
                 <h2 className="text-sm font-bold uppercase tracking-tight">Configuration</h2>
              </div>

              <div className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                       <Globe size={14} /> Global Slug (URL)
                    </label>
                    <input 
                      type="text" 
                      value={data.slug} 
                      onChange={e => setData({...data, slug: e.target.value})}
                      className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-xs font-bold text-text-primary focus:border-brand transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                          <Tags size={14} /> Category
                       </label>
                       <select 
                         value={data.categoryId}
                         onChange={e => setData({...data, categoryId: e.target.value})}
                         className="w-full h-14 bg-surface border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase focus:border-brand transition-all appearance-none"
                       >
                         {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                          <User size={14} /> Author
                       </label>
                       <select 
                         value={data.authorId}
                         onChange={e => setData({...data, authorId: e.target.value})}
                         className="w-full h-14 bg-surface border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase focus:border-brand transition-all appearance-none"
                       >
                         {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                       </select>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-stroke shadow-premium p-10 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-stroke">
                 <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <Cloud size={20} />
                 </div>
                 <h2 className="text-sm font-bold uppercase tracking-tight">Visual Engine</h2>
              </div>
              
              <CloudinaryUpload 
                value={data.image} 
                onChange={(url) => setData({...data, image: url})} 
              />
           </div>

           <div className="bg-white rounded-[2.5rem] border border-stroke shadow-premium p-10 space-y-10">
              <div className="flex items-center gap-4 pb-6 border-b border-stroke">
                 <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                    <FileText size={20} />
                 </div>
                 <h2 className="text-sm font-bold uppercase tracking-tight">SEO Engine</h2>
              </div>

              <div className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted">Meta Title Override</label>
                    <input 
                      type="text" 
                      value={data.metaTitle} 
                      onChange={e => setData({...data, metaTitle: e.target.value})}
                      placeholder="SEARCH ENGINE TITLE..."
                      className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[10px] font-bold uppercase focus:border-brand transition-all"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted">Meta Description</label>
                    <textarea 
                      value={data.metaDescription} 
                      onChange={e => setData({...data, metaDescription: e.target.value})}
                      rows={4}
                      placeholder="BRIEF SUMMARY FOR SERP..."
                      className="w-full bg-surface border border-stroke rounded-xl p-6 text-[11px] font-medium text-text-primary focus:border-brand transition-all resize-none"
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

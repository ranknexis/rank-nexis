"use client";

import { createBlogPost, deleteBlogPost, updateBlogPost } from "@/actions/blog";
import { convertMarkdownToHtml } from "@/lib/markdown";
import {
  ChevronLeft,
  Cloud,
  Code,
  FileText,
  Globe,
  Save,
  Settings2,
  Tags,
  Trash2,
  User
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import RichTextEditor from "../../pages/components/RichTextEditor";
import ConfirmationModal from "../../components/ConfirmationModal";
import UnsavedChangesWarning from "../../components/UnsavedChangesWarning";
import RecommendationsEditor from "../../components/RecommendationsEditor";

interface Props {
  initialData: any;
  categories: any[];
  authors: any[];
  allServices?: any[];
  allBlogs?: any[];
  allCaseStudies?: any[];
}

export default function BlogEditor({ 
  initialData, 
  categories, 
  authors,
  allServices = [],
  allBlogs = [],
  allCaseStudies = []
}: Props) {
  const router = useRouter();

  const [recommendations, setRecommendations] = useState<any[]>(() => {
    return initialData?.recommendations || [];
  });
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
  const [isDirty, setIsDirty] = useState(false);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    setIsDirty(true);
  }, [data, recommendations]);

  const [loading, setLoading] = useState(false);
  const [mdInput, setMdInput] = useState("");
  const [showMdForge, setShowMdForge] = useState(false);

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
      toast.error("Validation failed. Please ensure Title, Slug and Content are filled.");
      return;
    }

    setLoading(true);
    const cleanedData = {
      ...data,
      recommendations
    };
    const res = initialData?.id 
      ? await updateBlogPost(initialData.id, cleanedData)
      : await createBlogPost(cleanedData);
    
    setLoading(false);
    if (res.success) {
      setIsDirty(false);
      toast.success(initialData?.id ? "Post saved successfully" : "New post created successfully");
      if (!initialData?.id && res.data) router.push(`/dashboard/blog/${res.data.id}`);
    } else {
      toast.error(res.error || "Failed to save post");
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteBlogPost(initialData.id);
    if (res.success) {
      setIsDirty(false);
      toast.success("Post deleted successfully");
      router.push("/dashboard/blog");
    } else {
      toast.error(res.error || "Failed to delete post");
    }
  };

  const handleMdConvert = () => {
    if (!mdInput) return;
    
    const isHtml = mdInput.trim().startsWith('<') || mdInput.trim().includes('</');
    const finalContent = isHtml ? mdInput : convertMarkdownToHtml(mdInput);
    
    setData((prev: any) => ({ ...prev, content: finalContent }));
    setShowMdForge(false);
    toast.success(isHtml ? "HTML content integrated successfully" : "Markdown content processed successfully");
  };

  return (
    <div className="space-y-6">
      <UnsavedChangesWarning isDirty={isDirty} isBusy={loading} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke pb-5">
        <div className="space-y-2">
          <Link 
            href={loading ? "#" : "/dashboard/blog"} 
            onClick={loading ? (e) => e.preventDefault() : undefined}
            className={`flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-muted hover:text-brand transition-all group ${loading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog Posts
          </Link>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
            {initialData?.id ? "Edit" : "Create"} <span className="text-brand">Post.</span>
          </h1>
          <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider">
            {initialData?.id ? "Update article details, content, and SEO meta tags." : "Draft a new publication for the content engine."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
           <button 
             type="button"
             onClick={handleSave}
             disabled={loading}
             className="h-11 px-6 bg-brand text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 cursor-pointer"
           >
              <Save size={16} /> {loading ? 'Saving...' : 'Save Post'}
           </button>
           
           {initialData?.id && (
              <button 
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                disabled={loading}
                className={`h-11 px-6 bg-white border border-stroke text-red-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all shadow-sm cursor-pointer ${loading ? 'opacity-50' : ''}`}
              >
                <Trash2 size={16} /> Delete Post
              </button>
           )}
        </div>
      </div>

      <fieldset disabled={loading} className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-0 p-0 m-0 w-full disabled:opacity-75">

        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-widest">Post Title</label>
                 <input 
                   type="text" 
                   value={data.title} 
                   onChange={e => setData({...data, title: e.target.value})}
                   placeholder="e.g. 10 SEO Strategies to Increase Organic Traffic"
                   className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-semibold text-text-primary focus:outline-none focus:border-brand transition-all"
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Content</label>
                    <button 
                      onClick={() => setShowMdForge(!showMdForge)}
                      type="button"
                      className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-muted hover:text-brand transition-all cursor-pointer"
                    >
                      <Code size={12} /> {showMdForge ? "Hide Paste Editor" : "Paste Markdown / HTML"}
                    </button>
                 </div>

                 {showMdForge ? (
                   <div className="space-y-4 bg-surface p-5 rounded-xl border border-stroke">
                     <div className="space-y-1">
                       <h4 className="text-[10px] font-black uppercase">Paste Markdown/HTML</h4>
                       <p className="text-[9px] text-text-muted leading-relaxed uppercase">
                         Paste pre-formatted HTML or Markdown text here (e.g. from ChatGPT or Claude) to preserve heading structures and lists perfectly.
                       </p>
                     </div>
                     <textarea 
                       value={mdInput}
                       onChange={e => setMdInput(e.target.value)}
                       placeholder="Paste raw Markdown or HTML text here..."
                       rows={10}
                       className="w-full bg-white border border-stroke rounded-xl p-4 text-xs font-mono text-text-primary focus:border-brand outline-none transition-all resize-none"
                     />
                     <button 
                       onClick={handleMdConvert}
                       type="button"
                       className="w-full h-10 bg-brand text-white rounded-xl text-[9px] font-bold uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-md cursor-pointer"
                     >
                       Integrate Content
                     </button>
                   </div>
                 ) : (
                   <div className="mt-2 w-full max-w-full overflow-hidden">
                      <RichTextEditor 
                        value={data.content} 
                        onChange={content => setData({...data, content})} 
                      />
                   </div>
                 )}
              </div>
           </div>

           {/* Related Recommendations */}
           <div className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 shadow-sm space-y-6">
              <div className="pb-2 border-b border-stroke/50">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Related Recommendations</h3>
                 <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Recommend specific services, blog posts, or case studies at the bottom of this article.</p>
              </div>
              <RecommendationsEditor 
                value={recommendations}
                onChange={setRecommendations}
                allServices={allServices}
                allBlogs={allBlogs}
                allCaseStudies={allCaseStudies}
              />
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">

           <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stroke">
                 <Settings2 size={16} className="text-brand" />
                 <h2 className="text-xs font-bold uppercase tracking-tight text-text-primary">Configuration</h2>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-1.5 px-1 tracking-widest">
                       <Globe size={12} /> URL Slug
                    </label>
                    <input 
                      type="text" 
                      value={data.slug} 
                      onChange={e => setData({...data, slug: e.target.value})}
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:border-brand outline-none transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-1.5 px-1 tracking-widest">
                          <Tags size={12} /> Category
                       </label>
                       <select 
                         value={data.categoryId}
                         onChange={e => setData({...data, categoryId: e.target.value})}
                         className="w-full h-11 bg-surface border border-stroke rounded-xl px-3 text-[10px] font-bold uppercase focus:border-brand outline-none transition-all appearance-none text-text-primary cursor-pointer"
                       >
                         {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-1.5 px-1 tracking-widest">
                          <User size={12} /> Author
                       </label>
                       <select 
                         value={data.authorId}
                         onChange={e => setData({...data, authorId: e.target.value})}
                         className="w-full h-11 bg-surface border border-stroke rounded-xl px-3 text-[10px] font-bold uppercase focus:border-brand outline-none transition-all appearance-none text-text-primary cursor-pointer"
                       >
                         {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                       </select>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stroke">
                 <Cloud size={16} className="text-brand" />
                 <h2 className="text-xs font-bold uppercase tracking-tight text-text-primary">Feature Image</h2>
              </div>
              
              <CloudinaryUpload 
                value={data.image} 
                onChange={(url) => setData({...data, image: url})} 
              />
           </div>

           <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stroke">
                 <FileText size={16} className="text-brand" />
                 <h2 className="text-xs font-bold uppercase tracking-tight text-text-primary">SEO Settings</h2>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-widest">Meta Title</label>
                    <input 
                      type="text" 
                      value={data.metaTitle || ""} 
                      onChange={e => setData({...data, metaTitle: e.target.value})}
                      placeholder="e.g. SEO Strategies | RankNexis"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-semibold focus:border-brand outline-none transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-widest">Meta Description</label>
                    <textarea 
                      value={data.metaDescription || ""} 
                      onChange={e => setData({...data, metaDescription: e.target.value})}
                      rows={4}
                      placeholder="Provide a concise description for search results..."
                      className="w-full bg-surface border border-stroke rounded-xl p-4 text-xs font-semibold focus:border-brand outline-none transition-all resize-none text-text-primary"
                    />
                 </div>
              </div>
           </div>
        </div>
      </fieldset>
      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post?"
        message="Are you sure you want to permanently delete this blog post? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

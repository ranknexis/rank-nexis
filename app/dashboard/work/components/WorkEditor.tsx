"use client";

import { createCaseStudy, deleteCaseStudy, updateCaseStudy } from "@/actions/work";
import {
  ArrowLeft,
  BarChart3,
  Layers,
  Layout,
  Link2,
  Save,
  Settings,
  Trash2,
  Type,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import ConfirmationModal from "../../components/ConfirmationModal";
import RepeaterField from "../../pages/components/RepeaterField";

export default function WorkEditor({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData || {
    title: "",
    slug: "",
    client: "",
    tag: "",
    description: "",
    challenge: "",
    solution: "",
    execution: [],
    results: [],
    stats: "",
    kpi: "",
    image: "",
    technologies: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
    if (!data.title || !data.slug) {
      toast.error("Title and URL Slug are required.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateCaseStudy(initialData.id, data)
      : await createCaseStudy(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Case study saved successfully" : "Case study created successfully");
      if (!initialData?.id && res.caseStudy) router.push(`/dashboard/work/${res.caseStudy.id}`);
    } else {
      toast.error(res.error || "Failed to save case study");
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteCaseStudy(initialData.id);
    if (res.success) {
      toast.success("Case study deleted successfully");
      router.push("/dashboard/work");
    } else {
      toast.error(res.error || "Failed to delete case study");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "narrative", label: "Details & Solution", icon: Type },
    { id: "results", label: "Impact & Results", icon: BarChart3 },
    { id: "settings", label: "Project Settings", icon: Settings }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-stroke p-4 shadow-sm space-y-1.5">
            {tabs.map(tab => (
              <button 
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-wider ${
                  activeTab === tab.id 
                    ? "bg-brand text-white shadow-md shadow-brand/15" 
                    : "bg-surface text-text-muted hover:bg-brand/5 hover:text-brand"
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button 
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="w-full h-11 bg-brand text-white rounded-xl text-xs font-bold uppercase hover:bg-brand-hover transition-all shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <Save size={16} /> {loading ? "Saving..." : "Save Case Study"}
            </button>
            
            <Link href="/dashboard/work" className="w-full h-11 bg-white border border-stroke text-text-muted rounded-xl text-xs font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-2.5">
              <ArrowLeft size={16} /> Back to List
            </Link>

            {initialData?.id && (
               <button 
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="w-full h-11 bg-white border border-stroke text-red-500 rounded-xl text-xs font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-2.5"
              >
                <Trash2 size={16} /> Delete Study
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "overview" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Project Title</label>
                  <input 
                    type="text" 
                    value={data.title} 
                    onChange={e => setData({...data, title: e.target.value})}
                    placeholder="e.g. Next-Gen SEO Strategy & Growth"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Client Name</label>
                    <input 
                      type="text" 
                      value={data.client} 
                      onChange={e => setData({...data, client: e.target.value})}
                      placeholder="e.g. ACME Corp"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Project Category / Industry (Tag)</label>
                    <input 
                      type="text" 
                      value={data.tag} 
                      onChange={e => setData({...data, tag: e.target.value})}
                      placeholder="e.g. E-Commerce"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Project Overview (Description)</label>
                  <textarea 
                    value={data.description} 
                    onChange={e => setData({...data, description: e.target.value})}
                    rows={4}
                    placeholder="Describe the high-level objective and overview of this case study..."
                    className="w-full bg-surface border border-stroke rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                  />
                </div>
              </div>
            )}

            {activeTab === "narrative" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">The Challenge</label>
                    <textarea 
                      value={data.challenge} 
                      onChange={e => setData({...data, challenge: e.target.value})}
                      rows={4}
                      placeholder="Describe the main problem or constraints the client faced..."
                      className="w-full bg-surface border border-stroke rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">The Solution</label>
                    <textarea 
                      value={data.solution} 
                      onChange={e => setData({...data, solution: e.target.value})}
                      rows={4}
                      placeholder="Describe your strategic approach and the solution implemented..."
                      className="w-full bg-surface border border-stroke rounded-xl p-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stroke space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <Zap size={14} className="text-brand" /> Execution Plan
                  </h3>
                  <RepeaterField 
                    label="Key Actions Taken"
                    items={data.execution}
                    newItemDefault=""
                    onChange={execution => setData({...data, execution})}
                    renderItem={(item, index, update) => (
                      <input 
                        type="text"
                        value={item}
                        onChange={e => update(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                        placeholder="Action item..."
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Main KPI (Label)</label>
                    <input 
                      type="text" 
                      value={data.kpi} 
                      onChange={e => setData({...data, kpi: e.target.value})}
                      placeholder="e.g. Organic traffic boost"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Main KPI Value</label>
                    <input 
                      type="text" 
                      value={data.stats} 
                      onChange={e => setData({...data, stats: e.target.value})}
                      placeholder="e.g. +240%"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-brand"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stroke space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <BarChart3 size={14} className="text-brand" /> Project Results
                  </h3>
                  <RepeaterField 
                    label="Impact Points"
                    items={data.results}
                    newItemDefault=""
                    onChange={results => setData({...data, results})}
                    renderItem={(item, index, update) => (
                      <input 
                        type="text"
                        value={item}
                        onChange={e => update(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                        placeholder="Result point..."
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">URL Slug</label>
                    <div className="relative">
                      <Link2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="text" 
                        value={data.slug} 
                        onChange={e => setData({...data, slug: e.target.value})}
                        className="w-full h-11 bg-surface border border-stroke rounded-xl pl-12 pr-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-text-muted px-1 tracking-wider">Feature Image</label>
                    <CloudinaryUpload 
                      value={data.image} 
                      onChange={(url) => setData({...data, image: url})} 
                      label="Upload Project Image"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stroke space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <Layers size={14} className="text-brand" /> Technologies Used
                  </h3>
                  <RepeaterField 
                    label="Technologies Used"
                    items={data.technologies}
                    newItemDefault=""
                    onChange={technologies => setData({...data, technologies})}
                    renderItem={(item, index, update) => (
                      <input 
                        type="text"
                        value={item}
                        onChange={e => update(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all"
                        placeholder="e.g. Next.js"
                      />
                    )}
                  />
                </div>
              </div>
            )}

        </div>

      </div>

      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Case Study"
        message="Are you sure you want to permanently delete this case study? This action is irreversible."
        confirmText="Delete"
      />
    </div>
  );
}

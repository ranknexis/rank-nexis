"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from "@/actions/cms";
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
  Target,
  BarChart3,
  Layers,
  Zap
} from "lucide-react";
import Link from "next/link";
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
      toast.error("Title and Slug are required.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateCaseStudy(initialData.id, data)
      : await createCaseStudy(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Narrative updated" : "Narrative created");
      if (!initialData?.id && res.data) router.push(`/dashboard/work/${res.data.id}`);
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure? This will decommission this narrative permanently.")) return;
    const res = await deleteCaseStudy(initialData.id);
    if (res.success) {
      toast.success("Narrative removed");
      router.push("/dashboard/work");
    }
  };

  const tabs = [
    { id: "overview", label: "Protocol Overview", icon: Layout },
    { id: "narrative", label: "Strategic Narrative", icon: Type },
    { id: "results", label: "Impact & Results", icon: BarChart3 },
    { id: "settings", label: "Operational Data", icon: Settings }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-[2rem] border border-stroke p-8 shadow-sm space-y-2">
           {tabs.map(tab => (
             <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-tight ${
                activeTab === tab.id 
                  ? "bg-brand text-white shadow-lg shadow-brand/20" 
                  : "bg-surface text-text-muted hover:bg-brand/5 hover:text-brand"
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
           ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-16 bg-black text-white rounded-2xl text-[11px] font-bold uppercase hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Processing..." : "Deploy Narrative"}
          </button>
          
          <Link href="/dashboard/work" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-3">
            <ArrowLeft size={18} /> Exit Registry
          </Link>

          {initialData?.id && (
             <button 
              onClick={handleDelete}
              className="w-full h-16 bg-white border border-red-100 text-red-400 rounded-2xl text-[11px] font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-3"
            >
              <Trash2 size={18} /> Decommission
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-9">
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "overview" && (
              <div className="p-10 space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Narrative Title</label>
                    <input 
                      type="text" 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="ENTER IMPACTFUL TITLE..."
                      className="w-full h-20 bg-surface border border-stroke rounded-2xl px-10 text-2xl font-bold uppercase tracking-tighter focus:outline-none focus:border-brand transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Client Name</label>
                        <input 
                          type="text" 
                          value={data.client} 
                          onChange={e => setData({...data, client: e.target.value})}
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Industry / Sector (Tag)</label>
                        <input 
                          type="text" 
                          value={data.tag} 
                          onChange={e => setData({...data, tag: e.target.value})}
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">High-Level Objective (Description)</label>
                    <textarea 
                      value={data.description} 
                      onChange={e => setData({...data, description: e.target.value})}
                      rows={4}
                      className="w-full bg-surface border border-stroke rounded-2xl p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                    />
                 </div>
              </div>
            )}

            {activeTab === "narrative" && (
              <div className="p-10 space-y-12">
                 <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">The Challenge (The Problem)</label>
                        <textarea 
                          value={data.challenge} 
                          onChange={e => setData({...data, challenge: e.target.value})}
                          rows={4}
                          className="w-full bg-surface border border-stroke rounded-2xl p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">The Approach (The Solution)</label>
                        <textarea 
                          value={data.solution} 
                          onChange={e => setData({...data, solution: e.target.value})}
                          rows={4}
                          className="w-full bg-surface border border-stroke rounded-2xl p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                    </div>
                 </div>

                 <div className="pt-8 border-t border-stroke space-y-8">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                       <Zap size={18} className="text-brand" /> Execution Architecture
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
                          className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                          placeholder="Action item..."
                        />
                      )}
                    />
                 </div>
              </div>
            )}

            {activeTab === "results" && (
               <div className="p-10 space-y-12">
                  <div className="grid grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Core KPI (Label)</label>
                        <input 
                          type="text" 
                          value={data.kpi} 
                          onChange={e => setData({...data, kpi: e.target.value})}
                          placeholder="REVENUE INCREASE"
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Core Stat (Value)</label>
                        <input 
                          type="text" 
                          value={data.stats} 
                          onChange={e => setData({...data, stats: e.target.value})}
                          placeholder="+240%"
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all text-brand"
                        />
                     </div>
                  </div>

                  <div className="pt-8 border-t border-stroke space-y-8">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                       <BarChart3 size={18} className="text-brand" /> Strategic Results
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
                          className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                          placeholder="Result point..."
                        />
                      )}
                    />
                 </div>
               </div>
            )}

            {activeTab === "settings" && (
              <div className="p-10 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Archive Slug (URL)</label>
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
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Visual Asset (Image URL)</label>
                        <div className="relative">
                          <ImageIcon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="text" 
                            value={data.image} 
                            onChange={e => setData({...data, image: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                          />
                        </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                       <Layers size={18} className="text-brand" /> Technology Stack
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
                          className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                          placeholder="Stack component..."
                        />
                      )}
                    />
                 </div>
              </div>
            )}

         </div>
      </div>
    </div>
  );
}


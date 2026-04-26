"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createJob, updateJob, deleteJob } from "@/actions/cms";
import { toast } from "sonner";
import { 
  Save, 
  Trash2, 
  ArrowLeft, 
  Shield, 
  Briefcase, 
  MapPin, 
  Clock, 
  Settings,
  Zap,
  CheckCircle2,
  Gift,
  Link2
} from "lucide-react";
import Link from "next/link";
import RepeaterField from "../../pages/components/RepeaterField";

export default function JobEditor({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData || {
    title: "",
    slug: "",
    description: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
    location: "Remote / Hybrid",
    type: "FULL_TIME",
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
    if (!data.title || !data.slug) {
      toast.error("Title and Slug are required.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateJob(initialData.id, data)
      : await createJob(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Opportunity updated" : "Opportunity created");
      if (!initialData?.id && res.data) router.push(`/admin/careers/${res.data.id}`);
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure? This will decommission this opportunity permanently.")) return;
    const res = await deleteJob(initialData.id);
    if (res.success) {
      toast.success("Opportunity removed");
      router.push("/admin/careers");
    }
  };

  const tabs = [
    { id: "overview", label: "Job Description", icon: Briefcase },
    { id: "protocol", label: "Requirements & Logic", icon: Zap },
    { id: "settings", label: "Deployment Data", icon: Settings }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sidebar Controls */}
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
            <Save size={18} /> {loading ? "Processing..." : "Deploy Listing"}
          </button>
          
          <Link href="/admin/careers" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-3">
            <ArrowLeft size={18} /> Exit Careers
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

      {/* Main Content Area */}
      <div className="lg:col-span-9">
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "overview" && (
              <div className="p-10 space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Professional Title</label>
                    <input 
                      type="text" 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="ENTER IMPACTFUL JOB TITLE..."
                      className="w-full h-20 bg-surface border border-stroke rounded-2xl px-10 text-2xl font-bold uppercase tracking-tighter focus:outline-none focus:border-brand transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Deployment Location</label>
                        <div className="relative">
                           <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                           <input 
                            type="text" 
                            value={data.location} 
                            onChange={e => setData({...data, location: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                          />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Contract Protocol (Type)</label>
                        <div className="relative">
                           <Clock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                           <select 
                            value={data.type}
                            onChange={e => setData({...data, type: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all appearance-none"
                           >
                             <option value="FULL_TIME">FULL TIME</option>
                             <option value="PART_TIME">PART TIME</option>
                             <option value="CONTRACT">CONTRACT</option>
                             <option value="INTERN">INTERNSHIP</option>
                           </select>
                        </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Role Abstract (Description)</label>
                    <textarea 
                      value={data.description} 
                      onChange={e => setData({...data, description: e.target.value})}
                      rows={6}
                      className="w-full bg-surface border border-stroke rounded-2xl p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                      placeholder="Describe the essence of this role..."
                    />
                 </div>
              </div>
            )}

            {activeTab === "protocol" && (
              <div className="p-10 space-y-12">
                 <div className="space-y-10">
                    <div className="space-y-8">
                      <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                        <Zap size={18} className="text-brand" /> Strategic Responsibilities
                      </h3>
                      <RepeaterField 
                        label="Responsibilities"
                        items={data.responsibilities}
                        newItemDefault=""
                        onChange={responsibilities => setData({...data, responsibilities})}
                        renderItem={(item, index, update) => (
                          <input 
                            type="text"
                            value={item}
                            onChange={e => update(e.target.value)}
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                            placeholder="Duty..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-8 pt-10 border-t border-stroke">
                      <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-brand" /> Technical Requirements
                      </h3>
                      <RepeaterField 
                        label="Requirements"
                        items={data.requirements}
                        newItemDefault=""
                        onChange={requirements => setData({...data, requirements})}
                        renderItem={(item, index, update) => (
                          <input 
                            type="text"
                            value={item}
                            onChange={e => update(e.target.value)}
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                            placeholder="Skill/Requirement..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-8 pt-10 border-t border-stroke">
                      <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                        <Gift size={18} className="text-brand" /> Compensation & Benefits
                      </h3>
                      <RepeaterField 
                        label="Benefits"
                        items={data.benefits}
                        newItemDefault=""
                        onChange={benefits => setData({...data, benefits})}
                        renderItem={(item, index, update) => (
                          <input 
                            type="text"
                            value={item}
                            onChange={e => update(e.target.value)}
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                            placeholder="Perk..."
                          />
                        )}
                      />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-10 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Deployment Slug (URL)</label>
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
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Publication Status</label>
                        <div 
                          onClick={() => setData({...data, active: !data.active})}
                          className={`h-14 rounded-xl border flex items-center justify-center cursor-pointer transition-all gap-3 ${
                            data.active 
                              ? "bg-brand/5 border-brand/20 text-brand" 
                              : "bg-surface border-stroke text-text-muted"
                          }`}
                        >
                           <Shield size={16} />
                           <span className="text-[10px] font-bold uppercase">{data.active ? "Active Node" : "Offline / Draft"}</span>
                        </div>
                    </div>
                 </div>
              </div>
            )}

         </div>
      </div>
    </div>
  );
}


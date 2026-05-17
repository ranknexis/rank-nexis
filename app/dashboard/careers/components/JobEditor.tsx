"use client";

import { createJob, deleteJob, updateJob } from "@/actions/cms";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  Gift,
  Link2,
  MapPin,
  Save,
  Settings,
  Trash2,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "../../components/ConfirmationModal";
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      toast.error("Job Title and URL Slug are required.");
      return;
    }

    setLoading(true);
    const res = initialData?.id 
      ? await updateJob(initialData.id, data)
      : await createJob(data);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Job opening updated successfully" : "Job opening created successfully");
      if (!initialData?.id && res.data) router.push(`/dashboard/careers/${res.data.id}`);
    } else {
      toast.error(res.error);
    }
  };

  const handleDeleteConfirm = async () => {
    const res = await deleteJob(initialData.id);
    if (res.success) {
      toast.success("Job opening deleted successfully");
      router.push("/dashboard/careers");
    } else {
      toast.error("Failed to delete job opening");
    }
  };

  const tabs = [
    { id: "overview", label: "Job Description", icon: Briefcase },
    { id: "protocol", label: "Requirements", icon: Zap },
    { id: "settings", label: "Publish Settings", icon: Settings }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-[2rem] border border-stroke p-6 shadow-sm space-y-2">
           {tabs.map(tab => (
             <button 
              type="button"
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
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-full h-16 bg-brand text-white rounded-2xl text-[11px] font-bold uppercase hover:bg-brand-hover transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Saving..." : "Save Job Opening"}
          </button>
          
          <Link href="/dashboard/careers" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-3">
            <ArrowLeft size={18} /> Back to Careers
          </Link>

          {initialData?.id && (
             <button 
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full h-16 bg-white border border-red-100 text-red-500 rounded-2xl text-[11px] font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-3"
            >
              <Trash2 size={18} /> Delete Job
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-9">
         <div className="bg-white rounded-[2rem] border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "overview" && (
              <div className="p-8 sm:p-10 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Job Title</label>
                    <input 
                      type="text" 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="e.g. Senior SEO Strategist"
                      className="w-full h-16 bg-surface border border-stroke rounded-2xl px-6 text-xl font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Location</label>
                        <div className="relative">
                           <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                           <input 
                            type="text" 
                            value={data.location} 
                            onChange={e => setData({...data, location: e.target.value})}
                            placeholder="e.g. Dhaka (Hybrid) / Remote"
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-sm font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
                          />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Job Type</label>
                        <div className="relative">
                           <Clock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                           <select 
                            value={data.type}
                            onChange={e => setData({...data, type: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-10 text-sm font-semibold focus:outline-none focus:border-brand transition-all appearance-none text-text-primary"
                           >
                             <option value="FULL_TIME">Full Time</option>
                             <option value="PART_TIME">Part Time</option>
                             <option value="CONTRACT">Contract</option>
                             <option value="INTERN">Internship</option>
                           </select>
                           <div className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                             <Clock size={14} className="rotate-180" />
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Job Description</label>
                    <textarea 
                      value={data.description} 
                      onChange={e => setData({...data, description: e.target.value})}
                      rows={6}
                      className="w-full bg-surface border border-stroke rounded-2xl p-6 text-sm leading-relaxed focus:outline-none focus:border-brand transition-all text-text-primary"
                      placeholder="Write a clear and engaging job description here..."
                    />
                 </div>
              </div>
            )}

            {activeTab === "protocol" && (
              <div className="p-8 sm:p-10 space-y-10">
                 <div className="space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-3">
                        <Zap size={18} className="text-brand" /> Core Responsibilities
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
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a responsibility..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-6 pt-8 border-t border-stroke">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-brand" /> Job Requirements
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
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a requirement..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-6 pt-8 border-t border-stroke">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-3">
                        <Gift size={18} className="text-brand" /> Benefits & Perks
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
                            className="w-full h-12 bg-white border border-stroke rounded-xl px-6 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a benefit..."
                          />
                        )}
                      />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-8 sm:p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">URL Slug</label>
                        <div className="relative">
                          <Link2 size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="text" 
                            value={data.slug} 
                            onChange={e => setData({...data, slug: e.target.value})}
                            className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-sm font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
                          />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Job Status</label>
                        <button 
                          type="button"
                          onClick={() => setData({...data, active: !data.active})}
                          className={`w-full h-14 rounded-xl border flex items-center justify-center cursor-pointer transition-all gap-3 text-sm font-bold uppercase tracking-wider ${
                            data.active 
                              ? "bg-brand/5 border-brand/20 text-brand" 
                              : "bg-surface border-stroke text-text-muted"
                          }`}
                        >
                           <CheckCircle2 size={16} />
                           <span>{data.active ? "Active (Visible on site)" : "Draft (Hidden)"}</span>
                        </button>
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Job Opening"
        message="Are you sure you want to remove this job opening? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

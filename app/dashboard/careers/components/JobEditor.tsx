"use client";

import { createJob, deleteJob, updateJob } from "@/actions/careers";
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-stroke p-4 shadow-sm space-y-1.5">
           {tabs.map(tab => (
             <button 
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-xs font-bold uppercase tracking-tight ${
                activeTab === tab.id 
                  ? "bg-brand text-white shadow-lg shadow-brand/20" 
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
            className="w-full h-11 bg-brand text-white rounded-xl text-xs font-bold uppercase hover:bg-brand-hover transition-all shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            <Save size={16} /> {loading ? "Saving..." : "Save Job Opening"}
          </button>
          
          <Link href="/dashboard/careers" className="w-full h-11 bg-white border border-stroke text-text-muted rounded-xl text-xs font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-2.5">
            <ArrowLeft size={16} /> Back to Careers
          </Link>

          {initialData?.id && (
             <button 
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full h-11 bg-white border border-stroke text-red-500 rounded-xl text-xs font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-2.5"
            >
              <Trash2 size={16} /> Delete Job
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-9">
         <div className="bg-white rounded-2xl border border-stroke shadow-sm overflow-hidden">
            
            {activeTab === "overview" && (
              <div className="p-5 sm:p-6 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1">Job Title</label>
                    <input 
                      type="text" 
                      value={data.title} 
                      onChange={e => setData({...data, title: e.target.value})}
                      placeholder="e.g. Senior SEO Strategist"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">Location</label>
                        <div className="relative">
                           <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                           <input 
                            type="text" 
                            value={data.location} 
                            onChange={e => setData({...data, location: e.target.value})}
                            placeholder="e.g. Dhaka (Hybrid) / Remote"
                            className="w-full h-11 bg-surface border border-stroke rounded-xl pl-10 pr-4 text-sm font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
                          />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">Job Type</label>
                        <div className="relative">
                           <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                           <select 
                            value={data.type}
                            onChange={e => setData({...data, type: e.target.value})}
                            className="w-full h-11 bg-surface border border-stroke rounded-xl pl-10 pr-8 text-sm font-semibold focus:outline-none focus:border-brand transition-all appearance-none text-text-primary cursor-pointer"
                           >
                             <option value="FULL_TIME">Full Time</option>
                             <option value="PART_TIME">Part Time</option>
                             <option value="CONTRACT">Contract</option>
                             <option value="INTERN">Internship</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                             <Clock size={12} className="rotate-180" />
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1">Job Description</label>
                    <textarea 
                      value={data.description} 
                      onChange={e => setData({...data, description: e.target.value})}
                      rows={6}
                      className="w-full bg-surface border border-stroke rounded-xl p-4 text-sm leading-relaxed focus:outline-none focus:border-brand transition-all text-text-primary"
                      placeholder="Write a clear and engaging job description here..."
                    />
                 </div>
              </div>
            )}

            {activeTab === "protocol" && (
              <div className="p-5 sm:p-6 space-y-6">
                 <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <Zap size={16} className="text-brand" /> Core Responsibilities
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
                            className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a responsibility..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-4 pt-5 border-t border-stroke">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-brand" /> Job Requirements
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
                            className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a requirement..."
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-4 pt-5 border-t border-stroke">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <Gift size={16} className="text-brand" /> Benefits & Perks
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
                            className="w-full h-11 bg-white border border-stroke rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary"
                            placeholder="Add a benefit..."
                          />
                        )}
                      />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-5 sm:p-6 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">URL Slug</label>
                        <div className="relative">
                          <Link2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="text" 
                            value={data.slug} 
                            onChange={e => setData({...data, slug: e.target.value})}
                            className="w-full h-11 bg-surface border border-stroke rounded-xl pl-10 pr-4 text-sm font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
                          />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">Job Status</label>
                        <button 
                          type="button"
                          onClick={() => setData({...data, active: !data.active})}
                          className={`w-full h-11 rounded-xl border flex items-center justify-center cursor-pointer transition-all gap-2 text-xs font-bold uppercase tracking-wider ${
                            data.active 
                              ? "bg-brand/5 border-brand/20 text-brand" 
                              : "bg-surface border-stroke text-text-muted"
                          }`}
                        >
                           <CheckCircle2 size={14} />
                           <span>{data.active ? "Active (Visible)" : "Draft (Hidden)"}</span>
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

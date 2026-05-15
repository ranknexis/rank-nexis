"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2, Plus, X, Zap, ShieldCheck, Layers, Target } from "lucide-react";
import Link from "next/link";
import { createService, updateService, deleteService } from "@/actions/services";
import { motion } from "framer-motion";

interface Props {
  initialData?: any;
}

export default function ServiceEditor({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData || {
    title: "",
    slug: "",
    description: "",
    category: "SEO",
    features: [""],
    order: 0,
    icon: "Zap",
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
    if (!data.title || !data.slug) {
      toast.error("Protocol error: Title and Slug are essential nodes.");
      return;
    }

    setLoading(true);
    const cleanedData = {
      ...data,
      features: data.features.filter((f: string) => f.trim() !== "")
    };

    const res = initialData?.id 
      ? await updateService(initialData.id, cleanedData)
      : await createService(cleanedData);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Service architecture updated" : "Service node forged successfully");
      router.push("/dashboard/services");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteService(initialData.id);
    if (res.success) {
      toast.success("Service node terminated");
      router.push("/dashboard/services");
      router.refresh();
    }
  };

  const addFeature = () => {
    setData({
      ...data,
      features: [...data.features, ""]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = value;
    setData({ ...data, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...data.features];
    newFeatures.splice(index, 1);
    setData({ ...data, features: newFeatures });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-stroke p-6 shadow-sm space-y-4">
            <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full h-16 bg-brand text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                <Save size={18} /> {loading ? "Syncing..." : "Save Service"}
            </button>
            
            <Link href="/dashboard/services" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-surface transition-all flex items-center justify-center gap-3">
                <ArrowLeft size={18} /> Cancel
            </Link>

            {initialData?.id && (
                <button 
                onClick={() => setDeleteConfirmOpen(true)}
                className="w-full h-16 bg-white border border-red-100 text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-3 mt-4"
                >
                <Trash2 size={18} /> Decommission
                </button>
            )}
        </div>

        <div className="p-8 bg-brand/[0.03] rounded-[2.5rem] border border-brand/10 space-y-4">
           <div className="flex items-center gap-3">
              <Zap size={14} className="text-brand" />
              <p className="text-[10px] font-black uppercase text-brand tracking-widest">Service Protocol</p>
           </div>
           <p className="text-[11px] font-medium text-text-secondary leading-relaxed opacity-70">
              Services define the core value proposition of RankNexis. Ensure all features are clear and impact-driven.
           </p>
        </div>
      </div>

      <div className="lg:col-span-9 space-y-10">
         <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm p-12 md:p-16 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-4">
               <ShieldCheck size={20} className="text-brand" />
               <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">Service Intelligence Node</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Service Title</label>
                  <input 
                    type="text" 
                    value={data.title} 
                    onChange={e => setData({...data, title: e.target.value})}
                    placeholder="E.G. TECHNICAL SEO AUDIT"
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Global Slug (URL)</label>
                  <input 
                    type="text" 
                    value={data.slug} 
                    onChange={e => setData({...data, slug: e.target.value})}
                    placeholder="E.G. TECHNICAL-SEO-AUDIT"
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all lowercase"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Market Category</label>
                  <select 
                    value={data.category} 
                    onChange={e => setData({...data, category: e.target.value})}
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-[11px] font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight appearance-none cursor-pointer"
                  >
                    <option value="SEO">SEO & Organic</option>
                    <option value="Content">Content Strategy</option>
                    <option value="Strategy">Business Strategy</option>
                    <option value="Tech">Technical Solutions</option>
                    <option value="Creative">Creative & Design</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Priority Index (Order)</label>
                  <input 
                    type="number" 
                    value={data.order} 
                    onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Service Overview (Impact Summary)</label>
               <textarea 
                 value={data.description} 
                 onChange={e => setData({...data, description: e.target.value})}
                 placeholder="DESCRIBE THE STRATEGIC IMPACT OF THIS SERVICE..."
                 className="w-full h-40 bg-surface border border-stroke rounded-[2rem] p-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all resize-none uppercase leading-relaxed"
               />
            </div>
         </div>

         <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm p-12 md:p-16 space-y-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <Layers size={20} className="text-brand" />
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">Core Value Features</h2>
              </div>
              <button 
                onClick={addFeature}
                className="px-6 h-12 bg-black text-white text-[10px] font-black rounded-xl shadow-xl font-bold uppercase flex items-center gap-3 hover:bg-zinc-800 transition-all"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>
            
            <div className="space-y-4">
               {data.features.map((feature: string, idx: number) => (
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className="flex gap-4 items-center group"
                 >
                    <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                       <Target size={18} />
                    </div>
                    <input 
                      type="text"
                      value={feature}
                      onChange={e => updateFeature(idx, e.target.value)}
                      placeholder="FEATURE DESCRIPTION..."
                      className="flex-grow h-14 px-8 bg-surface border border-stroke rounded-xl text-xs font-bold outline-none focus:border-brand transition-all uppercase"
                    />
                    <button 
                      onClick={() => removeFeature(idx)}
                      className="w-14 h-14 bg-surface border border-stroke rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
                    >
                      <X size={20} />
                    </button>
                 </motion.div>
               ))}
               {data.features.length === 0 && (
                 <div className="py-20 border-2 border-dashed border-stroke rounded-[3rem] text-center">
                    <p className="text-[11px] font-black uppercase text-text-muted tracking-widest">No value features defined.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Decommission Service Node?"
        message="This action will irrecoverably terminate this service node from the global infrastructure. Are you absolutely certain?"
        confirmText="Confirm Termination"
      />
    </div>
  );
}

import ConfirmationModal from "../../components/ConfirmationModal";

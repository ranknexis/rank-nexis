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
      toast.error("Please enter both a Title and Slug.");
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
      toast.success(initialData?.id ? "Service updated successfully" : "Service created successfully");
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
      toast.success("Service deleted successfully");
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-2xl border border-stroke p-4 shadow-sm space-y-2.5">
            <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full h-11 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <Save size={16} /> {loading ? "Syncing..." : "Save Service"}
            </button>
            
            <Link href="/dashboard/services" className="w-full h-11 bg-white border border-stroke text-text-muted rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-surface transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Cancel
            </Link>

            {initialData?.id && (
                <button 
                onClick={() => setDeleteConfirmOpen(true)}
                className="w-full h-11 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-all flex items-center justify-center gap-2 mt-2"
                >
                <Trash2 size={16} /> Delete Service
                </button>
            )}
        </div>

        <div className="p-4 bg-brand/[0.03] rounded-xl border border-brand/10 space-y-2">
           <div className="flex items-center gap-2">
              <Zap size={14} className="text-brand" />
              <p className="text-xs font-bold uppercase text-brand tracking-wider">Service Guidelines</p>
           </div>
           <p className="text-[11px] font-medium text-text-muted leading-relaxed">
              Services define the core offerings of RankNexis. Ensure all features are clear and impact-driven.
           </p>
        </div>
      </div>

      <div className="lg:col-span-9 space-y-6">
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-2 pb-2 border-b border-stroke/50">
               <ShieldCheck size={16} className="text-brand" />
               <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Service Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Service Title</label>
                  <input 
                    type="text" 
                    value={data.title} 
                    onChange={e => setData({...data, title: e.target.value})}
                    placeholder="E.G. TECHNICAL SEO AUDIT"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Global Slug (URL)</label>
                  <input 
                    type="text" 
                    value={data.slug} 
                    onChange={e => setData({...data, slug: e.target.value})}
                    placeholder="E.G. TECHNICAL-SEO-AUDIT"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all lowercase"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Market Category</label>
                  <select 
                    value={data.category} 
                    onChange={e => setData({...data, category: e.target.value})}
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight appearance-none cursor-pointer"
                  >
                    <option value="SEO">SEO & Organic</option>
                    <option value="Content">Content Strategy</option>
                    <option value="Strategy">Business Strategy</option>
                    <option value="Tech">Technical Solutions</option>
                    <option value="Creative">Creative & Design</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Display Order</label>
                  <input 
                    type="number" 
                    value={data.order} 
                    onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Service Overview (Impact Summary)</label>
               <textarea 
                 value={data.description} 
                 onChange={e => setData({...data, description: e.target.value})}
                 placeholder="DESCRIBE THE STRATEGIC IMPACT OF THIS SERVICE..."
                 className="w-full h-32 bg-surface border border-stroke rounded-xl p-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all resize-none uppercase leading-relaxed"
               />
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stroke/50">
              <div className="flex items-center gap-2">
                 <Layers size={16} className="text-brand" />
                 <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Core Value Features</h2>
              </div>
              <button 
                onClick={addFeature}
                className="px-4 h-11 bg-brand text-white text-xs font-bold rounded-xl shadow-md uppercase flex items-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>
            
            <div className="space-y-3">
               {data.features.map((feature: string, idx: number) => (
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className="flex gap-3 items-center group"
                 >
                    <div className="w-11 h-11 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                       <Target size={16} />
                    </div>
                    <input 
                      type="text"
                      value={feature}
                      onChange={e => updateFeature(idx, e.target.value)}
                      placeholder="FEATURE DESCRIPTION..."
                      className="flex-grow h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold outline-none focus:border-brand transition-all uppercase text-text-primary"
                    />
                    <button 
                      onClick={() => removeFeature(idx)}
                      className="w-11 h-11 bg-surface border border-stroke rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
                    >
                      <X size={16} />
                    </button>
                 </motion.div>
               ))}
               {data.features.length === 0 && (
                 <div className="py-10 border border-dashed border-stroke rounded-xl text-center">
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No value features defined.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service?"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

import ConfirmationModal from "../../components/ConfirmationModal";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2, Plus, X, User as UserIcon, Link as LinkIcon, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/actions/team";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import { motion } from "framer-motion";

interface Props {
  initialData?: any;
}

const SOCIAL_PLATFORMS = [
  "linkedin", "twitter", "facebook", "github", "pinterest", "dribbble", "instagram", "youtube"
];

export default function TeamEditor({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState(initialData || {
    name: "",
    role: "",
    bio: "",
    image: "",
    order: 0,
    socials: [
      { platform: "linkedin", url: "" },
      { platform: "twitter", url: "" }
    ],
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!data.name || !data.role) {
      toast.error("Name and Role are required fields.");
      return;
    }

    setLoading(true);
    const cleanedData = {
      ...data,
      socials: data.socials.filter((s: any) => s.url.trim() !== "")
    };

    const res = initialData?.id 
      ? await updateTeamMember(initialData.id, cleanedData)
      : await createTeamMember(cleanedData);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Expert profile updated" : "Expert profile forged");
      router.push("/dashboard/team");
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Decommission this expert profile?")) return;
    const res = await deleteTeamMember(initialData.id);
    if (res.success) {
      toast.success("Profile eliminated");
      router.push("/dashboard/team");
    }
  };

  const addSocial = () => {
    setData({
      ...data,
      socials: [...data.socials, { platform: "linkedin", url: "" }]
    });
  };

  const updateSocial = (index: number, field: string, value: string) => {
    const newSocials = [...data.socials];
    newSocials[index][field] = value;
    setData({ ...data, socials: newSocials });
  };

  const removeSocial = (index: number) => {
    const newSocials = [...data.socials];
    newSocials.splice(index, 1);
    setData({ ...data, socials: newSocials });
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
                <Save size={18} /> {loading ? "Syncing..." : "Save Profile"}
            </button>
            
            <Link href="/dashboard/team" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-surface transition-all flex items-center justify-center gap-3">
                <ArrowLeft size={18} /> Cancel
            </Link>

            {initialData?.id && (
                <button 
                onClick={handleDelete}
                className="w-full h-16 bg-white border border-red-100 text-red-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-3 mt-4"
                >
                <Trash2 size={18} /> Decommission
                </button>
            )}
        </div>

        <div className="p-8 bg-brand/[0.03] rounded-[2.5rem] border border-brand/10 space-y-4">
           <div className="flex items-center gap-3">
              <Zap size={14} className="text-brand" />
              <p className="text-[10px] font-black uppercase text-brand tracking-widest">Expert Protocol</p>
           </div>
           <p className="text-[11px] font-medium text-text-secondary leading-relaxed opacity-70">
              Expert profiles are optimized for public authority and strategic positioning. Ensure high-resolution assets for profile imagery.
           </p>
        </div>
      </div>

      <div className="lg:col-span-9 space-y-10">
         <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm p-12 md:p-16 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-4">
               <ShieldCheck size={20} className="text-brand" />
               <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">Strategic Profile Intelligence</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Expert Full Name</label>
                  <input 
                    type="text" 
                    value={data.name} 
                    onChange={e => setData({...data, name: e.target.value})}
                    placeholder="E.G. JANE DOE"
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Authority Role / Node</label>
                  <input 
                    type="text" 
                    value={data.role} 
                    onChange={e => setData({...data, role: e.target.value})}
                    placeholder="E.G. CHIEF MARKETING OFFICER"
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Authority Bio (Strategic Overview)</label>
               <textarea 
                 value={data.bio} 
                 onChange={e => setData({...data, bio: e.target.value})}
                 placeholder="OUTLINE THE EXPERT'S STRATEGIC IMPACT..."
                 className="w-full h-40 bg-surface border border-stroke rounded-[2rem] p-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all resize-none uppercase leading-relaxed"
               />
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase text-text-muted px-2 tracking-widest">Protocol Priority (Display Order)</label>
               <div className="relative w-full md:w-48">
                  <input 
                    type="number" 
                    value={data.order} 
                    onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                    className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm p-12 md:p-16 space-y-10">
            <div className="flex items-center gap-4">
               <UserIcon size={20} className="text-brand" />
               <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">Visual Identity Node</h2>
            </div>
            <CloudinaryUpload 
               value={data.image} 
               onChange={(url) => setData({...data, image: url})} 
               label="EXPERT ASSET (CLOUDINARY SYNCHRONIZED)"
            />
         </div>

         <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm p-12 md:p-16 space-y-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <LinkIcon size={20} className="text-brand" />
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">Digital Connection Nodes</h2>
              </div>
              <button 
                onClick={addSocial}
                className="px-6 h-12 bg-black text-white text-[10px] font-black rounded-xl shadow-xl font-bold uppercase flex items-center gap-3 hover:bg-zinc-800 transition-all"
              >
                <Plus size={16} /> Forge Node
              </button>
            </div>
            
            <div className="space-y-4">
               {data.socials.map((social: any, idx: number) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className="flex flex-col md:flex-row gap-4 p-6 bg-surface border border-stroke rounded-2xl transition-all hover:border-brand/30"
                 >
                    <select 
                      value={social.platform}
                      onChange={e => updateSocial(idx, "platform", e.target.value)}
                      className="h-14 px-6 bg-white border border-stroke rounded-xl text-[10px] font-black uppercase outline-none focus:border-brand w-full md:w-48 shrink-0 appearance-none cursor-pointer"
                    >
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <input 
                      type="text"
                      value={social.url}
                      onChange={e => updateSocial(idx, "url", e.target.value)}
                      placeholder={`HTTPS://${social.platform}.COM/USERNAME`}
                      className="w-full h-14 px-6 bg-white border border-stroke rounded-xl text-sm font-bold outline-none focus:border-brand"
                    />
                    <button 
                      onClick={() => removeSocial(idx)}
                      className="w-14 h-14 bg-white border border-stroke rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
                    >
                      <X size={20} />
                    </button>
                 </motion.div>
               ))}
               {data.socials.length === 0 && (
                 <div className="py-20 border-2 border-dashed border-stroke rounded-[3rem] text-center">
                    <p className="text-[11px] font-black uppercase text-text-muted tracking-widest">No social intelligence nodes defined.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

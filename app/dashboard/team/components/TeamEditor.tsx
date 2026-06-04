"use client";

import { createTeamMember, deleteTeamMember, updateTeamMember } from "@/actions/team";
import { motion } from "framer-motion";
import { ArrowLeft, Link as LinkIcon, Plus, Save, ShieldCheck, Trash2, User as UserIcon, X, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import ConfirmationModal from "../../components/ConfirmationModal";
import UnsavedChangesWarning from "../../components/UnsavedChangesWarning";

interface Props {
  initialData?: any;
}

const SOCIAL_PLATFORMS = [
  "linkedin", "portfolio", "github", "twitter", "facebook", "pinterest", "dribbble", "instagram", "youtube"
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
  const [userEmail, setUserEmail] = useState(initialData?.user?.email || "");
  const [isDirty, setIsDirty] = useState(false);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    setIsDirty(true);
  }, [data, userEmail]);

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!data.name || !data.role) {
      toast.error("Name and Role are required fields.");
      return;
    }

    setLoading(true);
    const cleanedData = {
      ...data,
      userEmail,
      socials: data.socials.filter((s: any) => s.url.trim() !== "")
    };

    const res = initialData?.id 
      ? await updateTeamMember(initialData.id, cleanedData)
      : await createTeamMember(cleanedData);
    
    setLoading(false);
    if (res.success) {
      setIsDirty(false);
      toast.success(initialData?.id ? "Team profile updated successfully" : "Team profile created successfully");
      router.push("/dashboard/team");
    } else {
      toast.error(res.error || "Failed to save team member profile");
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteTeamMember(initialData.id);
    if (res.success) {
      setIsDirty(false);
      toast.success("Team member profile deleted");
      router.push("/dashboard/team");
    } else {
      toast.error(res.error || "Failed to delete team member profile");
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <UnsavedChangesWarning isDirty={isDirty} isBusy={loading} />

      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 shadow-sm space-y-4">
            <button 
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="w-full h-11 bg-brand text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-md shadow-brand/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
                <Save size={16} /> {loading ? "Saving..." : "Save Profile"}
            </button>
            
            <Link 
              href={loading ? "#" : "/dashboard/team"} 
              onClick={loading ? (e) => e.preventDefault() : undefined}
              className={`w-full h-11 bg-white border border-stroke text-text-muted rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-surface transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <ArrowLeft size={16} /> Cancel
            </Link>

            {initialData?.id && (
                <button 
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                disabled={loading}
                className={`w-full h-11 bg-white border border-red-100 text-red-400 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer ${loading ? 'opacity-50' : ''}`}
                >
                <Trash2 size={16} /> Delete Profile
                </button>
            )}
        </div>

        <div className="p-5 sm:p-6 bg-brand/[0.03] rounded-2xl border border-brand/10 space-y-3">
           <div className="flex items-center gap-2">
              <Zap size={14} className="text-brand" />
              <p className="text-[10px] font-black uppercase text-brand tracking-widest">Team Guidelines</p>
           </div>
           <p className="text-[11px] font-medium text-text-secondary leading-relaxed opacity-70">
              Keep team profiles clear, concise, and up to date for a highly professional appearance.
           </p>
        </div>
      </div>

      <fieldset disabled={loading} className="lg:col-span-9 space-y-6 border-0 p-0 m-0 w-full disabled:opacity-75">
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-3">
               <ShieldCheck size={18} className="text-brand" />
               <h2 className="text-lg font-black uppercase tracking-tighter text-text-primary">Profile Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted px-1 tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={data.name} 
                    onChange={e => setData({...data, name: e.target.value})}
                    placeholder="e.g. Jane Doe"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted px-1 tracking-widest">Job Title / Role</label>
                  <input 
                    type="text" 
                    value={data.role} 
                    onChange={e => setData({...data, role: e.target.value})}
                    placeholder="e.g. Chief Operations Officer"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-text-muted px-1 tracking-widest">Biography</label>
               <textarea 
                 value={data.bio} 
                 onChange={e => setData({...data, bio: e.target.value})}
                 placeholder="Write a brief biography describing their background and expertise..."
                 className="w-full h-32 bg-surface border border-stroke rounded-xl p-4 text-sm font-medium text-text-primary focus:outline-none focus:border-brand transition-all resize-none uppercase leading-relaxed"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-text-muted px-1 tracking-widest">Display Order</label>
               <div className="relative w-full md:w-48">
                  <input 
                    type="number" 
                    value={data.order} 
                    onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex items-center gap-3">
               <UserIcon size={18} className="text-brand" />
               <h2 className="text-lg font-black uppercase tracking-tighter text-text-primary">Visual Identity</h2>
            </div>
            <CloudinaryUpload 
               value={data.image} 
               onChange={(url) => setData({...data, image: url})} 
               label="Profile Photo"
            />
         </div>

         {initialData?.user && (
           <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={18} className="text-brand" />
                 <h2 className="text-lg font-black uppercase tracking-tighter text-text-primary">Linked Operator Account</h2>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-text-muted px-1 tracking-widest">Operator Email Address</label>
                 <div className="relative">
                    <input 
                      type="email" 
                      value={userEmail} 
                      onChange={e => setUserEmail(e.target.value)}
                      placeholder="operator@ranknexis.com"
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                    />
                 </div>
                 <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider pl-1 leading-normal">
                    Changing this updates the administrator/operator credential email for system sign-in and notifications.
                 </p>
              </div>
           </div>
         )}

         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <LinkIcon size={18} className="text-brand" />
                 <h2 className="text-lg font-black uppercase tracking-tighter text-text-primary">Social Links</h2>
              </div>
              <button 
                type="button"
                onClick={addSocial}
                className="px-4 h-10 bg-black text-white text-[10px] font-black rounded-xl shadow-sm font-bold uppercase flex items-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Social Link
              </button>
            </div>
            
            <div className="space-y-4">
               {data.socials.map((social: any, idx: number) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className="flex flex-col md:flex-row gap-4 p-4 bg-surface border border-stroke rounded-xl transition-all hover:border-brand/30"
                 >
                    <select 
                      value={social.platform}
                      onChange={e => updateSocial(idx, "platform", e.target.value)}
                      className="h-11 px-4 bg-white border border-stroke rounded-xl text-[10px] font-black uppercase outline-none focus:border-brand w-full md:w-48 shrink-0 appearance-none cursor-pointer"
                    >
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <input 
                      type="text"
                      value={social.url}
                      onChange={e => updateSocial(idx, "url", e.target.value)}
                      placeholder={`https://${social.platform}.com/username`}
                      className="w-full h-11 px-4 bg-white border border-stroke rounded-xl text-sm font-medium outline-none focus:border-brand"
                    />
                    <button 
                      type="button"
                      onClick={() => removeSocial(idx)}
                      className="w-11 h-11 bg-white border border-stroke rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-all shrink-0 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                 </motion.div>
               ))}
               {data.socials.length === 0 && (
                 <div className="py-12 border-2 border-dashed border-stroke rounded-2xl text-center">
                    <p className="text-[11px] font-black uppercase text-text-muted tracking-widest">No social links defined yet.</p>
                 </div>
               )}
            </div>
         </div>
      </fieldset>
      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Team Member Profile?"
        message="Are you sure you want to permanently delete this team member profile? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

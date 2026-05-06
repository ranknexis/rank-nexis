"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2, Image as ImageIcon, Plus, X, User as UserIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/actions/team";

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
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (!data.name || !data.role) {
      toast.error("Name and Role are required fields.");
      return;
    }

    setLoading(true);
    // Filter out empty socials before saving
    const cleanedData = {
      ...data,
      socials: data.socials.filter((s: any) => s.url.trim() !== "")
    };

    const res = initialData?.id 
      ? await updateTeamMember(initialData.id, cleanedData)
      : await createTeamMember(cleanedData);
    
    setLoading(false);
    if (res.success) {
      toast.success(initialData?.id ? "Team Member updated" : "Team Member created");
      router.push("/admin/team");
    } else {
      toast.error(res.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    const res = await deleteTeamMember(initialData.id);
    if (res.success) {
      toast.success("Team member removed");
      router.push("/admin/team");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary credentials not configured in environment variables.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.secure_url) {
        setData({ ...data, image: json.secure_url });
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(json.error?.message || "Upload failed");
      }
    } catch (err: any) {
      toast.error("Failed to upload image: " + err.message);
    } finally {
      setUploading(false);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sidebar Controls */}
      <div className="lg:col-span-3 space-y-4">
        <button 
          onClick={handleSave}
          disabled={loading || uploading}
          className="w-full h-16 bg-brand text-white rounded-2xl text-[11px] font-bold uppercase hover:bg-brand/90 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Save size={18} /> {loading ? "Saving..." : "Save Member"}
        </button>
        
        <Link href="/admin/team" className="w-full h-16 bg-white border border-stroke text-text-muted rounded-2xl text-[11px] font-bold uppercase hover:bg-surface transition-all flex items-center justify-center gap-3">
          <ArrowLeft size={18} /> Cancel
        </Link>

        {initialData?.id && (
            <button 
            onClick={handleDelete}
            className="w-full h-16 bg-white border border-red-100 text-red-400 rounded-2xl text-[11px] font-bold uppercase hover:bg-red-50 transition-all flex items-center justify-center gap-3 mt-8"
          >
            <Trash2 size={18} /> Delete Member
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-8">
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm p-10 space-y-10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">Personal Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-2">Full Name</label>
                  <input 
                    type="text" 
                    value={data.name} 
                    onChange={e => setData({...data, name: e.target.value})}
                    placeholder="E.g. Jane Doe"
                    className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-2">Corporate Role / Position</label>
                  <input 
                    type="text" 
                    value={data.role} 
                    onChange={e => setData({...data, role: e.target.value})}
                    placeholder="E.g. Chief Marketing Officer"
                    className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase text-text-muted px-2">Short Bio (Optional)</label>
               <textarea 
                 value={data.bio} 
                 onChange={e => setData({...data, bio: e.target.value})}
                 placeholder="Brief introduction..."
                 className="w-full h-32 bg-surface border border-stroke rounded-xl p-6 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all resize-none"
               />
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase text-text-muted px-2">Display Order</label>
               <input 
                 type="number" 
                 value={data.order} 
                 onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                 className="w-full md:w-48 h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
               />
            </div>
         </div>

         {/* Image Upload Section */}
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm p-10 space-y-10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">Profile Image</h2>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-48 h-60 rounded-3xl overflow-hidden border border-stroke bg-surface flex items-center justify-center shrink-0">
                {data.image ? (
                  <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={48} className="text-stroke" />
                )}
              </div>
              
              <div className="space-y-6 w-full">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-2">Image URL (Or Upload to Cloudinary)</label>
                  <input 
                    type="text" 
                    value={data.image} 
                    onChange={e => setData({...data, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-medium text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
                </div>
                
                <div className="relative border-2 border-dashed border-stroke rounded-2xl p-8 hover:bg-surface hover:border-brand transition-all text-center group cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <UploadCloud size={32} className="text-brand group-hover:-translate-y-1 transition-transform" />
                    <p className="text-sm font-bold text-text-primary">{uploading ? "Uploading to Cloudinary..." : "Click or drag to upload"}</p>
                    <p className="text-[10px] uppercase text-text-muted">Must configure Cloudinary .env variables first</p>
                  </div>
                </div>
              </div>
            </div>
         </div>

         {/* Social Links Section */}
         <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm p-10 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">Social Links</h2>
              <button 
                onClick={addSocial}
                className="btn-outline h-10 px-4 text-[10px] rounded-lg shadow-sm font-bold uppercase flex items-center gap-2"
              >
                <Plus size={14} /> Add Social
              </button>
            </div>
            
            <div className="space-y-4">
               {data.socials.map((social: any, idx: number) => (
                 <div key={idx} className="flex gap-4 items-center bg-surface p-4 rounded-xl border border-stroke">
                    <select 
                      value={social.platform}
                      onChange={e => updateSocial(idx, "platform", e.target.value)}
                      className="h-12 px-4 bg-white border border-stroke rounded-lg text-xs font-bold uppercase outline-none focus:border-brand w-40 shrink-0"
                    >
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <input 
                      type="text"
                      value={social.url}
                      onChange={e => updateSocial(idx, "url", e.target.value)}
                      placeholder={`https://${social.platform}.com/...`}
                      className="w-full h-12 px-4 bg-white border border-stroke rounded-lg text-sm font-medium outline-none focus:border-brand"
                    />
                    <button 
                      onClick={() => removeSocial(idx)}
                      className="w-12 h-12 bg-white border border-stroke rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
                    >
                      <X size={16} />
                    </button>
                 </div>
               ))}
               {data.socials.length === 0 && (
                 <p className="text-[10px] font-bold uppercase text-text-muted text-center py-6">No social links added yet.</p>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

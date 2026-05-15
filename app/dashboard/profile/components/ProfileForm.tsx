"use client";

import { useState } from "react";
import { updateMyProfile } from "@/actions/profile";
import { toast } from "sonner";
import CloudinaryUpload from "@/dashboard/components/CloudinaryUpload";
import { Save, User, Briefcase, FileText, Share2, Plus, Trash2 } from "lucide-react";

export default function ProfileForm({ initialUser }: { initialUser: any }) {
    const profile = initialUser.teamProfile || {};
    const [name, setName] = useState(initialUser.name || "");
    const [role, setRole] = useState(profile.role || "");
    const [bio, setBio] = useState(profile.bio || "");
    const [image, setImage] = useState(profile.image || "");
    const [socials, setSocials] = useState(profile.socials || []);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddSocial = () => {
        setSocials([...socials, { platform: "LinkedIn", url: "" }]);
    };

    const handleRemoveSocial = (index: number) => {
        setSocials(socials.filter((_: any, i: number) => i !== index));
    };

    const handleSocialChange = (index: number, field: string, value: string) => {
        const updated = [...socials];
        updated[index][field] = value;
        setSocials(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await updateMyProfile({ name, role, bio, image, socials });
        if (res.success) {
            toast.success("Profile updated successfully.");
        } else {
            toast.error(res.error || "Update failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white border border-stroke rounded-[3rem] p-12 shadow-premium space-y-10 relative overflow-hidden grain">
                    <div className="space-y-6 text-center">
                        <p className="text-[10px] font-black uppercase text-brand tracking-[0.3em] block">Visual Node</p>
                        <div className="flex justify-center">
                            <CloudinaryUpload 
                                value={image} 
                                onChange={setImage} 
                            />
                        </div>
                    </div>

                    <div className="space-y-8 pt-4">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase text-text-muted px-2">Identifier</label>
                            <div className="relative">
                                <input 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="OPERATOR NAME"
                                    className="w-full h-16 pl-14 pr-6 bg-surface border border-stroke rounded-2xl text-[11px] font-bold uppercase focus:border-brand outline-none transition-all"
                                />
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand" size={18} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase text-text-muted px-2">Designation</label>
                            <div className="relative">
                                <input 
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="e.g. SENIOR STRATEGIST"
                                    className="w-full h-16 pl-14 pr-6 bg-surface border border-stroke rounded-2xl text-[11px] font-bold uppercase focus:border-brand outline-none transition-all"
                                />
                                <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-brand" size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
                <div className="bg-white border border-stroke rounded-[3rem] p-12 shadow-premium space-y-12 relative overflow-hidden grain">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-brand" />
                            <h2 className="text-sm font-bold uppercase tracking-tight text-text-primary">Narrative Profile</h2>
                        </div>
                        <textarea 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={6}
                            placeholder="OPERATIONAL BACKGROUND..."
                            className="w-full p-8 bg-surface border border-stroke rounded-[2rem] text-[11px] font-bold uppercase leading-relaxed focus:border-brand outline-none resize-none transition-all"
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Share2 size={20} className="text-brand" />
                                <h2 className="text-sm font-bold uppercase tracking-tight text-text-primary">Digital Footprint</h2>
                            </div>
                            <button 
                                type="button"
                                onClick={handleAddSocial}
                                className="w-12 h-12 bg-brand text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand/20"
                            >
                                <Plus size={22} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {socials.map((social: any, index: number) => (
                                <div key={index} className="flex gap-4 bg-surface p-6 rounded-2xl border border-stroke group hover:border-brand/30 transition-all">
                                    <div className="flex-grow space-y-3">
                                        <select 
                                            value={social.platform}
                                            onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                            className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest text-brand outline-none"
                                        >
                                            <option>LinkedIn</option>
                                            <option>Twitter</option>
                                            <option>GitHub</option>
                                            <option>Portfolio</option>
                                        </select>
                                        <input 
                                            value={social.url}
                                            onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                            placeholder="ACCESS URL"
                                            className="w-full bg-transparent text-[11px] font-bold text-text-primary outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveSocial(index)}
                                        className="text-text-muted hover:text-red-500 transition-colors self-start"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-stroke flex justify-end">
                        <button 
                            disabled={isLoading}
                            className="px-12 h-16 bg-brand text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 transition-all disabled:opacity-50 flex items-center gap-3"
                        >
                            {isLoading ? "Synchronizing..." : (
                                <>
                                     <Save size={20} />
                                     Commit Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}


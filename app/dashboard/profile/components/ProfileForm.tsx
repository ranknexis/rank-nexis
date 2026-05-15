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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            <div className="lg:col-span-4 space-y-8">

                <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-8">
                    <div className="space-y-4 text-center">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">Profile Image</label>
                        <div className="flex justify-center">
                            <CloudinaryUpload 
                                value={image} 
                                onChange={setImage} 
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-text-muted ml-2">Full Name</label>
                            <div className="relative">
                                <input 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 bg-surface border border-stroke rounded-2xl text-sm font-medium focus:border-brand outline-none"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-xs font-bold text-text-muted ml-2">Job Title</label>
                            <div className="relative">
                                <input 
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                     placeholder="e.g. Senior SEO Manager"
                                    className="w-full h-14 pl-12 pr-6 bg-surface border border-stroke rounded-2xl text-sm font-medium focus:border-brand outline-none"
                                />
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40" size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 space-y-8">

                <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText size={18} className="text-brand" />
                             <h2 className="text-sm font-bold uppercase tracking-tight">Biography</h2>
                        </div>
                        <textarea 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={6}
                             placeholder="Tell us about yourself..."
                            className="w-full p-6 bg-surface border border-stroke rounded-3xl text-sm font-medium focus:border-brand outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Share2 size={18} className="text-brand" />
                                 <h2 className="text-sm font-bold uppercase tracking-tight">Social Links</h2>
                            </div>
                            <button 
                                type="button"
                                onClick={handleAddSocial}
                                className="w-10 h-10 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {socials.map((social: any, index: number) => (
                                <div key={index} className="flex gap-3 bg-surface p-4 rounded-2xl border border-stroke group">
                                    <div className="flex-grow space-y-3">
                                        <select 
                                            value={social.platform}
                                            onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                            className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest text-text-muted outline-none"
                                        >
                                            <option>LinkedIn</option>
                                            <option>Twitter</option>
                                            <option>GitHub</option>
                                            <option>Portfolio</option>
                                        </select>
                                        <input 
                                            value={social.url}
                                            onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                            placeholder="URL"
                                            className="w-full bg-transparent text-xs font-medium text-text-primary outline-none"
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveSocial(index)}
                                        className="text-text-muted hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-stroke flex justify-end">
                        <button 
                            disabled={isLoading}
                            className="btn-primary flex items-center gap-3 px-10 h-14 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-all disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : (
                                <>
                                     <Save size={18} />
                                     Save Profile
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


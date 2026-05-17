"use client";

import { updateMyProfile } from "@/actions/profile";
import CloudinaryUpload from "@/dashboard/components/CloudinaryUpload";
import { Briefcase, FileText, Mail, Plus, Save, Share2, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileForm({ initialUser }: { initialUser: any }) {
    const profile = initialUser.teamProfile || {};
    const [name, setName] = useState(initialUser.name || "");
    const [email, setEmail] = useState(initialUser.email || "");
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
        const res = await updateMyProfile({ name, email, role, bio, image, socials });
        if (res.success) {
            toast.success("Profile updated successfully.");
        } else {
            toast.error(res.error || "Update failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-[1400px] mx-auto bg-white border border-stroke rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-5">
                        <div className="space-y-4 text-center">
                            <p className="text-[9px] font-black uppercase text-brand tracking-wider block">Profile Photo</p>
                            <div className="flex justify-center">
                                <CloudinaryUpload 
                                    value={image} 
                                    onChange={setImage} 
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Full Name</label>
                                <div className="relative">
                                    <input 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full h-11 pl-11 pr-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none transition-all"
                                    />
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={14} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Email Address</label>
                                <div className="relative">
                                    <input 
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full h-11 pl-11 pr-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none transition-all"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={14} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Job Title / Role</label>
                                <div className="relative">
                                    <input 
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. Senior SEO Strategist"
                                        className="w-full h-11 pl-11 pr-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none transition-all"
                                    />
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-6">
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <FileText size={16} className="text-brand shrink-0" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">Biography</h2>
                            </div>
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={5}
                                placeholder="Tell us about yourself, your skills, and your professional background..."
                                className="w-full p-4 bg-surface border border-stroke rounded-xl text-xs font-medium focus:border-brand outline-none resize-none transition-all leading-relaxed"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <Share2 size={16} className="text-brand shrink-0" />
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">Social Links</h2>
                                </div>
                                <button 
                                    type="button"
                                    onClick={handleAddSocial}
                                    className="w-9 h-9 bg-brand hover:bg-brand-dark text-white rounded-lg flex items-center justify-center transition-all shadow-sm active:scale-95 shrink-0"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {socials.map((social: any, index: number) => (
                                    <div key={index} className="flex gap-3 bg-surface p-4 rounded-xl border border-stroke group hover:border-brand/35 transition-all">
                                        <div className="flex-grow space-y-2">
                                            <select 
                                                value={social.platform}
                                                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                                className="w-full bg-transparent text-[9px] font-black uppercase tracking-wider text-brand outline-none cursor-pointer"
                                            >
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="GitHub">GitHub</option>
                                                <option value="Portfolio">Portfolio</option>
                                            </select>
                                            <input 
                                                value={social.url}
                                                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                                placeholder="Profile URL"
                                                className="w-full bg-transparent text-xs font-bold text-text-primary outline-none"
                                            />
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => handleRemoveSocial(index)}
                                            className="text-text-muted hover:text-red-500 transition-colors self-start p-1"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stroke flex justify-end">
                            <button 
                                disabled={isLoading}
                                className="px-6 h-10 bg-black hover:bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
                            >
                                {isLoading ? "Saving..." : (
                                    <>
                                         <Save size={14} />
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

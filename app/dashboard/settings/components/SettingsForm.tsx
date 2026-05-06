"use client";

import { useState } from "react";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Globe, Mail, Phone, MapPin, Share2, Shield, Layout, Save, Loader2, Link2, BarChart3, Activity, Target, Zap, Hash } from "lucide-react";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = async () => {
    setLoading(true);
    const res = await updateSettings(data);
    setLoading(false);
    if (res.success) {
      toast.success("Settings updated successfully");
    } else {
      toast.error(res.error);
    }
  };

  const tabs = [
    { id: "general", label: "Branding & SEO", icon: Globe },
    { id: "contact", label: "Business Info", icon: Mail },
    { id: "social", label: "Social Presence", icon: Share2 },
    { id: "analytics", label: "Tracking & Pixels", icon: Activity }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sidebar Nav */}
      <div className="lg:col-span-3 space-y-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-tight ${
              activeTab === tab.id 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-surface text-text-muted hover:bg-brand/5 hover:text-brand"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}

        <div className="pt-10">
           <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-16 bg-black text-white rounded-2xl text-[11px] font-bold uppercase hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Push Changes
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-9">
        <div className="bg-white rounded-[2rem] border border-stroke p-10 shadow-sm space-y-12">
          
          {activeTab === "general" && (
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                   <Globe size={20} className="text-brand" /> Site Architecture
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Site Name</label>
                    <input 
                      type="text" 
                      value={data.siteName || ""} 
                      onChange={e => setData({...data, siteName: e.target.value})}
                      className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Title Suffix (SEO)</label>
                    <input 
                      type="text" 
                      value={data.siteTitleSuffix || ""} 
                      onChange={e => setData({...data, siteTitleSuffix: e.target.value})}
                      className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <label className="text-[10px] font-bold uppercase text-text-muted px-2">Global Description</label>
                 <textarea 
                   value={data.siteDescription || ""} 
                   onChange={e => setData({...data, siteDescription: e.target.value})}
                   rows={4}
                   className="w-full bg-surface border border-stroke rounded-2xl p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                   placeholder="Enter a default description for the entire site..."
                 />
              </div>

              <div className="space-y-6">
                 <label className="text-[10px] font-bold uppercase text-text-muted px-2">Global OG Image URL</label>
                 <div className="flex gap-4">
                    <div className="relative flex-grow">
                      <Link2 size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="text" 
                        value={data.ogImage || ""} 
                        onChange={e => setData({...data, ogImage: e.target.value})}
                        className="w-full h-14 bg-surface border border-stroke rounded-xl pl-14 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                      />
                    </div>
                    {data.ogImage && (
                       <div className="w-24 h-14 rounded-xl overflow-hidden border border-stroke bg-surface">
                          <img src={data.ogImage} className="w-full h-full object-cover" alt="" />
                       </div>
                    )}
                 </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
             <div className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                    <Mail size={20} className="text-brand" /> Communication Nodes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Primary Email</label>
                        <input 
                          type="email" 
                          value={data.contactEmail || ""} 
                          onChange={e => setData({...data, contactEmail: e.target.value})}
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Support Phone</label>
                        <input 
                          type="text" 
                          value={data.contactPhone || ""} 
                          onChange={e => setData({...data, contactPhone: e.target.value})}
                          className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                        />
                     </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <label className="text-[10px] font-bold uppercase text-text-muted px-2">Physical Headquarters Address</label>
                   <div className="relative">
                      <MapPin size={18} className="absolute left-6 top-6 text-text-muted" />
                      <textarea 
                        value={data.address || ""} 
                        onChange={e => setData({...data, address: e.target.value})}
                        rows={3}
                        className="w-full bg-surface border border-stroke rounded-2xl pl-16 p-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                      />
                   </div>
                </div>
             </div>
          )}

          {activeTab === "social" && (
             <div className="space-y-10">
                <div className="space-y-8">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                    <Share2 size={20} className="text-brand" /> Logical Bridges (Social)
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                     {[
                       { key: "facebookUrl", label: "Facebook Page URL", icon: Share2 },
                       { key: "twitterUrl", label: "Twitter / X Profile", icon: Share2 },
                       { key: "linkedinUrl", label: "LinkedIn Company Page", icon: Share2 },
                       { key: "instagramUrl", label: "Instagram Profile", icon: Share2 },
                       { key: "youtubeUrl", label: "YouTube Channel", icon: Share2 }
                     ].map(social => (
                       <div key={social.key} className="space-y-3">
                          <label className="text-[10px] font-bold uppercase text-text-muted px-2">{social.label}</label>
                          <div className="relative">
                             <Link2 size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                             <input 
                               type="text" 
                               value={data[social.key] || ""} 
                               onChange={e => setData({...data, [social.key]: e.target.value})}
                               className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                               placeholder="https://..."
                             />
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-10">
                <div className="space-y-8">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-text-primary flex items-center gap-3">
                    <Activity size={20} className="text-brand" /> Marketing Intelligence
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                       { key: "gtmId", label: "Google Tag Manager (GTM-XXXX)", placeholder: "GTM-XXXXXXX", icon: Zap },
                       { key: "gaId", label: "Google Analytics 4 (G-XXXX)", placeholder: "G-XXXXXXXXX", icon: BarChart3 },
                       { key: "googleAdsId", label: "Google Ads ID (AW-XXXX)", placeholder: "AW-XXXXXXXXX", icon: Target },
                       { key: "pixelId", label: "Meta (Facebook) Pixel ID", placeholder: "1234567890", icon: Target },
                       { key: "linkedinInsightId", label: "LinkedIn Insight Tag ID", placeholder: "1234567", icon: Target },
                       { key: "tiktokId", label: "TikTok Pixel ID", placeholder: "CXXXXXXXXXXXXXXXXXX", icon: Hash },
                       { key: "twitterId", label: "Twitter (X) Pixel ID", placeholder: "tw-XXXXX-XXXXX", icon: Hash },
                       { key: "pinterestId", label: "Pinterest Tag ID", placeholder: "26XXXXXXXXXXX", icon: Hash },
                       { key: "snapchatId", label: "Snapchat Pixel ID", placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", icon: Hash },
                       { key: "redditId", label: "Reddit Pixel ID", placeholder: "t2_XXXXXX", icon: Hash },
                       { key: "quoraId", label: "Quora Pixel ID", placeholder: "XXXXXXXXXXXXXXXXXXXX", icon: Hash },
                       { key: "hotjarId", label: "Hotjar Site ID", placeholder: "1234567", icon: Activity },
                       { key: "clarityId", label: "Microsoft Clarity ID", placeholder: "abcdefghij", icon: Activity }
                     ].map(item => (
                       <div key={item.key} className="space-y-3">
                          <label className="text-[10px] font-bold uppercase text-text-muted px-2">{item.label}</label>
                          <div className="relative">
                             <item.icon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                             <input 
                               type="text" 
                               value={data[item.key] || ""} 
                               onChange={e => setData({...data, [item.key]: e.target.value})}
                               className="w-full h-14 bg-surface border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all"
                               placeholder={item.placeholder}
                             />
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="p-6 bg-brand/5 border border-brand/10 rounded-2xl">
                     <p className="text-[10px] font-bold uppercase text-brand flex items-center gap-2">
                        <Shield size={14} /> Compliance Note
                     </p>
                     <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                        These trackers will only initialize if the user provides explicit consent via the Cookie Consent banner. Ensure your Privacy Policy is updated accordingly.
                     </p>
                  </div>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

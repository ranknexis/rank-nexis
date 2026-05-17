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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white border border-stroke rounded-2xl p-2 shadow-sm grain space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 h-11 rounded-xl transition-all text-xs font-bold uppercase tracking-tight ${
                activeTab === tab.id 
                  ? "bg-brand text-white shadow-md shadow-brand/15 scale-[1.01]" 
                  : "bg-transparent text-text-muted hover:bg-brand/5 hover:text-brand"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div>
           <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-11 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Save Settings
          </button>
        </div>
      </div>

      <div className="lg:col-span-9">
        <div className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 shadow-sm relative overflow-hidden grain">
          
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2 pb-2 border-b border-stroke/50">
                   <Globe size={16} className="text-brand" /> Website Branding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1">Site Name</label>
                    <input 
                      type="text" 
                      value={data.siteName || ""} 
                      onChange={e => setData({...data, siteName: e.target.value})}
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold uppercase focus:outline-none focus:border-brand transition-all text-text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-1">Title Suffix (SEO)</label>
                    <input 
                      type="text" 
                      value={data.siteTitleSuffix || ""} 
                      onChange={e => setData({...data, siteTitleSuffix: e.target.value})}
                      className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold uppercase focus:outline-none focus:border-brand transition-all text-text-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-text-muted px-1">Global Description</label>
                 <textarea 
                   value={data.siteDescription || ""} 
                   onChange={e => setData({...data, siteDescription: e.target.value})}
                   rows={4}
                   className="w-full bg-surface border border-stroke rounded-xl p-4 text-xs font-bold uppercase focus:outline-none focus:border-brand transition-all text-text-primary leading-relaxed"
                   placeholder="Enter a default description for the entire site..."
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-text-muted px-1">Global OG Image URL</label>
                 <div className="flex gap-4">
                    <div className="relative flex-grow">
                      <Link2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="text" 
                        value={data.ogImage || ""} 
                        onChange={e => setData({...data, ogImage: e.target.value})}
                        className="w-full h-11 bg-surface border border-stroke rounded-xl pl-10 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                      />
                    </div>
                    {data.ogImage && (
                       <div className="w-16 h-11 rounded-lg overflow-hidden border border-stroke bg-surface shrink-0">
                          <img src={data.ogImage} className="w-full h-full object-cover" alt="" />
                       </div>
                    )}
                 </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
             <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2 pb-2 border-b border-stroke/50">
                    <Mail size={16} className="text-brand" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">Primary Email</label>
                        <input 
                          type="email" 
                          value={data.contactEmail || ""} 
                          onChange={e => setData({...data, contactEmail: e.target.value})}
                          className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-1">Support Phone</label>
                        <input 
                          type="text" 
                          value={data.contactPhone || ""} 
                          onChange={e => setData({...data, contactPhone: e.target.value})}
                          className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                        />
                     </div>
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase text-text-muted px-1">Physical Headquarters Address</label>
                   <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-4 text-text-muted" />
                      <textarea 
                        value={data.address || ""} 
                        onChange={e => setData({...data, address: e.target.value})}
                        rows={3}
                        className="w-full bg-surface border border-stroke rounded-xl pl-11 p-4 text-xs font-bold uppercase focus:outline-none focus:border-brand transition-all text-text-primary leading-relaxed"
                      />
                   </div>
                </div>
             </div>
          )}

          {activeTab === "social" && (
             <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2 pb-2 border-b border-stroke/50">
                    <Share2 size={16} className="text-brand" /> Social Media Links
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                     {[
                       { key: "facebookUrl", label: "Facebook Page URL", icon: Share2 },
                       { key: "twitterUrl", label: "Twitter / X Profile", icon: Share2 },
                       { key: "linkedinUrl", label: "LinkedIn Company Page", icon: Share2 },
                       { key: "instagramUrl", label: "Instagram Profile", icon: Share2 },
                       { key: "youtubeUrl", label: "YouTube Channel", icon: Share2 }
                     ].map(social => (
                       <div key={social.key} className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-text-muted px-1">{social.label}</label>
                          <div className="relative">
                             <Link2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                             <input 
                               type="text" 
                               value={data[social.key] || ""} 
                               onChange={e => setData({...data, [social.key]: e.target.value})}
                               className="w-full h-11 bg-surface border border-stroke rounded-xl pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
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
            <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2 pb-2 border-b border-stroke/50">
                    <Activity size={16} className="text-brand" /> Tracking & Analytics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                       <div key={item.key} className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-text-muted px-1">{item.label}</label>
                          <div className="relative">
                             <item.icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                             <input 
                               type="text" 
                               value={data[item.key] || ""} 
                               onChange={e => setData({...data, [item.key]: e.target.value})}
                               className="w-full h-11 bg-surface border border-stroke rounded-xl pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary"
                               placeholder={item.placeholder}
                             />
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="p-4 bg-brand/5 border border-brand/10 rounded-xl mt-4">
                     <p className="text-[10px] font-bold uppercase text-brand flex items-center gap-2">
                        <Shield size={14} /> Compliance Note
                     </p>
                     <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
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

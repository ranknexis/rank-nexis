"use client";

import {
   AlertCircle,
   ChevronDown,
   Globe,
   Info
} from 'lucide-react';
import { useState, memo } from 'react';

interface SeoEditorProps {
  data: any;
  onChange: (data: any) => void;
  slug: string;
}

const SeoEditor = memo(({ data, onChange, slug }: SeoEditorProps) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'og'>('meta');

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const titleLength = data.metaTitle?.length || 0;
  const descLength = data.metaDescription?.length || 0;

  const titleStatus = titleLength >= 50 && titleLength <= 60 ? 'optimal' : titleLength > 60 ? 'long' : 'short';
  const descStatus = descLength >= 150 && descLength <= 160 ? 'optimal' : descLength > 160 ? 'long' : 'short';

  return (
    <div className="space-y-10">
      <div className="flex gap-4 border-b border-stroke pb-6">
        <button 
          onClick={() => setActiveTab('meta')}
          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${activeTab === 'meta' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
        >
          Google Search
        </button>
        <button 
          onClick={() => setActiveTab('og')}
          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${activeTab === 'og' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
        >
          Social Share (OG)
        </button>
      </div>

      {activeTab === 'meta' && (
        <div className="space-y-12 animation-fade-in">
          {/* GOOGLE PREVIEW */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-stroke shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-text-muted mb-4">
               <Globe size={14} />
               <p className="text-[10px] font-bold uppercase">Google SERP Preview</p>
            </div>
            
            <div className="space-y-2 max-w-xl">
               <p className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer truncate">
                  {data.metaTitle || "Page Title | RankNexis"}
               </p>
               <p className="text-[#006621] text-sm flex items-center gap-1">
                  https://www.ranknexis.com{slug === 'home' ? '' : `/${slug}`} <ChevronDown size={12} />
               </p>
               <p className="text-[#4d5156] text-sm leading-relaxed line-clamp-2">
                  {data.metaDescription || "Please provide a meta description for this node to improve search visibility..."}
               </p>
            </div>
          </div>

          {/* META FIELDS */}
          <div className="grid grid-cols-1 gap-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center ml-4">
                 <label className="text-[11px] font-bold uppercase text-brand">SEO Title</label>
                 <span className={`text-[9px] font-bold uppercase ${titleStatus === 'optimal' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {titleLength} / 60 char
                 </span>
              </div>
              <input 
                type="text" 
                value={data.metaTitle || ''} 
                onChange={(e) => updateField('metaTitle', e.target.value)}
                placeholder="Page Title | RankNexis"
                className={`input-field ${titleStatus === 'long' ? 'border-amber-400' : ''}`}
              />
              <div className="flex items-center gap-2 ml-4">
                 <div className={`w-full h-1 bg-surface rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full transition-all duration-500 ${titleStatus === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center ml-4">
                 <label className="text-[11px] font-bold uppercase text-brand">Meta Description</label>
                 <span className={`text-[9px] font-bold uppercase ${descStatus === 'optimal' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {descLength} / 160 char
                 </span>
              </div>
              <textarea 
                rows={4}
                value={data.metaDescription || ''} 
                onChange={(e) => updateField('metaDescription', e.target.value)}
                placeholder="Enter description..."
                className={`input-field h-auto py-6 resize-none ${descStatus === 'long' ? 'border-amber-400' : ''}`}
              />
               <div className="flex items-center gap-2 ml-4">
                 <div className={`w-full h-1 bg-surface rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full transition-all duration-500 ${descStatus === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-bold uppercase text-brand ml-4">Meta Keywords (Comma separated)</label>
              <input 
                type="text" 
                value={data.metaKeywords?.join(', ') || ''} 
                onChange={(e) => updateField('metaKeywords', e.target.value.split(',').map(s => s.trim()))}
                placeholder="SEO, Marketing, Growth..."
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'og' && (
        <div className="space-y-12 animation-fade-in">
           {/* OG PREVIEW */}
           <div className="bg-white rounded-[2.5rem] border border-stroke shadow-sm overflow-hidden max-w-lg mx-auto">
              <div className="aspect-[1200/630] bg-surface relative">
                 {data.ogImage ? (
                    <img src={data.ogImage} alt="Preview" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-text-muted gap-4">
                       <AlertCircle size={40} strokeWidth={1} />
                       <p className="text-[10px] font-bold uppercase">No OG Image defined</p>
                    </div>
                 )}
              </div>
              <div className="p-8 space-y-3 bg-surface/30">
                 <p className="text-[10px] font-bold uppercase text-text-muted">ranknexis.com</p>
                 <p className="text-xl font-bold uppercase tracking-tight text-text-primary">
                    {data.ogTitle || data.metaTitle || "Social Title"}
                 </p>
                 <p className="text-sm text-text-secondary line-clamp-2">
                    {data.ogDescription || data.metaDescription || "Social description goes here..."}
                 </p>
              </div>
           </div>

           {/* OG FIELDS */}
           <div className="grid grid-cols-1 gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase text-brand ml-4">OG Title</label>
                    <input 
                      type="text" 
                      value={data.ogTitle || ''} 
                      onChange={(e) => updateField('ogTitle', e.target.value)}
                      placeholder="Same as Meta Title"
                      className="input-field"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase text-brand ml-4">OG Image URL</label>
                    <input 
                      type="text" 
                      value={data.ogImage || ''} 
                      onChange={(e) => updateField('ogImage', e.target.value)}
                      placeholder="https://..."
                      className="input-field"
                    />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase text-brand ml-4">OG Description</label>
                 <textarea 
                   rows={3}
                   value={data.ogDescription || ''} 
                   onChange={(e) => updateField('ogDescription', e.target.value)}
                   placeholder="Same as Meta Description"
                   className="input-field h-auto py-6 resize-none"
                 />
              </div>
           </div>
        </div>
      )}

      {/* ADVANCED SETTINGS */}
      <div className="pt-10 border-t border-stroke space-y-10">
         <div className="flex items-center justify-between p-8 bg-surface/30 rounded-3xl border border-stroke">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-text-muted border border-stroke">
                  <Info size={24} />
               </div>
               <div>
                  <p className="text-sm font-bold uppercase text-text-primary">Search Indexing</p>
                  <p className="text-[10px] font-bold uppercase text-text-muted">Control if this node appears in search engines.</p>
               </div>
            </div>
            <button 
              onClick={() => updateField('noIndex', !data.noIndex)}
              className={`w-16 h-8 rounded-full transition-all relative ${data.noIndex ? 'bg-red-500' : 'bg-emerald-500'}`}
            >
               <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${data.noIndex ? 'right-1' : 'left-1'}`} />
            </button>
         </div>

         <div className="space-y-4 px-4">
            <label className="text-[11px] font-bold uppercase text-brand">Canonical URL</label>
            <input 
              type="text" 
              value={data.canonicalUrl || ''} 
              onChange={(e) => updateField('canonicalUrl', e.target.value)}
              placeholder="https://www.ranknexis.com/..."
              className="input-field"
            />
         </div>
      </div>
    </div>
  );
});

export default SeoEditor;


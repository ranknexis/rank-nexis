"use client";

import { useState, memo } from 'react';
import { Plus, Trash2, Link as LinkIcon, MoveUp, MoveDown, Save } from 'lucide-react';
import { updateInternalLinks } from '@/actions/pages';
import { toast } from 'sonner';

interface InternalLink {
  label: string;
  url: string;
  relationship: string; // e.g. "Primary", "Related", "Service"
}

const InternalLinksEditor = memo(({ slug, initialLinks }: { slug: string, initialLinks: any[] }) => {
  const [links, setLinks] = useState<InternalLink[]>(initialLinks || []);
  const [isSaving, setIsSaving] = useState(false);

  const addLink = () => {
    setLinks([...links, { label: "", url: "", relationship: "Related" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof InternalLink, value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === links.length - 1) return;
    
    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
    setLinks(newLinks);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateInternalLinks(slug, links);
      if (result.success) {
        toast.success("Internal graph updated successfully");
      } else {
        toast.error(result.error || "Failed to update links");
      }
    } catch (err) {
      toast.error("Error saving links");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 glass p-10 rounded-[2.5rem] border border-stroke shadow-premium relative overflow-hidden grain">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.03] rounded-full blur-3xl -z-10" />
      
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">Internal <span className="text-brand">Graph.</span></h2>
          <p className="text-[10px] font-bold uppercase text-text-muted">Manage SEO link relevance and page relationships.</p>
        </div>
        <button 
          onClick={addLink}
          className="px-6 h-12 rounded-xl border border-brand/20 bg-brand/5 text-brand text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-brand hover:text-white transition-all shadow-sm"
        >
          <Plus size={16} /> Add Logic Bridge
        </button>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-stroke rounded-[2rem] space-y-4">
            <LinkIcon size={40} className="mx-auto text-stroke" strokeWidth={1} />
            <p className="text-[10px] font-bold uppercase text-text-muted">No internal links configured for this node.</p>
          </div>
        ) : (
          links.map((link, index) => (
            <div key={index} className="flex gap-4 items-end bg-white/50 p-6 rounded-2xl border border-stroke group hover:border-brand/30 transition-all">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-brand ml-2">Label</label>
                  <input 
                    value={link.label} 
                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                    placeholder="e.g. View Our Services" 
                    className="input-field shadow-sm bg-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-brand ml-2">Endpoint URL</label>
                  <input 
                    value={link.url} 
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    placeholder="/services" 
                    className="input-field shadow-sm bg-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-brand ml-2">Rel-Type</label>
                  <select 
                    value={link.relationship} 
                    onChange={(e) => updateLink(index, 'relationship', e.target.value)}
                    className="input-field shadow-sm bg-white appearance-none cursor-pointer"
                  >
                    <option value="Primary">Primary Hub</option>
                    <option value="Related">Related Content</option>
                    <option value="Service">Service Bridge</option>
                    <option value="CaseStudy">Case Study</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pb-1">
                <button onClick={() => moveLink(index, 'up')} className="p-3 bg-surface rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"><MoveUp size={16} /></button>
                <button onClick={() => moveLink(index, 'down')} className="p-3 bg-surface rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"><MoveDown size={16} /></button>
                <button onClick={() => removeLink(index)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {links.length > 0 && (
        <div className="pt-8 border-t border-stroke flex justify-end">
           <button 
            disabled={isSaving}
            onClick={handleSave}
            className={`px-10 h-16 rounded-[2rem] bg-brand text-white shadow-premium text-[10px] font-bold uppercase flex items-center gap-3 transition-all hover:scale-105 ${isSaving ? 'opacity-50 grayscale' : ''}`}
           >
             <Save size={18} /> {isSaving ? "Syncing Graph..." : "Commit Link Structure"}
           </button>
        </div>
      )}
    </div>
  );
});

export default InternalLinksEditor;


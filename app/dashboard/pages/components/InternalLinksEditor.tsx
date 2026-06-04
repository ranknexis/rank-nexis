"use client";

import { updateInternalLinks, getAllPages } from '@/actions/pages';
import { Link as LinkIcon, MoveDown, MoveUp, Plus, Save, Trash2 } from 'lucide-react';
import { memo, useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

interface InternalLink {
  label: string;
  url: string;
  relationship: string; 
  isCustom?: boolean;
}

const InternalLinksEditor = memo(({ slug, initialLinks, onDirtyChange }: { slug: string, initialLinks: any[], onDirtyChange?: (isDirty: boolean) => void }) => {
  const [links, setLinks] = useState<InternalLink[]>(() => {
    let parsed: any[] = [];
    if (!initialLinks) parsed = [];
    else if (typeof initialLinks === 'string') {
      try {
        const p = JSON.parse(initialLinks);
        parsed = Array.isArray(p) ? p : [];
      } catch (e) {
        parsed = [];
      }
    } else {
      parsed = Array.isArray(initialLinks) ? initialLinks : [];
    }
    return parsed.map(link => ({
      ...link,
      isCustom: false
    }));
  });

  const [availablePages, setAvailablePages] = useState<{ title: string, url: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedLinks, setSavedLinks] = useState(initialLinks);

  const initialLinksList = useMemo(() => {
    let parsed: any[] = [];
    if (!savedLinks) parsed = [];
    else if (typeof savedLinks === 'string') {
      try {
        const p = JSON.parse(savedLinks);
        parsed = Array.isArray(p) ? p : [];
      } catch (e) {
        parsed = [];
      }
    } else {
      parsed = Array.isArray(savedLinks) ? savedLinks : [];
    }
    return parsed.map(link => ({
      label: link.label || "",
      url: link.url || "",
      relationship: link.relationship || "Related"
    }));
  }, [savedLinks]);

  const isDirty = useMemo(() => {
    const current = links.map(link => ({
      label: link.label || "",
      url: link.url || "",
      relationship: link.relationship || "Related"
    }));
    return JSON.stringify(current) !== JSON.stringify(initialLinksList);
  }, [links, initialLinksList]);

  useEffect(() => {
    onDirtyChange?.(isDirty);
    return () => {
      onDirtyChange?.(false);
    };
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    const fetchPages = async () => {
      const defaultPages = [
        { title: "Home Page", url: "/" },
        { title: "About Us", url: "/about" },
        { title: "Services", url: "/services" },
        { title: "Careers", url: "/careers" },
        { title: "Contact", url: "/contact" },
        { title: "Blog", url: "/blog" },
        { title: "Portfolio / Work", url: "/work" },
        { title: "Our Team", url: "/team" },
        { title: "Privacy Policy", url: "/privacy" },
        { title: "Terms of Service", url: "/terms" }
      ];
      try {
        const res = await getAllPages();
        if (res.success && res.pages) {
          const fetchedList = res.pages.map((p: any) => ({
            title: p.title,
            url: p.slug === 'home' ? '/' : `/${p.slug}`
          }));
          const combined = [...defaultPages];
          fetchedList.forEach((item: any) => {
            if (!combined.some(c => c.url === item.url)) {
              combined.push(item);
            }
          });
          setAvailablePages(combined);

          // Update existing links custom state
          setLinks(prev => prev.map(link => ({
            ...link,
            isCustom: link.url ? !combined.some(p => p.url === link.url) : false
          })));
        } else {
          setAvailablePages(defaultPages);
        }
      } catch (e) {
        setAvailablePages(defaultPages);
      }
    };
    fetchPages();
  }, []);

  const addLink = () => {
    setLinks([...links, { label: "", url: "", relationship: "Related", isCustom: false }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof InternalLink, value: any) => {
    const newLinks = [...links];
    (newLinks[index] as any)[field] = value;
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
      const cleanedLinks = links.map(({ label, url, relationship }) => ({
        label,
        url,
        relationship
      }));
      const result = await updateInternalLinks(slug, cleanedLinks);
      if (result.success) {
        setSavedLinks(cleanedLinks);
        toast.success("Navigation links updated successfully");
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
    <div className="space-y-8 glass p-6 sm:p-10 rounded-[2.5rem] border border-stroke shadow-premium relative overflow-hidden grain">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.03] rounded-full blur-3xl -z-10" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tighter">Navigation <span className="text-brand">Links.</span></h2>
          <p className="text-[10px] font-bold uppercase text-text-muted">Manage links and page relationships for search visibility.</p>
        </div>
        <button 
          type="button"
          onClick={addLink}
          className="px-6 h-12 rounded-xl border border-brand/20 bg-brand/5 text-brand text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-brand hover:text-white transition-all shadow-sm w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Navigation Link
        </button>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-stroke rounded-[2rem] space-y-4 bg-white/50">
            <LinkIcon size={40} className="mx-auto text-stroke animate-pulse" strokeWidth={1} />
            <p className="text-[10px] font-bold uppercase text-text-muted">No navigation links configured for this page.</p>
          </div>
        ) : (
          links.map((link, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end bg-white/50 p-6 rounded-2xl border border-stroke group hover:border-brand/30 transition-all">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-brand ml-2">Label</label>
                  <input 
                    value={link.label || ''} 
                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                    placeholder="e.g. View Our Services" 
                    className="input-field shadow-sm bg-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[9px] font-bold uppercase text-brand">Endpoint URL</label>
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = [...links];
                        newLinks[index].isCustom = !newLinks[index].isCustom;
                        newLinks[index].url = '';
                        setLinks(newLinks);
                      }}
                      className="text-[8px] font-bold uppercase text-brand hover:underline"
                    >
                      {link.isCustom ? "Select Page" : "Type Custom URL"}
                    </button>
                  </div>
                  {link.isCustom ? (
                    <input 
                      value={link.url || ''} 
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      placeholder="e.g. /custom-route or https://..." 
                      className="input-field shadow-sm bg-white" 
                    />
                  ) : (
                    <select
                      value={link.url || ''}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      className="input-field shadow-sm bg-white cursor-pointer"
                    >
                      <option value="">-- Select Destination Page --</option>
                      {availablePages.map((p) => (
                        <option key={p.url} value={p.url}>
                          {p.title} ({p.url})
                        </option>
                      ))}
                      {!availablePages.some(p => p.url === link.url) && link.url && (
                        <option value={link.url}>
                          {link.url}
                        </option>
                      )}
                    </select>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-brand ml-2">Link Category</label>
                  <select 
                    value={link.relationship || 'Related'} 
                    onChange={(e) => updateLink(index, 'relationship', e.target.value)}
                    className="input-field shadow-sm bg-white appearance-none cursor-pointer"
                  >
                    <option value="Primary">Main Navigation</option>
                    <option value="Related">Related Article</option>
                    <option value="Service">Service Page</option>
                    <option value="CaseStudy">Case Study</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pb-1 pt-2 lg:pt-0">
                <button type="button" onClick={() => moveLink(index, 'up')} className="p-3 bg-surface rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"><MoveUp size={16} /></button>
                <button type="button" onClick={() => moveLink(index, 'down')} className="p-3 bg-surface rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"><MoveDown size={16} /></button>
                <button type="button" onClick={() => removeLink(index)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {links.length > 0 && (
        <div className="pt-8 border-t border-stroke flex justify-end">
           <button 
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className={`px-10 h-16 rounded-[2rem] bg-brand text-white shadow-premium text-[10px] font-bold uppercase flex items-center gap-3 transition-all hover:scale-105 ${isSaving ? 'opacity-50 grayscale' : ''} w-full sm:w-auto justify-center`}
           >
             <Save size={18} /> {isSaving ? "Saving Links..." : "Save Navigation Links"}
           </button>
        </div>
      )}
    </div>
  );
});

export default InternalLinksEditor;
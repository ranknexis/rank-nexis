"use client";

import { addSection, deleteSection, reorderSections, updatePageSeo, updatePageStatus, updateSection } from '@/actions/pages';
import {
   AlertCircle,
   ArrowDown,
   ArrowUp,
   CheckCircle2,
   ChevronLeft,
   Eye,
   Layers,
   Link as LinkIcon,
   Plus,
   Save,
   Settings2,
   X,
   Copy,
   Zap,
   Layout,
   Type,
   Image as ImageIcon,
   Grid,
   HelpCircle,
   Mail as MailIcon,
   Table as TableIcon,
   Terminal
} from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import InternalLinksEditor from './InternalLinksEditor';
import SectionEditor from './SectionEditor';
import SeoEditor from './SeoEditor';
import { motion, AnimatePresence } from 'framer-motion';

interface PageEditorProps {
  initialPage: any;
}

const MODULE_TYPES = [
  { id: 'hero', label: 'Hero Node', desc: 'Main entry point with primary CTA', icon: Zap },
  { id: 'text_block', label: 'Brief / Text', desc: 'Strategic copy and typography', icon: Type },
  { id: 'text_image', label: 'Visual Sync', desc: 'Copy paired with high-impact imagery', icon: ImageIcon },
  { id: 'features_grid', label: 'Utility Grid', desc: 'Grid of core value propositions', icon: Grid },
  { id: 'icon_cards', label: 'Expert Cards', desc: 'Icon-based service descriptions', icon: Layout },
  { id: 'stats_strip', label: 'Metric Strip', desc: 'Hard data and performance numbers', icon: Terminal },
  { id: 'faq', label: 'Knowledge Base', desc: 'Dynamic FAQ architecture', icon: HelpCircle },
  { id: 'newsletter', label: 'Intel Opt-in', desc: 'Lead capture and newsletter sync', icon: MailIcon },
  { id: 'table', label: 'Data Matrix', desc: 'Pricing or comparison tables', icon: TableIcon },
  { id: 'services_grid', label: 'Service Hub', desc: 'Comprehensive service overview', icon: Layers }
];

export default function PageEditor({ initialPage }: PageEditorProps) {
  const [page, setPage] = useState(initialPage);
  const [activeTab, setActiveTab] = useState<'seo' | 'sections' | 'links'>('sections');
  const [isPending, startTransition] = useTransition();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveSeo = async () => {
    startTransition(async () => {
      const result = await updatePageSeo(page.slug, page);
      if (result.success) {
        toast.success("SEO settings deployed successfully");
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleToggleStatus = async () => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    startTransition(async () => {
      const result = await updatePageStatus(page.slug, newStatus);
      if (result.success) {
        setPage({ ...page, status: newStatus });
        toast.success(`Node status set to ${newStatus.toUpperCase()}`);
      }
    });
  };

  const handleAddSection = async (type: string) => {
    startTransition(async () => {
      const result = await addSection(page.id, {
        label: `New ${type.replace('_', ' ')} Module`,
        sectionType: type,
        content: {}
      });
      if (result.success) {
        setPage({ ...page, sections: [...page.sections, result.section] });
        setShowAddModal(false);
        toast.success("New module forged");
      }
    });
  };

  const handleCloneSection = async (section: any) => {
    startTransition(async () => {
      const result = await addSection(page.id, {
        label: `${section.label} (Copy)`,
        sectionType: section.sectionType,
        content: section.content
      });
      if (result.success) {
        setPage({ ...page, sections: [...page.sections, result.section] });
        toast.success("Module duplicated successfully");
      }
    });
  };

  const handleDeleteSection = async (id: string) => {
     if (!confirm("Decommission this module?")) return;
     const result = await deleteSection(id);
     if (result.success) {
        setPage({ ...page, sections: page.sections.filter((s: any) => s.id !== id) });
        toast.success("Module terminated");
     }
  };

  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
     const newSections = [...page.sections];
     const targetIndex = direction === 'up' ? index - 1 : index + 1;
     if (targetIndex < 0 || targetIndex >= newSections.length) return;

     [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
     
     setPage({ ...page, sections: newSections });
     await reorderSections(page.id, newSections.map(s => s.id));
     toast.success("Page flow synchronized");
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <Link 
            href="/dashboard/pages" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-brand hover:gap-3 transition-all"
          >
            <ChevronLeft size={14} /> Back to Nodes list
          </Link>
          <div className="flex items-center gap-4">
             <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">
                Edit <span className="text-brand">{page.title}.</span>
             </h1>
             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border shadow-sm ${page.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {page.status}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleToggleStatus}
             className="px-6 h-14 rounded-xl border border-stroke bg-white text-[10px] font-bold uppercase text-text-muted hover:bg-surface transition-all flex items-center gap-3"
           >
              {page.status === 'published' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              {page.status === 'published' ? 'Draft Mode' : 'Publish Node'}
           </button>
           <Link 
             href={page.slug === 'home' ? '/' : `/${page.slug}`} 
             target="_blank"
             className="px-6 h-14 rounded-xl border border-stroke bg-white text-[10px] font-bold uppercase text-text-muted hover:bg-surface transition-all flex items-center gap-3"
           >
              <Eye size={16} /> Live Preview
           </Link>
           <button 
             onClick={activeTab === 'seo' ? handleSaveSeo : undefined}
             disabled={isPending}
             className={`px-10 h-14 rounded-xl bg-brand text-white shadow-xl shadow-brand/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all ${isPending ? 'opacity-50 grayscale' : ''}`}
           >
              <Save size={18} /> {isPending ? 'Syncing...' : 'Deploy Changes'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* SIDEBAR TABS */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-white rounded-[3rem] p-4 border border-stroke shadow-sm sticky top-10">
              <button 
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all ${activeTab === 'sections' ? 'bg-brand text-white shadow-2xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <Layers size={22} />
                 <span className="text-[11px] font-black uppercase tracking-wider">Page Architecture</span>
              </button>
              <button 
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all mt-3 ${activeTab === 'seo' ? 'bg-brand text-white shadow-2xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <Settings2 size={22} />
                 <span className="text-[11px] font-black uppercase tracking-wider">SEO Engine</span>
              </button>
              <button 
                onClick={() => setActiveTab('links')}
                className={`w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all mt-3 ${activeTab === 'links' ? 'bg-brand text-white shadow-2xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <LinkIcon size={22} />
                 <span className="text-[11px] font-black uppercase tracking-wider">Strategic Links</span>
              </button>
           </div>

           <div className="p-10 bg-brand/[0.03] rounded-[3rem] border border-brand/10 space-y-5">
              <div className="flex items-center gap-3">
                 <Zap size={16} className="text-brand" />
                 <p className="text-[10px] font-black uppercase text-brand tracking-widest">Growth Tip</p>
              </div>
              <p className="text-[12px] font-medium text-text-secondary leading-relaxed opacity-80">
                 Page modules are synchronized in real-time. SEO and Link configurations require manual deployment to live nodes.
              </p>
           </div>
        </div>

        {/* MAIN EDITOR AREA */}
        <div className="lg:col-span-3 min-h-[600px]">
           {activeTab === 'seo' && (
              <SeoEditor 
                data={page} 
                onChange={(newData) => setPage({ ...page, ...newData })} 
                slug={page.slug}
              />
           )}
           
           {activeTab === 'sections' && (
              <div className="space-y-12">
                 <div className="flex justify-between items-center bg-white p-10 rounded-[3rem] border border-stroke shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.02] rounded-full blur-[80px] -z-10" />
                    <div>
                       <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Architecture</h2>
                       <p className="text-[10px] font-bold uppercase text-text-muted mt-2 tracking-widest">Active Modules: {page.sections.length}</p>
                    </div>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="bg-black text-white px-10 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                       <Plus size={20} /> Forge Module
                    </button>
                 </div>

                 <div className="space-y-10">
                    {page.sections.map((section: any, index: number) => (
                       <div key={section.id} className="relative group">
                          <div className="absolute -left-14 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all">
                             <button onClick={() => handleMoveSection(index, 'up')} className="w-10 h-10 bg-white border border-stroke rounded-xl shadow-sm flex items-center justify-center text-text-muted hover:text-brand transition-all"><ArrowUp size={16} /></button>
                             <button onClick={() => handleMoveSection(index, 'down')} className="w-10 h-10 bg-white border border-stroke rounded-xl shadow-sm flex items-center justify-center text-text-muted hover:text-brand transition-all"><ArrowDown size={16} /></button>
                             <div className="h-px w-6 bg-stroke mx-auto" />
                             <button onClick={() => handleCloneSection(section)} className="w-10 h-10 bg-white border border-stroke rounded-xl shadow-sm flex items-center justify-center text-text-muted hover:text-brand transition-all" title="Duplicate Module"><Copy size={16} /></button>
                          </div>
                          <SectionEditor 
                            section={section} 
                            onUpdate={async (newContent) => {
                               const result = await updateSection(section.id, newContent);
                               if (result.success) {
                                  toast.success(`${section.label} optimized`);
                                }
                            }}
                            onDelete={() => handleDeleteSection(section.id)}
                          />
                       </div>
                    ))}
                    {page.sections.length === 0 && (
                      <div className="p-24 border-2 border-dashed border-stroke rounded-[4rem] flex flex-col items-center justify-center gap-6 bg-surface/30">
                         <div className="w-20 h-20 rounded-full bg-white border border-stroke flex items-center justify-center text-text-muted">
                            <Layers size={32} strokeWidth={1} />
                         </div>
                         <p className="text-[11px] font-black uppercase text-text-muted tracking-[0.2em]">Start building this page node.</p>
                         <button 
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary"
                          >
                             Initialize First Module
                          </button>
                      </div>
                    )}
                 </div>
              </div>
           )}

           {activeTab === 'links' && (
              <InternalLinksEditor 
                slug={page.slug} 
                initialLinks={page.internalLinks as any[]} 
              />
           )}
        </div>
      </div>

      {/* Forge Module Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                className="relative w-full max-w-4xl bg-white rounded-[4rem] border border-stroke shadow-3xl overflow-hidden"
              >
                 <div className="p-12 md:p-16 space-y-12">
                    <div className="flex justify-between items-center">
                       <div>
                          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Forge Module</h2>
                          <p className="text-xs font-bold uppercase text-brand mt-3 tracking-widest">Select architecture type for new deployment</p>
                       </div>
                       <button 
                         onClick={() => setShowAddModal(false)}
                         className="p-4 bg-surface border border-stroke rounded-2xl text-text-muted hover:text-brand hover:rotate-90 transition-all"
                       >
                          <X size={24} />
                       </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                       {MODULE_TYPES.map(type => (
                         <button 
                           key={type.id}
                           onClick={() => handleAddSection(type.id)}
                           className="flex items-start gap-6 p-8 bg-surface border border-stroke rounded-[2rem] text-left hover:border-brand hover:bg-brand/[0.02] hover:-translate-y-1 transition-all group"
                         >
                            <div className="w-16 h-16 rounded-2xl bg-white border border-stroke flex items-center justify-center text-text-muted group-hover:text-brand group-hover:border-brand/30 transition-all shrink-0">
                               <type.icon size={28} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                               <p className="text-base font-black uppercase tracking-tight text-text-primary leading-none">{type.label}</p>
                               <p className="text-[11px] font-medium text-text-muted leading-relaxed">{type.desc}</p>
                            </div>
                         </button>
                       ))}
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-6 border-t border-stroke">
                       <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Custom components available via technical sync.</p>
                    </div>
                 </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

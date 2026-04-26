"use client";

import { useState, useTransition } from 'react';
import { 
  Save, 
  ChevronLeft, 
  Eye, 
  Settings2, 
  Layers, 
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updatePageSeo, updatePageStatus, updateSection } from '@/actions/pages';
import SeoEditor from './SeoEditor';
import SectionEditor from './SectionEditor';
import InternalLinksEditor from './InternalLinksEditor';

interface PageEditorProps {
  initialPage: any;
}

export default function PageEditor({ initialPage }: PageEditorProps) {
  const [page, setPage] = useState(initialPage);
  const [activeTab, setActiveTab] = useState<'seo' | 'sections' | 'links'>('sections');
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <Link 
            href="/admin/pages" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-brand hover:gap-3 transition-all"
          >
            <ChevronLeft size={14} /> Back to Nodes list
          </Link>
          <div className="flex items-center gap-4">
             <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
                Edit <span className="text-brand">{page.title}.</span>
             </h1>
             <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase border ${page.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
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
              Set to {page.status === 'published' ? 'Draft' : 'Publish'}
           </button>
           <Link 
             href={page.slug === 'home' ? '/' : `/${page.slug}`} 
             target="_blank"
             className="px-6 h-14 rounded-xl border border-stroke bg-white text-[10px] font-bold uppercase text-text-muted hover:bg-surface transition-all flex items-center gap-3"
           >
              <Eye size={16} /> Preview
           </Link>
           <button 
             onClick={activeTab === 'seo' ? handleSaveSeo : undefined}
             disabled={isPending}
             className={`px-10 h-14 rounded-xl bg-brand text-white shadow-xl shadow-brand/20 text-[10px] font-bold uppercase flex items-center gap-3 hover:scale-105 transition-all ${isPending ? 'opacity-50 grayscale' : ''}`}
           >
              <Save size={16} /> {isPending ? 'Deploying...' : 'Deploy Changes'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* SIDEBAR TABS */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-white rounded-[2.5rem] p-4 border border-stroke shadow-sm sticky top-10">
              <button 
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] transition-all ${activeTab === 'sections' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <Layers size={20} />
                 <span className="text-[11px] font-bold uppercase">Page Modules</span>
              </button>
              <button 
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] transition-all mt-2 ${activeTab === 'seo' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <Settings2 size={20} />
                 <span className="text-[11px] font-bold uppercase">SEO Engine</span>
              </button>
              <button 
                onClick={() => setActiveTab('links')}
                className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] transition-all mt-2 ${activeTab === 'links' ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-text-muted hover:bg-surface'}`}
              >
                 <LinkIcon size={20} />
                 <span className="text-[11px] font-bold uppercase">Internal Linking</span>
              </button>
           </div>

           <div className="p-8 bg-brand/5 rounded-[2.5rem] border border-brand/10 space-y-4">
              <p className="text-[9px] font-bold uppercase text-brand">Client Tip</p>
              <p className="text-[11px] font-medium text-text-secondary leading-relaxed">
                 You are using a high-performance CMS node. Changes to "Modules" save individually per section, while SEO changes require "Deploy Changes".
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
              <div className="space-y-10">
                 {page.sections.map((section: any) => (
                    <SectionEditor 
                      key={section.id} 
                      section={section} 
                      onUpdate={async (newContent) => {
                         const result = await updateSection(section.id, newContent);
                         if (result.success) {
                            toast.success(`${section.label} optimized`);
                         }
                      }}
                    />
                 ))}
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
    </div>
  );
}


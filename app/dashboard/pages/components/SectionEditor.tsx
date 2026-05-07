"use client";

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  Save,
  Zap,
  Type,
  List,
  BarChart3,
  HelpCircle,
  FileText,
  Table as TableIcon,
  Grid,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Target,
  Award,
  Star,
  Phone
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import RepeaterField from './RepeaterField';
import CloudinaryUpload from '../../components/CloudinaryUpload';

interface SectionEditorProps {
  section: any;
  onUpdate: (content: any) => Promise<void>;
  onDelete?: () => void;
}

export default function SectionEditor({ section, onUpdate, onDelete }: SectionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(section.content || {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(content);
    setIsSaving(false);
  };

  const updateField = (key: string, value: any) => {
    setContent({ ...content, [key]: value });
  };

  const renderForm = () => {
    switch (section.sectionType) {
      case 'hero':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge Text</label>
                <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" placeholder="e.g. Expert Agency" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading (Main)</label>
                <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" placeholder="e.g. Results Driven" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent (Colorized)</label>
                <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" placeholder="e.g. Digital Agency" />
             </div>
             <div className="space-y-4 md:col-span-2">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Subtext</label>
                <textarea rows={3} value={content.subtext || ''} onChange={(e) => updateField('subtext', e.target.value)} className="input-field h-auto py-6 resize-none" placeholder="Enter hero subtext..." />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">CTA Text</label>
                <input type="text" value={content.ctaText || ''} onChange={(e) => updateField('ctaText', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">CTA Link</label>
                <input type="text" value={content.ctaLink || ''} onChange={(e) => updateField('ctaLink', e.target.value)} className="input-field" />
             </div>
             <div className="md:col-span-2">
                <CloudinaryUpload 
                  label="Hero Background / Side Image"
                  value={content.imageUrl || ''} 
                  onChange={(url) => updateField('imageUrl', url)} 
                />
             </div>
          </div>
        );

      case 'text_block':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RichTextEditor 
                label="Main Body Content"
                value={content.body || ''} 
                onChange={(val) => updateField('body', val)} 
             />
          </div>
        );

      case 'stats_strip':
        return (
          <RepeaterField 
            label="Statistical Metrics"
            items={content.items || []}
            onChange={(items) => updateField('items', items)}
            newItemDefault={{ label: "Metric Name", value: "0", icon: "Zap" }}
            renderItem={(item, index, update) => (
               <div className="grid grid-cols-3 gap-6">
                  <input type="text" value={item.label} onChange={(e) => update({ label: e.target.value })} className="input-field" placeholder="Label" />
                  <input type="text" value={item.value} onChange={(e) => update({ value: e.target.value })} className="input-field" placeholder="Value" />
                  <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Lucide Icon" />
               </div>
            )}
          />
        );

      case 'faq':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Questions & Answers"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ question: "What is your process?", answer: "We follow a data-driven approach..." }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <input type="text" value={item.question} onChange={(e) => update({ question: e.target.value })} className="input-field" placeholder="Question" />
                     <textarea rows={3} value={item.answer} onChange={(e) => update({ answer: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Answer" />
                  </div>
               )}
             />
          </div>
        );

      case 'legal_content':
        return (
          <RepeaterField 
            label="Legal Sections"
            items={content.sections || []}
            onChange={(sections) => updateField('sections', sections)}
            newItemDefault={{ heading: "Section Heading", body: "Section body text..." }}
            renderItem={(item, index, update) => (
               <div className="space-y-4">
                  <input type="text" value={item.heading} onChange={(e) => update({ heading: e.target.value })} className="input-field" placeholder="Heading" />
                  <RichTextEditor value={item.body} onChange={(val) => update({ body: val })} />
               </div>
            )}
          />
        );

      case 'text_image':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent</label>
                   <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" />
                </div>
                   <CloudinaryUpload 
                     label="Section Image (Cloudinary)"
                     value={content.imageUrl || ''} 
                     onChange={(url) => updateField('imageUrl', url)} 
                   />
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RichTextEditor 
                label="Body Content"
                value={content.body || ''} 
                onChange={(val) => updateField('body', val)} 
             />
             <RepeaterField 
               label="Floating Stats (Optional)"
               items={content.stats || []}
               onChange={(stats) => updateField('stats', stats)}
               newItemDefault={{ label: "Growth", value: "200%" }}
               renderItem={(item, index, update) => (
                  <div className="grid grid-cols-2 gap-6">
                     <input type="text" value={item.label} onChange={(e) => update({ label: e.target.value })} className="input-field" placeholder="Label" />
                     <input type="text" value={item.value} onChange={(e) => update({ value: e.target.value })} className="input-field" placeholder="Value" />
                  </div>
               )}
             />
          </div>
        );

      case 'features_grid':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent</label>
                   <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Features / Service Items"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "New Feature", description: "Description goes here...", icon: "Zap" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Lucide Icon" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'icon_cards':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Icon Cards"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "Strategic Value", description: "Details...", icon: "Award" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Lucide Icon" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'table':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Table Rows"
               items={content.rows || []}
               onChange={(rows) => updateField('rows', rows)}
               newItemDefault={{ industry: "New Industry", specialty: "Specialized service details..." }}
               renderItem={(item, index, update) => (
                  <div className="grid grid-cols-2 gap-6">
                     <input type="text" value={item.industry} onChange={(e) => update({ industry: e.target.value })} className="input-field" placeholder="Industry/Category" />
                     <input type="text" value={item.specialty} onChange={(e) => update({ specialty: e.target.value })} className="input-field" placeholder="Specialty/Details" />
                  </div>
               )}
             />
          </div>
        );

      case 'services_grid':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent</label>
                   <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Service Items"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "Service Title", description: "Short description...", icon: "Zap", link: "#" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-3 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Icon (Lucide)" />
                        <input type="text" value={item.link} onChange={(e) => update({ link: e.target.value })} className="input-field" placeholder="Link (Optional)" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'newsletter':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4 md:col-span-2">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Subtext</label>
                <textarea rows={2} value={content.subtext || ''} onChange={(e) => updateField('subtext', e.target.value)} className="input-field h-auto py-6 resize-none" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Button Text</label>
                <input type="text" value={content.buttonText || ''} onChange={(e) => updateField('buttonText', e.target.value)} className="input-field" />
             </div>
          </div>
        );

      case 'trust':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Trust Logos"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ name: "Partner", logo: "" }}
               renderItem={(item, index, update) => (
                  <div className="grid grid-cols-2 gap-6">
                     <input type="text" value={item.name} onChange={(e) => update({ name: e.target.value })} className="input-field" placeholder="Name" />
                     <CloudinaryUpload value={item.logo} onChange={(url) => update({ logo: url })} label="Logo" />
                  </div>
               )}
             />
          </div>
        );

      case 'expertise':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Expertise Cards"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "Expertise Title", description: "Details...", icon: "Sparkles", value: "99%" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-3 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Icon" />
                        <input type="text" value={item.value} onChange={(e) => update({ value: e.target.value })} className="input-field" placeholder="Value (e.g. 99%)" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'partnership':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Process Steps"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ step: "01", title: "Strategy", description: "Analysis phase..." }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <input type="text" value={item.step} onChange={(e) => update({ step: e.target.value })} className="input-field" placeholder="Step #" />
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'strategy':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Strategic Points"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "Data Analytics", description: "Market research...", icon: "Target" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Icon" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'excellence':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Label</label>
                   <input type="text" value={content.label || ''} onChange={(e) => updateField('label', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
             </div>
             <RepeaterField 
               label="Benchmarks / Points"
               items={content.items || []}
               onChange={(items) => updateField('items', items)}
               newItemDefault={{ title: "Quality Control", description: "Rigorous testing...", icon: "Award" }}
               renderItem={(item, index, update) => (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-6">
                        <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                        <input type="text" value={item.icon} onChange={(e) => update({ icon: e.target.value })} className="input-field" placeholder="Icon" />
                     </div>
                     <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
                  </div>
               )}
             />
          </div>
        );

      case 'testimonials':
        return (
          <div className="p-10 bg-brand/[0.03] rounded-3xl border-2 border-dashed border-brand/20 text-center space-y-6">
             <div className="w-16 h-16 bg-white rounded-2xl border border-brand/10 flex items-center justify-center text-brand mx-auto shadow-sm">
                <Star size={32} />
             </div>
             <h3 className="text-xl font-black uppercase tracking-tight">Feedback Loop Sync</h3>
             <p className="text-[11px] font-bold uppercase text-text-muted leading-relaxed max-w-sm mx-auto">
                This module automatically synchronizes with the dynamic **Feedback Hub**. Manage all testimonials centrally in the global feedback manager.
             </p>
             <div className="grid grid-cols-2 gap-10 text-left mt-8">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Section Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" placeholder="e.g. Expert Feedback" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Section Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" placeholder="e.g. Global Synergy" />
                </div>
             </div>
          </div>
        );

      case 'pillar_01':
      case 'pillar_02':
      case 'pillar_03':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent</label>
                   <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" />
                </div>
             </div>
          </div>
        );

      case 'tech_stack':
        return (
          <div className="space-y-10">
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                   <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                   <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
                </div>
                <div className="space-y-4">
                   <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading Accent</label>
                   <input type="text" value={content.headingAccent || ''} onChange={(e) => updateField('headingAccent', e.target.value)} className="input-field" />
                </div>
             </div>
          </div>
        );

      case 'growth_stats':
        return (
          <RepeaterField 
            label="Strategic Ops Items"
            items={content.items || []}
            onChange={(items) => updateField('items', items)}
            newItemDefault={{ title: "New Item", description: "Details..." }}
            renderItem={(item, index, update) => (
               <div className="space-y-4">
                  <input type="text" value={item.title} onChange={(e) => update({ title: e.target.value })} className="input-field" placeholder="Title" />
                  <textarea rows={2} value={item.description} onChange={(e) => update({ description: e.target.value })} className="input-field h-auto py-4 resize-none" placeholder="Description" />
               </div>
            )}
          />
        );

      case 'connect':

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Badge</label>
                <input type="text" value={content.badge || ''} onChange={(e) => updateField('badge', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Heading</label>
                <input type="text" value={content.heading || ''} onChange={(e) => updateField('heading', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4 md:col-span-2">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Subtext</label>
                <textarea rows={2} value={content.subtext || ''} onChange={(e) => updateField('subtext', e.target.value)} className="input-field h-auto py-6 resize-none" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Email</label>
                <input type="text" value={content.email || ''} onChange={(e) => updateField('email', e.target.value)} className="input-field" />
             </div>
             <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase text-brand ml-4">Phone</label>
                <input type="text" value={content.phone || ''} onChange={(e) => updateField('phone', e.target.value)} className="input-field" />
             </div>
          </div>
        );

      default:
        return (
          <div className="p-10 bg-surface/30 rounded-3xl border-2 border-dashed border-stroke text-center">
             <p className="text-[10px] font-bold uppercase text-text-muted">Editor for type "{section.sectionType}" is being programmed. <br /> You can edit raw JSON if needed.</p>
             <textarea 
               value={JSON.stringify(content, null, 2)} 
               onChange={(e) => {
                 try { updateField('raw', JSON.parse(e.target.value)); } catch(e) {}
               }}
               className="mt-6 w-full h-48 bg-black text-emerald-400 font-mono text-[10px] p-6 rounded-2xl"
             />
          </div>
        );
    }
  };

  const IconMap: any = {
    hero: Zap,
    text_block: Type,
    text_image: Eye,
    features_grid: List,
    icon_cards: Layers,
    stats_strip: BarChart3,
    faq: HelpCircle,
    legal_content: FileText,
    newsletter: CheckCircle2,
    table: TableIcon,
    services_grid: Grid,
    trust: ShieldCheck,
    expertise: Sparkles,
    partnership: RefreshCw,
    strategy: Target,
    excellence: Award,
    testimonials: Star,
    connect: Phone,
  };
  const Icon = IconMap[section.sectionType] || Layers;

  return (
    <div className={`bg-white rounded-[2.5rem] border border-stroke shadow-sm overflow-hidden transition-all duration-500 ${isOpen ? 'ring-2 ring-brand ring-offset-4' : ''}`}>
       <div 
         onClick={() => setIsOpen(!isOpen)}
         className={`p-6 md:p-8 flex justify-between items-center cursor-pointer transition-colors ${isOpen ? 'bg-surface/50 border-b border-stroke' : 'hover:bg-surface/30'}`}
       >
          <div className="flex items-center gap-6">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-surface text-text-muted border border-stroke'}`}>
                <Icon size={24} />
             </div>
             <div>
                <p className="text-[9px] font-bold uppercase text-brand mb-1">Module: {section.sectionType}</p>
                <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary">{section.label}</h3>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             {!section.isVisible && (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
                   <EyeOff size={10} />
                   <span className="text-[8px] font-bold uppercase">Hidden</span>
                </div>
             )}
             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-text-muted transition-transform duration-500 ${isOpen ? 'rotate-180 bg-surface' : ''}`}>
                <ChevronDown size={20} />
             </div>
          </div>
       </div>

       {isOpen && (
          <div className="p-8 md:p-12 space-y-10 animation-fade-in relative">
             <div className="absolute top-0 right-12 translate-y-[-50%] z-20">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`bg-brand text-white px-8 h-12 rounded-xl text-[10px] font-bold uppercase flex items-center gap-3 shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all ${isSaving ? 'opacity-50' : ''}`}
                >
                   <Save size={16} /> {isSaving ? 'Optimizing...' : 'Save Module'}
                </button>
             </div>
             
             {renderForm()}

             <div className="pt-10 border-t border-stroke flex justify-between items-center">
                <p className="text-[9px] font-bold uppercase text-text-muted">Last updated {new Date(section.updatedAt).toLocaleTimeString()}</p>
                <div className="flex gap-4">
                   <button className="text-[9px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Duplicate Module</button>
                   <button 
                     onClick={onDelete}
                     className="text-[9px] font-bold uppercase text-red-500 hover:opacity-80 transition-opacity"
                   >
                     Remove Module
                   </button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
}


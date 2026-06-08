"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Plus, 
  X, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Target, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Sparkles,
  HelpCircle,
  FileText,
  TrendingUp,
  Users,
  Search,
  Palette,
  Globe,
  Code2,
  BarChart,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { createService, updateService, deleteService } from "@/actions/services";
import { motion } from "framer-motion";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import UnsavedChangesWarning from "../../components/UnsavedChangesWarning";
import RichTextEditor from "@/dashboard/pages/components/RichTextEditor";
import RecommendationsEditor from "../../components/RecommendationsEditor";

interface Props {
  initialData?: any;
  initialPageData?: any;
  allServices?: any[];
  allBlogs?: any[];
  allCaseStudies?: any[];
}

export default function ServiceEditor({ 
  initialData, 
  initialPageData,
  allServices = [],
  allBlogs = [],
  allCaseStudies = []
}: Props) {
  const router = useRouter();

  const [recommendations, setRecommendations] = useState<any[]>(() => {
    return initialData?.recommendations || [];
  });

  const SELECTABLE_ICONS = [
    { name: "Zap", icon: Zap },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "Users", icon: Users },
    { name: "Search", icon: Search },
    { name: "Palette", icon: Palette },
    { name: "Layers", icon: Layers },
    { name: "Globe", icon: Globe },
    { name: "Code2", icon: Code2 },
    { name: "BarChart", icon: BarChart },
    { name: "ShieldCheck", icon: ShieldCheck }
  ];

  const [data, setData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        icon: initialData.icon || "Zap",
        active: initialData.active !== undefined ? initialData.active : true,
      };
    }
    return {
      title: "",
      slug: "",
      description: "",
      category: "MARKETING",
      features: [""],
      order: 0,
      icon: "Zap",
      active: true,
    };
  });
  const [loading, setLoading] = useState(false);

  // Initialize subItems state
  const [subItems, setSubItems] = useState<any[]>(() => {
    if (initialPageData?.sections) {
      const filtered = initialPageData.sections.filter(
        (sec: any) => sec.sectionType === "text_block" || sec.sectionType === "text_image"
      );
      if (filtered.length > 0) {
        return filtered.map((sec: any) => {
          const content = sec.content || {};
          const tags = content.tags || [];
          const tagsString = tags
            .map((t: any) => (typeof t === "string" ? t : t.text || ""))
            .filter(Boolean)
            .join(", ");
          return {
            label: content.label || "Core Expertise",
            title: content.title || content.heading || "",
            body: content.body || content.text || "",
            imageUrl: content.imageUrl || content.image || "",
            tagsString: tagsString
          };
        });
      }
    }
    return [{ label: "Core Expertise", title: "", body: "", imageUrl: "", tagsString: "" }];
  });

  // Initialize industries state
  const [industries, setIndustries] = useState(() => {
    const tableSection = initialPageData?.sections?.find((sec: any) => sec.sectionType === "table");
    if (tableSection) {
      return {
        heading: tableSection.content?.heading || "Industries We Work On",
        rows: tableSection.content?.rows || []
      };
    }
    return {
      heading: "Industries We Work On",
      rows: [
        { industry: "E-Commerce & Retail", specialty: "Revenue Scaling & Customer Retention" },
        { industry: "SaaS & Tech Startups", specialty: "Lead Generation & Product Traction" },
        { industry: "Healthcare & FinTech", specialty: "Compliance-Driven Customer Acquisition" }
      ]
    };
  });

  const [isDirty, setIsDirty] = useState(false);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    setIsDirty(true);
  }, [data, subItems, industries, recommendations]);

  useEffect(() => {
    if (!initialData && data.title) {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setData((prev: any) => ({ ...prev, slug }));
    }
  }, [data.title, initialData]);

  const handleSave = async () => {
    if (!data.title || !data.slug) {
      toast.error("Please enter both a Title and Slug.");
      return;
    }

    setLoading(true);

    // Clean tag strings to arrays and keep raw HTML content
    const cleanedSubItems = subItems
      .filter((item: any) => item.title.trim() !== "")
      .map((item: any) => ({
        label: item.label || "Core Expertise",
        title: item.title,
        body: item.body || "",
        imageUrl: item.imageUrl,
        tags: item.tagsString
          ? item.tagsString.split(",").map((t: string) => ({ text: t.trim() })).filter((t: any) => t.text !== "")
          : []
      }));

    // Process industries rows
    const cleanedIndustries = {
      heading: industries.heading,
      rows: industries.rows.filter((r: any) => r.industry.trim() !== "")
    };

    const cleanedData = {
      ...data,
      features: data.features.filter((f: string) => f.trim() !== ""),
      subItems: cleanedSubItems,
      industries: cleanedIndustries,
      recommendations
    };

    const res = initialData?.id 
      ? await updateService(initialData.id, cleanedData)
      : await createService(cleanedData);
    
    setLoading(false);
    if (res.success) {
      setIsDirty(false);
      toast.success(initialData?.id ? "Service updated successfully" : "Service created successfully");
      router.push("/dashboard/services");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to save service");
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteService(initialData.id);
    if (res.success) {
      setIsDirty(false);
      toast.success("Service deleted successfully");
      router.push("/dashboard/services");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete service");
    }
  };

  const addFeature = () => {
    setData({
      ...data,
      features: [...data.features, ""]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = value;
    setData({ ...data, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...data.features];
    newFeatures.splice(index, 1);
    setData({ ...data, features: newFeatures });
  };

  // Sub-items management helpers
  const addSubItem = () => {
    setSubItems([...subItems, { label: "Core Expertise", title: "", body: "", imageUrl: "", tagsString: "" }]);
  };

  const updateSubItem = (index: number, field: string, value: any) => {
    const newItems = [...subItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSubItems(newItems);
  };

  const removeSubItem = (index: number) => {
    const newItems = [...subItems];
    newItems.splice(index, 1);
    setSubItems(newItems);
  };

  // Industries management helpers
  const addIndustryRow = () => {
    setIndustries({
      ...industries,
      rows: [...industries.rows, { industry: "", specialty: "" }]
    });
  };

  const updateIndustryRow = (index: number, field: string, value: string) => {
    const newRows = [...industries.rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setIndustries({ ...industries, rows: newRows });
  };

  const removeIndustryRow = (index: number) => {
    const newRows = [...industries.rows];
    newRows.splice(index, 1);
    setIndustries({ ...industries, rows: newRows });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <UnsavedChangesWarning isDirty={isDirty} isBusy={loading} />

      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-2xl border border-stroke p-4 shadow-sm space-y-2.5">
            <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full h-11 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <Save size={16} /> {loading ? "Syncing..." : "Save Service"}
            </button>
            
            <Link 
              href={loading ? "#" : "/dashboard/services"} 
              onClick={loading ? (e) => e.preventDefault() : undefined}
              className={`w-full h-11 bg-white border border-stroke text-text-muted rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-surface transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <ArrowLeft size={16} /> Cancel
            </Link>

            {initialData?.id && (
              <>
                <Link 
                  href={loading ? "#" : `/dashboard/pages/services/${initialData.slug}`}
                  onClick={loading ? (e) => e.preventDefault() : undefined}
                  className={`w-full h-11 bg-white border border-brand/20 text-brand rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand/[0.02] transition-all flex items-center justify-center gap-2 mt-2 text-center ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <Layers size={16} /> Edit Page Content
                </Link>
                
                <button 
                  onClick={() => setDeleteConfirmOpen(true)}
                  disabled={loading}
                  className={`w-full h-11 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-all flex items-center justify-center gap-2 mt-2 ${loading ? 'opacity-50' : ''}`}
                >
                  <Trash2 size={16} /> Delete Service
                </button>
              </>
            )}
        </div>

        <div className="p-4 bg-brand/[0.03] rounded-xl border border-brand/10 space-y-2">
           <div className="flex items-center gap-2">
              <Zap size={14} className="text-brand" />
              <p className="text-xs font-bold uppercase text-brand tracking-wider">Service Guidelines</p>
           </div>
           <p className="text-[11px] font-medium text-text-muted leading-relaxed">
              Services define the core offerings of RankNexis. Sub-items represent individual sections on the detail page, and industries serve as the market support grid.
           </p>
        </div>
      </div>

      <fieldset disabled={loading} className="lg:col-span-9 space-y-6 border-0 p-0 m-0 w-full disabled:opacity-75">
         {/* Service Details Section */}
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-2 pb-2 border-b border-stroke/50">
               <ShieldCheck size={16} className="text-brand" />
               <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Service Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Service Title</label>
                  <input 
                    type="text" 
                    value={data.title} 
                    onChange={e => setData({...data, title: e.target.value})}
                    placeholder="E.G. TECHNICAL SEO AUDIT"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Global Slug (URL)</label>
                  <input 
                    type="text" 
                    value={data.slug} 
                    onChange={e => setData({...data, slug: e.target.value})}
                    placeholder="E.G. TECHNICAL-SEO-AUDIT"
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all lowercase"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Market Category</label>
                  <select 
                    value={data.category} 
                    onChange={e => setData({...data, category: e.target.value})}
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight appearance-none cursor-pointer"
                  >
                    <option value="MARKETING">Marketing & Growth</option>
                    <option value="CREATIVE">Creative & Design</option>
                    <option value="SOFTWARE">Development & Software</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Display Order</label>
                  <input 
                    type="number" 
                    value={data.order} 
                    onChange={e => setData({...data, order: parseInt(e.target.value) || 0})}
                    className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 flex flex-col justify-end">
                  <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider mb-2">Service Status</label>
                  <button 
                    type="button"
                    onClick={() => setData({ ...data, active: !data.active })}
                    className={`flex items-center gap-3 px-4 h-11 border rounded-xl font-bold text-xs transition-all ${
                      data.active 
                        ? "bg-emerald-50/50 border-emerald-200 text-emerald-600" 
                        : "bg-red-50/50 border-red-100 text-red-500"
                    }`}
                  >
                    {data.active ? (
                      <>
                        <Eye size={16} />
                        <span>ACTIVE / PUBLICLY VISIBLE</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={16} />
                        <span>INACTIVE / HIDDEN FROM CLIENTS</span>
                      </>
                    )}
                  </button>
               </div>
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider block">Service Icon Selection</label>
               <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {SELECTABLE_ICONS.map((item) => {
                     const IconComponent = item.icon;
                     const isSelected = data.icon === item.name;
                     return (
                        <button
                           key={item.name}
                           type="button"
                           onClick={() => setData({ ...data, icon: item.name })}
                           className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all group hover:scale-[1.02] active:scale-95 ${
                              isSelected
                                 ? "bg-brand/5 border-brand text-brand shadow-sm font-bold"
                                 : "bg-surface border-stroke text-text-muted hover:border-stroke-dark hover:text-text-primary"
                           }`}
                        >
                           <IconComponent size={20} className={`mb-1.5 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-115'}`} />
                           <span className="text-[9px] uppercase tracking-wider font-extrabold">{item.name}</span>
                        </button>
                     );
                  })}
               </div>
            </div>

            <div className="space-y-2">
               <RichTextEditor 
                 value={data.description} 
                 onChange={val => setData({...data, description: val})}
                 label="Service Overview (Impact Summary)"
                 placeholder="Describe the strategic impact of this service..."
               />
            </div>
         </div>

         {/* Core Value Features Section */}
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stroke/50">
               <div className="flex items-center gap-2">
                  <Layers size={16} className="text-brand" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Core Value Features</h2>
               </div>
               <button 
                 onClick={addFeature}
                 className="px-4 h-11 bg-brand text-white text-xs font-bold rounded-xl shadow-md uppercase flex items-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all"
               >
                 <Plus size={16} /> Add Feature
               </button>
            </div>
            
            <div className="space-y-3">
               {data.features.map((feature: string, idx: number) => (
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className="flex gap-3 items-center group"
                 >
                    <div className="w-11 h-11 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                       <Target size={16} />
                    </div>
                    <input 
                      type="text"
                      value={feature}
                      onChange={e => updateFeature(idx, e.target.value)}
                      placeholder="FEATURE DESCRIPTION..."
                      className="flex-grow h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold outline-none focus:border-brand transition-all uppercase text-text-primary"
                    />
                    <button 
                      onClick={() => removeFeature(idx)}
                      className="w-11 h-11 bg-surface border border-stroke rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
                    >
                      <X size={16} />
                    </button>
                 </motion.div>
               ))}
               {data.features.length === 0 && (
                 <div className="py-10 border border-dashed border-stroke rounded-xl text-center">
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No value features defined.</p>
                 </div>
               )}
            </div>
         </div>

         {/* Sub Items / Sub categories sections */}
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stroke/50">
               <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="text-brand" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Service Sub-Items (Detail Sections)</h2>
               </div>
               <button 
                 onClick={addSubItem}
                 className="px-4 h-11 bg-brand text-white text-xs font-bold rounded-xl shadow-md uppercase flex items-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all"
               >
                 <Plus size={16} /> Add Sub-Item
               </button>
            </div>

            <div className="space-y-6 divide-y divide-stroke/60">
              {subItems.map((item: any, idx: number) => (
                <div key={idx} className="pt-6 first:pt-0 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-extrabold uppercase text-brand tracking-wider">Sub-Item #{idx + 1}</span>
                    {subItems.length > 1 && (
                      <button 
                        onClick={() => removeSubItem(idx)}
                        className="px-3 py-1.5 border border-red-100 text-red-500 hover:bg-red-50 text-[10px] font-bold rounded-lg uppercase flex items-center gap-1 transition-all"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase text-text-muted px-1 tracking-wider">Sub-item Title</label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={e => updateSubItem(idx, "title", e.target.value)}
                        placeholder="E.G. TECHNICAL SITE AUDITS"
                        className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase text-text-muted px-1 tracking-wider">Badge Label (e.g. Core Expertise)</label>
                      <input 
                        type="text" 
                        value={item.label || ""} 
                        onChange={e => updateSubItem(idx, "label", e.target.value)}
                        placeholder="E.G. CORE EXPERTISE"
                        className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase text-text-muted px-1 tracking-wider">Checklist Tags (Comma Separated)</label>
                      <input 
                        type="text" 
                        value={item.tagsString} 
                        onChange={e => updateSubItem(idx, "tagsString", e.target.value)}
                        placeholder="E.G. SPEED AUDITS, SSL VERIFICATION, REDIRECT MAPS"
                        className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <RichTextEditor 
                      value={item.body} 
                      onChange={val => updateSubItem(idx, "body", val)}
                      label="Sub-item Details / Paragraph / Summary"
                      placeholder="Describe this specialty in detail..."
                    />
                  </div>

                  <div className="bg-surface/40 p-4 rounded-xl border border-stroke/60">
                    <CloudinaryUpload 
                      value={item.imageUrl} 
                      onChange={url => updateSubItem(idx, "imageUrl", url)} 
                      label="Sub-Item Featured Section Image"
                    />
                  </div>
                </div>
              ))}
            </div>
         </div>

         {/* Industries served table rows */}
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-stroke/50">
               <div className="flex items-center gap-2">
                  <TableIcon size={16} className="text-brand" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Industries We Work On</h2>
               </div>
               <button 
                 onClick={addIndustryRow}
                 className="px-4 h-11 bg-brand text-white text-xs font-bold rounded-xl shadow-md uppercase flex items-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all"
               >
                 <Plus size={16} /> Add Industry
               </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-text-muted px-1 tracking-wider">Section Heading</label>
                <input 
                  type="text" 
                  value={industries.heading} 
                  onChange={e => setIndustries({ ...industries, heading: e.target.value })}
                  placeholder="E.G. INDUSTRIES WE SERVE"
                  className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand transition-all uppercase tracking-tight"
                />
              </div>

              <div className="space-y-3">
                {industries.rows.map((row: any, idx: number) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-surface/30 p-3 rounded-xl border border-stroke"
                  >
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                      <input 
                        type="text"
                        value={row.industry}
                        onChange={e => updateIndustryRow(idx, "industry", e.target.value)}
                        placeholder="INDUSTRY / CATEGORY (E.G. E-COMMERCE)"
                        className="h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold outline-none focus:border-brand transition-all uppercase text-text-primary w-full"
                      />
                      <input 
                        type="text"
                        value={row.specialty}
                        onChange={e => updateIndustryRow(idx, "specialty", e.target.value)}
                        placeholder="SPECIALTY & FOCUS (E.G. REVENUE SCALING)"
                        className="h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold outline-none focus:border-brand transition-all uppercase text-text-primary w-full"
                      />
                    </div>
                    <button 
                      onClick={() => removeIndustryRow(idx)}
                      className="w-11 h-11 bg-white border border-stroke rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shrink-0 self-end md:self-auto"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
                {industries.rows.length === 0 && (
                  <div className="py-8 border border-dashed border-stroke rounded-xl text-center">
                     <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No industries defined. This section is optional.</p>
                  </div>
                )}
              </div>
            </div>
         </div>

         {/* Recommendations / Related Content */}
         <div className="bg-white rounded-2xl border border-stroke shadow-sm p-5 sm:p-6 space-y-6">
            <div className="pb-2 border-b border-stroke/50">
               <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Related Recommendations</h2>
               <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Recommend specific services, blog posts, or case studies on the detail page.</p>
            </div>
            <RecommendationsEditor 
              value={recommendations}
              onChange={setRecommendations}
              allServices={allServices}
              allBlogs={allBlogs}
              allCaseStudies={allCaseStudies}
            />
         </div>
      </fieldset>
      
      <ConfirmationModal 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service?"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

import ConfirmationModal from "../../components/ConfirmationModal";

"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Star, 
    Trash2, 
    Edit2, 
    CheckCircle2, 
    AlertCircle,
    Quote,
    User,
    Building2,
    Save,
    X,
    Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { addTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/feedback";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import ConfirmationModal from "../../components/ConfirmationModal";

interface FeedbackListProps {
  initialTestimonials: any[];
}

export default function FeedbackList({ initialTestimonials }: FeedbackListProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
    rating: 5,
    status: "published"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      image: "",
      rating: 5,
      status: "published"
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.content) {
      toast.error("Name and feedback content are required");
      return;
    }

    startTransition(async () => {
      const result = await addTestimonial(formData);
      if (result.success) {
        setTestimonials([result.testimonial, ...testimonials]);
        toast.success("Feedback loops synced successfully");
        resetForm();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleUpdate = async (id: string) => {
    startTransition(async () => {
      const result = await updateTestimonial(id, formData);
      if (result.success) {
        setTestimonials(testimonials.map(t => t.id === id ? result.testimonial : t));
        toast.success("Testimonial optimized");
        resetForm();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleDelete = async () => {
    if (!deleteConfirm.id) return;
    startTransition(async () => {
      const result = await deleteTestimonial(deleteConfirm.id!);
      if (result.success) {
        setTestimonials(testimonials.filter(t => t.id !== deleteConfirm.id));
        toast.success("Feedback decommissioned");
        setDeleteConfirm({ isOpen: false, id: null });
      } else {
        toast.error(result.error);
      }
    });
  };

  const startEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || "",
      company: testimonial.company || "",
      content: testimonial.content,
      image: testimonial.image || "",
      rating: testimonial.rating || 5,
      status: testimonial.status || "published"
    });
    setShowAddForm(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-end">
        {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary h-14 px-8 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-premium"
            >
                <Plus size={18} /> Sync New Feedback
            </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-[2.5rem] border border-stroke p-8 md:p-12 shadow-premium relative overflow-hidden grain"
          >
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/5 text-brand flex items-center justify-center">
                        <Sparkles size={20} />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight">
                        {editingId ? "Optimize Loop" : "Initialize Feedback Sync"}
                    </h2>
                </div>
                <button onClick={resetForm} className="text-text-muted hover:text-brand transition-colors">
                    <X size={24} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-4 flex items-center gap-2">
                    <User size={12} /> Client Identity
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field" 
                  placeholder="Full Name" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-4 flex items-center gap-2">
                    <Building2 size={12} /> Role / Corporate
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="input-field" 
                      placeholder="e.g. CEO" 
                    />
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="input-field" 
                      placeholder="e.g. Google" 
                    />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-4 flex items-center gap-2">
                    <Quote size={12} /> Strategic Feedback
                </label>
                <textarea 
                  rows={4} 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="input-field h-auto py-6 resize-none" 
                  placeholder="The impact of our partnership..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-4">Visual Asset (Avatar)</label>
                <CloudinaryUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({...formData, image: url})} 
                  label="Upload Profile" 
                />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-4">Rating & Status</label>
                 <div className="grid grid-cols-2 gap-4">
                    <select 
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                        className="input-field"
                    >
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="input-field"
                    >
                        <option value="published">Live / Published</option>
                        <option value="draft">Draft / Internal</option>
                    </select>
                 </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end gap-4">
                <button 
                  onClick={resetForm}
                  className="btn-outline h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => editingId ? handleUpdate(editingId) : handleAdd()}
                  disabled={isPending}
                  className="btn-primary h-14 px-12 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-premium"
                >
                  <Save size={18} /> {editingId ? "Deploy Optimization" : "Deploy Feedback"}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
            <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] border border-stroke p-8 flex flex-col justify-between hover:shadow-premium transition-all group relative overflow-hidden grain"
            >
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-1 text-brand">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${t.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-surface text-text-muted'}`}>
                            {t.status}
                        </span>
                    </div>

                    <p className="text-sm font-bold text-text-primary leading-relaxed line-clamp-4 italic">
                        "{t.content}"
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-stroke/50">
                        {t.image ? (
                            <img src={t.image} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={t.name} />
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-text-muted">
                                <User size={20} />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-black uppercase tracking-tight">{t.name}</p>
                            <p className="text-[9px] font-bold uppercase text-text-muted">{t.role} {t.company && `@ ${t.company}`}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <button 
                        onClick={() => startEdit(t)}
                        className="flex-1 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-brand hover:border-brand/30 transition-all"
                    >
                        <Edit2 size={12} /> Edit
                    </button>
                    <button 
                        onClick={() => setDeleteConfirm({ isOpen: true, id: t.id })}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </motion.div>
        ))}

        {testimonials.length === 0 && !showAddForm && (
            <div className="col-span-full py-24 text-center bg-surface/30 rounded-[3rem] border-2 border-dashed border-stroke">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-text-muted mx-auto mb-6 shadow-sm">
                    <Star size={40} className="opacity-20" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-text-muted">No Feedback Sync Records</h3>
                <p className="text-[10px] font-bold uppercase text-text-muted/60 mt-2">Initialize your first client feedback loop above.</p>
            </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Decommission Feedback"
        message="Are you sure you want to terminate this client testimonial from the global hub?"
        confirmText="Decommission"
      />
    </div>
  );
}

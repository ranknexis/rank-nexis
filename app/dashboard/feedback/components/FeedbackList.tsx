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
          toast.success("Feedback added successfully");
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
          toast.success("Feedback updated");
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
          toast.success("Feedback deleted");
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

      <div className="flex justify-end">
        {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary h-12 px-6 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md"
            >
                <Plus size={18} /> Add Feedback
            </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 shadow-premium relative overflow-hidden grain"
          >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand/5 text-brand flex items-center justify-center">
                        <Star size={18} />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">
                        {editingId ? "Edit Feedback" : "Add New Feedback"}
                    </h2>
                </div>
                <button onClick={resetForm} className="text-text-muted hover:text-brand transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand flex items-center gap-1.5 uppercase">
                    <User size={12} /> Client Name
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field h-11 text-xs" 
                  placeholder="Full Name" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand flex items-center gap-1.5 uppercase">
                    <Building2 size={12} /> Role & Company
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="input-field h-11 text-xs" 
                      placeholder="e.g. CEO" 
                    />
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="input-field h-11 text-xs" 
                      placeholder="e.g. Google" 
                    />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-brand flex items-center gap-1.5 uppercase">
                    <Quote size={12} /> Feedback Content
                </label>
                <textarea 
                  rows={3} 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="input-field h-24 py-3 resize-none text-xs" 
                  placeholder="The impact of our partnership..." 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand uppercase">Profile Image</label>
                <CloudinaryUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({...formData, image: url})} 
                  label="Upload Profile" 
                />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-brand uppercase">Rating & Status</label>
                 <div className="grid grid-cols-2 gap-3">
                    <select 
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                        className="input-field h-11 text-xs"
                    >
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="input-field h-11 text-xs"
                    >
                        <option value="published">Live / Published</option>
                        <option value="draft">Draft / Internal</option>
                    </select>
                 </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={resetForm}
                  className="btn-outline h-10 px-5 rounded-xl text-[9px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => editingId ? handleUpdate(editingId) : handleAdd()}
                  disabled={isPending}
                  className="btn-primary h-10 px-5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md"
                >
                  <Save size={16} /> {editingId ? "Save Changes" : "Save Feedback"}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
            <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-stroke p-5 flex flex-col justify-between hover:shadow-premium transition-all group relative overflow-hidden grain"
            >
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-1 text-brand">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${t.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-surface text-text-muted'}`}>
                            {t.status}
                        </span>
                    </div>

                    <p className="text-xs font-bold text-text-primary leading-relaxed line-clamp-4 italic">
                        "{t.content}"
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-stroke/50">
                        {t.image ? (
                            <img src={t.image} className="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={t.name} />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-text-muted">
                                <User size={16} />
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-black uppercase tracking-tight">{t.name}</p>
                            <p className="text-[9px] font-bold uppercase text-text-muted">{t.role} {t.company && `@ ${t.company}`}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex gap-2">
                    <button 
                        onClick={() => startEdit(t)}
                        className="flex-1 h-9 rounded-lg bg-surface border border-stroke flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-brand hover:border-brand/30 transition-all"
                    >
                        <Edit2 size={10} /> Edit
                    </button>
                    <button 
                        onClick={() => setDeleteConfirm({ isOpen: true, id: t.id })}
                        className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </motion.div>
        ))}

        {testimonials.length === 0 && !showAddForm && (
            <div className="col-span-full py-16 text-center bg-surface/30 rounded-2xl border-2 border-dashed border-stroke">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-text-muted mx-auto mb-4 shadow-sm">
                    <Star size={32} className="opacity-20" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-text-muted">No Feedback Found</h3>
                <p className="text-xs text-text-muted mt-1.5">Add your first client testimonial above.</p>
            </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Feedback"
        message="Are you sure you want to delete this client testimonial?"
        confirmText="Delete"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Edit2, ExternalLink, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteCaseStudy } from "@/actions/work";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function WorkList({ initialStudies }: { initialStudies: any[] }) {
    const [studies, setStudies] = useState(initialStudies);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudies = studies.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.client && s.client.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

    const handleDelete = async () => {
        if (!deleteConfirm.id) return;
        
        const res = await deleteCaseStudy(deleteConfirm.id);
        if (res.success) {
            setStudies(studies.filter(s => s.id !== deleteConfirm.id));
            toast.success("Case study deleted successfully.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
            <div className="p-6 border-b border-stroke flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface/30">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Search case studies..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 bg-white border border-stroke rounded-xl pl-12 pr-4 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-brand transition-all" 
                    />
                </div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Total records: <span className="text-brand">{filteredStudies.length}</span></p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-text-muted">Project</th>
                            <th className="w-48 px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-text-muted">Client</th>
                            <th className="w-44 px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-text-muted">Date</th>
                            <th className="w-36 px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredStudies.map((study: any) => (
                            <tr key={study.id} className="group">
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-16 h-12 rounded-xl bg-surface border border-stroke overflow-hidden shrink-0 shadow-inner">
                                            {study.image ? (
                                                <img src={study.image} alt="" className="w-full h-full object-cover transition-all" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-text-muted"><ExternalLink size={14} /></div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors truncate">{study.title}</p>
                                            <p className="text-[10px] font-bold uppercase text-text-muted truncate">Slug: {study.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <span className="text-[10px] font-bold uppercase text-text-muted">{study.client || 'N/A'}</span>
                                </td>
                                <td className="px-8 py-5 text-[10px] font-bold uppercase text-text-muted whitespace-nowrap transition-colors group-hover:bg-surface/30">
                                    {new Date(study.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right transition-colors group-hover:bg-surface/30">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link 
                                            href={`/dashboard/work/${study.id}`} 
                                            className="p-2.5 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Edit2 size={14} />
                                        </Link>
                                        <button 
                                            type="button"
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: study.id })}
                                            className="p-2.5 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all text-text-muted hover:text-red-500 shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredStudies.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[9px] tracking-wider">No case studies found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal 
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Delete Case Study"
                message="Are you sure you want to permanently delete this case study? This action is irreversible."
                confirmText="Delete"
            />
        </div>
    );
}

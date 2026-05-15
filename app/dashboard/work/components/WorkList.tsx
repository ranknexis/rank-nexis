"use client";

import { useState } from "react";
import { Edit2, ExternalLink, MoreVertical, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteCaseStudy } from "@/actions/work";

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
            toast.success("Case study deleted.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
            <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Filter case studies..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
                    />
                </div>
                <p className="text-[9px] font-bold uppercase text-text-muted">Total records: <span className="text-brand">{filteredStudies.length}</span></p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Project</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Client</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Date</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredStudies.map((study: any) => (
                            <tr key={study.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg bg-surface border border-stroke overflow-hidden shrink-0">
                                            {study.image ? (
                                                <img src={study.image} alt="" className="w-full h-full object-cover transition-all" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-text-muted"><ExternalLink size={16} /></div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{study.title}</p>
                                            <p className="text-[10px] font-bold uppercase text-text-muted">Slug: {study.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-bold uppercase text-text-muted">{study.client || 'N/A'}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-bold uppercase text-text-muted">{new Date(study.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/dashboard/work/${study.id}`} className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Edit2 size={16} /></Link>
                                        <button 
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: study.id })}
                                            className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredStudies.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-10 py-24 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No case studies found matching your search.</p>
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
                message="Are you sure you want to remove this project from the Registry? This action is immutable."
                confirmText="Delete"
            />
        </div>
    );
}

import ConfirmationModal from "../../components/ConfirmationModal";

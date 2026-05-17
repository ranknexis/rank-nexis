"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Edit2, Search, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteJob } from "@/actions/careers";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function CareersList({ initialJobs }: { initialJobs: any[] }) {
    const [jobs, setJobs] = useState(initialJobs);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setJobs(initialJobs);
    }, [initialJobs]);

    const filteredJobs = jobs.filter(j => 
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

    const handleDelete = async () => {
        if (!deleteConfirm.id) return;
        const res = await deleteJob(deleteConfirm.id);
        if (res.success) {
            setJobs(jobs.filter(j => j.id !== deleteConfirm.id));
            toast.success("Job opening deleted successfully.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete job opening");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 border-b border-stroke flex justify-between items-center gap-4 bg-surface/30">
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Search jobs..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-text-muted/40" 
                    />
                </div>
                <div className="px-3.5 py-1.5 bg-brand/5 border border-brand/20 rounded-xl">
                    <p className="text-[9px] font-black uppercase text-brand tracking-widest">Active Jobs: <span className="text-text-primary ml-1.5">{jobs.filter((j: any) => j.active).length}</span></p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Job Title & Location</th>
                            <th className="w-48 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Job Type</th>
                            <th className="w-36 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Status</th>
                            <th className="w-32 px-8 py-5 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredJobs.map((job: any) => (
                            <tr key={job.id} className="group">
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div>
                                        <p className="text-sm font-bold uppercase text-text-primary group-hover:text-brand transition-colors truncate">{job.title}</p>
                                        <p className="text-[10px] font-bold uppercase text-text-muted truncate">{job.location}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <span className="text-[10px] font-bold uppercase text-text-muted">{job.type.replace('_', ' ')}</span>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div className="flex items-center gap-2">
                                        {job.active ? (
                                            <span className="flex items-center gap-2 text-[9px] font-bold uppercase text-emerald-500">
                                                <CheckCircle2 size={14} /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-[9px] font-bold uppercase text-red-500">
                                                <XCircle size={14} /> Inactive
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right transition-colors group-hover:bg-surface/30">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link 
                                            href={`/dashboard/careers/${job.id}`} 
                                            className="p-2.5 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Edit2 size={14} />
                                        </Link>
                                        <button 
                                            type="button"
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: job.id })}
                                            className="p-2.5 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all text-text-muted hover:text-red-500 shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredJobs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No job openings found matching your search.</p>
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
                title="Delete Job Opening"
                message="Are you sure you want to remove this job opening? This action cannot be undone."
                confirmText="Delete"
            />
        </div>
    );
}

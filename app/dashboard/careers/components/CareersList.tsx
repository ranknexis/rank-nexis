"use client";

import { useState } from "react";
import { CheckCircle2, Edit2, MoreVertical, Search, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteJob } from "@/actions/careers";

export default function CareersList({ initialJobs }: { initialJobs: any[] }) {
    const [jobs, setJobs] = useState(initialJobs);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredJobs = jobs.filter(j => 
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this position?")) return;
        const res = await deleteJob(id);
        if (res.success) {
            setJobs(jobs.filter(j => j.id !== id));
            toast.success("Position removed from pipeline.");
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
            <div className="p-8 border-b border-stroke flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Filter positions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
                    />
                </div>
                <p className="text-[9px] font-bold uppercase text-text-muted">Active Roles: <span className="text-brand">{jobs.filter((j: any) => j.active).length}</span></p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Job Title / Location</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Type</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Status</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredJobs.map((job: any) => (
                            <tr key={job.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-10 py-8">
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{job.title}</p>
                                        <p className="text-[10px] font-bold uppercase text-text-muted">{job.location}</p>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-bold uppercase text-text-muted">{job.type}</span>
                                </td>
                                <td className="px-10 py-8">
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
                                <td className="px-10 py-8 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/dashboard/careers/${job.id}`} className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Edit2 size={16} /></Link>
                                        <button 
                                            onClick={() => handleDelete(job.id)}
                                            className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredJobs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-10 py-24 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No job openings found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

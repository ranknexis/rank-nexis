"use client";

import { deleteService } from "@/actions/services";
import { CheckCircle2, Edit2, Search, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "../../components/ConfirmationModal";
import { stripHtml } from "@/lib/utils";

export default function ServicesList({ initialServices }: { initialServices: any[] }) {
    const [services, setServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

    const handleDelete = async () => {
        if (!deleteConfirm.id) return;
        const res = await deleteService(deleteConfirm.id);
        if (res.success) {
            setServices(services.filter(s => s.id !== deleteConfirm.id));
            toast.success("Service deleted.");
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 border-b border-stroke flex justify-between items-center gap-4 bg-surface/30">
                <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Search services..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 bg-white border border-stroke rounded-xl pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-text-muted/40" 
                    />
                </div>
                <p className="text-[9px] font-bold uppercase text-text-muted shrink-0">Total: <span className="text-brand">{filteredServices.length}</span></p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="w-24 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Order</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Service Name</th>
                            <th className="w-36 px-8 py-5 text-[10px] font-bold uppercase text-text-muted">Status</th>
                            <th className="w-32 px-8 py-5 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredServices.map((service: any) => (
                            <tr key={service.id} className="group">
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <span className="text-sm font-bold text-text-muted">#{service.order}</span>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div>
                                        <p className="text-sm font-bold uppercase text-text-primary group-hover:text-brand transition-colors truncate">{stripHtml(service.title)}</p>
                                        <p className="text-[10px] font-bold uppercase text-text-muted truncate">Slug: {service.slug}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5 transition-colors group-hover:bg-surface/30">
                                    <div className="flex items-center gap-2">
                                        {service.active ? (
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
                                            href={`/dashboard/services/${service.id}`} 
                                            className="p-2.5 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Edit2 size={14} />
                                        </Link>
                                        <button 
                                            type="button"
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: service.id })}
                                            className="p-2.5 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all text-text-muted hover:text-red-500 shadow-sm flex items-center justify-center shrink-0"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredServices.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <p className="text-text-muted font-bold uppercase text-[10px]">No services found matching your search.</p>
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
                title="Delete Service"
                message="Are you sure you want to remove this core service from the platform? This action is immutable."
                confirmText="Delete"
            />
        </div>
    );
}

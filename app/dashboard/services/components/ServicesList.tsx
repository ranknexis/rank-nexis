"use client";

import { useState } from "react";
import { CheckCircle2, Edit2, MoreVertical, Search, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteService } from "@/actions/services";

export default function ServicesList({ initialServices }: { initialServices: any[] }) {
    const [services, setServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");

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
        <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
            <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                        type="text" 
                        placeholder="Filter services..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
                    />
                </div>
                <p className="text-[9px] font-bold uppercase text-text-muted">Total services: <span className="text-brand">{filteredServices.length}</span></p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/10">
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Order</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Service Name</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Status</th>
                            <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {filteredServices.map((service: any) => (
                            <tr key={service.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-10 py-8">
                                    <span className="text-sm font-bold text-text-muted">#{service.order}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <div>
                                        <p className="text-sm font-bold uppercase text-text-primary group-hover:text-brand transition-colors">{service.title}</p>
                                        <p className="text-[10px] font-bold uppercase text-text-muted">Slug: {service.slug}</p>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
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
                                <td className="px-10 py-8 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/dashboard/services/${service.id}`} className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Edit2 size={16} /></Link>
                                        <button 
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: service.id })}
                                            className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredServices.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-10 py-24 text-center">
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

import ConfirmationModal from "../../components/ConfirmationModal";

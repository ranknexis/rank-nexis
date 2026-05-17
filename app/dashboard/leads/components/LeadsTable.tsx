"use client";

import { deleteLead, updateLeadStatus } from "@/actions/leads";
import {
  Building2,
  Calendar,
  Check,
  CheckCircle,
  Download,
  Mail,
  MessageSquare,
  Search,
  Trash2,
  X,
  Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AnimatePresence, motion } from "framer-motion";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function LeadsTable({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status.");
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null; bulk: boolean }>({
    isOpen: false,
    id: null,
    bulk: false
  });

  const handleDelete = async () => {
    if (!deleteConfirm.id && !deleteConfirm.bulk) return;
    
    if (deleteConfirm.bulk) {
        let successCount = 0;
        for (const id of selectedIds) {
          const res = await deleteLead(id);
          if (res.success) successCount++;
        }
        setLeads(leads.filter(l => !selectedIds.includes(l.id)));
        setSelectedIds([]);
        toast.success(`${successCount} leads deleted.`);
    } else {
        const res = await deleteLead(deleteConfirm.id!);
        if (res.success) {
          setLeads(leads.filter(l => l.id !== deleteConfirm.id));
          setSelectedLead(null);
          setSelectedIds(selectedIds.filter(i => i !== deleteConfirm.id));
          toast.success("Lead deleted successfully.");
        } else {
          toast.error("Failed to delete lead.");
        }
    }
    setDeleteConfirm({ isOpen: false, id: null, bulk: false });
  };

  const exportToCSV = () => {
    try {
      const headers = ["Name", "Email", "Phone", "Company", "Service", "Budget", "Message", "Status", "Date"];
      const rows = filteredLeads.map(l => [
        l.name,
        l.email,
        l.phone || "",
        l.company || "",
        l.service || "",
        l.budget || "",
        `"${l.message.replace(/"/g, '""')}"`,
        l.status,
        new Date(l.createdAt).toLocaleDateString()
      ]);

      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `ranknexis_leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Leads exported successfully.");
    } catch (err) {
      toast.error("Failed to export leads.");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stroke pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-text-primary">Sales Leads</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand/5 border border-brand/10 text-brand text-[10px] font-black tracking-wider uppercase">
              {filteredLeads.length} Leads
            </span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">View and manage contact requests and inquiries.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-56">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 bg-white border border-stroke rounded-xl pl-10 pr-4 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-brand transition-all shadow-sm" 
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 bg-white border border-stroke rounded-xl px-4 pr-8 text-[10px] font-bold uppercase tracking-wider text-text-muted focus:outline-none focus:border-brand transition-all cursor-pointer shadow-sm appearance-none"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <button 
            type="button"
            onClick={exportToCSV}
            className="h-10 px-4 bg-black hover:bg-brand text-white text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-r border-white/20 pr-6">
              <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center text-[10px] font-black">
                {selectedIds.length}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider">Leads Selected</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={() => setDeleteConfirm({ isOpen: true, id: null, bulk: true })}
                className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
              <button 
                type="button"
                onClick={() => setSelectedIds([])}
                className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                <X size={14} /> Clear selection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-stroke bg-surface/30">
                <th className="px-8 py-4 w-16">
                   <button 
                    type="button"
                    onClick={toggleSelectAll}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      selectedIds.length === filteredLeads.length && filteredLeads.length > 0
                      ? "bg-brand border-brand text-white"
                      : "border-stroke bg-white"
                    }`}
                   >
                     {selectedIds.length === filteredLeads.length && filteredLeads.length > 0 && <Check size={12} />}
                   </button>
                </th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase text-text-muted tracking-wider">Lead</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase text-text-muted tracking-wider">Contact Details</th>
                <th className="w-44 px-8 py-4 text-[10px] font-bold uppercase text-text-muted tracking-wider text-center">Status</th>
                <th className="w-36 px-8 py-4 text-[10px] font-bold uppercase text-text-muted tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={`group ${selectedIds.includes(lead.id) ? "bg-brand/[0.03]" : ""}`}>
                  <td className="px-8 py-4 transition-colors group-hover:bg-brand/[0.02]">
                    <button 
                      type="button"
                      onClick={() => toggleSelect(lead.id)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        selectedIds.includes(lead.id)
                        ? "bg-brand border-brand text-white"
                        : "border-stroke bg-white group-hover:border-brand/30"
                      }`}
                    >
                      {selectedIds.includes(lead.id) && <Check size={12} />}
                    </button>
                  </td>
                  <td className="px-8 py-4 transition-colors group-hover:bg-brand/[0.02]">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-stroke shadow-sm flex items-center justify-center text-brand font-black text-sm uppercase shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors truncate">{lead.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                           <Building2 size={10} className="text-text-muted shrink-0" />
                           <p className="text-[10px] font-bold uppercase text-text-muted truncate">
                             {lead.company || "Individual"}
                           </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 transition-colors group-hover:bg-brand/[0.02]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 group/link cursor-pointer" onClick={() => window.location.href = `mailto:${lead.email}`}>
                         <Mail size={12} className="text-brand shrink-0" />
                         <p className="text-xs font-bold text-text-primary group-hover/link:text-brand transition-colors truncate">{lead.email}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <Calendar size={10} className="text-text-muted shrink-0" />
                         <p className="text-[9px] font-bold uppercase text-text-muted">Captured {new Date(lead.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 transition-colors group-hover:bg-brand/[0.02] text-center">
                    <div className="inline-block">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase border cursor-pointer focus:outline-none transition-all shadow-sm ${
                            lead.status === "NEW" 
                            ? "bg-brand/10 text-brand border-brand/20" 
                            : lead.status === "CONTACTED"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : lead.status === "QUALIFIED"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-surface text-text-muted border-stroke"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right transition-colors group-hover:bg-brand/[0.02]">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 bg-white border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl transition-all text-text-muted hover:text-white shadow-sm flex items-center justify-center shrink-0"
                      >
                        <Zap size={14} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDeleteConfirm({ isOpen: true, id: lead.id, bulk: false })}
                        className="p-2 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all text-text-muted hover:text-red-500 shadow-sm flex items-center justify-center shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                     <div className="flex flex-col items-center gap-2">
                        <Search size={32} className="text-stroke" />
                        <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No matching leads found.</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedLead(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-2xl border border-stroke shadow-2xl overflow-hidden"
             >
                <div className="p-5 sm:p-6 space-y-5">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center font-black text-xl uppercase shadow-lg shadow-brand/10 shrink-0">
                           {selectedLead.name[0]}
                        </div>
                        <div className="space-y-0.5">
                           <h2 className="text-2xl font-extrabold uppercase tracking-tight text-text-primary leading-tight">{selectedLead.name}</h2>
                           <div className="flex items-center gap-2">
                              <Building2 size={12} className="text-brand shrink-0" />
                              <p className="text-xs font-bold text-text-muted">{selectedLead.company || "Individual"}</p>
                           </div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedLead(null)}
                        className="p-2 bg-surface border border-stroke rounded-xl text-text-muted hover:text-brand hover:rotate-90 transition-all shrink-0"
                      >
                         <X size={18} />
                      </button>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-stroke">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-brand tracking-wider flex items-center gap-1.5">
                            <Mail size={10} /> Email Address
                         </p>
                         <p className="text-xs font-bold text-text-primary break-all">{selectedLead.email}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-brand tracking-wider flex items-center gap-1.5">
                            <Zap size={10} /> Service
                         </p>
                         <p className="text-xs font-bold text-text-primary uppercase">{selectedLead.service || "General Inquiry"}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-brand tracking-wider flex items-center gap-1.5">
                            <Calendar size={10} /> Date Received
                         </p>
                         <p className="text-xs font-bold text-text-primary">
                            {new Date(selectedLead.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                         </p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <p className="text-[9px] font-black uppercase text-brand tracking-wider flex items-center gap-2">
                            <MessageSquare size={12} /> Message Details
                         </p>
                         <div className="px-2.5 py-0.5 bg-brand/5 border border-brand/20 rounded-full text-[9px] font-black uppercase text-brand">INQUIRY</div>
                      </div>
                      <div className="bg-surface p-6 rounded-xl border border-stroke relative shadow-inner min-h-[100px] max-h-[180px] overflow-y-auto">
                         <p className="text-sm font-medium leading-relaxed text-text-secondary italic">
                            "{selectedLead.message}"
                         </p>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-stroke">
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                         <button 
                          type="button"
                          onClick={() => handleStatusChange(selectedLead.id, "CONTACTED")}
                          className="h-10 px-4 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 hover:bg-zinc-800 transition-all shadow-md"
                         >
                            <CheckCircle size={14} /> Contacted
                         </button>
                         <button 
                          type="button"
                          onClick={() => handleStatusChange(selectedLead.id, "QUALIFIED")}
                          className="h-10 px-4 bg-white border border-stroke text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 hover:bg-surface transition-all"
                         >
                            <Zap size={14} className="text-brand" /> Qualified
                         </button>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 border border-brand/10 rounded-xl w-full sm:w-auto justify-center shrink-0">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                         <span className="text-[9px] font-bold text-brand uppercase tracking-wider">Lead Details</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal 
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, bulk: false })}
        onConfirm={handleDelete}
        title={deleteConfirm.bulk ? "Bulk Deletion" : "Delete Lead"}
        message={deleteConfirm.bulk ? `Are you sure you want to delete the ${selectedIds.length} selected leads?` : "Are you sure you want to delete this lead? This action is irreversible."}
        confirmText="Delete"
      />
    </div>
  );
}

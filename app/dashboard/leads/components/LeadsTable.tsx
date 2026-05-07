"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLead } from "@/actions/leads";
import { toast } from "sonner";
import { 
  ExternalLink, 
  Mail, 
  MoreVertical, 
  Search, 
  Trash2, 
  User, 
  Building2, 
  Calendar,
  X,
  CheckCircle,
  Clock,
  MessageSquare,
  Phone,
  Zap,
  Filter,
  ArrowUpRight,
  Download,
  Check
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    const res = await deleteLead(id);
    if (res.success) {
      setLeads(leads.filter(l => l.id !== id));
      setSelectedLead(null);
      setSelectedIds(selectedIds.filter(i => i !== id));
      toast.success("Lead eliminated from registry");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} leads?`)) return;
    let successCount = 0;
    for (const id of selectedIds) {
      const res = await deleteLead(id);
      if (res.success) successCount++;
    }
    setLeads(leads.filter(l => !selectedIds.includes(l.id)));
    setSelectedIds([]);
    toast.success(`${successCount} nodes purged from system.`);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Service", "Status", "Date"];
    const rows = filteredLeads.map(l => [
      l.name,
      l.email,
      l.phone || "",
      l.company || "",
      l.service || "",
      l.status,
      new Date(l.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ranknexis_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Intelligence report exported.");
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-[2rem] border border-stroke p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search Intelligence..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 bg-surface/50 border border-stroke rounded-2xl pl-16 pr-6 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="h-14 px-6 bg-white border border-stroke rounded-2xl flex items-center gap-3 text-[10px] font-bold uppercase hover:border-brand hover:text-brand transition-all shadow-sm"
          >
            <Download size={16} /> Export
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
           {["ALL", "NEW", "CONTACTED", "QUALIFIED", "ARCHIVED"].map(status => (
             <button
               key={status}
               onClick={() => setStatusFilter(status)}
               className={`px-6 h-14 rounded-2xl text-[10px] font-black uppercase transition-all whitespace-nowrap border ${
                 statusFilter === status 
                   ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" 
                   : "bg-white text-text-muted border-stroke hover:border-brand/30"
               }`}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-r border-white/20 pr-8">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Nodes Selected</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBulkDelete}
                className="flex items-center gap-2 text-[10px] font-bold uppercase text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} /> Purge
              </button>
              <button 
                onClick={() => setSelectedIds([])}
                className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/60 hover:text-white transition-colors"
              >
                <X size={16} /> Deselect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2.5rem] border border-stroke overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/30">
                <th className="px-10 py-8 w-20">
                   <button 
                    onClick={toggleSelectAll}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      selectedIds.length === filteredLeads.length && filteredLeads.length > 0
                      ? "bg-brand border-brand text-white"
                      : "border-stroke bg-white"
                    }`}
                   >
                     {selectedIds.length === filteredLeads.length && filteredLeads.length > 0 && <Check size={14} />}
                   </button>
                </th>
                <th className="px-10 py-8 text-[10px] font-black uppercase text-text-muted tracking-widest">Lead Intelligence</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase text-text-muted tracking-widest">Contact Node</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase text-text-muted tracking-widest text-center">Status</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={`hover:bg-brand/[0.02] transition-colors group ${selectedIds.includes(lead.id) ? "bg-brand/[0.03]" : ""}`}>
                  <td className="px-10 py-10">
                    <button 
                      onClick={() => toggleSelect(lead.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        selectedIds.includes(lead.id)
                        ? "bg-brand border-brand text-white"
                        : "border-stroke bg-white group-hover:border-brand/30"
                      }`}
                    >
                      {selectedIds.includes(lead.id) && <Check size={14} />}
                    </button>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-stroke shadow-sm flex items-center justify-center text-brand font-black text-xl uppercase group-hover:border-brand/30 transition-all">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-base font-black uppercase tracking-tighter text-text-primary group-hover:text-brand transition-colors">{lead.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                           <Building2 size={12} className="text-text-muted" />
                           <p className="text-[10px] font-bold uppercase text-text-muted">
                             {lead.company || "Independent Node"}
                           </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 group/link cursor-pointer" onClick={() => window.location.href = `mailto:${lead.email}`}>
                         <Mail size={14} className="text-brand" />
                         <p className="text-[11px] font-bold text-text-primary uppercase group-hover/link:text-brand transition-colors">{lead.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <Calendar size={12} className="text-text-muted" />
                         <p className="text-[10px] font-bold uppercase text-text-muted">Captured {new Date(lead.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                     <div className="flex justify-center">
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase border cursor-pointer focus:outline-none transition-all shadow-sm ${
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
                  <td className="px-10 py-10 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="p-4 bg-white border border-stroke hover:bg-brand hover:text-white rounded-xl transition-all text-text-muted shadow-sm flex items-center gap-2 text-[10px] font-bold uppercase"
                      >
                        <Zap size={16} /> Analyze
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-4 bg-white border border-red-100 hover:bg-red-500 hover:text-white rounded-xl transition-all text-red-400 shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="group-hover:hidden">
                       <ArrowUpRight size={18} className="text-stroke ml-auto" />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                     <div className="flex flex-col items-center gap-4">
                        <Search size={48} className="text-stroke" />
                        <p className="text-[11px] font-black uppercase text-text-muted tracking-widest">No matching intelligence nodes found.</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedLead(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 40 }}
               className="relative w-full max-w-3xl bg-white rounded-[4rem] border border-stroke shadow-3xl overflow-hidden"
             >
                <div className="p-12 md:p-16 space-y-12">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-brand text-white flex items-center justify-center font-black text-3xl uppercase shadow-2xl shadow-brand/20">
                           {selectedLead.name[0]}
                        </div>
                        <div className="space-y-1">
                           <h2 className="text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">{selectedLead.name}</h2>
                           <div className="flex items-center gap-3">
                              <Building2 size={14} className="text-brand" />
                              <p className="text-xs font-bold uppercase text-text-muted tracking-wider">{selectedLead.company || "Independent Entity"}</p>
                           </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="p-4 bg-surface border border-stroke rounded-2xl text-text-muted hover:text-brand hover:rotate-90 transition-all"
                      >
                         <X size={24} />
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-stroke">
                      <div className="space-y-4">
                         <p className="text-[10px] font-black uppercase text-brand tracking-widest flex items-center gap-2">
                            <Mail size={12} /> Transmission Node
                         </p>
                         <p className="text-sm font-bold text-text-primary">{selectedLead.email}</p>
                      </div>
                      <div className="space-y-4">
                         <p className="text-[10px] font-black uppercase text-brand tracking-widest flex items-center gap-2">
                            <Zap size={12} /> Strategic Service
                         </p>
                         <p className="text-sm font-bold text-text-primary uppercase">{selectedLead.service || "General Growth"}</p>
                      </div>
                      <div className="space-y-4">
                         <p className="text-[10px] font-black uppercase text-brand tracking-widest flex items-center gap-2">
                            <Calendar size={12} /> Reception Date
                         </p>
                         <p className="text-sm font-bold text-text-primary">
                            {new Date(selectedLead.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                         </p>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-black uppercase text-brand tracking-widest flex items-center gap-3">
                            <MessageSquare size={14} /> Core Brief / Intelligence
                         </p>
                         <div className="px-4 py-1.5 bg-brand/5 border border-brand/20 rounded-full text-[9px] font-black uppercase text-brand">High Priority</div>
                      </div>
                      <div className="bg-surface p-10 rounded-[3rem] border border-stroke relative">
                         <div className="absolute -top-4 -left-4 w-10 h-10 bg-white border border-stroke rounded-xl flex items-center justify-center italic text-brand text-2xl font-serif">"</div>
                         <p className="text-lg font-medium leading-relaxed text-text-secondary italic antialiased">
                            {selectedLead.message}
                         </p>
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8">
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                         <button 
                          onClick={() => handleStatusChange(selectedLead.id, "CONTACTED")}
                          className="h-14 px-8 bg-black text-white text-[10px] font-black uppercase rounded-2xl flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl"
                         >
                            <CheckCircle size={18} /> Initiate Contact
                         </button>
                         <button 
                          onClick={() => handleStatusChange(selectedLead.id, "QUALIFIED")}
                          className="h-14 px-8 bg-white border border-stroke text-[10px] font-black uppercase rounded-2xl flex items-center gap-3 hover:bg-surface transition-all"
                         >
                            <Zap size={18} className="text-brand" /> Qualify Lead
                         </button>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-brand/5 border border-brand/10 rounded-[1.5rem]">
                         <div className="w-3 h-3 rounded-full bg-brand animate-ping" />
                         <span className="text-[10px] font-black uppercase text-brand tracking-[0.2em]">Secure Session Active</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


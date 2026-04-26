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
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadsTable({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      toast.success("Lead eliminated from registry");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
      <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Filter leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
          />
        </div>
        <div className="flex gap-6 items-center">
            <p className="text-[9px] font-bold uppercase text-text-muted">Total Filtered: <span className="text-brand">{filteredLeads.length}</span></p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-stroke bg-surface/10">
              <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Lead Intelligence</th>
              <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Contact Node</th>
              <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Protocol Status</th>
              <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Sequence Date</th>
              <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-surface/30 transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold text-xl uppercase">
                      {lead.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{lead.name}</p>
                      <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                        <Building2 size={10} /> {lead.company || "Direct Individual"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-text-primary flex items-center gap-2">
                       <Mail size={12} className="text-brand" /> {lead.email}
                    </p>
                    {lead.phone && (
                      <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                         <Phone size={10} /> {lead.phone}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8">
                   <select 
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase border border-brand/10 cursor-pointer focus:outline-none ${
                        lead.status === "NEW" 
                        ? "bg-brand text-white shadow-lg shadow-brand/20" 
                        : lead.status === "CONTACTED"
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-surface text-text-muted"
                    }`}
                   >
                     <option value="NEW">NEW</option>
                     <option value="CONTACTED">CONTACTED</option>
                     <option value="QUALIFIED">QUALIFIED</option>
                     <option value="ARCHIVED">ARCHIVED</option>
                   </select>
                </td>
                <td className="px-10 py-8 text-[10px] font-bold uppercase text-text-muted whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-10 py-8 text-right space-x-2">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      title="Analyze Intel" 
                      className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      title="Decommission Lead" 
                      className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-[3rem] border border-stroke shadow-3xl overflow-hidden grain"
             >
                <div className="p-10 space-y-10">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-brand text-white flex items-center justify-center font-bold text-2xl uppercase">
                           {selectedLead.name[0]}
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold uppercase tracking-tighter text-text-primary">{selectedLead.name}</h2>
                           <p className="text-[11px] font-bold uppercase text-brand flex items-center gap-2">
                              <Building2 size={12} /> {selectedLead.company || "Direct Individual"}
                           </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="p-3 bg-surface border border-stroke rounded-xl text-text-muted hover:text-brand transition-all"
                      >
                         <X size={20} />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-8 py-10 border-y border-stroke">
                      <div className="space-y-4">
                         <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                            <Mail size={12} className="text-brand" /> Email Transmission
                         </p>
                         <p className="text-sm font-bold uppercase tracking-tight">{selectedLead.email}</p>
                      </div>
                      <div className="space-y-4">
                         <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                            <Calendar size={12} className="text-brand" /> Reception Date
                         </p>
                         <p className="text-sm font-bold uppercase tracking-tight">
                            {new Date(selectedLead.createdAt).toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                         </p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                         <MessageSquare size={12} className="text-brand" /> Strategic Message
                      </p>
                      <div className="bg-surface p-8 rounded-[2rem] border border-stroke">
                         <p className="text-sm font-medium leading-relaxed text-text-secondary">
                            {selectedLead.message}
                         </p>
                      </div>
                   </div>

                   <div className="flex justify-between items-center pt-10">
                      <div className="flex gap-4">
                         <button 
                          onClick={() => handleStatusChange(selectedLead.id, "CONTACTED")}
                          className="btn-outline h-12 px-6 text-[10px] font-bold uppercase rounded-xl flex items-center gap-2 hover:bg-emerald-500 hover:text-white"
                         >
                            <CheckCircle size={16} /> Mark as Contacted
                         </button>
                         <button 
                          onClick={() => handleDelete(selectedLead.id)}
                          className="btn-outline h-12 px-6 text-[10px] font-bold uppercase rounded-xl flex items-center gap-2 border-red-200 text-red-500 hover:bg-red-500 hover:text-white"
                         >
                            <Trash2 size={16} /> Delete Lead
                         </button>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                         <span className="text-[10px] font-bold uppercase text-brand tracking-widest">Active Intelligence</span>
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


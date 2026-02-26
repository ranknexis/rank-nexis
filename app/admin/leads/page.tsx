import prisma from "@/lib/prisma";
import { ExternalLink, Filter, Mail, MoreVertical, Search, Trash2 } from "lucide-react";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Inbound <span className="text-brand">Leads.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Monitor and optimize your business growth pipeline.</p>
        </div>
        <div className="flex gap-4">
           <button className="btn-outline h-14 px-8 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
             <Filter size={18} /> Filter Status
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
        <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Filter leads by name, email, or company..." className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand transition-all" />
          </div>
          <div className="flex gap-6 items-center">
             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Avg Response: <span className="text-emerald-500">14.2h</span></p>
             <div className="h-8 w-px bg-stroke hidden md:block"></div>
             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Total Active: <span className="text-brand">{leads.length}</span></p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/10">
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Lead / Source</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Contact Info</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Date Received</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-surface/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold text-xl uppercase">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{lead.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{lead.company || "Direct Individual"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary flex items-center gap-2">
                         <Mail size={12} className="text-brand" /> {lead.email}
                      </p>
                      {lead.phone && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{lead.phone}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-brand/10 transition-all ${
                        lead.status === "NEW" 
                        ? "bg-brand text-white shadow-lg shadow-brand/20" 
                        : "bg-brand/5 text-brand"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-text-muted whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-10 py-8 text-right space-x-2">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View Detail" className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><ExternalLink size={16} /></button>
                      <button title="Delete Lead" className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Trash2 size={16} /></button>
                    </div>
                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <p className="text-text-muted font-bold uppercase tracking-widest text-[10px]">No inbound leads detected in the system.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

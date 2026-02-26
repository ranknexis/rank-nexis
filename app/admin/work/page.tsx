import prisma from "@/lib/prisma";
import { Edit2, ExternalLink, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminWorkPage() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Work <span className="text-brand">Archive.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage your strategic case studies and operational success stories.</p>
        </div>
        <Link href="/admin/work/new" className="btn-primary h-14 px-8 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand/10">
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
        <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Filter case studies..." className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand transition-all" />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Total records: <span className="text-brand">{studies.length}</span></p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/10">
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Project</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Client</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {studies.map((study: any) => (
                <tr key={study.id} className="hover:bg-surface/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-surface border border-stroke overflow-hidden shrink-0">
                        {study.image ? (
                           <img src={study.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-text-muted"><ExternalLink size={16} /></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{study.title}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Slug: {study.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{study.client || 'N/A'}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{new Date(study.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 bg-white border border-stroke hover:bg-brand hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Edit2 size={16} /></button>
                      <button className="p-3 bg-white border border-stroke hover:bg-red-500 hover:text-white rounded-lg transition-all text-text-muted shadow-sm"><Trash2 size={16} /></button>
                    </div>
                    <button className="p-3 text-text-muted group-hover:hidden"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
              {studies.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <p className="text-text-muted font-bold uppercase tracking-widest text-[10px]">No case studies found in the database archive.</p>
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

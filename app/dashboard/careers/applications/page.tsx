import prisma from "@/lib/prisma";
import { Briefcase, Calendar, Mail, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      job: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <Link 
            href="/dashboard/careers" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-all group mb-1.5"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Careers
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Job <span className="text-brand">Applications.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Review and manage candidate applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-stroke bg-surface/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted tracking-widest">Candidate</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted tracking-widest">Applied Role</th>
                <th className="w-48 px-6 py-4 text-[10px] font-bold uppercase text-text-muted tracking-widest">Submitted On</th>
                <th className="w-44 px-6 py-4 text-[10px] font-bold uppercase text-text-muted tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <p className="text-text-muted font-bold uppercase text-[10px]">No applications received yet.</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand shrink-0">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors truncate">{app.name}</p>
                          <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-1 truncate">
                            <Mail size={10} /> {app.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-brand shrink-0" />
                        <span className="text-[10px] font-bold uppercase text-text-primary truncate">{app.job.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="shrink-0" /> {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Link 
                          href={`/dashboard/careers/applications/${app.id}`}
                          className="inline-flex h-10 px-5 items-center bg-surface border border-stroke hover:bg-brand hover:text-white hover:border-brand rounded-xl text-[9px] font-black uppercase text-brand transition-all shadow-sm shrink-0"
                       >
                          Review Application
                       </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

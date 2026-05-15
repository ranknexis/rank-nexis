import prisma from "@/lib/prisma";
import { Briefcase, Calendar, Mail, User } from "lucide-react";
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
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Inbound <span className="text-brand">Applications.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Review and manage talent acquisition requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm grain">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/50">
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest">Candidate</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest">Applied Role</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest">Submitted At</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest text-right">Resume / Cover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <p className="text-text-muted font-bold uppercase text-[10px]">No applications received yet.</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{app.name}</p>
                          <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-1">
                            <Mail size={10} /> {app.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-brand" />
                        <span className="text-[10px] font-bold uppercase text-text-primary">{app.job.title}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-[10px] font-bold uppercase text-text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} /> {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3">
                         <Link 
                            href={`/dashboard/careers/applications/${app.id}`}
                            className="px-6 py-3 bg-surface border border-stroke rounded-xl text-[9px] font-black uppercase text-brand hover:bg-brand hover:text-white transition-all shadow-sm"
                         >
                            Inspect Candidate
                         </Link>
                      </div>
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

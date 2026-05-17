import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import CareersList from "./components/CareersList";

export default async function AdminCareersPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Careers & <span className="text-brand">Jobs.</span></h1>
          <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Manage job openings and review candidate applications.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link href="/dashboard/careers/applications" className="h-11 px-4 bg-white border border-stroke rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-brand hover:text-brand transition-all shadow-sm">
            View Applications
          </Link>
          <Link href="/dashboard/careers/new" className="h-11 px-4 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10">
            <Plus size={16} /> Add Job Opening
          </Link>
        </div>
      </div>

      <CareersList initialJobs={JSON.parse(JSON.stringify(jobs))} />
    </div>
  );
}

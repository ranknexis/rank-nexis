import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import CareersList from "./components/CareersList";

export default async function AdminCareersPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Human <span className="text-brand">Capital.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Architect the future team and manage incoming talent.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard/careers/applications" className="h-16 px-8 bg-white border border-stroke rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-brand hover:text-brand transition-all shadow-sm">
            Recruitment Queue
          </Link>
          <Link href="/dashboard/careers/new" className="h-16 px-8 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/20">
            <Plus size={18} /> Deploy Position
          </Link>
        </div>
      </div>

      <CareersList initialJobs={JSON.parse(JSON.stringify(jobs))} />
    </div>
  );
}


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
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Career <span className="text-brand">Nodes.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Manage your talent pipeline and open positions.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/careers/applications" className="btn-outline h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3">
            View Applications
          </Link>
          <Link href="/dashboard/careers/new" className="btn-primary h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3 shadow-xl shadow-brand/10">
            <Plus size={18} /> New Position
          </Link>
        </div>
      </div>

      <CareersList initialJobs={JSON.parse(JSON.stringify(jobs))} />
    </div>
  );
}


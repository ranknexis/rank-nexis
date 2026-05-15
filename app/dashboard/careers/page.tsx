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
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Careers</h1>
          <p className="text-sm text-text-muted">Manage job openings and candidates.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/careers/applications" className="btn-outline h-12 px-6 text-xs font-bold flex items-center gap-2">
            Applications
          </Link>
          <Link href="/dashboard/careers/new" className="btn-primary h-12 px-6 text-xs font-bold flex items-center gap-2 shadow-md">
            <Plus size={18} /> New Position
          </Link>
        </div>
      </div>

      <CareersList initialJobs={JSON.parse(JSON.stringify(jobs))} />
    </div>
  );
}


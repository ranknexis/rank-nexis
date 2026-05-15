import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import WorkList from "./components/WorkList";

export default async function AdminWorkPage() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Portfolio</h1>
          <p className="text-sm text-text-muted">Manage your case studies and success stories.</p>
        </div>
        <Link href="/dashboard/work/new" className="btn-primary h-12 px-6 text-xs font-bold flex items-center gap-2 shadow-md">
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <WorkList initialStudies={JSON.parse(JSON.stringify(studies))} />
    </div>
  );
}


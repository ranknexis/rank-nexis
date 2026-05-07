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
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Work <span className="text-brand">Archive.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Manage your strategic case studies and operational success stories.</p>
        </div>
        <Link href="/dashboard/work/new" className="btn-primary h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3 shadow-xl shadow-brand/10">
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <WorkList initialStudies={JSON.parse(JSON.stringify(studies))} />
    </div>
  );
}


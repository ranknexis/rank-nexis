import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import WorkList from "./components/WorkList";

export default async function AdminWorkPage() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Success <span className="text-brand">Stories.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Manage your case studies and portfolio.</p>
        </div>
        <Link href="/dashboard/work/new" className="h-11 px-5 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand/20">
          <Plus size={16} /> New Case Study
        </Link>
      </div>

      <WorkList initialStudies={JSON.parse(JSON.stringify(studies))} />
    </div>
  );
}


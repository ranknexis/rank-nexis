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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Success <span className="text-brand">Stories.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Manage your case studies and portfolio.</p>
        </div>
        <Link href="/dashboard/work/new" className="h-16 px-8 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/20">
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <WorkList initialStudies={JSON.parse(JSON.stringify(studies))} />
    </div>
  );
}


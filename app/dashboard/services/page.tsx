import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import ServicesList from "./components/ServicesList";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Core <span className="text-brand">Services.</span></h1>
          <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Manage your core service offerings.</p>
        </div>
        <Link href="/dashboard/services/new" className="h-11 px-4 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10 shrink-0">
          <Plus size={16} /> New Service
        </Link>
      </div>

      <ServicesList initialServices={JSON.parse(JSON.stringify(services))} />
    </div>
  );
}


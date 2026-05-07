import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import ServicesList from "./components/ServicesList";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Service <span className="text-brand">Nodes.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Manage your core operating systems and service verticals.</p>
        </div>
        <Link href="/dashboard/services/new" className="btn-primary h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3 shadow-xl shadow-brand/10">
          <Plus size={18} /> New Service
        </Link>
      </div>

      <ServicesList initialServices={JSON.parse(JSON.stringify(services))} />
    </div>
  );
}



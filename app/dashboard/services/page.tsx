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
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Services</h1>
          <p className="text-sm text-text-muted">Manage your core service offerings.</p>
        </div>
        <Link href="/dashboard/services/new" className="btn-primary h-12 px-6 text-xs font-bold flex items-center gap-2 shadow-md">
          <Plus size={18} /> New Service
        </Link>
      </div>

      <ServicesList initialServices={JSON.parse(JSON.stringify(services))} />
    </div>
  );
}


import prisma from "@/lib/prisma";
import { Filter } from "lucide-react";
import LeadsTable from "./components/LeadsTable";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Inbound <span className="text-brand">Leads.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Monitor and optimize your business growth pipeline.</p>
        </div>
        <div className="flex gap-4">
           {/* Filters could be added here in the future */}
        </div>
      </div>

      <LeadsTable initialLeads={JSON.parse(JSON.stringify(leads))} />
    </div>
  );
}


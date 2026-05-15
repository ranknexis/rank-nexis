import prisma from "@/lib/prisma";
import LeadsTable from "./components/LeadsTable";
import LeadExportButton from "./components/LeadExportButton";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLeadsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Inbound <span className="text-brand">Intel.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Capture and manage high-value client acquisitions.</p>
        </div>
        <LeadExportButton leads={leads} />
      </div>

      <LeadsTable initialLeads={JSON.parse(JSON.stringify(leads))} />
    </div>
  );
}

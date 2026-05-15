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
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Leads</h1>
          <p className="text-sm text-text-muted">Manage incoming inquiries and potential clients.</p>
        </div>
        <LeadExportButton leads={leads} />
      </div>

      <LeadsTable initialLeads={JSON.parse(JSON.stringify(leads))} />
    </div>
  );
}

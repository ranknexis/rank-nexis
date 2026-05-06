import prisma from "@/lib/prisma";
import LeadsTable from "./components/LeadsTable";
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
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Inbound <span className="text-brand">Leads.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Monitor and optimize your business growth pipeline.</p>
        </div>
      </div>

      <LeadsTable initialLeads={JSON.parse(JSON.stringify(leads))} />
    </div>
  );
}

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
    <div className="space-y-6">
      <LeadsTable initialLeads={JSON.parse(JSON.stringify(leads))} />
    </div>
  );
}

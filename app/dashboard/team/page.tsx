import prisma from "@/lib/prisma";
import TeamList from "./components/TeamList";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminTeamPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Expert <span className="text-brand">Nodes.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage public expert profiles and hierarchy.</p>
        </div>
      </div>

      <TeamList initialTeam={JSON.parse(JSON.stringify(team))} />
    </div>
  );
}

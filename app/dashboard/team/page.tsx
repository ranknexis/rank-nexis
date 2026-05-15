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
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Team</h1>
          <p className="text-sm text-text-muted">Manage team members and their profiles.</p>
        </div>
      </div>

      <TeamList initialTeam={JSON.parse(JSON.stringify(team))} />
    </div>
  );
}

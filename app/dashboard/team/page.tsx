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
    <TeamList initialTeam={JSON.parse(JSON.stringify(team))} />
  );
}

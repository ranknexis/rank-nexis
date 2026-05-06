import prisma from "@/lib/prisma";
import DashboardContent from "./components/DashboardContent";
import { getSession } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getSession();

  // Fetch real data from database
  const [leadCount, blogCount, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.blog.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ]);

  const stats = {
    clients: 18, 
    leads: leadCount,
    blogs: blogCount,
    growth: "3.2x"
  };

  return <DashboardContent stats={stats} recentLeads={recentLeads} role={session?.role || "TEAM_MEMBER"} />;
}

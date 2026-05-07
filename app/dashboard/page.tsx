import prisma from "@/lib/prisma";
import DashboardContent from "./components/DashboardContent";
import { getSession } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getSession();

  // Fetch real data from database
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [leadCount, blogCount, caseStudyCount, recentLeads, recentLeadsCount] = await Promise.all([
    prisma.lead.count(),
    prisma.blog.count(),
    prisma.caseStudy.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    prisma.lead.count({
        where: { createdAt: { gte: thirtyDaysAgo } }
    })
  ]);

  // Calculate growth: leads in last 30 days / total leads * 100
  const growthRate = leadCount > 0 ? ((recentLeadsCount / leadCount) * 100).toFixed(1) : "0";

  const stats = {
    clients: caseStudyCount, 
    leads: leadCount,
    blogs: blogCount,
    growth: `${growthRate}%`
  };


  return <DashboardContent stats={stats} recentLeads={recentLeads} role={session?.role || "TEAM_MEMBER"} />;
}

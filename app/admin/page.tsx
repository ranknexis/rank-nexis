import prisma from "@/lib/prisma";
import DashboardContent from "./components/DashboardContent";

export default async function AdminDashboard() {
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
    clients: 18, // Mock for now, could be prisma.client.count() if added
    leads: leadCount,
    blogs: blogCount,
    growth: "3.2x"
  };

  return <DashboardContent stats={stats} recentLeads={recentLeads} />;
}

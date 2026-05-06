import { getSession } from "@/lib/auth";
import DashboardShell from "./components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  return (
    <DashboardShell session={session}>
      {children}
    </DashboardShell>
  );
}

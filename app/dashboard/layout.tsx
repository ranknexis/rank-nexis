import { getSession } from "@/lib/auth";
import DashboardShell from "./components/DashboardShell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session) {
    return <>{children}</>;
  }

  return (
    <DashboardShell session={session}>
      {children}
    </DashboardShell>
  );
}

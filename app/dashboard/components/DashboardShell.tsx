"use client";

import { logout } from "@/actions/auth";
import { useEffect } from "react";
import {
   Activity,
   BarChart3,
   Briefcase,
   ChevronRight,
   FileCode,
   FileText,
   LayoutDashboard,
   LogOut,
   Menu,
   MessageSquare,
   Settings,
   UserCircle,
   Users,
   X,
   Zap,
   Star
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardShell({ 
    children, 
    session 
}: { 
    children: React.ReactNode, 
    session: any 
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!session && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [session, pathname, router]);

  const role = session?.role || "TEAM_MEMBER";

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard", roles: ["ADMIN", "TEAM_MEMBER"] },
    { icon: FileCode, label: "Site Architecture", href: "/dashboard/pages", roles: ["ADMIN"], permission: "manage_pages" },
    { icon: Zap, label: "Services Hub", href: "/dashboard/services", roles: ["ADMIN"], permission: "manage_services" },
    { icon: Briefcase, label: "Careers Portal", href: "/dashboard/careers", roles: ["ADMIN"], permission: "manage_careers" },
    { icon: Users, label: "Experts Node", href: "/dashboard/team", roles: ["ADMIN"], permission: "manage_team" },
    { icon: FileText, label: "Content (Blog)", href: "/dashboard/blog", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_blog" },
    { icon: BarChart3, label: "Case Archives", href: "/dashboard/work", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_work" },
    { icon: MessageSquare, label: "Lead Pipeline", href: "/dashboard/leads", roles: ["ADMIN"], permission: "manage_leads" },
    { icon: Star, label: "Feedback Loop", href: "/dashboard/feedback", roles: ["ADMIN"], permission: "manage_feedback" },
    { icon: Users, label: "Access Control", href: "/dashboard/users", roles: ["ADMIN"], permission: "manage_users" },
    { icon: Activity, label: "System Performance", href: "/dashboard/performance", roles: ["ADMIN"] },
    { icon: FileText, label: "System Report", href: "/dashboard/report", roles: ["ADMIN"] },
    { icon: UserCircle, label: "My Profile", href: "/dashboard/profile", roles: ["ADMIN", "TEAM_MEMBER"] },
    { icon: Settings, label: "Global Settings", href: "/dashboard/settings", roles: ["ADMIN"], permission: "manage_settings" },

  ].filter(item => {
    if (role === "ADMIN") return true;
    if (item.roles.includes("TEAM_MEMBER")) {
        // Mandatory items for TEAM_MEMBER
        if (["Overview", "My Profile", "Content (Blog)", "Case Archives"].includes(item.label)) return true;

        
        // Conditional items based on permissions
        if (!item.permission) return true;
        const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse(session?.permissions || "[]");
        return userPermissions.includes(item.permission);
    }
    return false;
  });

  const handleLogout = async () => {
    await logout();
    router.push("/dashboard/login");
  };

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  if (!session) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 border-b border-stroke">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0">
               <Zap size={20} fill="currentColor" />
            </div>
            <div>
               <p className="text-lg font-black uppercase tracking-tighter text-text-primary leading-none">RankNexis</p>
               <p className="text-[8px] font-bold uppercase text-text-muted tracking-widest mt-1.5 opacity-60">System Hub</p>
            </div>
         </div>
      </div>
 
      <nav className="flex-grow p-6 space-y-1 overflow-y-auto custom-scrollbar">
         {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 group ${
                  isActive 
                  ? "bg-brand text-white shadow-xl shadow-brand/10" 
                  : "text-text-muted hover:bg-brand/5 hover:text-brand"
                }`}
              >
                 <div className="flex items-center gap-4">
                    <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white" : "text-text-muted group-hover:text-brand"} />
                    {item.label}
                 </div>
                 {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
         })}
      </nav>
 
      <div className="p-6 border-t border-stroke space-y-4 bg-surface/30">
         <div className="bg-white border border-stroke rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-black text-xs uppercase">
               {session?.name?.substring(0, 2) || "RX"}
            </div>
            <div className="flex-grow min-w-0">
               <p className="text-[10px] font-bold uppercase tracking-tight text-text-primary truncate">{session?.name || "Expert Account"}</p>
               <p className="text-[8px] font-bold uppercase text-emerald-500 tracking-wider">{role}</p>
            </div>
         </div>
         
         <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-red-500 hover:bg-red-50 transition-all"
         >
            <LogOut size={16} />
            Exit System
         </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      <div className="md:hidden flex items-center justify-between p-6 border-b border-stroke bg-white sticky top-0 z-30">
         <div className="flex items-center gap-3">
            <Zap size={20} className="text-brand" fill="currentColor" />
            <p className="text-sm font-black uppercase tracking-tighter">RankNexis</p>
         </div>
         <button 
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center text-text-primary"
         >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
      </div>

      <aside className="hidden md:flex w-80 border-r border-stroke flex-col h-screen sticky top-0 z-20 shrink-0 shadow-sm">
        <SidebarContent />
      </aside>

      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
         <aside className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
            <SidebarContent />
         </aside>
      </div>

      <main className="flex-grow h-screen overflow-y-auto bg-surface/10 p-6 md:p-12 relative">
         <div className="max-w-[1600px] mx-auto">
            {children}
         </div>
      </main>
    </div>
  );
}

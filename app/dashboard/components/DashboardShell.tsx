"use client";

import { logout } from "@/actions/auth";
import { useEffect, useState } from "react";
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
   Star,
   PanelLeftClose,
   PanelLeftOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!session && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [session, pathname, router]);

  const role = session?.role || "TEAM_MEMBER";

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard", roles: ["ADMIN", "TEAM_MEMBER"] },
    { icon: FileCode, label: "Pages", href: "/dashboard/pages", roles: ["ADMIN"], permission: "manage_pages" },
    { icon: Zap, label: "Services", href: "/dashboard/services", roles: ["ADMIN"], permission: "manage_services" },
    { icon: Briefcase, label: "Careers", href: "/dashboard/careers", roles: ["ADMIN"], permission: "manage_careers" },
    { icon: Users, label: "Team", href: "/dashboard/team", roles: ["ADMIN"], permission: "manage_team" },
    { icon: FileText, label: "Blog", href: "/dashboard/blog", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_blog" },
    { icon: BarChart3, label: "Portfolio", href: "/dashboard/work", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_work" },
    { icon: MessageSquare, label: "Leads", href: "/dashboard/leads", roles: ["ADMIN"], permission: "manage_leads" },
    { icon: Star, label: "Feedback", href: "/dashboard/feedback", roles: ["ADMIN"], permission: "manage_feedback" },
    { icon: Users, label: "Users", href: "/dashboard/users", roles: ["ADMIN"], permission: "manage_users" },
    { icon: Activity, label: "Performance", href: "/dashboard/performance", roles: ["ADMIN"] },
    { icon: FileText, label: "Reports", href: "/dashboard/report", roles: ["ADMIN"] },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile", roles: ["ADMIN", "TEAM_MEMBER"] },
    { icon: Settings, label: "Settings", href: "/dashboard/settings", roles: ["ADMIN"], permission: "manage_settings" },

  ].filter(item => {
    if (role === "ADMIN") return true;
    if (item.roles.includes("TEAM_MEMBER")) {
        if (["Overview", "Profile", "Blog", "Portfolio"].includes(item.label)) return true;
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

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className={`p-6 mb-2 ${isCollapsed && !isMobile ? "items-center px-4" : ""}`}>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0">
               <Zap size={20} fill="currentColor" />
            </div>
            {(!isCollapsed || isMobile) && (
               <motion.div 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="overflow-hidden whitespace-nowrap"
               >
                  <p className="text-lg font-black tracking-tight text-text-primary leading-none">RankNexis</p>
                  <p className="text-[10px] font-medium text-text-muted mt-1">Admin Dashboard</p>
               </motion.div>
            )}
         </div>
      </div>
 
      {/* Navigation */}
      <nav className={`flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar ${isCollapsed && !isMobile ? "items-center" : ""}`}>
         {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                  ? "bg-brand/5 text-brand" 
                  : "text-text-muted hover:bg-surface hover:text-text-primary"
                } ${isCollapsed && !isMobile ? "justify-center px-0 w-10 mx-auto" : "gap-3"}`}
              >
                 <item.icon 
                   size={20} 
                   strokeWidth={isActive ? 2.5 : 2} 
                   className={isActive ? "text-brand" : "text-text-muted group-hover:text-text-primary"} 
                 />
                 
                 {(!isCollapsed || isMobile) && (
                   <motion.span 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                   >
                      {item.label}
                   </motion.span>
                 )}

                 {isActive && !isCollapsed && (
                   <div className="absolute right-4">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                   </div>
                 )}

                 {/* Tooltip for collapsed state */}
                 {isCollapsed && !isMobile && (
                   <div className="absolute left-full ml-4 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                     {item.label}
                   </div>
                 )}
              </Link>
            );
         })}
      </nav>
 
      {/* Footer */}
      <div className={`p-4 mt-auto border-t border-stroke space-y-2 ${isCollapsed && !isMobile ? "items-center px-2" : ""}`}>
         <div className={`flex items-center p-2 rounded-xl bg-surface/50 border border-stroke/50 ${isCollapsed && !isMobile ? "justify-center p-1 border-none bg-transparent" : "gap-3"}`}>
            <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand font-bold text-xs shrink-0">
               {session?.name?.substring(0, 1) || "R"}
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="min-w-0">
                 <p className="text-xs font-bold text-text-primary truncate">{session?.name || "Expert"}</p>
                 <p className="text-[10px] text-text-muted truncate capitalize">{role.toLowerCase().replace('_', ' ')}</p>
              </div>
            )}
         </div>
         
         <button 
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-xl text-sm font-medium text-text-muted hover:text-red-500 hover:bg-red-50 transition-all ${isCollapsed && !isMobile ? "justify-center px-0 w-10 mx-auto" : "gap-3"}`}
         >
            <LogOut size={18} />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && !isMobile && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-red-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                Logout
              </div>
            )}
         </button>
      </div>

      {/* Collapse Toggle Button (Desktop) */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-stroke rounded-full flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-all shadow-sm z-30"
        >
          {isCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-stroke bg-white sticky top-0 z-30">
         <div className="flex items-center gap-3">
            <Zap size={24} className="text-brand" fill="currentColor" />
            <p className="text-lg font-black tracking-tight">RankNexis</p>
         </div>
         <button 
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center text-text-primary active:scale-95 transition-transform"
         >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
      </div>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex border-r border-stroke flex-col h-screen sticky top-0 z-20 shrink-0 bg-white transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
               <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow h-screen overflow-y-auto bg-surface/30 relative">
         <div className="max-w-[1600px] mx-auto p-6 md:p-10 lg:p-12">
            {children}
         </div>
      </main>
    </div>
  );
}

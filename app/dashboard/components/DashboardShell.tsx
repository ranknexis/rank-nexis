"use client";

import { logout } from "@/actions/auth";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Briefcase,
  ChevronUp,
  FileCode,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Star,
  UserCircle,
  Users,
  X,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface SidebarContentProps {
  isMobile?: boolean;
  isCollapsed: boolean;
  showUserDropdown: boolean;
  setShowUserDropdown: (val: boolean) => void;
  setShowLogoutConfirm: (val: boolean) => void;
  session: any;
  role: string;
  pathname: string;
  setMobileMenuOpen: (val: boolean) => void;
  NAV_ITEMS: any[];
}

function SidebarContent({
  isMobile = false,
  isCollapsed,
  showUserDropdown,
  setShowUserDropdown,
  setShowLogoutConfirm,
  session,
  role,
  pathname,
  setMobileMenuOpen,
  NAV_ITEMS
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className={`mb-2 ${isCollapsed && !isMobile ? "py-6 px-0 flex justify-center" : "p-6"}`}>
         <div className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "gap-3"}`}>
            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0">
               <Zap size={22} fill="currentColor" />
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
 
      <nav className={`flex flex-col space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${isCollapsed && !isMobile ? "px-0 items-center" : "px-3"}`}>
         {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`flex items-center rounded-xl transition-all duration-200 group relative ${
                  isActive 
                  ? "bg-brand/5 text-brand font-bold active-nav-link" 
                  : "text-text-muted hover:bg-surface hover:text-text-primary"
                } ${isCollapsed && !isMobile ? "justify-center p-0 w-10 h-10 mx-auto shrink-0" : "px-3.5 py-2.5 gap-2.5 w-full"}`}
              >
                 <item.icon 
                   size={20} 
                   strokeWidth={isActive ? 2.5 : 2} 
                   className={`${isActive ? "text-brand" : "text-text-muted group-hover:text-text-primary"} shrink-0`} 
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
 
                 {isCollapsed && !isMobile && (
                   <div className="absolute left-full ml-4 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                     {item.label}
                   </div>
                 )}
              </Link>
            );
         })}
      </nav>
 
      <div className={`mt-auto border-t border-stroke relative ${isCollapsed && !isMobile ? "p-2 px-0 flex justify-center" : "p-3"}`}>
         <AnimatePresence>
            {showUserDropdown && (
               <motion.div 
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 className={`absolute bottom-full left-3 right-3 mb-2 bg-white border border-stroke rounded-xl shadow-xl z-50 overflow-hidden ${isCollapsed && !isMobile ? "w-44 left-full ml-2 bottom-0" : ""}`}
               >
                  <div className="p-1.5 space-y-0.5">
                     <Link 
                       href="/dashboard/profile"
                       onClick={() => setShowUserDropdown(false)}
                       className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-text-muted hover:bg-surface hover:text-text-primary transition-all"
                     >
                        <UserCircle size={16} />
                        <span>Profile Settings</span>
                     </Link>
                     <button 
                        onClick={() => {
                           setShowUserDropdown(false);
                           setShowLogoutConfirm(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-all"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className={`flex items-center rounded-xl bg-surface/50 border border-stroke/50 hover:border-brand/30 transition-all group ${isCollapsed && !isMobile ? "w-10 h-10 justify-center p-0 mx-auto shrink-0" : "w-full p-1.5 gap-2.5"}`}
         >
            <div className={`rounded-lg bg-brand/10 flex items-center justify-center text-brand font-bold text-xs shrink-0 group-hover:bg-brand group-hover:text-white transition-all ${isCollapsed && !isMobile ? "w-8 h-8" : "w-9 h-9"}`}>
               {(session?.name || session?.email || "?")[0].toUpperCase()}
            </div>
            {(!isCollapsed || isMobile) && (
               <div className="min-w-0 text-left flex-grow">
                  <p className="text-xs font-bold text-text-primary truncate">{session?.name || session?.email?.split('@')[0] || "User"}</p>
                  <p className="text-[9px] text-text-muted truncate capitalize">{role.toLowerCase().replace('_', ' ')}</p>
               </div>
            )}
            {(!isCollapsed || isMobile) && (
               <div className={`text-text-muted transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`}>
                  <ChevronUp size={14} />
               </div>
            )}
         </button>
      </div>
    </div>
  );
}

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
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!session && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [session, pathname, router]);

  useEffect(() => {
    const activeEl = document.querySelector('.active-nav-link');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [pathname]);

  const role = session?.role || "TEAM_MEMBER";

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard", roles: ["ADMIN", "TEAM_MEMBER"] },
    { icon: FileCode, label: "Pages", href: "/dashboard/pages", roles: ["ADMIN"], permission: "manage_pages" },
    { icon: Zap, label: "Services", href: "/dashboard/services", roles: ["ADMIN"], permission: "manage_services" },
    { icon: Briefcase, label: "Careers", href: "/dashboard/careers", roles: ["ADMIN"], permission: "manage_careers" },
    { icon: Users, label: "Team", href: "/dashboard/team", roles: ["ADMIN"], permission: "manage_team" },
    { icon: FileText, label: "Blog", href: "/dashboard/blog", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_blog" },
    { icon: BarChart3, label: "Work", href: "/dashboard/work", roles: ["ADMIN", "TEAM_MEMBER"], permission: "manage_work" },
    { icon: MessageSquare, label: "Leads", href: "/dashboard/leads", roles: ["ADMIN"], permission: "manage_leads" },
    { icon: Star, label: "Feedback", href: "/dashboard/feedback", roles: ["ADMIN"], permission: "manage_feedback" },
    { icon: Users, label: "Users", href: "/dashboard/users", roles: ["ADMIN"], permission: "manage_users" },
    { icon: Activity, label: "Performance", href: "/dashboard/performance", roles: ["ADMIN"] },
    { icon: FileText, label: "Reports", href: "/dashboard/report", roles: ["ADMIN"] },
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
    setShowLogoutConfirm(false);
    await logout();
    window.location.replace("/dashboard/login");
  };

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden font-sans">
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

      <aside 
        className={`hidden md:flex border-r border-stroke flex-col h-screen sticky top-0 z-20 shrink-0 bg-white transition-all duration-300 ease-in-out relative ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent 
          isCollapsed={isCollapsed}
          showUserDropdown={showUserDropdown}
          setShowUserDropdown={setShowUserDropdown}
          setShowLogoutConfirm={setShowLogoutConfirm}
          session={session}
          role={role}
          pathname={pathname}
          setMobileMenuOpen={setMobileMenuOpen}
          NAV_ITEMS={NAV_ITEMS}
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-stroke rounded-full flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-all shadow-sm z-30 cursor-pointer"
        >
          {isCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </aside>

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
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
               <SidebarContent 
                 isMobile
                 isCollapsed={false}
                 showUserDropdown={showUserDropdown}
                 setShowUserDropdown={setShowUserDropdown}
                 setShowLogoutConfirm={setShowLogoutConfirm}
                 session={session}
                 role={role}
                 pathname={pathname}
                 setMobileMenuOpen={setMobileMenuOpen}
                 NAV_ITEMS={NAV_ITEMS}
               />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow h-screen overflow-y-auto bg-surface/30 relative">
         <div className="max-w-[1600px] mx-auto p-4 sm:p-6 md:p-8">
            {children}
         </div>
      </main>

      <ConfirmationModal 
         isOpen={showLogoutConfirm}
         onClose={() => setShowLogoutConfirm(false)}
         onConfirm={handleLogout}
         title="Confirm Logout"
         message="Are you sure you want to end your session? You will need to login again to access the dashboard."
         confirmText="Logout"
         type="danger"
      />
    </div>
  );
}

"use client";

import {
    BarChart3,
    Briefcase,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    Zap,
    FileEdit
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: FileEdit, label: "Pages", href: "/admin/pages" },
    { icon: FileText, label: "Blog", href: "/admin/blog" },
    { icon: BarChart3, label: "Work Archive", href: "/admin/work" },
    { icon: Briefcase, label: "Careers", href: "/admin/careers" },
    { icon: Users, label: "Leads", href: "/admin/leads" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  // We do not apply Layout to Login Page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-stroke flex flex-col h-screen sticky top-0 z-20">
        <div className="p-8 border-b border-stroke flex items-center gap-4 bg-surface/30">
           <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-xl shadow-brand/20">
              <Zap size={24} fill="currentColor" />
           </div>
           <div>
              <p className="text-xl font-bold uppercase tracking-tight text-text-primary leading-none">Console</p>
              <p className="text-[10px] font-bold uppercase text-brand tracking-widest mt-1">RankNexis Ops Node</p>
           </div>
        </div>

        <nav className="flex-grow p-6 space-y-1 overflow-y-auto">
           {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                    isActive 
                    ? "bg-brand text-white shadow-lg shadow-brand/20" 
                    : "text-text-muted hover:bg-surface hover:text-brand"
                  }`}
                >
                   <item.icon size={18} />
                   {item.label}
                </Link>
              );
           })}
        </nav>

        <div className="p-6 border-t border-stroke space-y-4 bg-surface/30">
           <div className="flex items-center gap-4 px-4 py-2">
              <div className="w-11 h-11 rounded-xl bg-surface border border-stroke overflow-hidden flex items-center justify-center text-brand font-black bg-brand/5">
                 <Zap size={22} />
              </div>
              <div>
                 <p className="text-sm font-bold uppercase tracking-tight leading-none text-text-primary">Ops Admin</p>
                 <p className="text-[10px] font-bold uppercase text-text-muted">Active Hub Manager</p>
              </div>
           </div>
           
           <Link href="/" className="flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wide text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={18} />
              Log Out
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
         {children}
      </main>
    </div>
  );
}

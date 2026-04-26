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

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Overlay for Mobile */}
      
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-stroke flex flex-col h-screen sticky top-0">
        <div className="p-10 border-b border-stroke flex items-center gap-4">
           <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
              <Zap size={24} fill="currentColor" />
           </div>
           <div>
              <p className="text-xl font-bold uppercase tracking-tighter">Ranknexis</p>
              <p className="text-[10px] font-bold uppercase text-brand">Business Dashboard</p>
           </div>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
           {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase transition-all ${
                    isActive 
                    ? "bg-brand text-white shadow-xl shadow-brand/20" 
                    : "text-text-muted hover:bg-surface hover:text-brand"
                  }`}
                >
                   <item.icon size={18} />
                   {item.label}
                </Link>
              );
           })}
        </nav>

        <div className="p-6 border-t border-stroke space-y-4">
           <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-surface border border-stroke overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div>
                 <p className="text-xs font-bold uppercase tracking-tight leading-none">Mahdi Monir</p>
                 <p className="text-[9px] font-bold uppercase text-text-muted">Administrator</p>
              </div>
           </div>
           
           <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={18} />
              Log Out
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
         {children}
      </main>
    </div>
  );
}


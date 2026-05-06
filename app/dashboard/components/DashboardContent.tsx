"use client";

import { motion } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    Briefcase,
    FileText,
    TrendingUp,
    Users,
    Zap,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface DashboardContentProps {
  stats: {
    clients: number;
    leads: number;
    blogs: number;
    growth: string;
  };
  recentLeads: any[];
  role: string;
}

export default function DashboardContent({ stats, recentLeads, role }: DashboardContentProps) {
  const isAdmin = role === "ADMIN";
  const STATS_CONFIG = [
    { label: "Active Clients", val: stats.clients.toString(), delta: "+2", icon: Zap, bg: "bg-orange-50 border-orange-100" },
    { label: "Total Leads", val: stats.leads.toString(), delta: "+12", icon: Users, bg: "bg-blue-50 border-blue-100" },
    { label: "Blog Posts", val: stats.blogs.toString(), delta: "+8%", icon: Activity, bg: "bg-purple-50 border-purple-100" },
    { label: "Business Growth", val: stats.growth, delta: "0.4", icon: TrendingUp, bg: "bg-emerald-50 border-emerald-100" },
  ];

  return (
    <div className="space-y-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stroke pb-8">
         <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 bg-brand rounded-full animate-pulse shadow-lg shadow-brand/40" />
               <p className="text-[10px] font-bold uppercase text-brand tracking-widest flex items-center gap-2">
                  <Sparkles size={12} className="animate-pulse" /> RankNexis Active Session
               </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-primary leading-tight">
               {isAdmin ? "Administrative" : "Expert"} <span className="text-brand">Node.</span>
            </h1>
            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Status: Secure • All backend modules operating normally</p>
         </div>
         {isAdmin && (
           <div className="flex gap-4">
              <Link href="/dashboard/leads" className="btn-outline h-12 px-6 text-xs font-bold uppercase rounded-xl flex items-center gap-2 hover:bg-surface duration-300 transition-all shadow-sm">
                 Review Leads
              </Link>
              <Link href="/dashboard/settings" className="btn-primary h-12 px-6 text-xs font-bold uppercase rounded-xl flex items-center gap-2 shadow-premium duration-300 transition-all">
                 System Settings
              </Link>
           </div>
         )}
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {STATS_CONFIG.map((stat: any, i: number) => (
           <motion.div 
             key={stat.label}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:border-brand/30 hover:shadow-premium transition-all group flex flex-col justify-between h-full relative overflow-hidden grain hover:-translate-y-1 duration-500"
           >
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-14 h-14 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm`}>
                    <stat.icon size={26} />
                 </div>
                 <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-3.5 py-1.5 rounded-full">
                    {stat.delta}
                 </span>
              </div>
              <div>
                 <h3 className="text-4xl font-black tracking-tight mb-2 text-text-primary group-hover:text-brand transition-colors duration-300">
                    {stat.val}
                 </h3>
                 <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {stat.label}
                 </p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Pipelines / Recent Leads */}
         {isAdmin && (
           <div className="lg:col-span-8 bg-white rounded-[2rem] border border-stroke p-8 md:p-10 space-y-8 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">
                       Active <span className="text-brand">Leads.</span>
                    </h3>
                    <p className="text-xs text-text-muted mt-1">Most recent inbound inquiries needing review</p>
                 </div>
                 <Link href="/dashboard/leads" className="text-xs font-bold uppercase text-brand hover:underline flex items-center gap-1.5 tracking-wider">
                    Leads Manager <ArrowUpRight size={14} />
                 </Link>
              </div>
              
              <div className="space-y-3">
                 {recentLeads.map((lead: any, i: number) => (
                   <motion.div 
                     key={lead.id} 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="flex items-center justify-between p-5 rounded-2xl hover:bg-surface border border-transparent hover:border-stroke transition-all cursor-pointer group"
                   >
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand font-black text-xl uppercase shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                            {lead.name[0]}
                         </div>
                         <div>
                            <p className="text-base font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">
                               {lead.name}
                            </p>
                            <p className="text-xs text-text-muted font-medium mt-0.5">
                               {lead.company || "Direct Individual Entry"}
                            </p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <span className="hidden md:block text-xs font-medium text-text-muted max-w-[200px] truncate">
                            {lead.email}
                         </span>
                         <span className="px-3.5 py-1.5 rounded-full bg-brand/5 text-brand text-[10px] font-bold uppercase border border-brand/10">
                            {lead.status}
                         </span>
                      </div>
                   </motion.div>
                 ))}
                 {recentLeads.length === 0 && (
                    <div className="text-center py-12 bg-surface/30 border border-stroke rounded-2xl">
                       <p className="text-text-muted font-bold uppercase text-xs tracking-wider">
                          No recent active leads.
                       </p>
                    </div>
                 )}
              </div>
           </div>
         )}

         {/* System Oversight & Actions */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2rem] border border-stroke p-8 space-y-6 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">System <span className="text-brand">Oversight.</span></h3>
                  <p className="text-xs text-text-muted mt-1">Operational health indicators</p>
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Execution Speed", val: "Optimal (98/100)", fill: "w-[98%]" },
                    { label: "Mobile Responsiveness", val: "Excellent", fill: "w-[95%]" },
                    { label: "SEO Status", val: "Fully Optimized", fill: "w-[100%]" }
                  ].map((node: any, i: number) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                          <span className="text-text-muted">{node.label}</span>
                          <span className="text-brand">{node.val}</span>
                       </div>
                       <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-stroke/40">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className={`h-full bg-brand ${node.fill} duration-1000 transition-all rounded-full`}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-brand rounded-[2rem] p-8 text-white space-y-6 relative overflow-hidden shadow-premium grain">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 -z-10" />
               <div className="flex items-center gap-3">
                  <ShieldCheck size={28} />
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Content <br />Publishing.</h3>
               </div>
               <p className="text-white/80 text-xs leading-relaxed font-medium">Quick shortcuts to expand portfolio or blog entries</p>
               <div className="grid grid-cols-2 gap-4">
                   <Link href="/dashboard/work" className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                      <Briefcase size={22} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Add Project</span>
                   </Link>
                   <Link href="/dashboard/blog" className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                      <FileText size={22} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Add Post</span>
                   </Link>
                   {isAdmin && (
                       <Link href="/dashboard/team" className="col-span-2 flex items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                          <Users size={18} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Manage Experts / Team</span>
                       </Link>
                    )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    Briefcase,
    FileText,
    TrendingUp,
    Users,
    Zap
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
}

export default function DashboardContent({ stats, recentLeads }: DashboardContentProps) {
  const STATS_CONFIG = [
    { label: "Active Clients", val: stats.clients.toString(), delta: "+2", icon: Zap },
    { label: "Total Leads", val: stats.leads.toString(), delta: "+12", icon: Users },
    { label: "Blog Posts", val: stats.blogs.toString(), delta: "+8%", icon: Activity },
    { label: "Business Growth", val: stats.growth, delta: "0.4", icon: TrendingUp },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Business <span className="text-brand">Overview.</span></h1>
             <p className="text-text-muted text-sm font-medium uppercase">Status: Online | All Systems Active</p>
         </div>
         <div className="flex gap-4">
             <button className="btn-outline h-12 px-6 text-[10px] font-bold uppercase shadow-sm">Export Data</button>
             <button className="btn-primary h-12 px-6 text-[10px] font-bold uppercase shadow-xl shadow-brand/10">Manage Clients</button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {STATS_CONFIG.map((stat: any, i: number) => (
           <motion.div 
             key={stat.label}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:border-brand transition-all group"
           >
              <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                    <stat.icon size={24} />
                 </div>
                  <span className="text-[10px] font-bold uppercase text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{stat.delta}</span>
              </div>
              <h3 className="text-3xl font-bold tracking-tighter mb-2 text-text-primary">{stat.val}</h3>
               <p className="text-[10px] font-bold uppercase text-text-muted">{stat.label}</p>
           </motion.div>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Recent Leads */}
         <div className="lg:col-span-8 bg-white rounded-[2rem] border border-stroke p-10 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-bold uppercase tracking-tighter text-text-primary">New Leads <span className="text-brand">Pipeline.</span></h3>
                <Link href="/admin/leads" className="text-[10px] font-bold uppercase text-brand hover:underline">View All Leads</Link>
            </div>
            
            <div className="space-y-4">
               {recentLeads.map((lead: any, i: number) => (
                 <div key={lead.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center text-brand font-bold text-xl uppercase">
                          {lead.name[0]}
                       </div>
                       <div>
                          <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{lead.name}</p>
                           <p className="text-[10px] font-bold uppercase text-text-muted">{lead.company || "Direct Individual"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-12">
                       <span className="hidden md:block text-[10px] font-bold uppercase text-text-muted max-w-[150px] truncate">{lead.email}</span>
                        <span className="px-4 py-1 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase border border-brand/10">{lead.status}</span>
                       <ArrowUpRight size={18} className="text-text-muted group-hover:text-brand transition-colors" />
                    </div>
                 </div>
               ))}
               {recentLeads.length === 0 && (
                  <p className="text-center py-10 text-text-muted font-bold uppercase text-[10px]">No recent leads found.</p>
               )}
            </div>
         </div>

         {/* System Health / Quick Actions */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-white rounded-[2rem] border border-stroke p-10 space-y-8">
               <h3 className="text-xl font-bold uppercase tracking-tighter text-text-primary">System <span className="text-brand">Nodes.</span></h3>
               <div className="space-y-6">
                  {[
                    { label: "Page Speed", val: "98/100", status: "Healthy" },
                    { label: "Mobile View", val: "Optimal", status: "Healthy" },
                    { label: "SEO Status", val: "Active", status: "Healthy" }
                  ].map((node: any, i: number) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span className="text-text-muted">{node.label}</span>
                          <span className="text-brand">{node.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            className="h-full bg-brand"
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-brand rounded-[2rem] p-10 text-white space-y-6">
               <h3 className="text-xl font-bold uppercase tracking-tighter leading-none">New <br />Content.</h3>
               <div className="grid grid-cols-2 gap-4">
                   <button className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10">
                      <Briefcase size={20} />
                      <span className="text-[9px] font-bold uppercase">New Job</span>
                   </button>
                   <button className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10">
                      <FileText size={20} />
                      <span className="text-[9px] font-bold uppercase">New Post</span>
                   </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}


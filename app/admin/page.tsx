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

export default function AdminDashboard() {
  const STATS = [
    { label: "Active Nodes", val: "18", delta: "+2", icon: Zap },
    { label: "Total Leads", val: "142", delta: "+12", icon: Users },
    { label: "Blog Impact", val: "12k", delta: "+8%", icon: Activity },
    { label: "ROAS Lift", val: "3.2x", delta: "0.4", icon: TrendingUp },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Dashboard Overview<span className="text-brand">Overview.</span></h1>
            <p className="text-text-muted text-sm font-medium uppercase tracking-widest">System Status: Optimal | Global Sync Active</p>
         </div>
         <div className="flex gap-4">
            <button className="btn-outline h-12 px-6 text-[10px] font-bold uppercase tracking-widest shadow-sm">Export Data</button>
            <button className="btn-primary h-12 px-6 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand/10">Initialize Sync</button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {STATS.map((stat, i) => (
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
                 <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{stat.delta}</span>
              </div>
              <h3 className="text-3xl font-bold tracking-tighter mb-2">{stat.val}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</p>
           </motion.div>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Recent Leads */}
         <div className="lg:col-span-8 bg-white rounded-[2rem] border border-stroke p-10 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-bold uppercase tracking-tighter">Recent Leads <span className="text-brand">Pipeline.</span></h3>
               <Link href="/admin/leads" className="text-[10px] font-bold uppercase tracking-widest text-brand hover:underline">View Pipeline</Link>
            </div>
            
            <div className="space-y-4">
               {[
                 { name: "John Doe", company: "Apple Inc.", type: "SEO Audit", status: "Active" },
                 { name: "Jane Smith", company: "Stripe", type: "Design System", status: "Proposal" },
                 { name: "Sarah Connor", company: "Cyberdyne", type: "Infrastructure", status: "New" },
                 { name: "Peter Parker", company: "Daily Bugle", type: "Meta Ads", status: "Discovery" }
               ].map((lead, i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center text-brand font-bold text-xl">
                          {lead.name[0]}
                       </div>
                       <div>
                          <p className="text-sm font-bold uppercase tracking-tight">{lead.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{lead.company}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-12">
                       <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-text-muted">{lead.type}</span>
                       <span className="px-4 py-1 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase tracking-widest border border-brand/10">{lead.status}</span>
                       <ArrowUpRight size={18} className="text-text-muted group-hover:text-brand transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* System Health / Quick Actions */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-white rounded-[2rem] border border-stroke p-10 space-y-8">
               <h3 className="text-xl font-bold uppercase tracking-tighter">System <span className="text-brand">Nodes.</span></h3>
               <div className="space-y-6">
                  {[
                    { label: "Frontend Speed", val: "98/100", status: "Healthy" },
                    { label: "API Response", val: "124ms", status: "Optimal" },
                    { label: "SEO Indexing", val: "Active", status: "Synched" }
                  ].map((node, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
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
               <h3 className="text-xl font-bold uppercase tracking-tighter leading-none">Quick <br /> Deployment.</h3>
               <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10">
                     <Briefcase size={20} />
                     <span className="text-[9px] font-bold uppercase tracking-widest">New Job</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10">
                     <FileText size={20} />
                     <span className="text-[9px] font-bold uppercase tracking-widest">New Post</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

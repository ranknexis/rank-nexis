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
    ShieldCheck,
    Database,
    HardDrive,
    Server,
    CheckCircle2,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSystemPerformance } from "@/actions/performance";
import { getAuditLogs } from "@/actions/audit";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [perf, setPerf] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
        const fetchPerf = async () => {
            const data = await getSystemPerformance();
            setPerf(data);
        };
        const fetchLogs = async () => {
            const data = await getAuditLogs(5);
            setLogs(data);
        };
        fetchPerf();
        fetchLogs();
        const interval = setInterval(() => {
            fetchPerf();
            fetchLogs();
        }, 10000);
        return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const STATS_CONFIG = [
    { label: "Active Clients", val: stats.clients.toString(), delta: "+2", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Total Leads", val: stats.leads.toString(), delta: "+12", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Blog Posts", val: stats.blogs.toString(), delta: "+8%", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Business Growth", val: stats.growth, delta: "0.4", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
        window.location.reload();
    }, 800);
  };

  return (
    <div className="space-y-12">

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
         <div className="flex gap-4">
            <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`w-12 h-12 flex items-center justify-center rounded-xl border border-stroke bg-white text-text-muted hover:text-brand hover:border-brand/30 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                title="Refresh Metrics"
            >
                <RefreshCw size={18} />
            </button>
            {isAdmin && (
                <>
                <Link href="/dashboard/leads" className="btn-outline h-12 px-6 text-xs font-bold uppercase rounded-xl flex items-center gap-2 hover:bg-surface duration-300 transition-all shadow-sm">
                    Review Leads
                </Link>
                <Link href="/dashboard/settings" className="btn-primary h-12 px-6 text-xs font-bold uppercase rounded-xl flex items-center gap-2 shadow-premium duration-300 transition-all">
                    System Settings
                </Link>
                </>
            )}
         </div>
      </div>

      {isAdmin && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            <div className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:shadow-premium transition-all relative overflow-hidden grain group">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Database size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Prisma Logic</p>
                        <p className="text-sm font-bold uppercase text-text-primary">Database Sync</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-1.5 text-emerald-500">
                            <CheckCircle2 size={14} />
                            <span className="text-[9px] font-black uppercase">Active</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[94%]" />
                    </div>
                    <p className="text-[8px] font-bold uppercase text-text-muted text-right">94% Efficiency</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:shadow-premium transition-all relative overflow-hidden grain group">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand/5 text-brand flex items-center justify-center">
                        <HardDrive size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Asset Hub</p>
                        <p className="text-sm font-bold uppercase text-text-primary">Media Storage</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-1.5 text-emerald-500">
                            <CheckCircle2 size={14} />
                            <span className="text-[9px] font-black uppercase">Healthy</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-brand w-[82%]" />
                    </div>
                    <p className="text-[8px] font-bold uppercase text-text-muted text-right">82% Capacity</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:shadow-premium transition-all relative overflow-hidden grain group">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Server size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Edge Node</p>
                        <p className="text-sm font-bold uppercase text-text-primary">Server Status</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-1.5 text-blue-500">
                            <RefreshCw size={14} className="animate-spin-slow" />
                            <span className="text-[9px] font-black uppercase">Live</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[99%]" />
                    </div>
                    <p className="text-[8px] font-bold uppercase text-text-muted text-right">Uptime: 99.9%</p>
                </div>
            </div>
        </motion.div>
      )}

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
                 <div className={`w-14 h-14 rounded-2xl ${stat.bg} border border-stroke flex items-center justify-center ${stat.color} group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm`}>
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

      {isAdmin && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="bg-white rounded-[2rem] border border-stroke p-8 md:p-10 space-y-10 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">System <span className="text-brand">Intelligence.</span></h3>
                        <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Real-time performance & infrastructure telemetry</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100">Optimal Load</span>
                        <span className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">v1.2.4-stable</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="p-6 bg-surface/50 rounded-2xl border border-stroke/60 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-stroke flex items-center justify-center text-brand">
                                        <Activity size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-tight text-text-primary">DB Sync Latency</p>
                                </div>
                                <span className="text-[10px] font-black text-brand">{perf?.db?.latency || 0}ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-stroke/30">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((perf?.db?.latency || 0) / 2, 100)}%` }}
                                    className="h-full bg-brand" 
                                />
                            </div>
                            <p className="text-[8px] font-bold uppercase text-text-muted">RankNexis Node Connectivity: {perf?.db?.status || "PENDING"}</p>

                        </div>

                        <div className="p-6 bg-surface/50 rounded-2xl border border-stroke/60 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-stroke flex items-center justify-center text-purple-500">
                                        <Server size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-tight text-text-primary">System Resources</p>
                                </div>
                                <span className="text-[10px] font-black text-brand">{perf?.server?.memory || 0}% RAM</span>
                            </div>
                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-stroke/30">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${perf?.server?.memory || 0}%` }}
                                    className="h-full bg-brand" 
                                />
                            </div>
                            <p className="text-[8px] font-bold uppercase text-text-muted">CPU Cluster Load: {perf?.server?.cpu || 0}%</p>
                        </div>

                    </div>

                    <div className="bg-text-primary p-8 rounded-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={80} />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight">Master <br />System Overview.</h4>
                        <div className="space-y-4">
                            {[
                                { l: "Auth Protocols", s: "Operational" },
                                { l: "Database Logic", s: "Synchronized" },
                                { l: "Media Assets", s: "CDN-Cached" },
                                { l: "Security Shield", s: "Active" }
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span className="text-[9px] font-bold uppercase text-white/50 tracking-widest">{row.l}</span>
                                    <span className="text-[9px] font-black uppercase text-brand brightness-150">{row.s}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/report" className="w-full mt-6 py-3 bg-white text-text-primary rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-all duration-500 flex items-center justify-center">
                            Generate Full Audit Report
                        </Link>

                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-stroke p-8 space-y-8 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">Critical <span className="text-brand">Logs.</span></h3>
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Recent administrative actions</p>
                </div>
                
                <div className="space-y-6">
                    {logs.length > 0 ? logs.map((log) => (
                        <div key={log.id} className="pl-4 border-l-2 border-brand py-1">
                            <div className="flex justify-between items-start">
                                <p className="text-[10px] font-black uppercase text-text-primary">{log.action.replace(/_/g, ' ')}</p>
                                <span className="text-[8px] font-bold text-text-muted">{new Date(log.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-[9px] font-bold uppercase text-text-muted tracking-tight mt-1">Initiated by {log.userName || "System"} • {log.target}</p>
                        </div>
                    )) : (
                        <div className="py-4 text-center">
                            <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">No recent audit activity</p>
                        </div>
                    )}
                </div>

                <Link href="/dashboard/report" className="w-full py-3 border border-stroke rounded-xl text-[9px] font-bold uppercase tracking-widest text-text-muted hover:border-brand hover:text-brand transition-all flex items-center justify-center">
                    View Complete Log History
                </Link>

            </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

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

         <div className={`space-y-8 ${isAdmin ? 'lg:col-span-4' : 'lg:col-span-12'}`}>
            <div className="bg-white rounded-[2rem] border border-stroke p-8 space-y-6 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">Health <span className="text-brand">Nodes.</span></h3>
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

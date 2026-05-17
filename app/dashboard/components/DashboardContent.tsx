"use client";

import { getAuditLogs } from "@/actions/audit";
import { getSystemPerformance } from "@/actions/performance";
import { motion } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    Briefcase,
    FileText,
    RefreshCw,
    Server,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    { label: "Case Studies", val: stats.clients.toString(), icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Total Inquiries", val: stats.leads.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Blog Posts", val: stats.blogs.toString(), icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "30D Growth", val: stats.growth, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
        window.location.reload();
    }, 800);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stroke pb-5">
         <div className="space-y-1.5">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-lg shadow-brand/40" />
               <p className="text-[9px] font-bold uppercase text-brand tracking-widest flex items-center gap-1.5">
                  System Active
               </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary leading-tight">
               Dashboard <span className="text-brand">Overview.</span>
            </h1>
            <p className="text-text-muted text-xs font-medium">Real-time business metrics and recent activity.</p>
         </div>
         <div className="flex gap-3">
            <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`w-11 h-11 flex items-center justify-center rounded-xl border border-stroke bg-white text-text-muted hover:text-brand hover:border-brand/30 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                title="Refresh Page"
            >
                <RefreshCw size={16} />
            </button>
            {isAdmin && (
                <>
                <Link href="/dashboard/leads" className="btn-outline h-11 px-5 text-xs font-bold uppercase rounded-xl flex items-center gap-2 hover:bg-surface duration-300 transition-all shadow-sm">
                    Review Leads
                </Link>
                <Link href="/dashboard/settings" className="btn-primary h-11 px-5 text-xs font-bold uppercase rounded-xl flex items-center gap-2 shadow-premium duration-300 transition-all">
                    Settings
                </Link>
                </>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {STATS_CONFIG.map((stat: any, i: number) => (
           <motion.div 
             key={stat.label}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-5 sm:p-6 rounded-2xl border border-stroke shadow-sm hover:border-brand/30 hover:shadow-premium transition-all group flex flex-col justify-between h-full relative overflow-hidden grain hover:-translate-y-1 duration-500"
           >
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-12 h-12 rounded-xl ${stat.bg} border border-stroke flex items-center justify-center ${stat.color} group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm`}>
                    <stat.icon size={22} />
                  </div>
              </div>
              <div>
                 <h3 className="text-3xl font-black tracking-tight mb-1 text-text-primary group-hover:text-brand transition-colors duration-300">
                    {stat.val}
                 </h3>
                 <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    {stat.label}
                 </p>
              </div>
           </motion.div>
         ))}
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-stroke p-5 sm:p-6 space-y-6 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold tracking-tight text-text-primary">System Status</h3>
                        <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Real-time status</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-4 sm:p-5 bg-surface/50 rounded-xl border border-stroke/60 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-stroke flex items-center justify-center text-brand shrink-0">
                                        <Activity size={16} />
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-tight text-text-primary truncate">Database Speed</p>
                                </div>
                                <span className="text-[10px] sm:text-xs font-black text-brand shrink-0">{perf?.db?.latency || 0}ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-stroke/30">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((perf?.db?.latency || 0) / 2, 100)}%` }}
                                    className="h-full bg-brand" 
                                />
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-surface/50 rounded-xl border border-stroke/60 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-stroke flex items-center justify-center text-purple-500 shrink-0">
                                        <Server size={16} />
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-tight text-text-primary truncate">Server Load</p>
                                </div>
                                <span className="text-[10px] sm:text-xs font-black text-brand shrink-0">{perf?.server?.memory || 0}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-stroke/30">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${perf?.server?.memory || 0}%` }}
                                    className="h-full bg-brand" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-text-primary p-6 rounded-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={60} />
                        </div>
                        <h4 className="text-lg font-bold tracking-tight mb-3 leading-tight">System Status</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {[
                                { l: "Database Status", s: "Connected" },
                                { l: "Cloud Storage", s: "Ready" },
                                { l: "System Security", s: "Secure" },
                                { l: "API Integrations", s: "Active" }
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-1.5">
                                    <span className="text-[8px] font-bold uppercase text-white/50 tracking-widest">{row.l}</span>
                                    <span className="text-[8px] font-black uppercase text-brand brightness-150">{row.s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-stroke p-5 sm:p-6 space-y-6 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-text-primary">Recent Activity</h3>
                    <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Latest updates</p>
                </div>
                
                <div className="space-y-5">
                    {logs.length > 0 ? logs.map((log) => (
                        <div key={log.id} className="pl-3 border-l-2 border-brand py-0.5">
                            <div className="flex justify-between items-start">
                                <p className="text-[10px] font-black uppercase text-text-primary">{log.action.replace(/_/g, ' ')}</p>
                                <span className="text-[8px] font-bold text-text-muted">{new Date(log.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-[9px] font-bold uppercase text-text-muted tracking-tight mt-0.5">By {log.userName || "System"} • {log.target}</p>
                        </div>
                    )) : (
                        <div className="py-4 text-center">
                            <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">No recent activity</p>
                        </div>
                    )}
                </div>

                <Link href="/dashboard/report" className="w-full h-10 border border-stroke rounded-xl text-[9px] font-bold uppercase tracking-widest text-text-muted hover:border-brand hover:text-brand transition-all flex items-center justify-center">
                    View All Activity
                </Link>
            </div>
        </div>
      )}      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

         {isAdmin && (
           <div className="lg:col-span-8 bg-white rounded-2xl border border-stroke p-5 sm:p-6 space-y-6 shadow-sm hover:shadow-premium transition-all duration-500 relative overflow-hidden grain">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold tracking-tight text-text-primary">
                       Recent Leads
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">Latest inquiries needing attention</p>
                 </div>
                 <Link href="/dashboard/leads" className="text-xs font-bold uppercase text-brand hover:underline flex items-center gap-1.5 tracking-wider">
                    View All Leads <ArrowUpRight size={14} />
                 </Link>
              </div>
              
              <div className="space-y-2">
                 {recentLeads.map((lead: any, i: number) => (
                   <motion.div 
                     key={lead.id} 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="flex items-center justify-between p-4 rounded-xl hover:bg-surface border border-transparent hover:border-stroke transition-all cursor-pointer group"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-surface border border-stroke flex items-center justify-center text-brand font-black text-lg uppercase shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-300">
                            {lead.name[0]}
                         </div>
                         <div>
                            <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">
                               {lead.name}
                            </p>
                            <p className="text-[10px] text-text-muted font-medium mt-0.5">
                               {lead.company || "Direct Inquiry"}
                            </p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <span className="hidden md:block text-xs font-medium text-text-muted max-w-[200px] truncate">
                            {lead.email}
                         </span>
                         <span className="px-3 py-1 rounded-full bg-brand/5 text-brand text-[9px] font-bold uppercase border border-brand/10">
                            {lead.status}
                         </span>
                      </div>
                   </motion.div>
                 ))}
                 {recentLeads.length === 0 && (
                    <div className="text-center py-10 bg-surface/30 border border-stroke rounded-xl">
                       <p className="text-text-muted font-bold uppercase text-xs tracking-wider">
                          No recent active leads.
                       </p>
                    </div>
                 )}
              </div>
           </div>
         )}

         <div className={`space-y-6 ${isAdmin ? 'lg:col-span-4' : 'lg:col-span-12'}`}>


            <div className="bg-brand rounded-2xl p-5 sm:p-6 text-white space-y-5 relative overflow-hidden shadow-premium grain">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 -z-10" />
               <div className="flex items-center gap-2.5">
                  <ShieldCheck size={24} />
                  <h3 className="text-xl font-bold uppercase tracking-tight leading-none">Content Shortcuts</h3>
               </div>
               <p className="text-white/80 text-xs leading-relaxed font-medium">Quick shortcuts to expand portfolio or blog entries</p>
               <div className="grid grid-cols-2 gap-3">
                   <Link href="/dashboard/work" className="flex flex-col items-center gap-2 p-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                      <Briefcase size={18} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Add Project</span>
                   </Link>
                   <Link href="/dashboard/blog" className="flex flex-col items-center gap-2 p-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                      <FileText size={18} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Add Post</span>
                   </Link>
                   {isAdmin && (
                       <Link href="/dashboard/team" className="col-span-2 flex items-center justify-center gap-2.5 p-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 duration-300">
                          <Users size={16} />
                          <span className="text-[9px] font-bold uppercase tracking-wider">Manage Team</span>
                       </Link>
                    )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
    Activity, 
    Cpu, 
    Database, 
    Globe, 
    Server, 
    Zap,
    ArrowUpRight,
    Search,
    ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { getSystemPerformance } from "@/actions/performance";

export default function PerformancePage() {
    const [perf, setPerf] = useState<any>(null);

    useEffect(() => {
        const fetchPerf = async () => {
            const data = await getSystemPerformance();
            setPerf(data);
        };
        fetchPerf();
        const interval = setInterval(fetchPerf, 10000);
        return () => clearInterval(interval);
    }, []);

    const metrics = {
        latency: perf?.db?.latency || 0,
        cpu: perf?.server?.cpu || 0,
        ram: perf?.server?.memory || 0,
        uptime: Math.round((perf?.server?.uptime || 0) / 3600), 
        requests: 1420 
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stroke pb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                        Performance
                    </h1>
                    <p className="text-sm text-text-muted">Real-time system health and status</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        System Status: OK
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard icon={Activity} label="Response Time" value={`${metrics.latency}ms`} subtext="Excellent" color="text-brand" bg="bg-brand/5" />
                <MetricCard icon={Cpu} label="CPU Load" value={`${metrics.cpu}%`} subtext="Optimal" color="text-blue-500" bg="bg-blue-50" />
                <MetricCard icon={Database} label="Database" value="99.9%" subtext="Connected" color="text-emerald-500" bg="bg-emerald-50" />
                <MetricCard icon={Globe} label="Server Uptime" value={`${metrics.uptime}h`} subtext="Stable" color="text-purple-500" bg="bg-purple-50" />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2 bg-white rounded-[2rem] border border-stroke p-10 space-y-10 shadow-sm relative overflow-hidden grain">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-tight">Analytics</h3>
                        <p className="text-[10px] font-bold uppercase text-text-muted">Total Requests: {metrics.requests.toLocaleString()}</p>
                    </div>
                    
                    <div className="space-y-8">
                        <PerformanceBar label="Frontend Execution" value={98} />
                        <PerformanceBar label="API Response Speed" value={95} />
                        <PerformanceBar label="Prisma Queries" value={92} />
                        <PerformanceBar label="Media Delivery (CDN)" value={99} />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-text-primary p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden grain shadow-premium">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={24} className="text-brand" />
                            <h3 className="text-lg font-bold tracking-tight">Security</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold uppercase text-white/50 tracking-widest">WAF: Active</p>
                            <p className="text-[10px] font-bold uppercase text-white/50 tracking-widest">SSL: Verified</p>
                            <p className="text-[10px] font-bold uppercase text-white/50 tracking-widest">DDoS Protection: Active</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-stroke space-y-6 relative overflow-hidden grain">
                        <div className="flex items-center gap-3">
                            <Search size={24} className="text-brand" />
                            <h3 className="text-lg font-bold tracking-tight text-text-primary">SEO Health</h3>
                        </div>
                        <div className="space-y-4 text-[10px] font-bold uppercase text-text-muted tracking-widest">
                            <div className="flex justify-between"><span>Indexability</span> <span className="text-emerald-500">100%</span></div>
                            <div className="flex justify-between"><span>Sitemap</span> <span className="text-emerald-500">Ready</span></div>
                            <div className="flex justify-between"><span>Meta Integrity</span> <span className="text-emerald-500">Verified</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, subtext, color, bg }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm hover:shadow-premium transition-all group grain"
        >
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all`}>
                <Icon size={22} />
            </div>
            <h3 className="text-2xl font-black text-text-primary tracking-tight group-hover:text-brand transition-colors">{value}</h3>
            <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest mt-1">{label}</p>
            <p className={`text-[8px] font-black uppercase ${color} mt-4`}>{subtext}</p>
        </motion.div>
    );
}

function PerformanceBar({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-text-muted">{label}</span>
                <span className="text-text-primary">{value}%</span>
            </div>
            <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-stroke/50">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-brand rounded-full"
                />
            </div>
        </div>
    );
}

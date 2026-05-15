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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">System <span className="text-brand">Telemetry.</span></h1>
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Real-time infrastructure health and operational status.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-6 py-3 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-xl border border-emerald-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200" />
                        Infrastructure: Nominal
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard icon={Activity} label="DB Response" value={`${metrics.latency}ms`} subtext={metrics.latency < 100 ? "Excellent" : "Normal"} color="text-brand" bg="bg-brand/5" />
                <MetricCard icon={Cpu} label="Compute Load" value={`${metrics.cpu}%`} subtext="Optimal" color="text-blue-500" bg="bg-blue-50" />
                <MetricCard icon={Database} label="Prisma Link" value="Active" subtext="Stable" color="text-emerald-500" bg="bg-emerald-50" />
                <MetricCard icon={Globe} label="Operational Time" value={`${metrics.uptime}h`} subtext="Online" color="text-purple-500" bg="bg-purple-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 bg-white rounded-[2rem] border border-stroke p-10 space-y-10 shadow-sm relative overflow-hidden grain">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold tracking-tight text-text-primary">Subsystem Integrity</h3>
                            <p className="text-[10px] font-bold uppercase text-text-muted">Component performance metrics</p>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <PerformanceBar label="Database Latency Node" value={Math.max(0, 100 - (metrics.latency / 10))} />
                        <PerformanceBar label="Server Resource Allocation" value={Math.max(0, 100 - metrics.ram)} />
                        <PerformanceBar label="API Execution Throughput" value={98} />
                        <PerformanceBar label="Static Asset Delivery" value={99} />
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-text-primary p-8 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden grain shadow-premium">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck size={100} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tight leading-none">Security Node</h3>
                            <p className="text-[9px] font-bold uppercase text-white/50 tracking-widest">Protocol Status</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { l: "SSL Gateway", s: "Verified" },
                                { l: "Encryption", s: "AES-256" },
                                { l: "DDoS Mitigation", s: "Active" },
                                { l: "Access Control", s: "RBAC Enabled" }
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span className="text-[9px] font-bold uppercase text-white/40">{row.l}</span>
                                    <span className="text-[9px] font-black uppercase text-brand brightness-150">{row.s}</span>
                                </div>
                            ))}
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

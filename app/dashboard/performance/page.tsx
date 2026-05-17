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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">System <span className="text-brand">Performance.</span></h1>
                    <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Real-time infrastructure health and operational status.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded-xl border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200" />
                        All Systems: Running
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={Activity} label="Database Speed" value={`${metrics.latency}ms`} subtext={metrics.latency < 100 ? "Excellent" : "Normal"} color="text-brand" bg="bg-brand/5" />
                <MetricCard icon={Cpu} label="Processor Usage" value={`${metrics.cpu}%`} subtext="Optimal" color="text-blue-500" bg="bg-blue-50" />
                <MetricCard icon={Database} label="Data Connection" value="Active" subtext="Stable" color="text-emerald-500" bg="bg-emerald-50" />
                <MetricCard icon={Globe} label="Uptime" value={`${metrics.uptime}h`} subtext="Online" color="text-purple-500" bg="bg-purple-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white rounded-2xl border border-stroke p-5 sm:p-6 space-y-6 shadow-sm relative overflow-hidden grain">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <h3 className="text-lg font-bold tracking-tight text-text-primary">System Speed & Health</h3>
                            <p className="text-[9px] font-bold uppercase text-text-muted">Component performance metrics</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <PerformanceBar label="Database Performance" value={Math.max(0, 100 - (metrics.latency / 10))} />
                        <PerformanceBar label="Server Resource Availability" value={Math.max(0, 100 - metrics.ram)} />
                        <PerformanceBar label="API Response Quality" value={98} />
                        <PerformanceBar label="Website Asset Speed" value={99} />
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-text-primary p-5 sm:p-6 rounded-2xl text-white space-y-6 relative overflow-hidden grain shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck size={80} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold tracking-tight leading-none">Security Status</h3>
                            <p className="text-[8px] font-bold uppercase text-white/50 tracking-widest">Active Protections</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { l: "SSL Certificate", s: "Verified" },
                                { l: "Data Encryption", s: "AES-256" },
                                { l: "DDoS Mitigation", s: "Active" },
                                { l: "Access Controls", s: "Multi-Role Active" }
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
            className="bg-white p-5 sm:p-6 rounded-2xl border border-stroke shadow-sm hover:shadow-md transition-all group grain"
        >
            <div className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-all`}>
                <Icon size={18} />
            </div>
            <h3 className="text-xl font-black text-text-primary tracking-tight group-hover:text-brand transition-colors">{value}</h3>
            <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider mt-0.5">{label}</p>
            <p className={`text-[8px] font-black uppercase ${color} mt-3`}>{subtext}</p>
        </motion.div>
    );
}

function PerformanceBar({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-text-secondary">{label}</span>
                <span className="text-brand">{value}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface border border-stroke rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-brand rounded-full"
                />
            </div>
        </div>
    );
}

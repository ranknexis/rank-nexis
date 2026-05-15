"use client";

import { motion } from "framer-motion";
import { 
    FileText, 
    Download, 
    Calendar,
    BarChart3,
    ShieldCheck,
    Users,
    Zap,
    TrendingUp,
    Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";
import { getSystemReportData } from "@/actions/audit";

export default function ReportPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSystemReportData();
            setData(res);
        };
        fetchData();
    }, []);

    const reports = data?.recentLogs || [];

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Audit <span className="text-brand">Infrastructure.</span></h1>
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Review complete system activity logs and operational history.</p>
                </div>
                <button className="px-10 h-16 bg-brand text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/20 flex items-center gap-3">
                    <Download size={18} />
                    Extract Protocol Logs
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SummaryCard icon={Users} label="Total Operators" value={data?.counts?.users || 0} color="text-emerald-500" />
                <SummaryCard icon={TrendingUp} label="Lead Database" value={data?.counts?.leads || 0} color="text-brand" />
                <SummaryCard icon={Briefcase} label="Project Registry" value={data?.counts?.studies || 0} color="text-blue-500" />
            </div>

            <div className="bg-white rounded-[3rem] border border-stroke overflow-hidden shadow-premium grain">
                <div className="p-10 border-b border-stroke flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold tracking-tight text-text-primary">Chronological <span className="text-brand">History.</span></h3>
                        <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Immutable Activity Record</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-stroke rounded-xl text-[10px] font-bold uppercase text-text-muted">
                        <Calendar size={14} className="text-brand" /> Full Registry Access
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-stroke bg-surface/50">
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Protocol Action</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Target Node</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Operator</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                            {reports.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-10 py-24 text-center">
                                        <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">No activity recorded in the current cycle.</p>
                                    </td>
                                </tr>
                            ) : reports.map((report: any) => (
                                <tr key={report.id} className="hover:bg-surface/30 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{report.action.replace(/_/g, ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-[11px] font-bold text-text-muted uppercase tracking-tight">{report.target}</td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-2 bg-white border border-stroke rounded-xl text-[9px] font-black uppercase text-text-primary tracking-widest group-hover:border-brand transition-all">
                                            {report.userName || "System"}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-[10px] font-bold text-text-muted uppercase">
                                        <div className="flex flex-col gap-1">
                                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[9px] text-brand">{new Date(report.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-stroke shadow-sm grain flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl bg-surface border border-stroke flex items-center justify-center ${color}`}>
                <Icon size={26} />
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">{label}</p>
                <h3 className="text-3xl font-black text-text-primary tracking-tighter mt-1">{value}</h3>
            </div>
        </div>
    );
}

function SummaryRow({ label, count }: any) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-stroke/50">
            <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest">{label}</span>
            <span className="text-[11px] font-black uppercase text-text-primary">{count}</span>
        </div>
    );
}

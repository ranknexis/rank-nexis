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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Activity <span className="text-brand">History.</span></h1>
                    <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Review complete system activity logs and operational history.</p>
                </div>
                <button className="px-5 h-11 bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-brand-dark active:scale-95 transition-all shadow-md flex items-center gap-2">
                    <Download size={14} />
                    Extract Logs
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard icon={Users} label="Active Users" value={data?.counts?.users || 0} color="text-emerald-500" />
                <SummaryCard icon={TrendingUp} label="Lead Database" value={data?.counts?.leads || 0} color="text-brand" />
                <SummaryCard icon={Briefcase} label="Case Studies" value={data?.counts?.studies || 0} color="text-blue-500" />
            </div>

            <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm grain">
                <div className="p-5 sm:p-6 border-b border-stroke flex justify-between items-center gap-4 bg-surface/30">
                    <div className="space-y-0.5">
                        <h3 className="text-lg font-bold tracking-tight text-text-primary">Recent <span className="text-brand">Activity.</span></h3>
                        <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Official Activity Record</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-stroke rounded-xl text-[9px] font-bold uppercase text-text-muted shadow-sm">
                        <Calendar size={12} className="text-brand" /> Complete Activity History
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-stroke bg-surface/10">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Action Performed</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Modified Section</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Team Member</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                            {reports.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No activity recorded in the current cycle.</p>
                                    </td>
                                </tr>
                            ) : reports.map((report: any) => (
                                <tr key={report.id} className="hover:bg-surface/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                                                <ShieldCheck size={16} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{report.action.replace(/_/g, ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-tight">{report.target}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1.5 bg-white border border-stroke rounded-xl text-[9px] font-black uppercase text-text-primary tracking-wider group-hover:border-brand transition-all">
                                            {report.userName || "System"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase">
                                        <div className="flex flex-col gap-0.5">
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
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stroke shadow-sm grain flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl bg-surface border border-stroke flex items-center justify-center ${color}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">{label}</p>
                <h3 className="text-2xl font-black text-text-primary tracking-tight mt-0.5">{value}</h3>
            </div>
        </div>
    );
}

function SummaryRow({ label, count }: any) {
    return (
        <div className="flex justify-between items-center py-2.5 border-b border-stroke/50">
            <span className="text-[9px] font-bold uppercase text-text-muted tracking-wider">{label}</span>
            <span className="text-[10px] font-black uppercase text-text-primary">{count}</span>
        </div>
    );
}

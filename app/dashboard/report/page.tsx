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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stroke pb-8">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-primary">
                        System <span className="text-brand">Report.</span>
                    </h1>
                    <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Historical audit logs and generated intelligence reports</p>
                </div>
                <button className="px-6 h-14 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-all shadow-xl flex items-center gap-3">
                    <Download size={18} />
                    Generate New Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SummaryCard icon={Users} label="Total Experts" value={data?.counts?.users || 0} color="text-emerald-500" />
                <SummaryCard icon={TrendingUp} label="Total Leads" value={data?.counts?.leads || 0} color="text-brand" />
                <SummaryCard icon={Briefcase} label="Case Studies" value={data?.counts?.studies || 0} color="text-blue-500" />
            </div>


            <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm shadow-premium/5 grain">
                <div className="p-8 border-b border-stroke flex justify-between items-center">
                    <h3 className="text-lg font-black uppercase tracking-tight">Available <span className="text-brand">Audits.</span></h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                        <Calendar size={14} /> Last 30 Days
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-stroke bg-surface/50">
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Event Node</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Target Entity</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Initiated By</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Timestamp</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                            {reports.map((report: any) => (
                                <tr key={report.id} className="hover:bg-surface/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                                                <ShieldCheck size={18} />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-tight text-text-primary">{report.action.replace(/_/g, ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[10px] font-bold text-text-muted uppercase tracking-tight">{report.target}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-surface border border-stroke rounded-full text-[8px] font-black uppercase text-brand tracking-widest">
                                            {report.userName || "System"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-[10px] font-bold text-text-muted uppercase">{new Date(report.createdAt).toLocaleString()}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-[10px] font-black uppercase text-brand hover:underline">
                                            Audit Link
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-[2.5rem] border border-stroke space-y-8 grain">
                    <div className="flex items-center gap-3">
                        <Users size={24} className="text-brand" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Active Nodes</h3>
                    </div>
                    <div className="space-y-4">
                        <NodeRow label="Admin Access" count={1} />
                        <NodeRow label="Team Members" count={5} />
                        <NodeRow label="Inquiry Agents" count={12} />
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-stroke space-y-8 grain">
                    <div className="flex items-center gap-3">
                        <Briefcase size={24} className="text-brand" />
                        <h3 className="text-lg font-black uppercase tracking-tight">Resource Utilization</h3>
                    </div>
                    <div className="space-y-4">
                        <NodeRow label="Database Storage" count="124 MB / 512 MB" />
                        <NodeRow label="Media Assets" count="1.2 GB / 5 GB" />
                        <NodeRow label="API Bandwidth" count="2.4k / 10k req" />
                    </div>
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

function NodeRow({ label, count }: any) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-stroke/50">
            <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest">{label}</span>
            <span className="text-[11px] font-black uppercase text-text-primary">{count}</span>
        </div>
    );
}

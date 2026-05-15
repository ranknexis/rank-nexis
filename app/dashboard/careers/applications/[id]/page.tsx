import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Briefcase, Calendar, FileText, Globe, User } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: Props) {
    const { id } = await params;
    
    const application = await prisma.application.findUnique({
        where: { id },
        include: { job: true }
    });

    if (!application) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <Link 
                        href="/dashboard/careers/applications" 
                        className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-all group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Inbound Queue
                    </Link>
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
                        Application <span className="text-brand">Protocol.</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Candidate Info */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-[3rem] border border-stroke shadow-premium p-12 md:p-20 space-y-16">
                        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                            <div className="w-24 h-24 rounded-[2rem] bg-brand/10 flex items-center justify-center text-brand">
                                <User size={40} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase text-brand tracking-[0.3em]">Candidate Name</p>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-text-primary">{application.name}</h2>
                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                        <Mail size={14} className="text-brand" /> {application.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                        <Briefcase size={14} className="text-brand" /> {application.job.title}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                        <Calendar size={14} className="text-brand" /> {new Date(application.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FileText size={18} className="text-brand" />
                                    <h3 className="text-sm font-bold uppercase tracking-tight">Cover Letter / Submission Note</h3>
                                </div>
                                <div className="p-10 bg-surface/50 border border-stroke rounded-[2rem] text-sm leading-relaxed text-text-secondary whitespace-pre-wrap uppercase font-medium">
                                    {application.coverLetter || "No cover letter provided."}
                                </div>
                            </div>

                            {application.portfolio && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="text-brand" />
                                        <h3 className="text-sm font-bold uppercase tracking-tight">Digital Portfolio / LinkedIn</h3>
                                    </div>
                                    <a 
                                        href={application.portfolio} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-stroke rounded-xl text-[10px] font-bold uppercase text-brand hover:border-brand transition-all shadow-sm"
                                    >
                                        Access Digital Footprint <ChevronLeft size={14} className="rotate-180" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resume Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-stroke shadow-premium p-10 space-y-8">
                        <div className="flex items-center gap-4 pb-6 border-b border-stroke">
                            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <h2 className="text-sm font-bold uppercase tracking-tight">Curriculum Vitae</h2>
                        </div>
                        
                        <div className="space-y-6">
                            <p className="text-[10px] text-text-muted leading-relaxed uppercase">
                                Access the candidate's professional resume. For security, ensure all external links are verified.
                            </p>
                            <a 
                                href={application.resume} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full h-16 bg-brand text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3"
                            >
                                <FileText size={18} /> Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

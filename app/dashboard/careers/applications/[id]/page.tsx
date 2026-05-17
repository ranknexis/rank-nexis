import prisma from "@/lib/prisma";
import { ArrowLeft, Briefcase, Calendar, FileText, Globe, Mail, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-stroke pb-4">
                <div className="space-y-1">
                    <Link 
                        href="/dashboard/careers/applications" 
                        className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-all group mb-1.5"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Applications
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">
                        Review <span className="text-brand">Application.</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl border border-stroke shadow-sm p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                            <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                                <User size={24} />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                                <p className="text-[9px] font-black uppercase text-brand tracking-[0.2em]">Candidate Name</p>
                                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary truncate">{application.name}</h2>
                                <div className="flex flex-wrap gap-4 pt-1">
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-muted">
                                        <Mail size={12} className="text-brand shrink-0" /> {application.email}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-muted">
                                        <Briefcase size={12} className="text-brand shrink-0" /> {application.job.title}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-muted">
                                        <Calendar size={12} className="text-brand shrink-0" /> {new Date(application.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-brand" />
                                    <h3 className="text-xs font-bold uppercase tracking-tight text-text-primary">Cover Letter / Message</h3>
                                </div>
                                <div className="p-5 bg-surface/50 border border-stroke rounded-xl text-xs leading-relaxed text-text-secondary whitespace-pre-wrap font-medium">
                                    {application.coverLetter || "No cover letter provided."}
                                </div>
                            </div>

                            {application.portfolio && (
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} className="text-brand" />
                                        <h3 className="text-xs font-bold uppercase tracking-tight text-text-primary">Portfolio & Links</h3>
                                    </div>
                                    <a 
                                        href={application.portfolio} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 h-10 px-5 bg-white border border-stroke rounded-xl text-[9px] font-black uppercase text-brand hover:border-brand transition-all shadow-sm"
                                    >
                                        Visit Portfolio Website <ArrowLeft size={12} className="rotate-180" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl border border-stroke shadow-sm p-6 space-y-5">
                        <div className="flex items-center gap-3 pb-3.5 border-b border-stroke">
                            <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                                <FileText size={16} />
                            </div>
                            <h2 className="text-xs font-bold uppercase tracking-tight text-text-primary">Resume</h2>
                        </div>
                        
                        <div className="space-y-3.5">
                            <p className="text-[9px] text-text-muted leading-relaxed uppercase">
                                View the candidate's professional resume to review experience and qualifications.
                            </p>
                            <a 
                                href={application.resume} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full h-11 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-hover transition-all shadow-lg shadow-brand/10 flex items-center justify-center gap-2"
                            >
                                <FileText size={14} /> View & Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, DollarSign, MapPin } from "lucide-react";
import JobApplicationForm from "../components/JobApplicationForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug } });
  
  if (!job) return { title: "Job Not Found | RankNexis" };

  return {
    title: `${job.title} | Careers at RankNexis`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job || !job.active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        <section className="relative pt-20 pb-12 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke px-4">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max px-4 md:px-0 relative z-10">
              <div className="max-w-4xl mx-auto space-y-6 md:space-y-12">
                 <div>
                    <Link href="/careers" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-brand hover:text-brand/80 pb-1 border-b border-brand">
                      <ArrowLeft size={12} /> Back to Open Nodes
                    </Link>
                 </div>
                 
                 <div className="space-y-6 md:space-y-8">
                    <div className="flex flex-wrap gap-4">
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 glass bg-brand/5 border border-brand/10 text-brand text-[10px] font-bold uppercase rounded-full">
                          Position Open
                       </div>
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 glass text-text-muted text-[10px] font-bold uppercase rounded-full">
                          <MapPin size={12} /> {job.location}
                       </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight uppercase">
                      {job.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-6 md:gap-12 pt-2 md:pt-4">
                       <div className="flex items-center gap-3">
                          <Clock className="text-brand" size={20} />
                          <span className="text-base md:text-lg font-bold uppercase tracking-tight">{job.type}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <DollarSign className="text-brand" size={20} />
                          <span className="text-base md:text-lg font-bold uppercase tracking-tight">Competitive Salary</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="py-16 md:py-32 px-4">
           <div className="container-max px-4 md:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                 <div className="lg:col-span-7 space-y-16 md:space-y-24">
                    <div className="space-y-6 md:space-y-10">
                       <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Role <span className="text-brand">Overview.</span></h2>
                       <p className="text-text-secondary text-base md:text-xl font-medium leading-relaxed">
                          {job.description}
                       </p>
                    </div>

                    {job.responsibilities?.length > 0 && (
                      <div className="space-y-6 md:space-y-10">
                         <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Key <span className="text-brand">Responsibilities.</span></h2>
                         <div className="space-y-4 md:space-y-6">
                            {job.responsibilities.map((res: string) => (
                               <div key={res} className="flex items-start gap-4 p-4 md:p-6 glass border border-stroke rounded-2xl group hover:border-brand transition-all">
                                  <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                                  <p className="text-xs md:text-sm font-bold uppercase leading-relaxed text-text-muted group-hover:text-text-primary">{res}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}

                    {job.requirements?.length > 0 && (
                      <div className="space-y-6 md:space-y-10">
                         <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Job <span className="text-brand">Requirements.</span></h2>
                         <div className="space-y-4 md:space-y-6">
                            {job.requirements.map((req: string) => (
                               <div key={req} className="flex items-start gap-4 p-4 md:p-6 glass border border-stroke rounded-2xl group hover:border-brand transition-all">
                                  <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                                  <p className="text-xs md:text-sm font-bold uppercase leading-relaxed text-text-muted group-hover:text-text-primary">{req}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}

                    {job.benefits?.length > 0 && (
                      <div className="space-y-6 md:space-y-10">
                         <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Team <span className="text-brand">Benefits.</span></h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {job.benefits.map((ben: string) => (
                               <div key={ben} className="flex items-center gap-4 p-4 md:p-5 bg-surface/30 border border-stroke rounded-2xl">
                                  <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                                     <ArrowRight size={14} />
                                  </div>
                                  <span className="text-[10px] font-bold uppercase text-text-muted">{ben}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>

                 <aside className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                    <div className="corporate-card grain p-6 md:p-12 space-y-8 md:space-y-10 shadow-premium border-stroke hover:border-brand transition-all duration-700 bg-white relative overflow-hidden rounded-3xl md:rounded-[2.5rem]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -z-10" />
                        <div className="space-y-4">
                           <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Join Our <span className="text-brand">Team.</span></h3>
                           <p className="text-text-muted text-sm font-medium leading-relaxed">
                               Apply today to be a part of our growing agency. We review every application personally.
                           </p>
                        </div>

                        <JobApplicationForm jobId={job.id} />
                    </div>
                 </aside>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}

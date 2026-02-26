import prisma from "@/lib/prisma";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  User
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({
    where: { slug }
  });

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 overflow-hidden border-b border-stroke">
          <div className="absolute inset-0 -z-10">
             <img 
               src={study.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
               alt={study.title} 
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
          
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
              <div className="lg:col-span-8 space-y-12">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand hover:text-brand/80 pb-1 border-b border-brand">
                    <Link href="/work" className="inline-flex items-center gap-2">
                        <ArrowLeft size={12} /> Back to Archives
                    </Link>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase">
                  {study.title.split(':').length > 1 ? study.title.split(':')[0] : study.title}
                </h1>
                
                <div className="flex flex-wrap gap-12 pt-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Client</p>
                      <p className="text-lg font-bold uppercase tracking-tight">{study.client}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Sector</p>
                      <p className="text-lg font-bold uppercase tracking-tight">{study.tag}</p>
                   </div>
                   {/* We don't have duration in schema yet, but we could add it. For now let's use createdAt or omit. */}
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-end">
                 <div className="glass p-12 rounded-[3rem] border border-stroke text-center space-y-4 shadow-xl shadow-brand/5 min-w-[300px]">
                    <p className="text-6xl font-bold text-brand tracking-tighter">{study.stats}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted">{study.kpi}</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CASE CONTENT */}
        <section className="py-32">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              {/* Problem & Strategy */}
              <div className="lg:col-span-8 space-y-32">
                <div className="space-y-12">
                   <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full">
                      <div className="w-2 h-2 bg-brand rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand">The Challenge</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">The <br /> <span className="text-brand">Problem.</span></h2>
                   <p className="text-text-secondary text-xl leading-relaxed font-medium">
                     {study.challenge}
                   </p>
                </div>

                <div className="space-y-12">
                   <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full">
                      <div className="w-2 h-2 bg-brand rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand">The Solution</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Our <br /> <span className="text-brand">Approach.</span></h2>
                   <p className="text-text-secondary text-xl leading-relaxed font-medium">
                     {study.solution}
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                      {study.execution.map((exc: string) => (
                        <div key={exc} className="flex items-center gap-4 p-6 glass rounded-[2rem] border border-stroke shadow-sm">
                           <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                              <Layers size={20} />
                           </div>
                           <span className="text-[11px] font-bold uppercase tracking-wider leading-tight">{exc}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Verified Results Sidebar */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
                 <div className="corporate-card bg-black p-12 text-white space-y-10 shadow-3xl grain">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand border-b border-white/10 pb-6">Results Achieved</h3>
                    <div className="space-y-8">
                       {study.results.map((res: string) => (
                         <div key={res} className="flex items-start gap-4">
                            <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                            <p className="text-sm font-bold uppercase tracking-wider leading-relaxed">{res}</p>
                         </div>
                       ))}
                    </div>
                    
                    <Link href="/contact" className="btn-primary w-full h-16 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider rounded-xl">
                       Get Similar Results <ArrowRight size={14} className="ml-3" />
                    </Link>
                 </div>

                 <div className="corporate-card p-10 space-y-8 grain">
                    <div className="flex items-center gap-4">
                       <User size={24} className="text-brand" />
                       <h4 className="text-[11px] font-bold uppercase tracking-wider">Client Feedback</h4>
                    </div>
                    <p className="text-text-muted text-sm italic font-medium leading-relaxed">
                      "The technical precision and ROI focus RankNexis brought to this project redefined our scaling trajectory. Highly recommended for enterprise growth."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider">— Project Lead, {study.client}</p>
                 </div>
              </aside>
            </div>
          </div>
        </section>

        {/* DATA REPRESENTATION CTA */}
        <section className="py-48 bg-white relative overflow-hidden grain border-t border-stroke">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
           <div className="container-max relative z-10 text-center space-y-16">
              <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
                 Start Your <br /> <span className="text-brand">Growth Today.</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                 Let us help you grow your business online with our simple and effective marketing strategies.
              </p>
              <div className="flex justify-center flex-wrap gap-8">
                <Link href="/contact" className="btn-primary h-20 px-16 text-xs uppercase tracking-[0.3em] group shadow-premium">
                   Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <Link href="/" className="btn-outline h-20 px-16 text-xs uppercase tracking-[0.3em]">
                   Go Back Home <ExternalLink size={16} className="ml-2" />
                </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  Globe,
  Users,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  Layout,
  Code2,
  Cpu,
  Monitor,
  Share2,
  Search,
  Video
} from "lucide-react";
import Link from "next/link";

export default function ServiceDetailClient({ service, pageData, relatedCaseStudies }: { service: any, pageData: any, relatedCaseStudies: any[] }) {
  const sections = pageData?.sections || [];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* Iterate through sections and render them */}
        {sections.map((section: any, idx: number) => {
          const content = section.content;
          const type = section.sectionType;

          if (type === 'hero') {
            return (
              <section key={idx} className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-stroke bg-surface/30">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 hidden md:block" />
                  {content.image && (
                    <img 
                      src={content.image} 
                      alt={content.title || service.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-10 md:opacity-[0.05] grayscale" 
                    />
                  )}
                </div>
                
                <div className="container-max relative z-10">
                  <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full shadow-sm border border-stroke self-start"
                    >
                      <Link href="/services" className="text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Services</Link>
                      <ChevronRight size={12} className="text-text-muted" />
                      <span className="text-[10px] font-bold uppercase text-brand">{service.title}</span>
                    </motion.div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase"
                    >
                      {content.title || service.title}
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
                    >
                      {content.subtext || service.description}
                    </motion.p>
                  </div>
                </div>
              </section>
            );
          }

          if (type === 'text_block') {
            return (
              <section key={idx} className="py-16 md:py-24 border-b border-stroke last:border-b-0">
                <div className="container-max">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div className={idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                        {content.image && (
                          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-stroke shadow-premium group">
                             <img 
                               src={content.image} 
                               alt={content.title} 
                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                             />
                          </div>
                        )}
                      </div>
                      <div className={idx % 2 === 0 ? "lg:order-1 space-y-8" : "lg:order-2 space-y-8"}>
                         <div className="space-y-4">
                            {content.label && <p className="text-[10px] font-bold uppercase text-brand tracking-[0.2em]">{content.label}</p>}
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                               {content.title}
                            </h2>
                         </div>
                         <p className="text-text-secondary text-lg font-medium leading-relaxed">
                            {content.text || content.body}
                         </p>
                      </div>
                   </div>
                </div>
              </section>
            );
          }

          return null;
        })}

        {/* RELATED CASE STUDIES (BENCHMARKS) */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-24 bg-surface/30">
            <div className="container-max">
              <div className="flex justify-between items-end mb-16">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase text-brand tracking-widest">Case History</p>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Success <span className="text-brand">Benchmarks.</span></h2>
                </div>
                <Link href="/work" className="text-[10px] font-bold uppercase text-brand hover:underline flex items-center gap-2">View Archive <ExternalLink size={12} /></Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {relatedCaseStudies.map((study) => (
                  <Link key={study.id} href={`/work/${study.slug}`} className="glass group p-10 space-y-8 rounded-[3rem] border border-stroke shadow-sm hover:shadow-premium transition-all bg-white">
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase text-brand">{study.tag}</p>
                      <h4 className="text-2xl font-bold uppercase tracking-tight group-hover:text-brand transition-colors">{study.title}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-stroke">
                      <div className="space-y-1">
                        <span className="text-4xl font-black tracking-tighter text-text-primary">{study.stats}</span>
                        <p className="text-[8px] font-bold uppercase text-text-muted tracking-widest">{study.kpi}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-stroke flex items-center justify-center group-hover:border-brand/40 transition-colors">
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-brand" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="py-32 bg-white relative overflow-hidden px-6 grain">
          <div className="container-max text-center relative z-10 space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-bold uppercase text-brand tracking-widest">Next Phase</p>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                  Start Your <br /> <span className="text-brand">Growth.</span>
               </h2>
            </div>
            <p className="text-text-secondary max-w-xl mx-auto text-xl font-medium leading-relaxed">
               Work with our experts to review your goals and build a successful business roadmap.
            </p>
            <div className="flex justify-center pt-8">
              <Link href="/contact" className="btn-primary h-20 px-16 text-[12px] font-bold uppercase group shadow-premium hover:shadow-brand/20 transition-all">
                Partner With Us <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform ml-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

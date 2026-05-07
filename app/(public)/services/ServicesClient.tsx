"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Layers,
  Palette,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  Box,
  Cpu,
  Database,
  Lock,
  Smartphone,
  BarChart
} from "lucide-react";
import Link from "next/link";
import { getSectionData } from "@/lib/pageUtils";
import React, { useMemo } from "react";

const ICON_MAP: Record<string, any> = {
  TrendingUp,
  Users,
  Zap,
  Search,
  Palette,
  Layers,
  Globe,
  Code2,
  BarChart,
  ShieldCheck
};

export default function ServicesClient({ services, sectionsMap }: { services: any[], sectionsMap: any }) {
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Service Operating Systems",
     heading: "Strategic",
     headingAccent: "Expertise.",
     subtext: "We provide elite digital protocols designed to scale brands through precision engineering and data dominance."
  });

  const pillar1 = getSectionData(sectionsMap, "pillar_01", {
     badge: "Pillar 01",
     heading: "Marketing &",
     headingAccent: "Growth Systems."
  });

  const pillar2 = getSectionData(sectionsMap, "pillar_02", {
     badge: "Pillar 02",
     heading: "Creative &",
     headingAccent: "Brand Design."
  });

  const pillar3 = getSectionData(sectionsMap, "pillar_03", {
     badge: "Pillar 03",
     heading: "Engineering &",
     headingAccent: "Web Protocols."
  });

  const techStack = getSectionData(sectionsMap, "tech_stack", {
     badge: "The Engine",
     heading: "System",
     headingAccent: "Architecture."
  });

  const stats = getSectionData(sectionsMap, "growth_stats", {
     items: [
        { title: "System Diagnostic", description: "Comprehensive review of your current digital infrastructure and market positioning." },
        { title: "Growth Architecture", description: "Engineering scalable systems built to handle rapid user acquisition and data loads." },
        { title: "Performance Ops", description: "Continuous monitoring and optimization to ensure your systems lead the market." }
     ]
  });

  const marketingServices = useMemo(() => services.filter(s => s.category === 'MARKETING'), [services]);
  const creativeServices = useMemo(() => services.filter(s => ['BRANDING', 'CREATIVE'].includes(s.category)), [services]);
  const softwareServices = useMemo(() => services.filter(s => s.category === 'SOFTWARE'), [services]);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 border-b border-stroke overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.4em]">{hero.badge}</p>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase">
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed antialiased">
                {hero.subtext}
              </p>
            </motion.div>
          </div>
        </section>

        {/* PILLAR NAVIGATION */}
        <section className="section-padding">
          <div className="container-max space-y-32">
            
            {/* PILLAR 01: MARKETING */}
            <div id="marketing" className="scroll-mt-32 space-y-16">
               <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar1.badge}</p>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar1.heading} <br /> <span className="text-brand">{pillar1.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketingServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

            {/* PILLAR 02: BRANDING & CREATIVE */}
            <div id="design" className="scroll-mt-32 space-y-16">
               <div className="space-y-6 text-left md:text-right">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar2.badge}</p>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar2.heading} <br /> <span className="text-brand">{pillar2.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {creativeServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

            {/* PILLAR 03: SOFTWARE */}
            <div id="development" className="scroll-mt-32 space-y-16">
               <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar3.badge}</p>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar3.heading} <br /> <span className="text-brand">{pillar3.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {softwareServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

          </div>
        </section>

        {/* TECH STACK VISUAL */}
        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="text-center mb-24 space-y-6">
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.5em]">{techStack.badge}</p>
                 <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight antialiased">{techStack.heading} <span className="text-brand">{techStack.headingAccent}</span></h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 <TechNode icon={Cpu} label="Edge Computing" />
                 <TechNode icon={Database} label="Data Silos" />
                 <TechNode icon={ShieldCheck} label="TLS Encryption" />
                 <TechNode icon={Zap} label="Low Latency" />
                 <TechNode icon={Globe} label="CDN Nodes" />
                 <TechNode icon={Smartphone} label="Mobile First" />
              </div>
           </div>
        </section>

        {/* INTEGRATED STACK */}
        <section className="section-padding bg-white relative overflow-hidden">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {(stats.items || []).map((item: any, i: number) => (
                  <StackItem 
                    key={i}
                    title={item.title} 
                    desc={item.description} 
                  />
                ))}
              </div>
           </div>
        </section>


        {/* FINAL CTA */}
        <section className="py-48 bg-white relative overflow-hidden grain border-t border-stroke text-center">
          <div className="container-max space-y-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight antialiased">Ready to <span className="text-brand">Launch?</span></h2>
            <div className="flex justify-center">
              <Link href="/contact" className="btn-primary h-20 px-20 text-[10px] font-bold uppercase tracking-[0.3em] group shadow-premium flex items-center gap-3">
                Initiate Strategy Call <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const ServiceSummaryCard = React.memo(({ service }: { service: any }) => {
  const Icon = ICON_MAP[service.icon || "Zap"] || Zap;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="glass group p-10 flex flex-col justify-between hover:border-brand/40 transition-all duration-500 rounded-[3rem] shadow-sm hover:shadow-premium h-full border border-stroke bg-white relative overflow-hidden"
    >
       <div className="space-y-8 relative z-10">
          <div className="bg-surface border border-stroke w-16 h-16 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm">
             <Icon size={32} strokeWidth={1.5} />
          </div>
          <div className="space-y-4">
             <h3 className="text-3xl font-bold uppercase tracking-tight leading-none group-hover:text-brand transition-colors antialiased">
                {service.title}
             </h3>
             <p className="text-text-muted text-lg font-medium leading-relaxed antialiased line-clamp-4">
                {service.description}
             </p>
          </div>
       </div>
       <div className="pt-8 mt-10 border-t border-stroke relative z-10">
          <Link href={`/services/${service.slug}`} className="btn-outline h-14 w-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest group/btn bg-white hover:border-brand hover:text-brand transition-all border border-stroke">
             Learn More <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
       </div>
    </motion.div>
  );
});

const TechNode = React.memo(({ icon: Icon, label }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="glass border border-stroke rounded-[2rem] flex flex-col items-center justify-center gap-6 hover:border-brand transition-all duration-700 shadow-premium group cursor-default p-8 bg-white/50 backdrop-blur-sm"
    >
      <Icon size={48} strokeWidth={1} className="text-brand/30 group-hover:text-brand transition-all duration-500 group-hover:scale-110" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted text-center leading-tight">{label}</span>
    </motion.div>
  );
});

const StackItem = React.memo(({ title, desc }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex gap-8 group bg-surface border border-stroke p-10 rounded-[2.5rem] hover:border-brand transition-all"
    >
      <div className="w-16 h-16 shrink-0 bg-white border border-stroke rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
        <ShieldCheck size={32} />
      </div>
      <div>
        <h4 className="text-2xl font-bold mb-3 uppercase tracking-tight leading-none antialiased group-hover:text-brand transition-colors">{title}</h4>
        <p className="text-text-muted text-lg font-medium leading-relaxed antialiased">{desc}</p>
      </div>
    </motion.div>
  );
});

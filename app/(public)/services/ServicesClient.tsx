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
     badge: "Our Core Offerings",
     heading: "Strategic",
     headingAccent: "Expertise.",
     subtext: "We provide premium digital solutions designed to scale brands through expert design and data-driven strategy."
  });

  const pillar1 = getSectionData(sectionsMap, "pillar_01", {
     badge: "Marketing",
     heading: "Marketing &",
     headingAccent: "Growth Strategy."
  });

  const pillar2 = getSectionData(sectionsMap, "pillar_02", {
     badge: "Pillar 02",
     heading: "Creative &",
     headingAccent: "Brand Design."
  });

  const pillar3 = getSectionData(sectionsMap, "pillar_03", {
     badge: "Development",
     heading: "Development &",
     headingAccent: "Web Solutions."
  });

  const techStack = getSectionData(sectionsMap, "tech_stack", {
     badge: "The Engine",
     heading: "Growth",
     headingAccent: "Platform."
  });

  const stats = getSectionData(sectionsMap, "growth_stats", {
     items: [
        { title: "Market Diagnostics", description: "Comprehensive review of your current digital presence and market positioning." },
        { title: "Growth Scaling", description: "Designing flexible strategic models built to handle rapid business growth." },
        { title: "Performance Optimization", description: "Continuous refinement and optimization to ensure your business leads the market." }
     ]
  });

  const marketingServices = useMemo(() => services.filter(s => s.category === 'MARKETING'), [services]);
  const creativeServices = useMemo(() => services.filter(s => ['BRANDING', 'CREATIVE'].includes(s.category)), [services]);
  const softwareServices = useMemo(() => services.filter(s => s.category === 'SOFTWARE'), [services]);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        <section className="relative pt-16 md:pt-32 pb-12 md:pb-24 border-b border-stroke overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-4 md:space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-3 md:space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.4em]">{hero.badge}</p>
              </div>
              
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase px-4 md:px-0">
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-base md:text-2xl font-medium leading-relaxed antialiased px-4 md:px-0">
                {hero.subtext}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max space-y-12 md:space-y-32">

            <div id="marketing" className="scroll-mt-32 space-y-6 md:space-y-16">
               <div className="space-y-3 md:space-y-6">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar1.badge}</p>
                  <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar1.heading} <br /> <span className="text-brand">{pillar1.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {marketingServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

            <div id="design" className="scroll-mt-32 space-y-6 md:space-y-16">
               <div className="space-y-3 md:space-y-6 text-left md:text-right">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar2.badge}</p>
                  <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar2.heading} <br /> <span className="text-brand">{pillar2.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {creativeServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

            <div id="development" className="scroll-mt-32 space-y-6 md:space-y-16">
               <div className="space-y-3 md:space-y-6">
                  <p className="text-[11px] font-bold uppercase text-brand tracking-[0.3em]">{pillar3.badge}</p>
                  <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight leading-tight antialiased">{pillar3.heading} <br /> <span className="text-brand">{pillar3.headingAccent}</span></h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {softwareServices.map((s) => (
                  <ServiceSummaryCard key={s.id} service={s} />
                ))}
               </div>
            </div>

          </div>
        </section>

        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="text-center mb-8 md:mb-24 space-y-3 md:space-y-6">
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.5em]">{techStack.badge}</p>
                 <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight antialiased">{techStack.heading} <span className="text-brand">{techStack.headingAccent}</span></h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                 <TechCard icon={Cpu} label="Edge Computing" />
                 <TechCard icon={Database} label="Data Integration" />
                 <TechCard icon={ShieldCheck} label="Secure Systems" />
                 <TechCard icon={Zap} label="High Speed" />
                 <TechCard icon={Globe} label="Content Delivery" />
                 <TechCard icon={Smartphone} label="Mobile First" />
              </div>
           </div>
        </section>

        <section className="section-padding bg-white relative overflow-hidden">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-12">
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

        <section className="py-12 md:py-32 bg-white relative overflow-hidden grain border-t border-stroke text-center">
          <div className="container-max space-y-6 md:space-y-16">
            <h2 className="text-xl md:text-5xl font-bold uppercase tracking-tight antialiased">Ready to <span className="text-brand">Launch?</span></h2>
            <div className="flex justify-center px-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto h-16 md:h-20 px-10 md:px-20 text-[10px] font-bold uppercase tracking-[0.3em] group shadow-premium flex items-center justify-center gap-3">
                Book a Call <ArrowRight className="group-hover:translate-x-2 transition-transform" />
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: 0.4 }}
      className="glass group p-5 md:p-10 flex flex-col justify-between hover:border-brand/40 transition-all duration-500 rounded-2xl md:rounded-[3rem] shadow-sm hover:shadow-premium h-full border border-stroke bg-white relative overflow-hidden will-change-gpu"
    >
       <div className="space-y-4 md:space-y-8 relative z-10">
          <div className="bg-surface border border-stroke w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm">
             <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          </div>
          <div className="space-y-2 md:space-y-4">
             <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight leading-none group-hover:text-brand transition-colors antialiased">
                {service.title}
             </h3>
             <p className="text-text-muted text-sm md:text-lg font-medium leading-relaxed antialiased line-clamp-4">
                {service.description}
             </p>
          </div>
       </div>
       <div className="pt-4 mt-4 md:pt-8 md:mt-10 border-t border-stroke relative z-10">
          <Link href={`/services/${service.slug}`} className="btn-outline h-12 md:h-14 w-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest group/btn bg-white hover:border-brand hover:text-brand transition-all border border-stroke">
             Learn More <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
       </div>
    </motion.div>
  );
});

const TechCard = React.memo(({ icon: Icon, label }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: 0.4 }}
      className="glass border border-stroke rounded-xl md:rounded-[2rem] flex flex-col items-center justify-center gap-2 md:gap-6 hover:border-brand transition-all duration-700 shadow-premium group cursor-default p-4 md:p-8 bg-white/50 backdrop-blur-sm will-change-gpu"
    >
      <Icon className="w-9 h-9 md:w-12 md:h-12 text-brand/30 group-hover:text-brand transition-all duration-500 group-hover:scale-110" strokeWidth={1} />
      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted text-center leading-tight">{label}</span>
    </motion.div>
  );
});

const StackItem = React.memo(({ title, desc }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row gap-4 md:gap-8 group bg-surface border border-stroke p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] hover:border-brand transition-all items-center md:items-start text-center md:text-left will-change-gpu"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-white border border-stroke rounded-xl md:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
        <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
      </div>
      <div>
        <h4 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 uppercase tracking-tight leading-none antialiased group-hover:text-brand transition-colors">{title}</h4>
        <p className="text-text-muted text-sm md:text-base font-medium leading-relaxed antialiased">{desc}</p>
      </div>
    </motion.div>
  );
});

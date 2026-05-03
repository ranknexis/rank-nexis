"use client";


import ValueCard from "@/components/ValueCard";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Layers,
    ShieldCheck,
    Target,
    Zap
} from "lucide-react";
import Link from "next/link";
import { getSectionData } from "@/lib/pageUtils";

export default function AboutClient({ sectionsMap, teamMembers }: { sectionsMap: any, teamMembers: any[] }) {
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Studio Philosophy",
     heading: "Driven By",
     headingAccent: "Results.",
     subtext: "RankNexis is a reliable and professional digital marketing agency dedicated to helping businesses grow online."
  });

  const narrative = getSectionData(sectionsMap, "narrative", {
     label: "Our Philosophy",
     heading: "Strategic",
     headingAccent: "Impact.",
     body: "Our methodology integrates precision engineering with strategic thinking to deliver sustainable impact for your organization. We've spent 8+ years building integrated digital solutions where marketing and development work together seamlessly.",
     imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* 1. HERO */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.4em]">{hero.badge}</p>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase">
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                {hero.subtext}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. NARRATIVE */}
        <section className="section-padding border-y border-stroke bg-surface/30 relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <div className="space-y-6">
                       <p className="text-[11px] font-bold uppercase text-brand tracking-[0.5em]">{narrative.label}</p>
                       <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight uppercase">{narrative.heading} <br /><span className="text-brand">{narrative.headingAccent}</span></h2>
                    </div>
                    
                    <div className="space-y-8 prose prose-xl max-w-none text-text-secondary font-medium leading-relaxed antialiased" dangerouslySetInnerHTML={{ __html: narrative.body }} />

                    <div className="flex gap-16 pt-12 border-t border-stroke">
                       <div className="space-y-2">
                          <p className="text-5xl font-bold text-brand tracking-tighter">08+</p>
                          <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Years Active</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-5xl font-bold text-brand tracking-tighter">180+</p>
                          <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Systems Implemented</p>
                       </div>
                    </div>
                 </div>

                  <div className="relative group p-4">
                     <div className="aspect-square glass rounded-[4rem] overflow-hidden relative shadow-premium grain border border-stroke">
                        <img 
                           src={narrative.imageUrl} 
                           alt="RankNexis Lab" 
                           className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
                        />
                        <div className="absolute inset-0 bg-brand/[0.03] group-hover:bg-transparent transition-colors" />
                     </div>
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [-12, -10, -12] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute -bottom-8 -left-8 w-44 h-44 glass border border-stroke rounded-[2rem] flex items-center justify-center shadow-premium backdrop-blur-3xl hidden md:flex"
                    >
                       <Layers size={64} className="text-brand" strokeWidth={1} />
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. EXPERTISE STACK */}

        {/* 4. CORE VALUES */}
        <section className="section-padding border-y border-stroke bg-surface/30">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <ValueCard 
                    icon={Target} 
                    title="ROI Mandate" 
                    desc="We believe every line of code and every creative asset must be judged by the revenue it creates. Zero vanity metrics." 
                 />
                 <ValueCard 
                    icon={ShieldCheck} 
                    title="Data Sovereignty" 
                    desc="We build transparent tracking systems that give brands absolute ownership and clarity over their growth data." 
                 />
                 <ValueCard 
                    icon={Zap} 
                    title="System Velocity" 
                    desc="Speed is a growth factor. We engineer platforms for maximum performance, ensuring zero friction in the user journey." 
                 />
              </div>
           </div>
        </section>


        <section className="py-48 bg-white relative px-6 overflow-hidden grain text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] -z-10" />
          <div className="container-max relative z-10 space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Connect With Us</p>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
                    Our <span className="text-brand text-3xl md:text-5xl block mt-4 tracking-tight">Technical Expertise.</span>
                  </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed antialiased">
               Connect with our team to discuss how we can build a scalable digital strategy for your brand.
            </p>
            
            <div className="flex justify-center">
              <Link href="/#contact" className="btn-primary h-20 px-16 text-xs font-bold uppercase tracking-[0.3em] group shadow-premium flex items-center gap-3">
                Request Optimization Call <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

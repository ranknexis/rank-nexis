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
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { getSectionData } from "@/lib/pageUtils";

export default function ServiceDetailClient({ service, pageData, relatedCaseStudies }: { service: any, pageData: any, relatedCaseStudies: any[] }) {
  const sectionsMap = pageData?.sectionsMap || {};

  // Get dynamic sections with fallbacks to service fields
  const hero = getSectionData(sectionsMap, "hero", {
    badge: "Services",
    heading: service.title.split(' ')[0],
    headingAccent: service.title.split(' ').slice(1).join(' ') + ".",
    subtext: service.description,
    image: service.image
  });

  const intro = getSectionData(sectionsMap, "intro", getSectionData(sectionsMap, "text_block", null));
  const dynServices = getSectionData(sectionsMap, "services", getSectionData(sectionsMap, "services_grid", null));
  const dynIndustries = getSectionData(sectionsMap, "industries", getSectionData(sectionsMap, "table", null));
  const faq = getSectionData(sectionsMap, "faq", null);
  const cta = getSectionData(sectionsMap, "cta", {
    heading: "Start Your Growth Phase.",
    subtext: "Work with our experts to review your goals and build a successful business roadmap.",
    buttonText: "Contact Us Now",
    buttonLink: "/contact"
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-stroke bg-surface/30">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 hidden md:block" />
            {hero.image && (
              <img 
                src={hero.image} 
                alt={hero.image.split('/').pop()?.replace('.webp', '').replace(/[_-]/g, ' ') || service.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 md:opacity-[0.03] grayscale transition-all duration-700" 
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
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
              >
                {hero.subtext}
              </motion.p>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="py-16 md:py-24 relative">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-start">
              {/* Dynamic or Fallback Content */}
              <div className="lg:col-span-8 space-y-24">
                
                {/* 1. INTRO / OVERVIEW */}
                <div className="space-y-12">
                   <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight border-b border-stroke pb-8">
                         {intro?.heading || "Technical Overview."}
                      </h2>
                      <p className="text-text-secondary text-xl font-medium leading-relaxed">
                        {intro?.body || service.description}
                      </p>
                   </div>
                   
                   {intro?.image && (
                     <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-stroke shadow-premium group">
                        <img 
                          src={intro.image} 
                          alt={intro.image.split('/').pop()?.replace('.webp', '').replace(/[_-]/g, ' ') || "Overview"} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                     </div>
                   )}
                </div>

                {/* 2. DYNAMIC SERVICES GRID (if exists) */}
                {dynServices && (
                  <div className="space-y-12">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Core <span className="text-brand">Verticals.</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {dynServices.items.map((item: any, i: number) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="glass p-8 rounded-[2rem] border border-stroke space-y-6 group hover:border-brand/40 transition-colors"
                        >
                          {item.image && (
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                              <img 
                                src={item.image} 
                                alt={item.image.split('/').pop()?.replace('.webp', '').replace(/[_-]/g, ' ') || item.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                              />
                            </div>
                          )}
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{item.title}</h4>
                            <p className="text-text-muted text-sm font-medium leading-relaxed">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. STATIC FEATURES (Fallback/Complement) */}
                {!dynServices && (
                  <div className="space-y-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Core <span className="text-brand">Capabilities.</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((f: string) => (
                        <div key={f} className="flex items-start gap-4 p-5 glass rounded-2xl border border-stroke shadow-sm hover:border-brand/40 transition-colors bg-surface/50">
                          <CheckCircle2 className="text-brand shrink-0 mt-0.5" size={20} />
                          <span className="text-[11px] font-bold uppercase text-text-primary leading-tight tracking-wider">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. INDUSTRIES TABLE */}
                {dynIndustries && (
                  <div className="space-y-10 pt-12 border-t border-stroke">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Industry <span className="text-brand">Solutions.</span></h3>
                    <div className="overflow-hidden border border-stroke rounded-[2rem] shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface border-b border-stroke">
                            <th className="px-8 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest">Industry Node</th>
                            <th className="px-8 py-6 text-[10px] font-bold uppercase text-text-muted tracking-widest">Operational Delivery</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                          {dynIndustries.rows.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-brand/[0.02] transition-colors">
                              <td className="px-8 py-6 font-bold uppercase text-sm text-brand">{row.industry}</td>
                              <td className="px-8 py-6 text-sm font-medium text-text-secondary leading-relaxed">{row.delivery || row.specialty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. FAQ SECTION */}
                {faq && (
                  <div className="space-y-12 pt-12 border-t border-stroke">
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase text-brand tracking-widest">Common Questions</p>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Diagnostic <br /><span className="text-brand">Intelligence.</span></h3>
                    </div>
                    <div className="space-y-8">
                      {faq.items.map((item: any, i: number) => (
                        <div key={i} className="group p-8 glass rounded-[2rem] border border-stroke hover:border-brand/30 transition-all">
                          <h4 className="text-lg font-bold uppercase flex items-center gap-4 text-text-primary group-hover:text-brand transition-colors mb-4">
                            <HelpCircle size={20} className="text-brand" />
                            {item.question}
                          </h4>
                          <p className="text-text-secondary text-lg font-medium leading-relaxed pl-9 border-l border-brand/20">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. SUCCESS BENCHMARKS (Case Studies) */}
                {relatedCaseStudies.length > 0 && (
                  <div className="space-y-12 pt-12 border-t border-stroke">
                    <div className="flex justify-between items-end pb-4">
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Success <br /><span className="text-brand">Benchmarks.</span></h2>
                      <Link href="/work" className="text-[10px] font-bold uppercase text-brand hover:underline flex items-center gap-2">View Archive <ExternalLink size={12} /></Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {relatedCaseStudies.map((study) => (
                        <Link key={study.id} href={`/work/${study.slug}`} className="glass group p-8 space-y-6 rounded-[2rem] border border-stroke shadow-sm hover:shadow-premium transition-all">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase text-brand">{study.tag}</p>
                            <h4 className="text-xl font-bold uppercase tracking-tight group-hover:text-brand transition-colors">{study.title}</h4>
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t border-stroke">
                            <span className="text-3xl font-black tracking-tighter text-text-primary">{study.stats}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-brand" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                 <div className="bg-brand p-10 text-white space-y-10 shadow-premium rounded-[2.5rem] relative overflow-hidden grain">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <Zap size={40} fill="currentColor" fillOpacity={0.2} />
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Initialize <br /> Deployment.</h3>
                      <p className="text-white/80 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
                        Ready to build your growth plan? Start a strategy session today.
                      </p>
                    </div>
                    <Link href="/contact" className="btn-primary bg-white text-brand hover:bg-white/90 w-full h-16 flex items-center justify-center text-[10px] font-bold uppercase rounded-2xl transition-all shadow-xl shadow-black/10">
                       Partner With Us <ArrowRight size={16} className="ml-2" />
                    </Link>
                 </div>

                 <div className="glass p-10 space-y-8 border border-stroke shadow-sm rounded-[2.5rem]">
                    <h4 className="text-[10px] font-bold uppercase text-brand border-b border-stroke pb-4 tracking-widest">Operating Pillars</h4>
                    <nav className="space-y-6">
                        <SidebarLink href="/services" label="Marketing Logic" />
                        <SidebarLink href="/services" label="Brand Design" />
                        <SidebarLink href="/services" label="Tech Engineering" />
                    </nav>
                 </div>
              </aside>
            </div>
          </div>
        </section>

        {/* DYNAMIC CTA SECTION */}
        <section className="py-32 bg-surface/30 relative overflow-hidden px-6 grain border-t border-stroke">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[200px] -z-10 hidden md:block pointer-events-none" />
          
          <div className="container-max text-center relative z-10 space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-bold uppercase text-brand tracking-widest">Next Phase</p>
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                  {cta.heading.split(' ').slice(0, -1).join(' ')} <br /> <span className="text-brand">{cta.heading.split(' ').pop()}</span>
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl font-medium leading-relaxed">
               {cta.subtext}
            </p>
            
            <div className="flex justify-center flex-wrap gap-6 items-center pt-8">
              <Link href={cta.buttonLink} className="btn-primary h-20 px-16 text-[12px] font-bold uppercase group shadow-premium hover:shadow-brand/20 transition-all">
                {cta.buttonText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform ml-3" />
              </Link>
              <Link href="/work" className="btn-outline h-20 px-16 text-[12px] font-bold uppercase bg-white/80 backdrop-blur-md hover:bg-brand/5 border-stroke group">
                See Benchmarks <ArrowRight size={18} className="translate-x-1 opacity-0 group-hover:opacity-100 transition-all ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between group/link">
      <span className="text-[11px] font-bold uppercase group-hover/link:text-brand transition-colors text-text-secondary tracking-wider">{label}</span>
      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform text-stroke group-hover/link:text-brand" />
    </Link>
  );
}


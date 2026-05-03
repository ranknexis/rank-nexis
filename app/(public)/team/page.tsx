import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import {
    ArrowRight,
    Award,
    Briefcase,
    Facebook,
    Linkedin,
    Mail,
    Users,
    ShieldCheck,
    Zap,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("team");
  return buildSeoMetadata(page, {
    title: "Our Team | Expert Strategists & Creatives",
    description: "Meet the dedicated team of experts at RankNexis.",
  });
}

export default async function TeamPage() {
  const [team, pageData] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    }),
    getPageData("team")
  ]);

  const sectionsMap = pageData?.sectionsMap || {};
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Strategic Core",
     heading: "Tactical",
     headingAccent: "Experts.",
     subtext: "We are a high-performance unit of strategists, engineers, and designers dedicated to scaling elite brands."
  });

  const strengths = getSectionData(sectionsMap, "strengths", {
     items: [
        { icon: "ShieldCheck", title: "Strategic Precision", description: "Our work is rooted in deep market diagnostics and competitive engineering." },
        { icon: "Zap", title: "Creative Velocity", description: "We operate with maximum efficiency to ensure rapid deployment and impact." },
        { icon: "TrendingUp", title: "Result Governance", description: "Every action is monitored against strict ROI benchmarks and scaling goals." }
     ]
  });

  const ICON_MAP: Record<string, any> = { ShieldCheck, Zap, TrendingUp, Award, Users, Briefcase };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
           </div>
           
           <div className="container-max relative z-10 text-center space-y-12">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase text-brand tracking-[0.4em]">{hero.badge}</p>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase text-text-primary antialiased">
                  {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
                </h1>
                <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed antialiased">
                  {hero.subtext}
                </p>
              </div>
           </div>
        </section>

        {/* TEAM GRID */}
        <section className="py-32">
           <div className="container-max">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 {team.map((member: any) => (
                    <div key={member.id} className="group">
                       <div className="space-y-10">
                          <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden glass border border-stroke shadow-premium group-hover:shadow-2xl transition-all duration-1000 relative grain group-hover:-translate-y-2">
                             <img 
                               src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070"} 
                               alt={member.name} 
                               className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100 antialiased" 
                             />
                             <div className="absolute inset-0 bg-brand/[0.03] group-hover:bg-transparent transition-colors" />
                          </div>
                          
                          <div className="space-y-6 text-center">
                             <div className="space-y-2">
                                <h3 className="text-4xl font-bold uppercase tracking-tighter group-hover:text-brand transition-colors leading-none text-text-primary antialiased">{member.name}</h3>
                                <p className="text-[11px] font-bold uppercase text-brand tracking-[0.2em]">{member.role}</p>
                             </div>
                             <p className="text-text-muted text-lg font-medium leading-relaxed max-w-[90%] mx-auto antialiased">{member.bio}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CORE STRENGTHS */}
        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 {strengths.items?.map((item: any, i: number) => {
                    const Icon = ICON_MAP[item.icon] || ShieldCheck;
                    return (
                       <div key={i} className="group bg-white border border-stroke p-12 rounded-[3rem] hover:border-brand/40 transition-all shadow-sm hover:shadow-premium flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-surface border border-stroke rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                             <Icon size={36} strokeWidth={1} />
                          </div>
                          <h3 className="text-3xl font-bold uppercase tracking-tight text-text-primary mb-6 leading-none antialiased">{item.title}</h3>
                          <p className="text-text-muted text-lg font-medium leading-relaxed antialiased">{item.description}</p>
                       </div>
                    )
                 })}
              </div>
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white text-center relative px-6 overflow-hidden grain">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] -z-10" />
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-12 antialiased leading-tight">Ready to grow <br /> <span className="text-brand">Together?</span></h2>
           <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed mb-16 antialiased">
              Connect with our team of technical experts and let&apos;s build a scalable roadmap for your brand.
           </p>
           <div className="flex justify-center">
              <Link href="/contact" className="btn-primary h-20 px-16 text-[10px] font-bold uppercase tracking-[0.4em] group shadow-premium inline-flex items-center gap-3">
                Book a Consultation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}

import prisma from "@/lib/prisma";
import {
    ArrowRight,
    CheckCircle2,
    Code2,
    Globe,
    Layers,
    Palette,
    Search,
    ShieldCheck,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Services | High-Performance Digital Solutions",
  description: "Explore RankNexis's core operating systems, from SEO and Facebook Ads to Full-Stack Web Development and Brand Design.",
};

const ICON_MAP: Record<string, any> = {
  TrendingUp,
  Users,
  Zap,
  Search,
  Palette,
  Layers,
  Globe,
  Code2
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-12">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Service Operating Systems</p>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                Expert <br /> <span className="text-brand">Services.</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                We provide a comprehensive range of digital marketing and development services designed to help your brand grow and succeed in the digital landscape.
              </p>
            </div>
          </div>
        </section>

        {/* CORE OPERATING SYSTEMS - DYNAMIC */}
        <section className="pb-48">
          <div className="container-max space-y-32">
            {services.map((service) => {
              const Icon = ICON_MAP[service.icon || "Zap"] || Zap;
              return (
                <div key={service.id} id={service.slug} className="space-y-20 scroll-mt-32">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon className="text-brand" size={32} />
                      <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">
                        {service.title.split(' ').slice(0, -1).join(' ')} <span className="text-brand">{service.title.split(' ').slice(-1)}</span>
                      </h2>
                    </div>
                    <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <DetailBlock 
                      slug={service.slug}
                      title="Key Capabilities" 
                      desc="We deploy high-performance strategies tailored to your business objectives and market conditions."
                      bullets={service.features.slice(0, 4)}
                    />
                    <DetailBlock 
                      slug={service.slug}
                      title="Operational Results" 
                      desc="Our focus is on delivering measurable impact through iterative optimization and data-driven insights."
                      bullets={service.features.slice(4)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTEGRATED STACK SECTION */}
        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                   <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Unified Logic</p>
                   <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Expertise</span> <br /> In Scale.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl">
                  We design and implement scalable digital systems that drive measurable results for global organizations.
                </p>
                
                <div className="space-y-10 pt-10 border-t border-stroke">
                  <StackItem title="Discovery & Diagnostic" desc="Deep-dive technical and market audit to identify operational bottlenecks." />
                  <StackItem title="Architectural Design" desc="Building the high-performance stack and growth funnels for absolute synergy." />
                  <StackItem title="Live Governance" desc="Daily iterative optimizations against real-time revenue and performance data." />
                </div>
              </div>
            </div>

            <div className="relative group p-4">
                <div className="aspect-square glass rounded-[4rem] p-10 flex items-center justify-center relative group shadow-premium grain overflow-hidden">
                  <div className="absolute inset-0 bg-brand/[0.02] -z-10" />
                  <div className="grid grid-cols-2 gap-10 relative z-10 w-full h-full">
                     <TechNode icon={Globe} label="Global Delivery" />
                     <TechNode icon={Search} label="Index Optimization" />
                     <TechNode icon={Layers} label="Protocol Layer" />
                     <TechNode icon={TrendingUp} label="Revenue Hub" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white relative overflow-hidden grain">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.03] -z-10" />
          <div className="container-max text-center relative z-10 space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand">Next Phase</p>
               <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Initialize <br /> <span className="text-brand">Deployment.</span>
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
              Book a strategy consultation call with our experts to plan your growth trajectory.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contact" className="btn-primary h-20 px-16 text-[11px] font-bold uppercase tracking-[0.3em] group shadow-premium">
                Request Optimization Proposal <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/work" className="btn-outline h-20 px-16 text-[11px] font-bold uppercase tracking-[0.3em] bg-white/80 backdrop-blur-md">
                Review Case Archives
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function DetailBlock({ title, desc, bullets, slug }: any) {
  return (
    <div className="corporate-card grain group space-y-8">
       <div className="space-y-4">
          <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none group-hover:text-brand transition-colors">{title}</h3>
          <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
       </div>
       <ul className="space-y-4 pt-8 border-t border-stroke">
          {bullets?.map((b: string) => (
             <li key={b} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>{b}</span>
             </li>
          ))}
       </ul>
       <Link href={`/services/${slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand group/link pt-4">
          View Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
       </Link>
    </div>
  );
}

function StackItem({ title, desc }: any) {
  return (
    <div className="flex gap-8 group">
      <div className="w-16 h-16 shrink-0 glass border border-stroke rounded-2xl flex items-center justify-center text-brand shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-500">
        <ShieldCheck size={32} />
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-bold mb-2 uppercase tracking-tight leading-none group-hover:text-brand transition-colors">{title}</h4>
        <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TechNode({ icon: Icon, label }: any) {
  return (
    <div className="glass border border-stroke rounded-3xl flex flex-col items-center justify-center gap-6 hover:border-brand transition-all duration-700 shadow-premium group cursor-default p-6">
      <Icon size={48} strokeWidth={1} className="text-brand/30 group-hover:text-brand transition-all duration-500 group-hover:scale-110" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted text-center leading-tight">{label}</span>
    </div>
  );
}

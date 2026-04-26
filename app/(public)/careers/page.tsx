import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import CareersContent from "./components/CareersContent";
import { Metadata } from "next";
import { Layers, Zap } from "lucide-react";
import InternalLinksSection from "@/components/InternalLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("careers");
  return buildSeoMetadata(page, {
    title: "Careers | Join the RankNexis Team",
    description: "Explore career opportunities at RankNexis.",
  });
}

export default async function CareersPage() {
  const [jobs, pageData] = await Promise.all([
    prisma.job.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    }),
    getPageData("careers")
  ]);

  const sectionsMap = pageData?.sectionsMap || {};
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Careers",
     heading: "Build Your",
     headingAccent: "Career.",
     subtext: "Join our team of experts. We are building the next generation of digital solutions."
  });

  const culture = getSectionData(sectionsMap, "culture", {
     label: "The Environment",
     heading: "Join",
     headingAccent: "Our Team.",
     body: "We are looking for creative and hardworking people to join our team.",
     imageUrl: "https://images.unsplash.com/photo-15222071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
     stats: []
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10 text-center space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase text-brand">{hero.badge}</p>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                  {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  {hero.subtext}
                </p>
              </div>
           </div>
        </section>

        <CareersContent initialJobs={jobs} />

        {/* CULTURE SECTION */}
        <section className="py-48 bg-black text-white relative overflow-hidden grain">
           <div className="absolute top-0 left-0 w-full h-full bg-brand/5 -z-10" />
           <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase text-brand">{culture.label}</p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">{culture.heading}</span> <br /> {culture.headingAccent}
                </h1>
                <div className="text-text-secondary text-xl font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: culture.body }} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-10">
                    {culture.stats?.map((stat: any, i: number) => {
                       const Icon = stat.value === "Zap" ? Zap : Layers;
                       return (
                        <div key={i} className="space-y-4">
                           <Icon className="text-brand" size={32} />
                           <h4 className="text-lg font-bold uppercase tracking-tight">{stat.label}</h4>
                        </div>
                       )
                    })}
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-square glass rounded-[4rem] overflow-hidden grain shadow-2xl shadow-brand/10">
                    <img src={culture.imageUrl} alt="Team Session" className="w-full h-full object-cover opacity-80 transition-all scale-110" />
                 </div>
              </div>
           </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}


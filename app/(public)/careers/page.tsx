import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import CareersContent from "./components/CareersContent";
import { Metadata } from "next";
import Image from "next/image";
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
     imageUrl: "/images/careers_culture.png",
     stats: []
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

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
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase">
                  {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  {hero.subtext}
                </p>
              </div>
           </div>
        </section>

        <CareersContent initialJobs={jobs} />

        <section className="py-24 bg-white text-text-primary relative overflow-hidden border-t border-stroke grain">
           <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.01] -z-10" />
           <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{culture.label || "The Core Culture"}</p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
                       <span className="text-brand">{culture.heading || "Join Our"}</span> <br /> {culture.headingAccent || "Expert Team."}
                    </h2>
                    <div className="text-text-secondary text-lg font-medium leading-relaxed max-w-xl antialiased" dangerouslySetInnerHTML={{ __html: culture.body || "We are looking for creative and hardworking people to join our high-performing team. We pride ourselves on building premium digital solutions for growing brands." }} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(culture.stats || [
                       { label: "High Velocity", value: "We deliver maximum impact quickly by skipping unnecessary processes.", icon: "Zap" },
                       { label: "Modern Stack", value: "Work with high-end, modern technologies like React and Next.js.", icon: "Layers" }
                    ]).map((stat: any, i: number) => {
                       const Icon = stat.icon === 'Layers' ? Layers : Zap;
                       return (
                          <div key={i} className="p-6 bg-white border border-stroke rounded-2xl shadow-sm hover:shadow-premium hover:border-brand/20 transition-all">
                             <Icon className="text-brand mb-4" size={28} />
                             <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-2">{stat.label}</h4>
                             <p className="text-sm text-text-muted font-medium">{stat.value}</p>
                          </div>
                       );
                    })}
                 </div>

              </div>
              
              <div className="relative group p-2">
                 <div className="absolute inset-0 bg-brand/5 blur-3xl group-hover:bg-brand/10 transition-all rounded-[3rem] -z-10" />
                 <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden grain shadow-premium border border-stroke bg-white relative">
                    <Image src={culture.imageUrl && !culture.imageUrl.includes('unsplash') ? culture.imageUrl : "/images/careers_culture.png"} alt="Team Session" fill className="object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-brand/[0.02] group-hover:bg-transparent transition-colors duration-500" />
                 </div>
              </div>
           </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}


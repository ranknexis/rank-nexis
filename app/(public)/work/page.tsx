import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import {
  ArrowRight,
  Globe,
  Layers,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import WorkContent from "./components/WorkContent";
import InternalLinksSection from "@/components/InternalLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("work");
  return buildSeoMetadata(page, {
    title: "Our Work | Case Studies & Results",
    description: "Explore how RankNexis helps brands scale through strategic initiatives.",
  });
}

export default async function WorkPage() {
  const [studies, pageData] = await Promise.all([
    prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    getPageData("work")
  ]);

  const sectionsMap = pageData?.sectionsMap || {};
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Case Study Archive",
     heading: "Case",
     headingAccent: "Studies.",
     subtext: "A look at some of our successful projects and how we've helped our clients grow their brands."
  });

  const stats = getSectionData(sectionsMap, "stats", {
     items: [
        { label: "Happy Clients", value: "180+", icon: "Layers" },
        { label: "Business Growth", value: "140%", icon: "TrendingUp" },
        { label: "Top Rank Results", value: "TOP 5", icon: "Zap" },
        { label: "Creative Minds", value: "12", icon: "Globe" }
     ]
  });

  const ICON_MAP: Record<string, any> = { Layers, TrendingUp, Zap, Globe };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 border-b border-stroke overflow-hidden">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10 space-y-6 md:space-y-12">
              <div className="space-y-6 px-4 md:px-0">
                  <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                     <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                     <p className="text-[11px] font-bold uppercase text-brand">{hero.badge}</p>
                  </div>
                  <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold tracking-tight uppercase leading-tight text-text-primary">
                    <span className="text-brand">{hero.heading}</span> <br /> {hero.headingAccent}
                  </h1>
                  <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    {hero.subtext}
                  </p>
              </div>
           </div>
        </section>

        <WorkContent initialStudies={studies} />

        <section className="py-16 bg-surface/30 border-y border-stroke">
           <div className="container-max grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 px-4 md:px-0">
              {stats.items?.map((stat: any, i: number) => {
                 const Icon = ICON_MAP[stat.icon] || Zap;
                 return (
                    <div key={i} className="text-center md:text-left space-y-2">
                       <div className="flex items-center gap-4 justify-center md:justify-start">
                          <Icon className="text-brand" size={24} />
                          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-text-primary">{stat.value}</span>
                       </div>
                       <p className="text-[10px] font-bold uppercase text-text-muted">{stat.label}</p>
                    </div>
                 )
              })}
           </div>
        </section>

        <section className="py-16 md:py-32 bg-white text-center space-y-8 md:space-y-12 px-4">
           <h2 className="text-2xl md:text-5xl font-bold tracking-tight uppercase text-text-primary">Ready To Grow?</h2>
           <div className="flex justify-center">
              <Link href="/contact" className="btn-primary w-full sm:w-auto h-16 md:h-20 px-10 md:px-16 text-[11px] font-bold uppercase group shadow-premium flex items-center justify-center">
                 Schedule Consultation <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}


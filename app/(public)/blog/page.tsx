import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import BlogContent from "./components/BlogContent";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("blog");
  return buildSeoMetadata(page, {
    title: "Blog & Insights | RankNexis Strategic Intelligence",
    description: "Explore the latest insights on SEO, marketing, and business growth.",
  });
}

export default async function BlogPage() {
  const [posts, categories, pageData] = await Promise.all([
    prisma.blog.findMany({
      include: { 
        category: true,
        author: true 
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blogCategory.findMany(),
    getPageData("blog")
  ]);

  const sectionsMap = pageData?.sectionsMap || {};
  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Latest Updates",
     heading: "Insights &",
     headingAccent: "Strategy.",
     subtext: "Expert insights, marketing strategies, and business growth tips from our team."
  });

  const newsletter = getSectionData(sectionsMap, "newsletter", {
     badge: "Stay Updated",
     heading: "Knowledge",
     headingAccent: "Hub.",
     subtext: "The latest strategies and expert tips from our marketing and design team.",
     buttonText: "Subscribe"
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        <section className="relative py-24 overflow-hidden text-center border-b border-stroke">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 space-y-12">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase text-brand tracking-[0.5em]">{hero.badge}</p>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight uppercase text-text-primary">
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed antialiased">
                {hero.subtext}
              </p>
            </div>
          </div>
        </section>

        <BlogContent initialPosts={posts} categories={categories} />

        <section className="py-32 bg-white border-t border-stroke relative overflow-hidden grain text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.02] -z-10" />
          <div className="container-max max-w-5xl mx-auto">
            <div className="glass-premium p-16 md:p-24 rounded-[4rem] border border-stroke relative overflow-hidden shadow-premium bg-white">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10 space-y-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand">{newsletter.badge}</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight antialiased">
                  {newsletter.heading} <span className="text-brand">{newsletter.headingAccent}</span>
                </h2>
                <p className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto antialiased">
                  {newsletter.subtext}
                </p>
                
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/contact" className="btn-primary h-20 px-16 text-[11px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-brand/20 flex items-center justify-center gap-3 group">
                    Get in Touch <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link href="/work" className="btn-outline h-20 px-16 text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                    View Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}

import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import BlogContent from "./components/BlogContent";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";

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
     badge: "Strategic Intelligence",
     heading: "Insights &",
     headingAccent: "Strategy.",
     subtext: "Technical diagnostics, architectural patterns, and strategic growth logic for the modern enterprise."
  });

  const newsletter = getSectionData(sectionsMap, "newsletter", {
     badge: "Stay Synchronized",
     heading: "Knowledge",
     headingAccent: "Hub.",
     subtext: "Insights, strategies, and technical benchmarks from our team of digital engineers and growth specialists.",
     buttonText: "Subscribe"
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
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
              
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-text-primary">
                {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed antialiased">
                {hero.subtext}
              </p>
            </div>
          </div>
        </section>

        <BlogContent initialPosts={posts} categories={categories} />

        {/* NEWSLETTER CTA */}
        <section className="py-48 bg-white border-t border-stroke relative overflow-hidden grain text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.02] -z-10" />
          <div className="container-max max-w-4xl mx-auto space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand">{newsletter.badge}</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-tight antialiased">
                  <span className="text-brand">{newsletter.heading}</span> <br /> {newsletter.headingAccent}
                </h2>

                <p className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto antialiased">
                  {newsletter.subtext}
                </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4 p-2 glass border border-stroke rounded-[2rem] shadow-premium max-w-2xl mx-auto bg-white">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-grow h-14 bg-transparent px-8 focus:outline-none text-[11px] font-bold uppercase tracking-widest text-text-primary placeholder:text-text-muted/30"
                required
              />
              <button type="submit" className="btn-primary h-14 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-brand/10">
                {newsletter.buttonText}
              </button>
            </form>
          </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}

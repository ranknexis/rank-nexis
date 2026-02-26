import prisma from "@/lib/prisma";
import {
    ArrowRight,
    Globe,
    Layers,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WorkContent from "./components/WorkContent";

export const metadata = {
  title: "Work | Strategic Case Studies",
  description: "Explore RankNexis's successful projects and see how we've helped brands achieve measurable growth through strategic digital marketing and design.",
};

export default async function WorkPage() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 border-b border-stroke overflow-hidden">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10 space-y-12">
              <div
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Case Study Archive</p>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight text-text-primary">
                  <span className="text-brand">Case</span> <br /> Studies.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl">
                  A look at some of our successful projects and how we've helped our clients grow their brands.
                </p>
              </div>
           </div>
        </section>

        <WorkContent initialStudies={studies} />

        {/* STATS STRIP */}
        <section className="py-20 bg-surface/30 border-y border-stroke">
           <div className="container-max grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Happy Clients", val: "180+", icon: Layers },
                { label: "Business Growth", val: "140%", icon: TrendingUp },
                { label: "Top Rank Results", val: "TOP 5", icon: Zap },
                { label: "Creative Minds", val: "12", icon: Globe }
              ].map(stat => (
                <div key={stat.label} className="text-center md:text-left space-y-2">
                   <div className="flex items-center gap-4 justify-center md:justify-start">
                      <stat.icon className="text-brand" size={20} />
                      <span className="text-3xl font-bold tracking-tighter text-text-primary">{stat.val}</span>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{stat.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white text-center space-y-12">
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase text-text-primary">Ready To Grow?</h2>
           <Link href="/contact" className="btn-primary group h-20 px-16 text-[11px] font-bold uppercase tracking-[0.3em]">
              Schedule Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
           </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import CaseStudyItem from "../components/CaseStudyItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CASE_STUDIES = [
  {
    id: "1",
    brand: "Raafidan",
    title: "E-commerce Revenue Scaling Engine",
    category: "Marketing",
    slug: "raafidan-revenue-scale",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    stats: [
      { label: "Revenue Lift", value: "+220%" },
      { label: "Avg ROAS", value: "4.8x" },
      { label: "Scale Period", value: "6 Mo" }
    ]
  },
  {
    id: "2",
    brand: "NextZen",
    title: "SaaS Multi-Tenant Architecture",
    category: "Engineering",
    slug: "nextzen-saas-architecture",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070",
    stats: [
      { label: "User Retention", value: "3.2x" },
      { label: "Latency Red.", value: "45%" },
      { label: "Daily Users", value: "12k+" }
    ]
  },
  {
    id: "3",
    brand: "StyleHunt",
    title: "High-Performance Fashion Portal",
    category: "Engineering",
    slug: "stylehunt-web-portal",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    stats: [
      { label: "Conv. Rate", value: "+85%" },
      { label: "Lighthouse", value: "98/100" },
      { label: "Load Time", value: "0.8s" }
    ]
  },
  {
    id: "4",
    brand: "AI Ops",
    title: "Agentic Growth Automation",
    category: "AI",
    slug: "ai-ops-automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    stats: [
      { label: "Manual Red.", value: "90%" },
      { label: "Lead Precision", value: "+40%" },
      { label: "ROI Timing", value: "14 Days" }
    ]
  }
];

const CATEGORIES = ["All", "Engineering", "Marketing", "AI"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStudies = activeCategory === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(study => study.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Implementation Archive</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                Proof of <span className="text-brand">Impact.</span>
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                Documented case studies of engineering excellence and strategic growth synchronization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. FILTER & GRID */}
        <section className="pb-32 px-6">
          <div className="container-max">
            {/* Category Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 p-2 bg-gray-50 border border-gray-100 rounded-2xl">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      activeCategory === cat 
                        ? "bg-text-primary text-white shadow-xl shadow-black/20" 
                        : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-brand"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <Filter size={18} className="text-brand" />
                <span className="text-[10px] font-black uppercase tracking-widest">Advanced Filtration</span>
              </div>
            </div>

            {/* Case Study Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredStudies.map((study) => (
                  <CaseStudyItem 
                    key={study.id}
                    brand={study.brand}
                    title={study.title}
                    category={study.category}
                    stats={study.stats}
                    image={study.image}
                    slug={study.slug}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* 3. FINAL CTA */}
        <section className="py-40 bg-gray-50 border-t border-gray-100 relative px-6 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] -z-10 translate-y-1/2" />
          
          <div className="container-max text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Ready to be the Next success <br /> <span className="text-brand text-5xl md:text-8xl">Engineered by RankNexis?</span></h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
              <Link href="/#contact" className="btn-primary h-20 px-16 text-sm uppercase tracking-widest font-black shadow-2xl shadow-brand/20 active:scale-95 group">
                Initialize Growth Sync <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

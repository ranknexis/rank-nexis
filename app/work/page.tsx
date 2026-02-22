"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Filter,
    Globe,
    Layers,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CASE_STUDIES = [
  {
    title: "E-commerce Growth for Raafidan",
    stats: "+220%",
    kpi: "Sales Increase",
    tag: "Digital Marketing",
    slug: "raafidan",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    desc: "Improved conversion rates and SEO performance for a growing e-commerce platform."
  },
  {
    title: "Web Platform for NextZen",
    stats: "3.2x",
    kpi: "User Engagement",
    tag: "Web Development",
    slug: "nextzen",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070",
    desc: "Built a responsive and modern web application with a focus on user experience and performance."
  },
  {
    title: "Brand Identity for SupplySync",
    stats: "40%",
    kpi: "Brand Recognition",
    tag: "Graphic Design",
    slug: "supply-sync",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
    desc: "Created a modern visual identity and social media assets to strengthen brand presence."
  }
];

const CATEGORIES = ["All", "Digital Marketing", "Web Development", "Graphic Design", "SEO"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStudies = activeCategory === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.tag === activeCategory);

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Case Study Archive</p>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Case</span> <br /> Studies.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  A look at some of our successful projects and how we've helped our clients grow their brands.
                </p>
              </motion.div>
           </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-6">
           <div className="container-max flex items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                 <Filter size={18} className="text-text-muted" />
                 <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                       <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                             activeCategory === cat 
                             ? "bg-brand text-white shadow-lg shadow-brand/20" 
                             : "glass text-text-muted hover:text-brand"
                          }`}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* CASE STUDIES GRID */}
        <section className="py-24">
           <div className="container-max">
              <div className="grid grid-cols-1 gap-32">
                 {filteredStudies.map((study, i) => (
                    <motion.div 
                       key={study.slug}
                       initial={{ opacity: 0, y: 40 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center group"
                    >
                       <div className="lg:col-span-7 relative overflow-hidden rounded-[3rem] shadow-premium grain">
                          <img 
                             src={study.image} 
                             alt={study.title} 
                             className="w-full aspect-[16/9] object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                          <div className="absolute bottom-10 left-10 p-4 glass-dark rounded-2xl text-white">
                             <p className="text-4xl font-bold tracking-tighter text-brand">{study.stats}</p>
                             <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{study.kpi}</p>
                          </div>
                       </div>
                       
                       <div className="lg:col-span-5 space-y-10">
                          <div className="space-y-6">
                             <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider text-brand">
                                {study.tag}
                             </div>
                             <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.9] group-hover:text-brand transition-colors">
                                {study.title}
                             </h3>
                             <p className="text-text-muted text-lg font-medium leading-relaxed">
                                {study.desc}
                             </p>
                          </div>
                          
                          <Link href={`/work/${study.slug}`} className="btn-primary h-16 inline-flex items-center px-10 text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-brand/10">
                             View Case Study <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* STATS STRIP */}
        <section className="py-20 bg-surface/30 border-y border-stroke">
           <div className="container-max grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Successful Projects", val: "180+", icon: Layers },
                { label: "Client Revenue Growth", val: "14M+", icon: TrendingUp },
                { label: "Top Rankings", val: "TOP 1%", icon: Zap },
                { label: "Creative Experts", val: "12", icon: Globe }
              ].map(stat => (
                <div key={stat.label} className="text-center md:text-left space-y-2">
                   <div className="flex items-center gap-4 justify-center md:justify-start">
                      <stat.icon className="text-brand" size={20} />
                      <span className="text-3xl font-bold tracking-tighter">{stat.val}</span>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{stat.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white text-center space-y-12">
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">Ready To Grow?</h2>
           <Link href="/contact" className="btn-primary group h-20 px-16 text-xs uppercase tracking-[0.3em]">
              Schedule Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
           </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

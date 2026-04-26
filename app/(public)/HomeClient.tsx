"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Box,
  Code2,
  Globe,
  Layers,
  MessageSquare,
  Palette,
  Quote,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { getSectionData } from "@/lib/pageUtils";

const SERVICES = [
  {
    slug: "marketing",
    icon: TrendingUp,
    title: "Marketing",
    desc: "Strategic acquisition frameworks designed to dominate search and social algorithms for absolute market visibility.",
    features: ["SEO Service", "Social Media Marketing", "Facebook Ads", "Google Ads"],
    categoryLink: "/services"
  },
  {
    slug: "design",
    icon: Palette,
    title: "Design",
    desc: "Distinctive visual identities and engaging user experiences crafted to build trust and brand authority.",
    features: ["Graphic Design", "Video & Motion", "UI/UX Design"],
    categoryLink: "/services"
  },
  {
    slug: "development",
    icon: Code2,
    title: "Development",
    desc: "High-velocity web systems and robust digital infrastructure built for absolute scalability and operational security.",
    features: ["Web Development", "Full-Stack Solution"],
    categoryLink: "/services"
  }
];

export default function HomeClient({ sectionsMap, studies, posts }: { sectionsMap: any, studies: any[], posts: any[] }) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Dynamic Sections with fallbacks
  const hero = getSectionData(sectionsMap, "hero", {
    badge: "Growth & Strategy",
    heading: "Results Driven",
    headingAccent: "Digital Agency.",
    subtext: "Ranknexis is a professional digital marketing agency dedicated to helping businesses grow online.",
    ctaText: "Free Consultation",
    ctaLink: "/#contact",
    ctaSecondaryText: "Our Success",
    ctaSecondaryLink: "/work"
  });

  const trust = getSectionData(sectionsMap, "trust", {
    badge: "How We Work",
    heading: "Our",
    headingAccent: "Expertise.",
    subtext: "We don't just build websites; we create high-performance systems where great design meets expert tech.",
    items: [
      { id: "01", title: "What We Do", description: "We provide complete digital marketing solutions designed to meet the needs of modern businesses." },
      { id: "02", title: "Why Choose Ranknexis", description: "We believe in clear communication, honest work, and measurable results through smart strategies." },
      { id: "03", title: "Our Approach", description: "Every business is different, so we create custom strategies focused on quality and long-term growth." }
    ]
  });

  const stats = getSectionData(sectionsMap, "stats", {
    items: [
       { label: "Active Nodes", value: "240+", icon: "Zap" },
       { label: "Search Dominance", value: "98%", icon: "Target" },
       { label: "Revenue Delta", value: "14.2M", icon: "TrendingUp" },
       { label: "Client Retention", value: "94%", icon: "ShieldCheck" }
    ]
  });

  const process = getSectionData(sectionsMap, "process", {
    badge: "Working with Us",
    heading: "Our Partnership Process.",
    items: [
      { step: "01", title: "Business Review", desc: "Deep-dive into your growth potential and technical needs." },
      { step: "02", title: "Growth Plan", desc: "Designing a high-performance roadmap for market success." },
      { step: "03", title: "Expert Engineering", desc: "Building elite digital infrastructure with precision." },
      { step: "04", title: "Performance", desc: "Continuous improvement based on real-world data." },
      { step: "05", title: "Rapid Growth", desc: "Scaling your business through sustained expert help." }
    ]
  });

  const strategy = getSectionData(sectionsMap, "strategy", {
    badge: "Strategic Approach",
    heading: "Beyond Agency.",
    subtext: "Our approach integrates precision engineering with strategic thinking to deliver sustainable impact for your organization."
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      toast.success("Consultation Scheduled. Our team will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center pt-12 pb-8 md:pt-16 md:pb-10 overflow-hidden mesh-gradient">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand/10 rounded-full blur-[100px] animate-pulse-soft" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/5 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                   <motion.div
                      key={i}
                      animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
                      className="absolute w-2 h-2 md:w-3 md:h-3 bg-brand/20 rounded-full blur-sm"
                      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                   />
                ))}
             </div>
          </div>
          
          <div className="container-max w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-12 space-y-8 relative z-10 text-center mx-auto max-w-5xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-3 glass rounded-full shadow-premium border border-brand/20 mb-6 translate-z-0 overflow-hidden relative group/badge"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                   <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                   <p className="text-[6px] md:text-[10px] font-bold uppercase text-brand whitespace-nowrap tracking-widest">{hero.badge}</p>
                </motion.div>

                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase text-text-primary"
                  >
                    {hero.heading}
                  </motion.h1>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.35 }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent drop-shadow-sm"
                  >
                    {hero.headingAccent}
                  </motion.h1>
                </div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-text-secondary text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
                >
                  {hero.subtext}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-5 pt-8 justify-center"
                >
                    <Link href={hero.ctaLink} className="btn-primary group h-16 md:h-20 px-12 text-[12px] md:text-sm font-bold uppercase bg-brand shadow-2xl relative overflow-hidden flex items-center justify-center">
                      {hero.ctaText} <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link href={hero.ctaSecondaryLink} className="btn-outline h-16 md:h-20 px-12 text-[12px] md:text-sm font-bold uppercase border-2 border-text-primary/10 hover:border-brand transition-all flex items-center justify-center">
                      {hero.ctaSecondaryText}
                    </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-16 md:py-24 border-y border-stroke bg-surface/30 relative overflow-hidden">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-6">
                   <motion.div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-stroke rounded-full shadow-sm">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                    <p className="text-[10px] font-bold uppercase text-brand tracking-widest">{trust.badge}</p>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
                    {trust.heading} <span className="text-brand">{trust.headingAccent}</span>
                  </h2>
                </div>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-md">{trust.subtext}</p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 {trust.items?.slice(0, 3).map((item: any, i: number) => (
                    <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-8 md:p-10 bg-white border border-stroke rounded-3xl hover:border-brand/40 transition-all duration-500 shadow-premium relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-8">
                       <div className="w-16 h-16 rounded-2xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm font-bold">
                          {item.id || `0${i+1}`}
                       </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h4>
                      <p className="text-text-muted text-sm font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight uppercase">
                  Complete Tools <br /> <span className="text-brand">Built</span> For Growth.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.title} {...service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-[1px] bg-brand" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Case History</p>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight uppercase">
                  Proven Success <br /> <span className="text-brand">Strategic</span> Growth.
                </h2>
              </div>
              <Link href="/work" className="btn-outline h-14 px-8 text-[11px] font-bold uppercase tracking-[0.2em] group/arch border border-stroke hover:border-brand/40">
                View All Projects <ArrowUpRight size={16} className="group-hover/arch:translate-x-1 group-hover/arch:-translate-y-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {studies.map((study) => (
                <CaseStudyCard 
                  key={study.id}
                  title={study.title} 
                  stats={study.stats}
                  kpi={study.kpi}
                  tag={study.tag}
                  slug={study.slug}
                  image={study.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-full h-full bg-brand/5 blur-[120px] -z-10 -translate-y-1/2" />
        </section>

        {/* PROCESS SECTION */}
        <section className="section-padding border-y border-stroke bg-surface/30 relative">
          <div className="container-max relative z-10">
            <div className="text-center mb-32 space-y-6">
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">{process.badge}</p>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">{process.heading}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
              {process.items.map((item: any, i: number) => (
                <ProcessItem key={i} step={item.step} title={item.title} desc={item.desc} />
              ))}
              
              {/* Connecting Desktop Line */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-brand/20 -z-10" />
            </div>
          </div>
        </section>

        {/* INSIDE THE ENGINE */}
        <section className="section-padding relative overflow-hidden bg-white">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">{strategy.badge}</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight">
                    {strategy.heading.split(' ').slice(0, -1).join(' ')} <br /> <span className="text-brand">{strategy.heading.split(' ').pop()}</span>
                  </h2>
                </div>
                
                <p className="text-text-secondary text-xl font-medium leading-relaxed">
                  {strategy.subtext}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                      <Code2 size={24} />
                    </div>
                    <h4 className="text-lg font-bold uppercase tracking-tight">Expert Engineering</h4>
                    <p className="text-text-muted text-sm font-medium">We maintain full control over our tech stack, ensuring elite reliability.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                      <Zap size={24} />
                    </div>
                    <h4 className="text-lg font-bold uppercase tracking-tight">Growth Speed</h4>
                    <p className="text-text-muted text-sm font-medium">Speed is built into every layer to ensure your business scales quickly.</p>
                  </div>
                </div>
              </div>

              <div className="lg:order-2 order-1 relative">
                <div className="aspect-square glass rounded-[3rem] p-10 relative overflow-hidden group shadow-premium grain">
                   <div className="absolute inset-0 bg-brand/[0.02] -z-10" />
                   
                   {/* Animated Architecture Diagram */}
                   <div className="relative h-full flex flex-col justify-center gap-6">
                      <div className="flex justify-center">
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="px-8 py-4 glass border border-stroke rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-wider"
                        >
                           <Globe size={16} className="text-brand" />
                           Traffic Inbound
                        </motion.div>
                      </div>
                      
                       <div className="flex justify-center gap-6">
                        <motion.div 
                          animate={{ x: [-5, 0, -5] }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="px-8 py-4 bg-brand border border-stroke rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-white"
                        >
                           <Zap size={16} className="text-white" />
                           System Hub
                        </motion.div>
                        <motion.div 
                          animate={{ x: [5, 0, 5] }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="px-8 py-4 bg-surface border border-stroke rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-wider"
                        >
                           <Box size={16} className="text-brand" />
                           Data Layer
                        </motion.div>
                      </div>

                      <div className="flex justify-center">
                        <motion.div 
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="px-10 py-5 bg-brand/5 border border-brand/20 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                           <TrendingUp size={24} className="text-brand" />
                           Success Metrics
                        </motion.div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        {stats && stats.items && (
          <section className="py-20 bg-text-primary text-white overflow-hidden relative">
             <div className="container-max relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
                   {stats.items.map((stat: any, i: number) => {
                      const Icon = ({ Zap, Globe, TrendingUp, ShieldCheck, Activity, Target } as Record<string, any>)[stat.icon] || Zap;
                      return (
                        <div key={i} className="text-center md:text-left space-y-4">
                           <div className="flex items-center justify-center md:justify-start gap-4 text-brand">
                              <Icon size={20} />
                              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60">{stat.label}</p>
                           </div>
                           <p className="text-4xl md:text-6xl font-black tracking-tighter italic">{stat.value}</p>
                        </div>
                      )
                   })}
                </div>
             </div>
          </section>
        )}

        {/* BLOG SNIPPETS */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
              <div className="space-y-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">Insights & News</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">Latest From Lab.</h2>
              </div>
              <Link href="/blog" className="text-[11px] font-bold uppercase tracking-widest text-brand hover:underline">View All Articles</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <BlogSnippet 
                  key={post.id}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  category={post.category.name}
                  image={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="section-padding relative bg-white overflow-hidden">
          <div className="container-max relative z-10">
            <div className="max-w-6xl mx-auto glass rounded-[4rem] p-10 md:p-24 shadow-premium relative overflow-hidden grain border border-stroke">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                 <div className="space-y-10">
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tight uppercase leading-tight">
                       Start <br /> Your <span className="text-brand">Growth.</span>
                    </h2>
                    <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-sm">Ready to grow your brand? Connect with our team of digital experts.</p>
                 </div>
  
                 <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input required name="name" type="text" placeholder="FULL NAME" className="input-field" />
                       <input required name="email" type="email" placeholder="EMAIL ADDRESS" className="input-field" />
                    </div>
                    <textarea required name="message" rows={4} placeholder="YOUR OBJECTIVE..." className="input-field h-auto py-6 resize-none" />
                    <button disabled={isFormSubmitting} type="submit" className="btn-primary w-full h-20 text-xs font-bold uppercase bg-brand">
                      {isFormSubmitting ? "Deploying..." : "Initiate Consultation"} <ArrowRight className="ml-3" />
                    </button>
                 </form>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* HELPER COMPONENTS */

function ServiceCard({ icon: Icon, title, desc, features, index, slug }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="corporate-card group bg-surface border border-stroke hover:scale-[1.01] p-10 rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all"
    >
      <div className="relative z-10 space-y-12">
        <div className="w-20 h-20 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-700">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-3xl font-bold mb-3 tracking-tight uppercase leading-tight">{title}</h3>
          <p className="text-text-muted text-lg leading-relaxed line-clamp-2 pr-4">{desc}</p>
        </div>

        <ul className="space-y-4 pt-8 border-t border-stroke">
          {features && features.map((item: string) => (
            <li key={item} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              <div className="w-1.5 h-1.5 bg-brand rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <Link href={slug ? `/services/${slug}` : '/services'} className="btn-outline h-14 w-full text-[10px] font-bold uppercase tracking-wider group/link border border-stroke hover:border-brand/40 flex items-center justify-center gap-2">
          Learn More <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ title, stats, kpi, tag, image, slug }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="corporate-card p-0 group overflow-hidden bg-surface border border-stroke rounded-[3rem] shadow-premium"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-8 right-8 px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider rounded-full border border-white/10">{tag}</div>
        
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div className="space-y-1">
               <p className="text-5xl font-bold text-brand tracking-tight leading-none">{stats}</p>
               <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">{kpi}</p>
            </div>
            <Link href={`/work/${slug}`} className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-brand hover:border-brand transition-all">
               <ArrowUpRight size={24} />
            </Link>
        </div>
      </div>
      <div className="p-10 space-y-6 bg-white">
        <h3 className="text-3xl font-bold mb-3 tracking-tight uppercase leading-tight">{title}</h3>
        <Link href={`/work/${slug}`} className="btn-outline h-14 w-full text-[10px] font-bold uppercase tracking-wider group/link border border-stroke hover:border-brand/40 flex items-center justify-center gap-2">
          View Project <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function ProcessItem({ step, title, desc }: any) {
  return (
    <div className="text-center md:text-left relative z-10 group">
      <div className="w-20 h-20 bg-surface border border-stroke rounded-2xl flex items-center justify-center mb-10 mx-auto md:mx-0 group-hover:border-brand transition-all duration-700 shadow-sm">
        <span className="text-brand font-bold text-2xl">{step}</span>
      </div>
      <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{title}</h4>
      <p className="text-text-muted text-sm font-medium leading-relaxed pr-4">{desc}</p>
    </div>
  );
}

function BlogSnippet({ title, date, category, image }: any) {
  return (
    <div className="corporate-card p-0 group hover:scale-[1.02] bg-surface border border-stroke overflow-hidden rounded-[2.5rem] shadow-premium">
      <div className="aspect-[16/10] overflow-hidden relative">
         <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
         <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
         <div className="absolute top-6 left-6 px-4 py-1.5 bg-brand text-white rounded-full text-[8px] font-bold uppercase tracking-wider">{category}</div>
      </div>
      <div className="p-8 space-y-6 relative -mt-16 z-10 bg-white mx-4 mb-4 rounded-3xl border border-stroke shadow-sm">
        <div className="space-y-3">
           <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{date}</p>
           <h4 className="text-xl font-bold tracking-tight uppercase group-hover:text-brand transition-colors line-clamp-2 leading-tight">{title}</h4>
        </div>
        <Link href="/blog" className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 text-text-muted hover:text-brand transition-colors group/link">
          Read Story <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

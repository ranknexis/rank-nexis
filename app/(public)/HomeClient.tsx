"use client";

import { getSectionData } from "@/lib/pageUtils";
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
  ShieldCheck,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Aggressive, data-driven strategies to dominate your market, scale revenue, and maximize ROI through precision targeting.",
    features: ["Growth Hacking", "Paid Acquisition", "SEO Authority", "Market Analysis"],
    slug: "marketing"
  },
  {
    icon: Palette,
    title: "Brand Architecture",
    desc: "Elite visual identities and strategic design systems that establish absolute market authority and consumer trust.",
    features: ["Identity Systems", "Elite Design", "Conversion UX"],
    slug: "design"
  },
  {
    icon: Code2,
    title: "Systems Engineering",
    desc: "High-performance, scalable digital infrastructure and ecosystems built for enterprise reliability and seamless scaling.",
    features: ["Custom Software", "MVP Engineering", "Cloud Infrastructure"],
    slug: "development"
  }
];

export default function HomeClient({ sectionsMap, studies, posts, testimonials: dbTestimonials }: { sectionsMap: any, studies: any[], posts: any[], testimonials?: any[] }) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Dynamic Content from CMS
  const hero = getSectionData(sectionsMap, "hero", {
    badge: "Full-Service Digital Agency",
    heading: "Strategic Growth,",
    headingAccent: "Driven by Design.",
    subtext: "We help brands scale through high-performance marketing, creative design, and expert web development for measurable growth."
  });

  const trust = getSectionData(sectionsMap, "trust", {
    badge: "How We Work",
    heading: "Bridging Design",
    headingAccent: "& Tech.",
    subtext: "We don't just build websites; we create high-performance systems where great design meets expert tech."
  });

  const servicesSection = getSectionData(sectionsMap, "services", {
    badge: "What We Do",
    heading: "Tailored Solutions",
    headingAccent: "Designed For Growth.",
    subtext: "We create effective digital strategies that drive results for businesses and brands."
  });

  const expertise = getSectionData(sectionsMap, "expertise", {
    badge: "Industry Expertise",
    heading: "Sectors",
    headingAccent: "We Support.",
    subtext: "We bring deep domain expertise to high-growth sectors, delivering customized solutions."
  });

  const partnership = getSectionData(sectionsMap, "partnership", {
    badge: "Working with Us",
    heading: "Our Partnership Process.",
    headingAccent: ""
  });

  const strategy = getSectionData(sectionsMap, "strategy", {
    badge: "Strategic Approach",
    heading: "Beyond",
    headingAccent: "Agency.",
    subtext: "Our approach integrates precision engineering with strategic thinking to deliver sustainable impact."
  });

  const excellence = getSectionData(sectionsMap, "excellence", {
    badge: "Partnership Values",
    heading: "Engineering",
    headingAccent: "Excellence.",
    subtext: "We focus on long-term value, designing systems that grow alongside your business goals."
  });

  const testimonials = getSectionData(sectionsMap, "testimonials", {
    badge: "Expert Feedback",
    heading: "Global Synergy",
    headingAccent: "",
    items: [
      { 
        quote: "The FruitsZone ERP transformed our chaotic inventory into a precision-guided operation. RankNexis delivered a system that actually thinks like our business.", 
        name: "Abdur Rahman", 
        company: "FruitsZone CEO",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2340"
      },
      { 
        quote: "Our digital presence now matches the luxury experience we provide. West Bound's inquiry volume tripled within two months of the new platform launch.", 
        name: "Abid Hasan", 
        company: "West Bound Travels",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2340"
      },
      { 
        quote: "Dominating local search was our primary goal, and RankNexis achieved it. The Umrah All marketplace is now a leader in targeted organic traffic.", 
        name: "Imran Khan", 
        company: "Umrah All Strategy",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=2340"
      }
    ]
  });

  const insights = getSectionData(sectionsMap, "insights", {
    badge: "Knowledge Hub",
    heading: "Strategic",
    headingAccent: "Insights."
  });

  const connect = getSectionData(sectionsMap, "connect", {
    badge: "Let's Connect",
    heading: "Start Your",
    headingAccent: "Strategy.",
    subtext: "Ready to build your next-generation platform? Connect with our team to discuss your strategic objectives."
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
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Advanced Visual System Visualization */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 hidden md:block" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 hidden md:block" />
             
              {/* Subtle Animated Nodes - Optimized to 3 for performance */}
              <div className="absolute inset-0 opacity-[0.05] hidden md:block">
                {[...Array(3)].map((_, i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.03, 0.08, 0.03],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 20 + i * 10, 
                        repeat: Infinity, 
                        ease: "linear"
                      }}
                      className="absolute rounded-full border border-brand/10 blur-3xl"
                      style={{
                        width: `${400 + i * 100}px`,
                        height: `${400 + i * 100}px`,
                        left: `${20 + (i * 30)}%`,
                        top: `${10 + (i * 20)}%`,
                        background: `radial-gradient(circle, var(--color-brand) 0%, transparent 70%)`,
                      }}
                   />
                ))}
              </div>
             
             {/* Connection Lines (Static for performance) */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0 100 Q 250 50 500 100 T 1000 100" 
                  fill="none" 
                  stroke="var(--color-brand)" 
                  strokeWidth="0.5"
                />
                <path 
                  d="M-100 300 Q 150 250 400 300 T 900 300" 
                  fill="none" 
                  stroke="var(--color-brand)" 
                  strokeWidth="0.5"
                />
             </svg>
          </div>
          
          <div className="container-max w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-3 px-5 py-1.5 glass rounded-full shadow-premium border border-brand/5 mb-2"
                >
                   <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">{hero.badge}</p>
                </motion.div>
 
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight uppercase text-text-primary"
                  >
                    {hero.heading}
                  </motion.h1>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight uppercase text-brand"
                  >
                    {hero.headingAccent}
                  </motion.h1>
                </div>
 
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-gray-500 max-w-xl text-xl md:text-2xl font-medium leading-relaxed"
                >
                  {hero.subtext}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-6 pt-4"
                >
                    <Link href="/#contact" className="btn-primary group h-16 px-12 text-[11px] font-bold uppercase tracking-wider bg-brand hover:brightness-110 flex items-center justify-center gap-3 shadow-2xl">
                      Book a Free Call
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                  <Link href="/work" className="btn-outline h-16 px-12 text-[11px] font-bold uppercase tracking-wider border border-stroke hover:border-brand/40 flex items-center justify-center">
                    Case History
                  </Link>
                </motion.div>
              </div>
 
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="lg:col-span-5 relative hidden lg:block"
              >
                {/* Visual System Diagram Mockup */}
                <div className="aspect-square bg-surface border border-stroke rounded-[3rem] p-10 overflow-hidden relative group shadow-premium">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Abstract System visualization */}
                  <div className="relative h-full flex flex-col justify-center items-center gap-10">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-52 h-20 bg-white border border-brand/20 rounded-2xl flex items-center justify-center shadow-xl relative z-10"
                    >
                      <Code2 className="text-brand mr-4" size={24} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">Scalable Systems</span>
                    </motion.div>
                    
                    <div className="flex gap-10">
                       <motion.div 
                        animate={{ x: [-15, 0, -15], y: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-40 bg-white border border-stroke rounded-3xl flex flex-col items-center justify-center shadow-lg"
                      >
                        <TrendingUp className="text-brand mb-4" size={36} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">Market Growth</span>
                      </motion.div>
                      
                       <motion.div 
                        animate={{ x: [15, 0, 15], y: [5, -5, 5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-48 h-40 bg-white border border-stroke rounded-3xl flex flex-col items-center justify-center shadow-lg"
                      >
                        <Zap className="text-brand mb-4" size={36} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">High Precision</span>
                      </motion.div>
                    </div>
 
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
                       <div className="w-full h-px bg-brand absolute top-1/2" />
                       <div className="h-full w-px bg-brand absolute left-1/2" />
                    </div>
                  </div>
 
                  {/* Aesthetic Polishing Elements */}
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl" />
                </div>
 
                {/* Floating Metric Badge */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-8 -left-8 bg-surface border border-stroke p-6 rounded-[1.5rem] shadow-premium flex items-center gap-5 backdrop-blur-3xl grain min-w-[260px] z-20"
                >
                  <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-2xl shadow-brand/30 shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-3xl font-bold tracking-tighter leading-none mb-1"
                    >
                      100% Campaign 
                    </motion.p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted leading-relaxed">Success Guaranteed</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
 
        {/* 2. OUR GROWTH PROCESS */}
        <section className="py-32 border-y border-stroke bg-surface/30 relative overflow-hidden">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
               <div className="max-w-2xl space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-stroke rounded-full shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{trust.badge}</p>
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none">
                    {trust.heading} <span className="text-brand">{trust.headingAccent}</span>
                  </h2>
               </div>
               <p className="text-text-secondary text-lg font-medium leading-relaxed max-w-sm pb-1">
                 {trust.subtext}
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left Side: Step 01 */}
              {[
                { 
                  id: "01", 
                  title: "Customer Growth", 
                  desc: "Aggressive marketing strategies designed to help your brand lead the market and find more customers through data-driven precision.",
                  icon: TrendingUp 
                }
              ].map((vertical) => (
                <motion.div 
                  key={vertical.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="group flex flex-col justify-between p-12 bg-white border border-stroke rounded-[3rem] hover:border-brand/40 transition-all duration-500 shadow-premium relative overflow-hidden grain"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/5 transition-colors" />
                  
                  <div className="space-y-12 relative z-10">
                    <div className="w-24 h-24 rounded-[2rem] bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm">
                      <vertical.icon size={48} strokeWidth={1} />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-brand text-xs font-black tracking-[0.4em] uppercase">{vertical.id}</span>
                        <h4 className="text-3xl font-bold uppercase tracking-tight">{vertical.title}</h4>
                      </div>
                      <p className="text-text-muted text-lg font-medium leading-relaxed max-w-md">{vertical.desc}</p>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-stroke/50 flex items-center justify-between mt-auto">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-brand transition-colors">Phase Alpha Protocol</span>
                     <div className="w-12 h-12 rounded-full border border-stroke group-hover:border-brand/20 flex items-center justify-center transition-all bg-surface">
                        <ArrowRight className="text-text-muted group-hover:text-brand transition-all -rotate-45 group-hover:rotate-0" size={20} />
                     </div>
                  </div>
                </motion.div>
              ))}

              {/* Right Side: Step 02 & 03 Stacked */}
              <div className="flex flex-col gap-8">
                {[
                  { 
                    id: "02", 
                    title: "Premium Design", 
                    desc: "Modern design systems that turn your brand into a high-performance asset.",
                    icon: Palette 
                  },
                  { 
                    id: "03", 
                    title: "Modern Software", 
                    desc: "Fast, scalable software built to handle high traffic and rapid growth.",
                    icon: Layers
                  }
                ].map((vertical, i) => (
                  <motion.div 
                    key={vertical.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex-1 flex flex-col md:flex-row items-center gap-10 p-10 bg-white border border-stroke rounded-[2.5rem] hover:border-brand/40 transition-all duration-500 shadow-premium relative overflow-hidden"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shrink-0 shadow-sm">
                      <vertical.icon size={36} strokeWidth={1.2} />
                    </div>
                    
                    <div className="space-y-4 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase">{vertical.id}</span>
                        <h4 className="text-2xl font-bold uppercase tracking-tight">{vertical.title}</h4>
                      </div>
                      <p className="text-text-muted text-sm font-medium leading-relaxed max-w-sm">{vertical.desc}</p>
                    </div>

                    <div className="hidden md:flex ml-auto">
                       <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center bg-surface">
                          <ArrowRight className="text-text-muted -rotate-45" size={16} />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
 
        {/* 3. SERVICES OVERVIEW */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
              <div className="max-w-2xl space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-surface border border-stroke rounded-full"
                >
                  <div className="w-2 h-2 bg-brand rounded-full" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{servicesSection.badge}</p>
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none">
                  {servicesSection.heading} <span className="text-brand">{servicesSection.headingAccent}</span>
                </h2>
              </div>
              <p className="text-text-muted max-w-sm text-lg font-medium leading-relaxed pb-2">
                {servicesSection.subtext}
              </p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.title} {...service} index={i} />
              ))}
            </div>
          </div>
 
          <div className="absolute top-1/2 left-0 w-full h-full bg-brand/5 blur-[120px] -z-10 translate-y-1/2" />
        </section>
 
        {/* 4. INDUSTRIES SERVED */}
        <section className="py-32 border-y border-stroke bg-surface/30 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{expertise.badge}</p>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none">
                    {expertise.heading} <span className="text-brand">{expertise.headingAccent}</span>
                  </h2>
                </div>
                <p className="text-text-secondary text-xl font-medium leading-relaxed">
                  {expertise.subtext}
                </p>
                <Link href="/work" className="btn-primary h-16 px-10 text-[10px] font-bold uppercase tracking-[0.2em] group bg-brand flex items-center justify-center gap-2">
                  See Case History <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
 
              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "SaaS Systems", icon: Box },
                  { name: "Global Commerce", icon: Globe },
                  { name: "Fintech Systems", icon: ShieldCheck },
                  { name: "Healthcare", icon: Activity },
                  { name: "Ed-Tech", icon: MessageSquare },
                  { name: "Enterprise", icon: Layers }
                ].map((industry, i) => (
                  <motion.div 
                    key={industry.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass p-10 border border-white/40 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 group hover:border-brand/40 transition-all duration-500 shadow-premium cursor-default grain"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 border border-brand/10 shadow-inner">
                      <industry.icon size={32} strokeWidth={1} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-text-muted group-hover:text-text-primary transition-colors">{industry.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
 
        {/* 5. FEATURED CASE STUDIES */}
        <section id="work" className="section-padding relative">
          <div className="container-max relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-surface border border-stroke rounded-full"
                >
                  <div className="w-2 h-2 bg-brand rounded-full" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Case History</p>
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none">
                  Proven Success <span className="text-brand">Strategic Growth.</span>
                </h2>
              </div>
              <Link href="/work" className="btn-outline h-14 px-8 text-[11px] font-bold uppercase tracking-[0.2em] group/arch border border-stroke hover:border-brand/40 flex items-center justify-center gap-2">
                View All Projects <ArrowUpRight size={16} className="group-hover/arch:translate-x-1 group-hover/arch:-translate-y-1 transition-transform" />
              </Link>
            </div>
 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {studies.slice(0, 2).map((study) => (
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
 
        <section className="section-padding border-y border-stroke bg-surface/30 relative">
          <div className="container-max relative z-10">
            <div className="text-center mb-32 space-y-6">
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">{partnership.badge}</p>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">{partnership.heading}</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
              <ProcessItem step="01" title="Business Review" desc="Deep-dive into your growth potential and technical needs." />
              <ProcessItem step="02" title="Growth Plan" desc="Designing a high-performance roadmap for market success." />
              <ProcessItem step="03" title="Expert Engineering" desc="Building elite digital infrastructure with precision." />
              <ProcessItem step="04" title="Performance" desc="Continuous improvement based on real-world data." />
              <ProcessItem step="05" title="Rapid Growth" desc="Scaling your business through sustained expert help." />
              
              {/* Connecting Desktop Line */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-brand/20 -z-10" />
            </div>
          </div>
        </section>
 
        {/* 6.5. INSIDE THE ENGINE (Storytelling section) */}
        <section className="section-padding relative overflow-hidden bg-white">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">{strategy.badge}</p>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
                    {strategy.heading} <span className="text-brand">{strategy.headingAccent}</span>
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
 
                   <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                           <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* 7. WHY RANKNEXIS */}
        <section className="section-padding relative bg-surface/30">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative group p-4">
                <div className="aspect-[4/5] glass rounded-[3rem] overflow-hidden relative shadow-premium grain">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" alt="Team Session" className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent " />
                  
                  {/* Floating Metric */}
                  <div className="absolute bottom-10 left-10 right-10 p-8 glass-dark rounded-3xl backdrop-blur-2xl space-y-4">
                     <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand brightness-125">The Standard</p>
                     <h4 className="text-3xl font-bold tracking-tighter text-white">Growth Focused.</h4>
                     <p className="text-white/90 text-[11px] font-medium uppercase tracking-wider">We measure our success by your brand's actual growth.</p>
                  </div>
                </div>
              </div>
 
              <div className="space-y-16">
                <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{excellence.badge}</p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-none">
                    {excellence.heading} <span className="text-brand">{excellence.headingAccent}</span>
                  </h2>
                </div>
                
                <div className="space-y-10">
                  <ValueProp title="Smart Strategy" desc="We focus on long-term value, designing systems that grow alongside your business goals." />
                  <ValueProp title="Modern Architecture" desc="Our systems are built using reusable, high-performance components for fast scaling." />
                  <ValueProp title="Clear Reporting" desc="Honest, data-backed insights into every phase of our work." />
                </div>
 
                <Link href="/contact" className="btn-primary group h-16 px-12 text-xs font-bold uppercase tracking-wider bg-brand flex items-center justify-center gap-2">
                   Begin Your Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>
 
        {/* 8. TESTIMONIALS */}
        <section className="section-padding relative overflow-hidden bg-white">
          <div className="container-max relative z-10">
            <div className="text-center mb-24 space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">{testimonials.badge}</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
                {testimonials.heading} <br /> <span className="text-brand">{testimonials.headingAccent}</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {(dbTestimonials?.length ? dbTestimonials : testimonials.items)?.slice(0, 3).map((item: any, i: number) => (
                <TestimonyCard 
                  key={i}
                  name={item.name} 
                  role={item.role || item.company} 
                  quote={item.content || item.quote}
                  image={item.image || item.photo}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand/5 blur-[120px] -z-10" />
        </section>
 
        {/* 9. INSIGHTS PREVIEW */}
        <section className="section-padding relative bg-surface/30">
          <div className="container-max relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
              <div className="space-y-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">{insights.badge}</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
                  {insights.heading} <span className="text-brand">{insights.headingAccent}</span>
                </h2>
              </div>
              <Link href="/blog" className="btn-outline h-14 px-10 text-[11px] font-bold uppercase tracking-[0.3em] group/intel bg-surface border border-stroke hover:border-brand/40 flex items-center justify-center gap-2">
                Explore Blog <ArrowUpRight className="group-hover/intel:translate-x-1 group-hover/intel:-translate-y-1 transition-transform" />
              </Link>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.slice(0, 3).map((post) => (
                <BlogSnippet 
                  key={post.id}
                  title={post.title} 
                  date={new Date(post.createdAt).toLocaleDateString()}
                  category={post.category.name}
                  slug={post.slug}
                  image={post.image || "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"}
                />
              ))}
            </div>
          </div>
        </section>
 
        {/* 10. FINAL CTA */}
        <section id="contact" className="py-48 relative overflow-hidden px-6 grain">
          <div className="absolute inset-0 bg-brand/[0.03] -z-10" />
          <div className="container-max relative z-10">
            <div className="max-w-6xl mx-auto glass rounded-[4rem] p-10 md:p-24 shadow-premium relative overflow-hidden grain border border-stroke">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
                <div className="space-y-10">
                   <div className="space-y-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">{connect.badge}</p>
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
                        {connect.heading} <span className="text-brand">{connect.headingAccent}</span>
                      </h2>
                   </div>
                   <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-sm">
                      {connect.subtext}
                   </p>
                   
                   <div className="pt-10 border-t border-stroke space-y-8">
                      <div className="flex items-center gap-6 group">
                         <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm">
                            <ShieldCheck size={24} />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Security</p>
                            <p className="text-sm font-bold">Enterprise-Grade Compliance</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 group">
                         <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm">
                            <Activity size={24} />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Visibility</p>
                            <p className="text-sm font-bold">Transparent Reporting Systems</p>
                         </div>
                      </div>
                   </div>
                </div>
 
                <form onSubmit={handleContactSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand ml-4">Full Name</label>
                      <input required name="name" type="text" placeholder="John Doe" className="input-field" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand ml-4">Email Address</label>
                      <input required name="email" type="email" placeholder="john@example.com" className="input-field" />
                    </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] font-bold uppercase tracking-wider text-brand ml-4">Your Inquiry</label>
                     <textarea required name="message" rows={4} placeholder="Tell us about your project goals..." className="input-field h-auto py-6 resize-none" />
                  </div>
                  
                  <button disabled={isFormSubmitting} type="submit" className="btn-primary w-full h-20 text-[11px] font-bold uppercase tracking-wider group bg-brand flex items-center justify-center gap-3 shadow-2xl">
                    {isFormSubmitting ? "Scheduling..." : "Schedule Consultation"}
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
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
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="corporate-card group bg-surface border border-stroke hover:scale-[1.01] p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all min-h-[500px] flex flex-col justify-between"
    >
      <div className="relative z-10 space-y-8">
        <div className="w-16 h-16 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-700">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-none">{title}</h3>
          <p className="text-text-muted text-base leading-relaxed line-clamp-3 pr-4 font-medium">{desc}</p>
        </div>
 
        <ul className="grid grid-cols-2 gap-4 pt-8 border-t border-stroke">
          {features && features.map((item: string) => (
            <li key={item} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-text-muted">
              <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0" />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 mt-auto">
        <Link href={`/services#${slug}`} className="btn-outline h-14 w-full text-[10px] font-bold uppercase tracking-wider group/link border border-stroke hover:border-brand/40 flex items-center justify-center gap-2">
          Explore Solution <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
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
 
function ValueProp({ title, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 shrink-0 bg-surface border border-stroke rounded-xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500 shadow-sm">
        <ShieldCheck size={28} />
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{title}</h4>
        <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
 
function TestimonyCard({ name, role, quote, image }: any) {
  return (
    <div className="corporate-card relative group hover:scale-[1.02] bg-surface border border-stroke p-10 rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all h-full flex flex-col justify-between">
      <MessageSquare className="text-brand/5 absolute top-8 right-8 group-hover:text-brand/10 transition-colors" size={60} />
      <p className="text-text-secondary italic text-xl mb-10 leading-relaxed font-medium relative z-10 antialiased">"{quote}"</p>
      <div className="flex items-center gap-5 pt-8 border-t border-stroke mt-auto">
        {image ? (
            <img src={image} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm" alt={name} />
        ) : (
            <div className="w-12 h-12 bg-surface border border-stroke rounded-xl flex items-center justify-center font-bold text-brand text-lg group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm">
              {name[0]}
            </div>
        )}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-text-primary">{name}</p>
          <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{role}</p>
        </div>
      </div>
    </div>
  );
}
 
function BlogSnippet({ title, date, category, image, slug }: any) {
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
        <Link href={`/blog/${slug}`} className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 text-text-muted hover:text-brand transition-colors group/link">
          Read Story <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}


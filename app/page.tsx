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
  Search,
  ShieldCheck,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { cn } from "./lib/utils";

const SERVICES = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    desc: "We help your business rank higher on search engines, making it easier for potential customers to find you online.",
    features: ["On-Page SEO", "Keywork Research", "Technical SEO", "Backlink Building"],
    slug: "seo"
  },
  {
    icon: TrendingUp,
    title: "Social Media Marketing",
    desc: "Engage with your audience and build a strong brand presence across all major social media platforms.",
    features: ["Content Strategy", "Community Management", "Brand Awareness", "Engagement"],
    slug: "social-media"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Create a lasting impression with professional and creative designs that reflect your brand's identity.",
    features: ["Logo Design", "Social Graphics", "Brand Identity", "Print Design"],
    slug: "design"
  },
  {
     icon: Globe,
     title: "Web Design",
     desc: "Build beautiful, user-friendly websites that provide a seamless experience for your customers.",
     features: ["Responsive Design", "UI/UX Focus", "Modern Layouts", "Performance"],
     slug: "web"
  },
  {
     icon: Zap,
     title: "Facebook Ads Management",
     desc: "Reach the right audience and drive real results with targeted Facebook advertising campaigns.",
     features: ["Audience Targeting", "Ad Creation", "Campaign Optimization", "ROI Metrics"],
     slug: "marketing"
  }
];

export default function Home() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    //@ts-ignore
    const formData = new FormData(e.target);
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
      //@ts-ignore
      e.target.reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Advanced Visual System Visualization */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 animate-pulse" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
             
             {/* Subtle Animated Nodes */}
             <div className="absolute inset-0 opacity-[0.1]">
                {[...Array(6)].map((_, i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{ 
                        duration: 15 + i * 5, 
                        repeat: Infinity, 
                        ease: "linear"
                      }}
                      className="absolute rounded-full border border-brand/20 blur-2xl"
                      style={{
                        width: `${300 + i * 80}px`,
                        height: `${300 + i * 80}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `radial-gradient(circle, var(--color-brand) 0%, transparent 70%)`,
                      }}
                   />
                ))}
             </div>
             
             {/* Connection Lines (Grounded Tech feel) */}
             <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M0 100 Q 250 50 500 100 T 1000 100" 
                  fill="none" 
                  stroke="var(--color-brand)" 
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M-100 300 Q 150 250 400 300 T 900 300" 
                  fill="none" 
                  stroke="var(--color-brand)" 
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
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
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">Full-Service Digital Agency</p>
                </motion.div>

                <div className="space-y-4">
                  {[
                    "Best Digital Marketing",
                    "Agency for Small Businesses"
                  ].map((text, idx) => (
                    <motion.h1 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.2 + idx * 0.15, 
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      className={cn(
                        "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight uppercase",
                        idx === 1 ? "text-brand" : "text-text-primary"
                      )}
                    >
                      {text}
                    </motion.h1>
                  ))}
                </div>

                  Ranknexis is a professional digital marketing agency dedicated to helping businesses grow online. We focus on creating strong digital strategies that improve visibility, engagement, and results.
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-6 pt-4"
                >
                    <Link href="/#contact" className="btn-primary group h-16 px-12 text-[11px] font-bold uppercase tracking-wider bg-brand hover:brightness-110">
                      Book a Free Call
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                  <Link href="/work" className="btn-outline h-16 px-12 text-[11px] font-bold uppercase tracking-wider border border-stroke hover:border-brand/40">
                    Case History
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
                      100%
                    </motion.p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted leading-relaxed">Campaign Success <br /> Guaranteed</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. TRUST & RECOGNITION */}
        {/* 2. OUR GROWTH PROCESS */}
        <section className="py-32 border-y border-stroke bg-surface/30 relative overflow-hidden">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              {/* Left Column: Manifesto */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-stroke rounded-full shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">How We Work</p>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
                    Our <span className="text-brand">Expertise.</span>
                  </h2>
                </div>
                
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-md">
                  We don't just build websites; we create high-performance systems where great design meets expert tech.
                </p>

                <div className="flex flex-wrap items-center gap-12 opacity-30 pt-4 grayscale hover:grayscale-0 transition-all duration-700">
                  {["VERCEL", "STRIPE", "LINEAR", "NEXTJS"].map(logo => (
                    <span key={logo} className="text-sm font-black tracking-[0.3em]">{logo}</span>
                  ))}
                </div>
              </div>

              {/* Right Column: Strategic Verticals */}
              <div className="lg:col-span-7 grid grid-cols-1 gap-6">
                {[
                  { 
                    id: "01", 
                    title: "What We Do", 
                    desc: "We provide complete digital marketing solutions designed to meet the needs of modern businesses.",
                    icon: TrendingUp
                  },
                  { 
                    id: "02", 
                    title: "Why Choose Ranknexis", 
                    desc: "We believe in clear communication, honest work, and measurable results through smart strategies.",
                    icon: Palette 
                  },
                  { 
                    id: "03", 
                    title: "Our Approach", 
                    desc: "Every business is different, so we create custom strategies focused on quality and long-term growth.",
                    icon: Layers
                  }
                ].map((vertical, i) => (
                  <motion.div 
                    key={vertical.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="group flex flex-col md:flex-row items-center gap-10 p-10 bg-white border border-stroke rounded-[2.5rem] hover:border-brand/40 transition-all duration-500 shadow-premium relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors" />
                    
                    <div className="w-20 h-20 rounded-3xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shrink-0 shadow-sm">
                      <vertical.icon size={36} strokeWidth={1.2} />
                    </div>
                    
                    <div className="space-y-4 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase">{vertical.id}</span>
                        <h4 className="text-2xl font-bold uppercase tracking-tight">{vertical.title}</h4>
                      </div>
                      <p className="text-text-muted text-sm font-medium leading-relaxed max-w-md">{vertical.desc}</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center justify-center ml-auto">
                       <div className="w-12 h-12 rounded-full border border-stroke group-hover:border-brand/20 flex items-center justify-center transition-all bg-surface">
                          <ArrowRight className="text-text-muted group-hover:text-brand transition-all -rotate-45 group-hover:rotate-0" size={18} />
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
                  className="inline-flex items-center gap-3 px-4 py-2 bg-surface border border-stroke rounded-full"
                >
                  <div className="w-2 h-2 bg-brand rounded-full" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">What We Do</p>
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
                  Complete Tools <br /> <span className="text-brand">Built</span> For Growth.
                </h2>
              </div>
              <p className="text-text-muted max-w-sm text-lg font-medium leading-relaxed pb-2">
                We create effective digital strategies that drive results for businesses and brands.
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Industry Expertise</p>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase">Sectors <br /> <span className="text-brand">We Support.</span></h2>
                </div>
                <p className="text-text-secondary text-xl font-medium leading-relaxed">
                  We bring deep domain expertise to high-growth sectors, delivering customized solutions that align with specific market requirements.
                </p>
                <Link href="/work" className="btn-primary h-16 px-10 text-[10px] font-bold uppercase tracking-[0.2em] group bg-brand">
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
                  className="inline-flex items-center gap-3 px-4 py-2 bg-surface border border-stroke rounded-full"
                >
                  <div className="w-2 h-2 bg-brand rounded-full" />
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
              <CaseStudyCard 
                title="Revenue Scaling for Raafidan" 
                stats="+220%"
                kpi="Revenue Acceleration"
                tag="E-commerce"
                slug="raafidan"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <CaseStudyCard 
                title="SaaS Architecture for NextZen" 
                stats="3.2x"
                kpi="Retention Efficiency"
                tag="SaaS"
                slug="nextzen"
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-full h-full bg-brand/5 blur-[120px] -z-10 -translate-y-1/2" />
        </section>

        <section className="section-padding border-y border-stroke bg-surface/30 relative">
          <div className="container-max relative z-10">
            <div className="text-center mb-32 space-y-6">
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">Working with Us</p>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">Our Partnership Process.</h2>
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

        {/* CONTACT SECTION - High Impact Brand Color */}
        {/* 6.5. INSIDE THE ENGINE (New storytelling section) */}
        <section className="section-padding relative overflow-hidden bg-white">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">Strategic Approach</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight">
                    Beyond <br /> Agency.
                  </h2>
                </div>
                
                <p className="text-text-secondary text-xl font-medium leading-relaxed">
                  Our approach integrates precision engineering with strategic thinking to deliver sustainable impact for your organization.
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
                          className="px-8 py-4 bg-surface border border-stroke rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-wider bg-brand text-white"
                        >
                           <Zap size={16} className="text-brand" />
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">Our Goal</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight">
                    Your Business <br /> Success.
                  </h2>
                </div>
                
                <div className="space-y-10">
                  <ValueProp title="Simple Work" desc="We believe in simple, clear, and effective solutions for every project." />
                  <ValueProp title="Creative Team" desc="Our team uses customized strategies to ensure the best results based on your needs." />
                  <ValueProp title="Long-term Growth" desc="We do not just provide services; we aim to build long-term relationships with our clients." />
                </div>

                <Link href="/contact" className="btn-primary group h-16 px-12 text-xs font-bold uppercase tracking-wider bg-brand">
                   Begin Your Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="section-padding relative overflow-hidden bg-white">
          <div className="container-max relative z-10">
            <div className="text-center mb-32 space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Client Feedback</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight">The Partnership Experience.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <TestimonyCard 
                name="Ayman Sadiq" 
                role="Founder, 10 Minute School" 
                quote="The RankNexis methodology delivered sub-second infrastructure and measurable ROAS lift in under 90 days. Their engineering logic is unparalleled."
              />
              <TestimonyCard 
                name="Fahim Mashroor" 
                role="CEO, Bdjobs" 
                quote="They don't just build software—they build digital leverage. RankNexis solved architectural bottlenecks that were costing us millions."
              />
              <TestimonyCard 
                name="Zubayer Ahmed" 
                role="Founder, Hishab" 
                quote="RankNexis is our tactical advantage. Their ROI-first approach and technical precision has been a key driver in our category dominance."
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand/5 blur-[120px] -z-10" />
        </section>

        {/* 9. INSIGHTS PREVIEW */}
        <section className="section-padding relative bg-surface/30">
          <div className="container-max relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
              <div className="space-y-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Knowledge Hub</p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight">
                  Strategic <br /> Insights.
                </h2>
              </div>
              <Link href="/blog" className="btn-outline h-14 px-10 text-[11px] font-bold uppercase tracking-[0.3em] group/intel bg-surface border border-stroke hover:border-brand/40">
                Explore Blog <ArrowUpRight className="group-hover/intel:translate-x-1 group-hover/intel:-translate-y-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <BlogSnippet 
                title="Building Scalable SaaS Architecture for 2026" 
                date="Feb 12, 2026"
                category="Engineering"
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
              />
              <BlogSnippet 
                title="The SEO Engine: How to Outrank Enterprise Competitors" 
                date="Feb 10, 2026"
                category="Marketing"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <BlogSnippet 
                title="Leveraging AI for Workflow Automation in E-commerce" 
                date="Feb 05, 2026"
                category="Automation"
                image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section id="contact" className="py-48 relative overflow-hidden px-6 grain">
          <div className="absolute inset-0 bg-brand/[0.03] -z-10" />
          <div className="container-max relative z-10">
            <div className="max-w-6xl mx-auto glass rounded-[4rem] p-10 md:p-24 shadow-premium relative overflow-hidden grain">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
                <div className="space-y-10">
                   <div className="space-y-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Let's Connect</p>
                      <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-tight">
                        Start <br /> Your <span className="text-brand">Strategy.</span>
                      </h2>
                   </div>
                   <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-sm">
                      Ready to build your next-generation platform? Connect with our team to discuss your strategic objectives.
                   </p>
                   
                   <div className="pt-10 border-t border-stroke space-y-8">
                      <div className="flex items-center gap-6 group">
                         <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                            <ShieldCheck size={24} />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Security</p>
                            <p className="text-sm font-bold">Enterprise-Grade Compliance</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 group">
                         <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
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
                  
                  <button disabled={isFormSubmitting} type="submit" className="btn-primary w-full h-20 text-[11px] font-bold uppercase tracking-wider group bg-brand">
                    {isFormSubmitting ? "Sheduling..." : "Schedule Consultation"}
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
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
      className="corporate-card group bg-surface border border-stroke hover:scale-[1.01]"
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

        <Link href={`/services/${slug}`} className="btn-outline h-14 w-full text-[10px] font-bold uppercase tracking-wider group/link border border-stroke hover:border-brand/40">
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
      className="corporate-card p-0 group overflow-hidden bg-surface border border-stroke"
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
      <div className="p-10 space-y-6">
        <h3 className="text-3xl font-bold mb-3 tracking-tight uppercase leading-tight">{title}</h3>
        <Link href={`/work/${slug}`} className="btn-outline h-14 w-full text-[10px] font-bold uppercase tracking-wider group/link border border-stroke hover:border-brand/40">
          View Project <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function ProcessItem({ step, title, desc }: any) {
  return (
    <div className="text-center md:text-left relative z-10 group">
      <div className="w-20 h-20 bg-surface border border-stroke rounded-2xl flex items-center justify-center mb-10 mx-auto md:mx-0 group-hover:border-brand transition-all duration-700">
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
      <div className="w-14 h-14 shrink-0 bg-surface border border-stroke rounded-xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
        <ShieldCheck size={28} />
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{title}</h4>
        <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonyCard({ name, role, quote }: any) {
  return (
    <div className="corporate-card relative group hover:scale-[1.02] bg-surface border border-stroke">
      <MessageSquare className="text-brand/5 absolute top-8 right-8 group-hover:text-brand/10 transition-colors" size={60} />
      <p className="text-text-secondary italic text-xl mb-10 leading-relaxed font-medium relative z-10 antialiased">"{quote}"</p>
      <div className="flex items-center gap-5 pt-8 border-t border-stroke">
        <div className="w-12 h-12 bg-surface border border-stroke rounded-xl flex items-center justify-center font-bold text-brand text-lg group-hover:bg-brand group-hover:text-white transition-all duration-700">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-text-primary">{name}</p>
          <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{role}</p>
        </div>
      </div>
    </div>
  );
}

function BlogSnippet({ title, date, category, image }: any) {
  return (
    <div className="corporate-card p-0 group hover:scale-[1.02] bg-surface border border-stroke overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden relative">
         <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
         <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
         <div className="absolute top-6 left-6 px-4 py-1.5 bg-brand text-white rounded-full text-[8px] font-bold uppercase tracking-wider">{category}</div>
      </div>
      <div className="p-8 space-y-6 relative -mt-16 z-10">
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

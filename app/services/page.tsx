"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    Code2,
    Globe,
    Layers,
    Palette,
    Search,
    ShieldCheck,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  useEffect(() => {
    // Handle initial hash on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Clean the URL
          window.history.replaceState(null, "", window.location.pathname);
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* 1. HERO SECTION */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Service Operating Systems</p>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                Expert <br /> <span className="text-brand">Services.</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                We provide a comprehensive range of digital marketing and development services designed to help your brand grow and succeed in the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE OPERATING SYSTEMS - DETAILED BREAKDOWN */}
        <section className="pb-48">
          <div className="container-max space-y-32">
            
            {/* DIGITAL MARKETING SECTION */}
            <div id="marketing" className="space-y-20 scroll-mt-32">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <TrendingUp className="text-brand" size={32} />
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Digital <span className="text-brand">Marketing.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                     Targeted strategies to increase your visibility and drive sales. We handle everything from social media to paid ad campaigns.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DetailBlock 
                     slug="marketing"
                     title="Social Media Marketing" 
                     desc="Build a strong community and engage your audience across all major platforms with content that resonates."
                     bullets={["Platform Strategy", "Content Creation", "Community Management", "Engagement Analytics"]}
                  />
                  <DetailBlock 
                     slug="marketing"
                     title="Facebook Ads" 
                     desc="Highly targeted ad campaigns designed to reach your ideal customers and maximize your return on ad spend."
                     bullets={["Audience Targeting", "Ad Creative Design", "Campaign Optimization", "Detailed Reporting"]}
                  />
                  <DetailBlock 
                     slug="marketing"
                     title="Google Ads" 
                     desc="Appear at the top of search results when customers are looking for your services. We manage search, display, and shopping ads."
                     bullets={["Keyword Research", "Bid Management", "Landing Page Audit", "Conversion Tracking"]}
                  />
               </div>
            </div>

            {/* SEO SECTION */}
            <div id="seo" className="space-y-20 scroll-mt-32">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <Search className="text-brand" size={32} />
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Search Engine <span className="text-brand">Optimization.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                     Improve your search rankings and drive organic traffic to your website with our expert SEO strategies.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DetailBlock 
                     slug="seo"
                     title="Local SEO" 
                     desc="Optimize your business for local search results to attract customers in your specific geographic area."
                     bullets={["Google Business Profile", "Local Citations", "Review Management", "Map Rankings"]}
                  />
                  <DetailBlock 
                     slug="seo"
                     title="Ecommerce SEO" 
                     desc="Specialized SEO for online stores to increase product visibility and drive more sales from search engines."
                     bullets={["Product Page Optimization", "Category Structure", "Schema Markup", "Technical SEO Audits"]}
                  />
               </div>
            </div>

            {/* GRAPHIC DESIGN SECTION */}
            <div id="design" className="space-y-20 scroll-mt-32">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <Palette className="text-brand" size={32} />
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Graphic <span className="text-brand">Design.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                     Professional visuals that define your brand and capture attention. We create everything from logos to social media assets.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DetailBlock 
                     slug="design"
                     title="Logo & Branding" 
                     desc="A unique and memorable visual identity that represents your brand's values and mission."
                     bullets={["Logo Design", "Brand Guidelines", "Visual Style Guides", "Stationery Design"]}
                  />
                  <DetailBlock 
                     slug="design"
                     title="Social Media Design" 
                     desc="Engaging posts and thumbnails designed specifically for each platform to stop the scroll."
                     bullets={["Post Templates", "YouTube Thumbnails", "Story Graphics", "Banner Design"]}
                  />
                  <DetailBlock 
                     slug="design"
                     title="Packaging Design" 
                     desc="Eye-catching and practical designs for your physical products that stand out on the shelf."
                     bullets={["Label Design", "Box Packaging", "Product Mockups", "Print-Ready Files"]}
                  />
               </div>
            </div>

            {/* VIDEO & MOTION SECTION */}
            <div id="video" className="space-y-20 scroll-mt-32">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <Zap className="text-brand" size={32} />
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Video & <span className="text-brand">Motion.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                     Dynamic video content and motion graphics that bring your message to life and engage your viewers.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DetailBlock 
                     slug="video"
                     title="Video Editing" 
                     desc="Professional editing to create polished and engaging videos for marketing, social media, or internal use."
                     bullets={["Content Editing", "Color Correction", "Audio Post-Production", "VFX Integration"]}
                  />
                  <DetailBlock 
                     slug="video"
                     title="Motion Graphics & Animation" 
                     desc="Bring icons, text, and graphics to life with smooth animations that explain concepts and entertain users."
                     bullets={["Explainer Videos", "Animated Logos", "UI Animations", "2D/3D Animation"]}
                  />
               </div>
            </div>

            {/* WEB DEVELOPMENT SECTION */}
            <div id="engineering" className="space-y-20 scroll-mt-32">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <Code2 className="text-brand" size={32} />
                     <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Web <span className="text-brand">Development.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl font-medium max-w-4xl leading-relaxed">
                     We build fast, secure, and user-friendly websites and web applications tailored to your specific needs.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <DetailBlock 
                     slug="web"
                     title="Web Design & UI/UX" 
                     desc="Beautiful and functional designs focused on providing a smooth and intuitive user experience."
                     bullets={["User Interface Design", "User Experience Research", "Responsive Design", "Prototyping"]}
                  />
                  <DetailBlock 
                     slug="web"
                     title="Full-Stack Development" 
                     desc="End-to-end development of web applications, including both the user interface and the back-end logic."
                     bullets={["Front-End (React/Next.js)", "Back-End (Node/Python)", "Database Management", "API Development"]}
                  />
               </div>
            </div>

          </div>
        </section>

        {/* 3. INTEGRATED STACK SECTION */}
        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                   <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Unified Logic</p>
                   <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Expertise</span> <br /> In Scale.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  We design and implement scalable digital systems that drive measurable results for global organizations.
                </p>
                
                <div className="space-y-10 pt-10 border-t border-stroke">
                  <StackItem title="Discovery & Diagnostic" desc="Deep-dive technical and market audit to identify operational bottlenecks." />
                  <StackItem title="Architectural Design" desc="Building the high-performance stack and growth funnels for absolute synergy." />
                  <StackItem title="Live Governance" desc="Daily iterative optimizations against real-time revenue and performance data." />
                </div>
              </div>
            </div>

            <div className="relative group p-4">
                <div className="aspect-square glass rounded-[4rem] p-10 flex items-center justify-center relative group shadow-premium grain overflow-hidden">
                  <div className="absolute inset-0 bg-brand/[0.02] -z-10" />
                  <div className="grid grid-cols-2 gap-10 relative z-10 w-full h-full">
                     <TechNode icon={Globe} label="Global Delivery" />
                     <TechNode icon={Search} label="Index Optimization" />
                     <TechNode icon={Layers} label="Protocol Layer" />
                     <TechNode icon={TrendingUp} label="Revenue Hub" />
                  </div>
                  
                  {/* Visual Background Pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
                     <pattern id="grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid-dots)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="py-48 bg-white relative overflow-hidden grain">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.03] -z-10" />
          <div className="container-max text-center relative z-10 space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand">Next Phase</p>
               <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Initialize <br /> <span className="text-brand">Deployment.</span>
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
              Book a strategy consultation call with our experts to plan your growth trajectory.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contact" className="btn-primary h-20 px-16 text-xs font-bold uppercase tracking-[0.3em] group shadow-premium">
                Request Optimization Proposal <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/work" className="btn-outline h-20 px-16 text-xs font-bold uppercase tracking-[0.3em] bg-white/80 backdrop-blur-md">
                Review Case Archives
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* HELPER COMPONENTS */

function DetailBlock({ title, desc, bullets, slug }: any) {
  return (
    <div className="corporate-card grain group space-y-8">
       <div className="space-y-4">
          <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none group-hover:text-brand transition-colors">{title}</h3>
          <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
       </div>
       <ul className="space-y-4 pt-8 border-t border-stroke">
          {bullets.map((b: string) => (
             <li key={b} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>{b}</span>
             </li>
          ))}
       </ul>
       <Link href={`/services/${slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand group/link pt-4">
          View Details <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
       </Link>
    </div>
  );
}

function StackItem({ title, desc }: any) {
  return (
    <div className="flex gap-8 group">
      <div className="w-16 h-16 shrink-0 glass border border-stroke rounded-2xl flex items-center justify-center text-brand shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-500">
        <ShieldCheck size={32} />
      </div>
      <div>
        <h4 className="text-2xl font-bold mb-2 uppercase tracking-tight leading-none group-hover:text-brand transition-colors">{title}</h4>
        <p className="text-text-muted text-lg font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TechNode({ icon: Icon, label }: any) {
  return (
    <div className="glass border border-stroke rounded-3xl flex flex-col items-center justify-center gap-6 hover:border-brand transition-all duration-700 shadow-premium group cursor-default p-6">
      <Icon size={48} strokeWidth={1} className="text-brand/30 group-hover:text-brand transition-all duration-500 group-hover:scale-110" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted text-center leading-tight">{label}</span>
    </div>
  );
}

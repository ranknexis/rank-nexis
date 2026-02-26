"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Layers,
    ShieldCheck,
    Target,
    Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TeamMemberCard from "../components/TeamMemberCard";
import ValueCard from "../components/ValueCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* 1. PHILOSOPHICAL HERO */}
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
                 <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Studio Philosophy</p>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                Smart & <br /> <span className="text-brand">Affordable.</span>
              </h1>
              <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                Ranknexis – Smart & Affordable Digital Marketing for Small Businesses. We focus on strengthening the online presence of businesses with modern digital marketing solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. THE GROWTH NARRATIVE */}
        <section className="section-padding border-y border-stroke bg-surface/30 relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <div className="space-y-6">
                       <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Our Philosophy</p>
                       <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">Driven By <br /><span className="text-brand">Results.</span></h2>
                    </div>
                    
                     <div className="space-y-8">
                       <p className="text-text-secondary text-xl font-medium leading-relaxed">
                         Ranknexis is a reliable and professional digital marketing agency. We provide top-rated digital marketing services, including SEO, Social Media Marketing, Graphic Design, and Web Design.
                       </p>
                       <p className="text-text-secondary text-xl font-medium leading-relaxed">
                          At Ranknexis, we believe in simple, clear, and effective work. Our team is experienced and creative, and we complete every project with full attention and responsibility. We aim to build long-term relationships with our clients.
                       </p>
                     </div>

                    <div className="flex gap-16 pt-12 border-t border-stroke">
                       <div className="space-y-2">
                          <p className="text-5xl font-bold text-brand tracking-tighter">08+</p>
                          <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Years Active</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-5xl font-bold text-brand tracking-tighter">180+</p>
                          <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Systems Implemented</p>
                       </div>
                    </div>
                 </div>

                  <div className="relative group p-4">
                     <div className="aspect-square glass rounded-[4rem] overflow-hidden relative shadow-premium grain">
                        <img 
                           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                           alt="RankNexis Lab" 
                           className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
                        />
                        <div className="absolute inset-0 bg-brand/[0.03] group-hover:bg-transparent transition-colors" />
                     </div>
                    {/* Floating Accent */}
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [-12, -10, -12] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute -bottom-8 -left-8 w-44 h-44 glass border border-stroke rounded-[2rem] flex items-center justify-center shadow-premium backdrop-blur-3xl hidden md:flex"
                    >
                       <Layers size={64} className="text-brand" strokeWidth={1} />
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. EXPERTISE STACK (TEAM) */}
        <section className="section-padding bg-white relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="mb-32 text-center space-y-6">
                 <p className="text-[11px] font-bold text-brand uppercase tracking-[0.6em]">The Core Team</p>
                 <h2 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase leading-none">The People <br /> <span className="text-brand">Behind Your Success.</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                  <TeamMemberCard 
                     name="MD Sourav Hasan" 
                     role="Google Ads Specialist" 
                     image="/team/MD_Sourav_Hasan.png" 
                     bio="Expert in managing Google Ads campaigns to drive targeted traffic and measurable results for businesses."
                  />
                  <TeamMemberCard 
                     name="S.M. Tanveer" 
                     role="SEO Specialist" 
                     image="/team/S_M_Tanveer.png" 
                     bio="Dedicated SEO specialist focused on improving search visibility and organic rankings for our clients."
                  />
                  <TeamMemberCard 
                     name="MD Maruf Hossen" 
                     role="Meta Ads Specialist" 
                     image="/team/MD_Maruf_Hossen.png" 
                     bio="Specialist in creating and optimizing high-performing Facebook and Instagram ad campaigns."
                  />
              </div>
           </div>
           
           <div className="absolute top-1/2 left-0 w-full h-full bg-brand/5 blur-[120px] -z-10 translate-y-1/2" />
        </section>

        {/* 4. CORE VALUES */}
        <section className="section-padding border-y border-stroke bg-surface/30">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <ValueCard 
                    icon={Target} 
                    title="ROI Mandate" 
                    desc="We believe every line of code and every creative asset must be judged by the revenue it creates. Zero vanity metrics." 
                 />
                 <ValueCard 
                    icon={ShieldCheck} 
                    title="Data Sovereignty" 
                    desc="We build transparent tracking systems that give brands absolute ownership and clarity over their growth data." 
                 />
                 <ValueCard 
                    icon={Zap} 
                    title="System Velocity" 
                    desc="Speed is a growth factor. We engineer platforms for maximum performance, ensuring zero friction in the user journey." 
                 />
              </div>
           </div>
        </section>

        {/* 5. FINAL CTA */}
        <section className="py-48 bg-white relative px-6 overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] -z-10" />
          
          <div className="container-max text-center relative z-10 space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Connect With Us</p>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight">
                    Our <span className="text-brand text-5xl md:text-7xl block mt-4">Technical Expertise.</span>
                  </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
               Connect with our team to discuss how we can build a scalable digital strategy for your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/#contact" className="btn-primary h-20 px-16 text-xs font-bold uppercase tracking-[0.3em] group shadow-premium">
                Request Optimization Call <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

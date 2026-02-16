"use client";

import { motion } from "framer-motion";
import {
    ChevronRight,
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

      <main>
        {/* 1. PHILOSOPHICAL HERO */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.03),transparent)] pointer-events-none" />
          
          <div className="container-max relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Studio Philosophy</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                Engineering <br /> <span className="text-brand">The Future of Growth.</span>
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                We believe that modern growth is not a creative output, but a technical requirement. We build the systems that build brands.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. THE GROWTH NARRATIVE */}
        <section className="section-padding bg-gray-50 border-y border-gray-100 relative overflow-hidden">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-10">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Beyond <br /><span className="text-brand">Digital Marketing.</span></h2>
                    <p className="text-gray-600 text-xl leading-relaxed font-medium">
                       RankNexis was founded on a single observation: traditional marketing is failing because it's disconnected from engineering. In a world driven by algorithms and sub-second performance, a pretty design isn't enough.
                    </p>
                    <p className="text-gray-600 text-xl leading-relaxed font-medium">
                       We've spent 8+ years building integrated revenue ecosystems where code and copy act as a single unit. Our mission is to provide ambitious brands with the high-precision machinery required to dominate their sectors.
                    </p>
                    <div className="flex gap-12 pt-10 border-t border-gray-200">
                       <div>
                          <p className="text-4xl font-black text-brand tracking-tighter">08+</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Years Experience</p>
                       </div>
                       <div>
                          <p className="text-4xl font-black text-brand tracking-tighter">120+</p>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Scale Partners</p>
                       </div>
                    </div>
                 </div>
                  <div className="relative">
                     <div className="aspect-square bg-white border border-gray-100 rounded-[3.5rem] overflow-hidden group shadow-2xl">
                        <img 
                           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                           alt="RankNexis Lab" 
                           className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-colors" />
                     </div>
                    {/* Floating Accent */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand rounded-3xl flex items-center justify-center -rotate-12 shadow-2xl hidden md:flex">
                       <Layers size={64} className="text-black" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. EXPERTISE STACK (TEAM) */}
        <section className="section-padding bg-white">
           <div className="container-max">
              <div className="mb-24 text-center">
                 <p className="text-[10px] font-bold text-brand uppercase tracking-[0.4em] mb-6">Expertise Stack</p>
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto uppercase">The Architects Behind <br /> <span className="text-brand">The Systems.</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 <TeamMemberCard 
                    name="Mahdi Monir" 
                    role="Founder / Growth Architect" 
                    image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070" 
                    bio="Expert in high-ticket sector scaling and technical revenue ecosystem design. Over 8 years of surgical growth precision."
                 />
                 <TeamMemberCard 
                    name="System Principal" 
                    role="Lead Engineering" 
                    image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2070" 
                    bio="Specializing in multi-tenant SaaS architecture and sub-second digital infrastructure optimization."
                 />
                 <TeamMemberCard 
                    name="Data Node" 
                    role="Performance Director" 
                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070" 
                    bio="Focusing on attribution modeling and algorithmic paid acquisition strategies for ambitious brands."
                 />
              </div>
           </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="section-padding bg-gray-50 border-y border-gray-100">
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
        <section className="py-40 bg-white relative px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] -z-10" />
          
          <div className="container-max text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter">Ready to Start a <br /> <span className="text-brand">Growth Conversation?</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl mb-16 font-medium">
              Connect with our strategy team to discuss how we can engineer a scalable revenue ecosystem for your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/#contact" className="btn-primary h-20 px-16 text-sm font-black uppercase tracking-widest active:scale-95 group">
                Request Strategy Call <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    Code2,
    Globe,
    Layers,
    Palette,
    Search,
    ShieldCheck,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.03),transparent)] pointer-events-none" />
          
          <div className="container-max relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Service Operating Systems</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                Strategic Solutions <br /> Engineered for <span className="text-brand">Growth.</span>
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                We design and deploy integrated digital ecosystems that provide absolute sector authority and scalable revenue infrastructure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE DISCIPLINES - DETAILED GRID */}
        <section className="section-padding bg-gray-50 border-y border-gray-100">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <ServiceDetailCard 
                icon={TrendingUp}
                title="Growth Solutions"
                desc="High-velocity acquisition engines designed to maximize ROAS and dominate tactical market nodes."
                features={[
                  "Surgical SEO Strategy",
                  "Google Ads Performance",
                  "Meta Ads Scaling",
                  "Social Media Marketing"
                ]}
              />
              <ServiceDetailCard 
                icon={Palette}
                title="Experience Design"
                desc="Premium visual logic and design systems built to elevate brand authority and conversion intent."
                features={[
                  "UI/UX Design Systems",
                  "Branding Identity Design",
                  "Graphic Design Nodes",
                  "Conversion Flow Mapping"
                ]}
              />
              <ServiceDetailCard 
                icon={Code2}
                title="Digital Engineering"
                desc="High-precision digital platforms built for sub-second performance and enterprise-grade scale."
                features={[
                  "Web Systems Development",
                  "API First Infrastructure",
                  "Custom SaaS Ecosystems",
                  "Architectural Consulting"
                ]}
              />
            </div>
          </div>
        </section>

        {/* 3. INTEGRATED STACK SECTION */}
        <section className="section-padding bg-white overflow-hidden">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Unified <br /> <span className="text-brand">Operating System.</span></h2>
                <p className="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
                  We don't believe in siloed services. Our engineering and marketing teams work in a single synchronized loop, ensuring that every line of code serves a growth objective.
                </p>
                
                <div className="space-y-8">
                  <StackItem title="Discovery & Audit" desc="Deep-dive technical and market diagnostic to identify bottlenecks." />
                  <StackItem title="System Design" desc="Architecting the tech stack and growth funnels for absolute synergy." />
                  <StackItem title="Continuous Sync" desc="Daily iterative optimizations against real-time revenue data." />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-white border border-gray-100 rounded-[3rem] p-12 flex items-center justify-center relative group shadow-2xl">
                  <div className="absolute inset-0 bg-brand/5 rounded-[3rem] animate-pulse" />
                  <div className="grid grid-cols-2 gap-8 relative z-10 w-full h-full">
                     <TechNode icon={Globe} label="Global CDN" />
                     <TechNode icon={Search} label="Search Node" />
                     <TechNode icon={Layers} label="Data Layer" />
                     <TechNode icon={TrendingUp} label="Scale Node" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="py-40 bg-brand text-black relative px-6">
          <div className="container-max text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter">Ready to Initialize Your System?</h2>
            <p className="text-black/70 max-w-2xl mx-auto text-xl mb-16 font-medium">
              Book a strategy synchronization call with our engineering leads to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/#contact" className="h-20 px-16 bg-black text-white rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                Request Proposal
              </Link>
              <Link href="/work" className="h-20 px-16 border border-black/20 rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest hover:bg-black/5 transition-all">
                View Proof of Work
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

function ServiceDetailCard({ icon: Icon, title, desc, features }: any) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-brand transition-all duration-500 group shadow-xl">
      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-500">
        <Icon size={32} />
      </div>
      <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase">{title}</h3>
      <p className="text-gray-600 mb-10 font-medium leading-relaxed">{desc}</p>
      <ul className="space-y-4">
        {features.map((f: string) => (
          <li key={f} className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest text-gray-600">
            <CheckCircle2 size={16} className="text-brand shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackItem({ title, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 shrink-0 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand">
        <ShieldCheck size={24} />
      </div>
      <div>
        <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">{title}</h4>
        <p className="text-gray-600 text-sm font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TechNode({ icon: Icon, label }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-brand transition-all duration-500 shadow-lg group">
      <Icon size={40} className="text-brand/50 group-hover:text-brand transition-colors duration-500" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">{label}</span>
    </div>
  );
}

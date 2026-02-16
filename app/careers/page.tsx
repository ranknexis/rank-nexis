"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Rocket,
  ShieldCheck,
  Users
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";

const OPEN_ROLES = [
  {
    id: "1",
    title: "Senior Growth Engineer",
    department: "Engineering",
    location: "Remote / Dhaka",
    type: "Full-Time",
    slug: "senior-growth-engineer"
  },
  {
    id: "2",
    title: "Technical SEO Lead",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    slug: "technical-seo-lead"
  },
  {
    id: "3",
    title: "AI Solutions Architect",
    department: "AI & Automation",
    location: "Hybrid (Dhaka)",
    type: "Full-Time",
    slug: "ai-solutions-architect"
  },
  {
    id: "4",
    title: "Full-Stack System Principal",
    department: "Engineering",
    location: "Dhaka HQ",
    type: "Full-Time",
    slug: "fullstack-system-principal"
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Engineering Excellence</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                Join the <br /> <span className="text-brand">Growth Engine.</span>
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                We are building the systems that power the world's most ambitious brands. If you prefer precision over buzzwords, you're in the right place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CULTURE SECTION */}
        <section className="section-padding bg-gray-50 border-y border-gray-100 relative overflow-hidden">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <CultureItem 
                icon={ShieldCheck} 
                title="Sovereignty" 
                desc="Absolute ownership of your domain. We hire experts and trust them to engineer the best solutions without micromanagement." 
               />
               <CultureItem 
                icon={Cpu} 
                title="Performance" 
                desc="Sub-second precision isn't just for our products; it's for our internal workflows. We value efficiency and logic above all else." 
               />
               <CultureItem 
                icon={Rocket} 
                title="Rapid Scale" 
                desc="Every role here is focused on growth. You'll see the direct impact of your work on revenue and market authority." 
               />
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Sync Your <br /><span className="text-brand">Potential.</span></h2>
                <p className="text-gray-600 max-w-xl text-lg font-medium">Current operational openings across our engineering and strategic growth nodes.</p>
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                <Users size={16} className="text-brand" />
                {OPEN_ROLES.length} Active System Slots
              </div>
            </div>

            <div className="space-y-6">
              {OPEN_ROLES.map((job) => (
                <JobCard 
                  key={job.id}
                  title={job.title}
                  location={job.location}
                  type={job.type}
                  department={job.department}
                  slug={job.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM CTA */}
        <section className="py-40 bg-brand text-black relative px-6 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/5 -z-10" />
          <div className="container-max text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-10 opacity-70">General Inquiry</p>
            <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter uppercase max-w-5xl mx-auto">Don't See Your Specialty <br /> Scheduled Above?</h2>
            <p className="text-black/70 max-w-2xl mx-auto text-xl mb-16 font-medium italic">
              "We are always on the lookout for the top 1% of growth engineers and strategic architects. If you are an outlier, we want to talk."
            </p>
            <Link href="/contact" className="h-20 px-16 bg-black text-white rounded-2xl inline-flex items-center justify-center text-sm font-black uppercase tracking-widest active:scale-95 group shadow-2xl transition-all">
              Initialize Talent Sync <ArrowRight size={20} className="ml-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CultureItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-10 bg-white border border-gray-100 rounded-[3rem] hover:border-brand transition-all duration-500 shadow-xl group">
      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-500">
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">{title}</h3>
      <p className="text-gray-600 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

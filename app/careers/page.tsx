"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Layers,
    MapPin,
    Search,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const JOBS = [
  {
    id: "snr-backend",
    title: "Senior Backend Engineer",
    department: "Development",
    location: "Remote / Dhaka",
    type: "Full-Time",
    salary: "$60k - $90k",
    desc: "Building robust API systems and scaling digital infrastructure to support our global clients."
  },
  {
    id: "growth-lead",
    title: "Growth Strategy Lead",
    department: "Marketing",
    location: "Hybrid / Dubai",
    type: "Full-Time",
    salary: "$50k - $80k",
    desc: "Developing and executing effective marketing strategies to drive user acquisition and growth."
  },
  {
    id: "uiux-designer",
    title: "Senior UI/UX Architect",
    department: "Design",
    location: "Remote",
    type: "Full-Time",
    salary: "$40k - $70k",
    desc: "Designing intuitive user interfaces and modern design systems focused on user experience."
  }
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = JOBS.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10 text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Careers</p>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                  Build Your <br /> <span className="text-brand">Career.</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  Join our team of experts. We are building the next generation of digital solutions.
                </p>
              </motion.div>
           </div>
        </section>

        {/* SEARCH & FILTERS */}
        <section className="py-12 border-b border-stroke bg-surface/30">
           <div className="container-max">
              <div className="relative max-w-2xl mx-auto">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <input 
                     type="text" 
                     placeholder="Search positions (e.g. Designer, Engineer)..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full h-16 pl-16 pr-8 glass border border-stroke rounded-2xl text-xs font-bold uppercase tracking-wider focus:border-brand transition-all outline-none" 
                 />
              </div>
           </div>
        </section>

        {/* JOBS LIST */}
        <section className="py-32">
           <div className="container-max">
              <div className="space-y-8">
                 {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                    <motion.div 
                       key={job.id}
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                    >
                       <Link href={`/careers/${job.id}`} className="group block">
                          <div className="corporate-card grain flex flex-col md:flex-row md:items-center justify-between gap-8 group-hover:border-brand transition-all duration-500">
                             <div className="space-y-4">
                                <div className="flex flex-wrap gap-4">
                                   <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand px-3 py-1 glass rounded-full">
                                      {job.department}
                                   </div>
                                   <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                                      <Briefcase size={12} /> {job.type}
                                   </div>
                                   <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                                      <MapPin size={12} /> {job.location}
                                   </div>
                                </div>
                                <h3 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-brand transition-colors">{job.title}</h3>
                                <p className="text-text-muted text-base font-medium leading-relaxed max-w-2xl">
                                   {job.desc}
                                </p>
                             </div>
                             
                             <div className="flex flex-col items-end gap-4 min-w-[200px]">
                                <span className="text-xl font-bold tracking-tighter text-text-primary">{job.salary}</span>
                                <div className="btn-outline h-12 px-6 text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                                   Apply Now
                                </div>
                             </div>
                          </div>
                       </Link>
                    </motion.div>
                 )) : (
                    <div className="text-center py-20">
                       <p className="text-text-muted text-xl font-medium">No positions match your search.</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* CULTURE SECTION */}
        <section className="py-48 bg-black text-white relative overflow-hidden grain">
           <div className="absolute top-0 left-0 w-full h-full bg-brand/5 -z-10" />
           <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">The Environment</p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Join</span> <br /> Our Team.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  We are looking for exceptional talent to help us solve complex digital challenges and deliver high-impact solutions.
                </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <Zap className="text-brand" size={32} />
                       <h4 className="text-lg font-bold uppercase tracking-tight">High Performance</h4>
                       <p className="text-white/50 text-xs font-bold uppercase tracking-wider">We focus on efficiency and delivering results that matter.</p>
                    </div>
                    <div className="space-y-4">
                       <Layers className="text-brand" size={32} />
                       <h4 className="text-lg font-bold uppercase tracking-tight">Ownership</h4>
                       <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Complete ownership over your projects and impact.</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-square glass rounded-[4rem] overflow-hidden grain">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" alt="Team Session" className="w-full h-full object-cover grayscale opacity-20" />
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    DollarSign,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const JOBS_DATA: Record<string, any> = {
  "seo-specialist": {
    title: "SEO Specialist",
    department: "SEO",
    location: "Remote / Chattogram",
    type: "Full-Time",
    salary: "$600 - $900",
    overview: "We are looking for a dedicated SEO Specialist to help our clients rank higher on search engines and grow their organic traffic. You will be responsible for keyword research, on-page optimization, and reporting.",
    requirements: [
      "2+ years of SEO experience.",
      "Knowledge of Google Search Console and Analytics.",
      "Ability to perform keyword research and competitor analysis.",
      "Good understanding of on-page and technical SEO.",
      "Excellent communication and reporting skills."
    ],
    benefits: [
      "Competitive Salary",
      "Flexible Remote Work",
      "Learning Opportunities",
      "Performance Bonuses"
    ]
  },
  "web-designer": {
    title: "Web Designer",
    department: "Design",
    location: "Hybrid / Chattogram",
    type: "Full-Time",
    salary: "$500 - $800",
    overview: "Join our creative team to design beautiful and easy-to-use websites for small businesses. You will work closely with developers to bring your designs to life.",
    requirements: [
       "3+ years in web or UI design.",
       "Proficiency in Figma or Adobe XD.",
       "Ability to create user-friendly and responsive layouts.",
       "Strong eye for typography and color theory.",
       "Experience working with small business brands."
    ],
    benefits: [
      "Creativity Bonuses",
      "Professional Growth",
      "Team Activities",
      "Modern Workspace"
    ]
  }
};

export default function JobDetailPage() {
  const { slug } = useParams();
  const job = JOBS_DATA[slug as string] || JOBS_DATA["seo-specialist"];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Application Received. Our team will review your application soon.");
      setIsSubmitting(false);
      //@ts-ignore
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10">
              <div className="max-w-4xl mx-auto space-y-12">
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                 >
                   <Link href="/careers" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-brand hover:text-brand/80 pb-1 border-b border-brand">
                     <ArrowLeft size={12} /> Back to Open Nodes
                   </Link>
                 </motion.div>
                 
                 <div className="space-y-8">
                    <div className="flex flex-wrap gap-4">
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 glass bg-brand/5 border border-brand/10 text-brand text-[10px] font-bold uppercase rounded-full">
                          {job.department}
                       </div>
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 glass text-text-muted text-[10px] font-bold uppercase rounded-full">
                          <MapPin size={12} /> {job.location}
                       </div>
                    </div>
                    
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase"
                    >
                      {job.title}
                    </motion.h1>
                    
                    <div className="flex flex-wrap gap-12 pt-4">
                       <div className="flex items-center gap-3">
                          <Clock className="text-brand" size={20} />
                          <span className="text-lg font-bold uppercase tracking-tight">{job.type}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <DollarSign className="text-brand" size={20} />
                          <span className="text-lg font-bold uppercase tracking-tight">{job.salary}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-32">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                 {/* Main Content */}
                 <div className="lg:col-span-7 space-y-24">
                    <div className="space-y-10">
                       <h2 className="text-3xl font-bold uppercase tracking-tighter">Role <span className="text-brand">Overview.</span></h2>
                       <p className="text-text-secondary text-xl font-medium leading-relaxed">
                          {job.overview}
                       </p>
                    </div>

                    <div className="space-y-10">
                       <h2 className="text-3xl font-bold uppercase tracking-tighter">Job <span className="text-brand">Requirements.</span></h2>
                       <div className="space-y-6">
                          {job.requirements.map((req: string) => (
                             <div key={req} className="flex items-start gap-4 p-6 glass border border-stroke rounded-2xl group hover:border-brand transition-all">
                                <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                                <p className="text-sm font-bold uppercase leading-relaxed text-text-muted group-hover:text-text-primary">{req}</p>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-10">
                       <h2 className="text-3xl font-bold uppercase tracking-tighter">Team <span className="text-brand">Benefits.</span></h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {job.benefits.map((ben: string) => (
                             <div key={ben} className="flex items-center gap-4 p-5 bg-surface/30 border border-stroke rounded-2xl">
                                <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                                   <ArrowRight size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-text-muted">{ben}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Apply Sidebar */}
                 <aside className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                    <div className="corporate-card grain p-12 space-y-10 shadow-premium border-stroke hover:border-brand transition-all duration-700">
                        <div className="space-y-4">
                           <h3 className="text-3xl font-bold uppercase tracking-tighter">Join Our <span className="text-brand">Team.</span></h3>
                           <p className="text-text-muted text-sm font-medium leading-relaxed">
                              Apply today to be a part of our growing agency.
                           </p>
                        </div>

                       <form onSubmit={handleApply} className="space-y-8">
                          <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-brand ml-4">Full Name</label>
                             <input required type="text" placeholder="John Doe" className="input-field" />
                          </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase text-brand ml-4">Portfolio Link (Optional)</label>
                              <input required type="url" placeholder="https://..." className="input-field" />
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] font-bold uppercase text-brand ml-4">Why should we hire you?</label>
                              <textarea required rows={4} placeholder="Tell us about your experience..." className="input-field h-auto py-6 resize-none" />
                           </div>
                          
                           <button disabled={isSubmitting} type="submit" className="btn-primary w-full h-20 text-[10px] uppercase group">
                              {isSubmitting ? "Sending..." : "Submit Application"}
                             <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                          </button>
                       </form>
                    </div>
                 </aside>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}


"use client";

import {
    ArrowLeft,
    CheckCircle2,
    Send,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const getJobBySlug = (slug: string) => {
  const jobs = [
    {
      title: "Senior Growth Engineer",
      department: "Engineering",
      location: "Remote / Dhaka",
      type: "Full-Time",
      slug: "senior-growth-engineer",
      desc: "We are looking for a Senior Growth Engineer to lead the technical architecture of our client revenue ecosystems. You will be responsible for building high-performance Next.js applications and integrating them with complex data pipelines.",
      requirements: [
        "5+ years of full-stack engineering experience (Next.js, TypeScript, Node.js).",
        "Deep understanding of technical SEO and search algorithmic logic.",
        "Experience building multi-tenant SaaS architectures.",
        "Ability to translate growth hypotheses into precise technical requirements.",
        "Obsession with performance (sub-second rendering, Lighthouse scores)."
      ],
      responsibilities: [
        "Architect and deploy growth-focused web ecosystems for enterprise clients.",
        "Optimize technical infrastructure for maximum conversion velocity.",
        "Build and manage attribution pipelines and custom analytical dashboards.",
        "Collaborate with the strategy team to engineer rapid-scale experiments."
      ]
    }
    // ... other jobs
  ];
  return jobs.find(j => j.slug === slug) || jobs[0]; // Default for demo
};

export default function JobDetailPage() {
  const { slug } = useParams();
  const job = getJobBySlug(slug as string);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Talent Sync Initialized. Our engineers will review your credentials.");
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="pt-32 pb-40">
        <div className="container-max px-6">
          <Link href="/careers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-brand transition-colors mb-20 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Active Slots
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* JOB DETAILS */}
            <div className="lg:col-span-7 space-y-16">
              <header className="space-y-6">
                <span className="px-3 py-1 bg-brand text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  {job.department}
                </span>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest pb-8 border-b border-gray-100">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-brand" />
                      {job.location}
                   </div>
                   <div className="w-1 h-1 bg-gray-200 rounded-full" />
                   <div>{job.type}</div>
                </div>
              </header>

              <div className="space-y-10">
                <section>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Structural Overview</h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {job.desc}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Surgical Requirements</h3>
                  <ul className="space-y-4">
                    {job.requirements.map(req => (
                      <li key={req} className="flex gap-4 text-gray-600 font-medium">
                        <CheckCircle2 size={20} className="text-brand shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Operational Responsibilities</h3>
                  <ul className="space-y-4">
                    {job.responsibilities.map(res => (
                      <li key={res} className="flex gap-4 text-gray-600 font-medium">
                        <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0 mt-2.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* APPLICATION FORM */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 p-8 md:p-12 bg-gray-50 border border-gray-100 rounded-[3rem] shadow-xl">
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">Talent Sync</h3>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-10">Initialize Your Application</p>

                <form onSubmit={handleApply} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Full Name</label>
                    <input type="text" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">System Email</label>
                    <input type="email" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Portfolio/Github URL</label>
                    <input type="url" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Brief Technical Bio</label>
                    <textarea required rows={4} className="w-full py-4 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium resize-none shadow-sm placeholder:text-gray-500" placeholder="Tell us about your technical expertise..."></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-brand text-white font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Sync Request <Send size={18} />
                      </>
                    )}
                  </button>
                  <p className="text-[8px] text-center text-gray-600 font-bold uppercase tracking-[0.2em]">Our architects will respond within 48 operational hours.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

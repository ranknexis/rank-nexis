"use client";

import { submitContactForm } from "@/actions/contact";
import { getSectionData } from "@/lib/pageUtils";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
  Zap
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ContactClient({ sectionsMap, settings }: { sectionsMap: any, settings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Get in Touch",
     heading: "Strategic",
     headingAccent: "Consultation.",
     subtext: "Connect with our team to discuss how we can build a scalable digital strategy for your business."
  });

  const faq = getSectionData(sectionsMap, "faq", {
     heading: "Frequently Asked Questions",
     items: [
        { question: "When can I expect a response?", answer: "We review every request carefully. You can expect a response within 24 hours." },
        { question: "Do you have a minimum engagement?", answer: "We focus on high-growth scaling. Typical engagements start at $2k/mo or $5k per project phase." },
        { question: "Can we schedule a call directly?", answer: "Yes, after initial contact via this form, we'll provide a link for a discovery call." }
     ]
  });

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const result = await submitContactForm(formData);

      if (result.error) throw new Error(result.error);
      
      toast.success("Request received. One of our experts will reach out shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err.message || "Process error. Please retry submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-brand/10 selection:text-brand">
      <main className="grain">
        <div className="container-max px-4 md:px-0">

          <section className="relative py-12 md:py-24 overflow-hidden text-center px-4">
             <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
             </div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-4 md:space-y-10"
             >
               <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full shadow-xl border border-stroke">
                    <Zap size={14} className="text-brand animate-pulse" />
                     <p className="text-[10px] font-bold uppercase text-brand tracking-[0.2em]">{hero.badge}</p>
               </div>
               
                 <h1 className="text-2xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight lg:leading-[0.85] text-text-primary max-w-5xl mx-auto uppercase">
                   {hero.heading} <br className="hidden sm:inline" /> <span className="text-brand">{hero.headingAccent}</span>
                 </h1>
                 <p className="text-text-secondary text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto antialiased">
                   {hero.subtext}
                 </p>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 pb-12 md:pb-24 px-4 md:px-0">

            <div className="lg:col-span-5 space-y-8 md:space-y-24">
              <div className="space-y-4 md:space-y-10">
                <ContactInfo 
                  icon={Mail} 
                  title="Direct Email" 
                  value={settings?.contactEmail || "ranknexis@gmail.com"} 
                  desc="General inquiries and project requests." 
                />
                <ContactInfo 
                  icon={MessageSquare} 
                  title="Phone Number" 
                  value={settings?.contactPhone || "+880 1949-883830"} 
                  desc="WhatsApp enabled for rapid responses." 
                />
                <ContactInfo 
                  icon={MapPin} 
                  title="Operations Hub" 
                  value={settings?.address || "Chattogram, Bangladesh"} 
                  desc="Our main office for strategy and development." 
                />
              </div>

              <div className="space-y-6 pt-8 md:space-y-12 md:pt-16 border-t border-stroke">
                <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Knowledge Base</p>
                   <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">{faq.heading}</h3>
                </div>
                
                <div className="space-y-4 md:space-y-8">
                   {faq.items?.map((item: any, i: number) => (
                      <FaqItem key={i} question={item.question} answer={item.answer} />
                   ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="p-5 md:p-14 bg-white border border-stroke rounded-2xl md:rounded-[3.5rem] shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.03] rounded-full blur-[100px] -z-10" />
                  
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Client Full Name</label>
                        <input name="name" type="text" required className="contact-input-premium" placeholder="E.G. JOHN DOE" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Organization</label>
                        <input name="company" type="text" required className="contact-input-premium" placeholder="E.G. ACME CORP" />
                      </div>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Professional Email</label>
                          <input name="email" type="email" required className="contact-input-premium" placeholder="NAME@COMPANY.COM" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Service Needed</label>
                         <div className="relative">
                            <select name="service" required className="contact-input-premium appearance-none cursor-pointer uppercase">
                               <option value="Digital Marketing">Digital Marketing</option>
                               <option value="Web Development">Web Development</option>
                               <option value="SEO Optimization">SEO Optimization</option>
                               <option value="Technical Audit">Technical Audit</option>
                               <option value="Growth Strategy">Growth Strategy</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                               <ChevronRight size={16} className="rotate-90" />
                            </div>
                         </div>
                      </div>
                    </div>
 
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Your Message</label>
                       <textarea name="message" required rows={4} className="contact-input-premium py-4 md:py-6 resize-none uppercase" placeholder="BRIEFLY OUTLINE YOUR GOALS..."></textarea>
                    </div>
 
                    <button disabled={isSubmitting} className="w-full h-14 md:h-18 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] group shadow-2xl flex items-center justify-center gap-4 hover:bg-zinc-800 transition-all duration-500 disabled:opacity-50 mt-4">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <div className="pt-6 border-t border-stroke mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                         <ShieldCheck size={16} className="text-brand" />
                         <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Your inquiry is secure</p>
                      </div>
                     <div className="flex gap-4 items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Growth Experts Online</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ContactInfo({ icon: Icon, title, value, desc }: any) {
  return (
    <div className="flex gap-4 md:gap-8 group">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-surface border border-stroke rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-sm shrink-0">
        <Icon size={24} className="md:w-7 md:h-7" strokeWidth={1.5} />
      </div>
      <div className="space-y-1 md:space-y-2">
         <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{title}</h4>
        <p className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-text-primary leading-tight group-hover:text-brand transition-colors uppercase">{value}</p>
        <p className="text-xs sm:text-sm font-medium text-text-muted leading-relaxed opacity-70">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-3 group cursor-default">
      <h5 className="text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center gap-3 group-hover:text-brand transition-all duration-300">
        <ChevronRight size={14} className="text-brand group-hover:translate-x-1 transition-transform" />
        {question}
      </h5>
      <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium pl-6 border-l border-stroke/50">{answer}</p>
    </div>
  );
}

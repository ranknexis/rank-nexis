"use client";

import { submitContactForm } from "@/actions/contact";
import { motion } from "framer-motion";
import {
    HelpCircle,
    Mail,
    MapPin,
    MessageSquare,
    Send
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { getSectionData } from "@/lib/pageUtils";

export default function ContactClient({ sectionsMap }: { sectionsMap: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hero = getSectionData(sectionsMap, "hero", {
     badge: "Initiate Sync",
     heading: "Strategic",
     headingAccent: "Consultation.",
     subtext: "Connect with our technical team to discuss how we can build a scalable digital strategy for your brand."
  });

  const faq = getSectionData(sectionsMap, "faq", {
     heading: "Frequently Asked.",
     items: [
        { question: "When can I expect a response?", answer: "We review every request carefully. You can expect a response within 24 hours." },
        { question: "Do you have a minimum engagement?", answer: "We focus on high-ticket sector scaling. Typical engagements start at $2k/mo or $5k per project node." },
        { question: "Can we schedule a call directly?", answer: "Yes, after initial sync via this form, we'll provide a secure link for a technical discovery call." }
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
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">
        <div className="container-max">
          {/* HERO */}
          <section className="relative py-24 overflow-hidden text-center">
             <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
             </div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-12"
             >
               <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium border border-stroke">
                  <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase text-brand tracking-[0.4em]">{hero.badge}</p>
               </div>
               
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-text-primary">
                  {hero.heading} <br /> <span className="text-brand">{hero.headingAccent}</span>
                </h1>
                <p className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-xl mx-auto antialiased">
                  {hero.subtext}
                </p>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 pb-48">
            {/* LEFT: DIRECT PATHS & FAQ */}
            <div className="lg:col-span-5 space-y-24">
              <div className="space-y-14">
                <ContactInfo 
                  icon={Mail} 
                  title="Direct Email" 
                  value="ranknexis@gmail.com" 
                  desc="General inquiries and project requests." 
                />
                <ContactInfo 
                  icon={MessageSquare} 
                  title="Priority Sync" 
                  value="+880 1700-000000" 
                  desc="WhatsApp enabled for rapid strategy response." 
                />
                <ContactInfo 
                  icon={MapPin} 
                  title="Operations Hub" 
                  value="Dhaka, Bangladesh" 
                  desc="Our main office for strategy and development." 
                />
              </div>

              {/* FAQ MINI */}
              <div className="space-y-12 pt-20 border-t border-stroke">
                <div className="space-y-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Diagnostics</p>
                   <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none antialiased">{faq.heading}</h3>
                </div>
                
                <div className="space-y-10">
                   {faq.items?.map((item: any, i: number) => (
                      <FaqItem key={i} question={item.question} answer={item.answer} />
                   ))}
                </div>
              </div>
            </div>

            {/* RIGHT: ADVANCED FORM */}
            <div className="lg:col-span-7">
               <div className="p-8 md:p-16 glass border border-stroke rounded-[4rem] shadow-premium relative overflow-hidden grain bg-white">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.03] rounded-full blur-[100px] -z-10" />
                  
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Lead Name</label>
                        <input name="name" type="text" required className="input-field shadow-sm" placeholder="Your Full Name" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Company Node</label>
                        <input name="company" type="text" required className="input-field shadow-sm" placeholder="Your Company Name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Email Address</label>
                        <input name="email" type="email" required className="input-field shadow-sm" placeholder="hello@example.com" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Service Needed</label>
                         <div className="relative">
                            <select name="service" required className="input-field shadow-sm appearance-none cursor-pointer">
                               <option value="Digital Marketing">Digital Marketing</option>
                               <option value="Web Development">Web Development</option>
                               <option value="Graphic Design">Graphic Design</option>
                               <option value="SEO Services">SEO Services</option>
                               <option value="Video Editing">Video Editing</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                               <HelpCircle size={16} />
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Project Budget</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["< $2k", "$2k - $5k", "$5k - $15k", "$15k+"].map(tier => (
                          <label key={tier} className="relative group cursor-pointer">
                            <input type="radio" name="budget" value={tier} className="peer sr-only" required />
                             <div className="h-14 border border-stroke bg-white peer-checked:border-brand peer-checked:bg-brand/5 rounded-2xl flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted peer-checked:text-brand transition-all shadow-sm">
                              {tier}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary ml-2">Your Message</label>
                       <textarea name="message" required rows={6} className="w-full py-6 bg-white border border-stroke rounded-3xl px-8 focus:outline-none focus:border-brand transition-all text-lg font-medium resize-none shadow-sm placeholder:text-text-muted/30 antialiased" placeholder="Tell us about your project goals and how we can help..."></textarea>
                    </div>

                    <button disabled={isSubmitting} className="btn-primary w-full h-24 text-[10px] font-bold uppercase tracking-[0.4em] group shadow-premium flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Schedule Consultation <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                  <div className="pt-10 border-t border-stroke mt-12">
                     <p className="text-[10px] text-center text-text-muted font-bold uppercase tracking-[0.5em]">24/7 SUPPORT • WORLDWIDE SERVICE • RESULTS-DRIVEN</p>
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
    <div className="flex gap-8 group">
      <div className="w-16 h-16 glass border border-stroke rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-premium">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div>
         <h4 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand mb-2">{title}</h4>
        <p className="text-3xl font-bold tracking-tighter text-text-primary mb-3 leading-none uppercase antialiased">{value}</p>
        <p className="text-lg font-medium text-text-muted leading-relaxed antialiased">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-4 group">
      <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary flex items-center gap-3 group-hover:text-brand transition-colors antialiased">
        <div className="w-2 h-2 bg-brand rounded-full shadow-lg shadow-brand/20" />
        {question}
      </h5>
      <p className="text-lg text-text-muted leading-relaxed font-medium pl-5 border-l border-stroke antialiased">{answer}</p>
    </div>
  );
}

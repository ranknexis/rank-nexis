"use client";

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
import { submitContactForm } from "../actions/contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <Navbar />

      <main className="grain">
        <div className="container-max">
          {/* HERO */}
          <section className="relative py-24 overflow-hidden">
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
               <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                  <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Get Started</p>
               </div>
               
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Get In</span> <br /> Touch.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  Connect with us to discuss how we can help your brand grow through expert marketing and development.
                </p>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 pb-48">
            {/* LEFT: DIRECT PATHS & FAQ */}
            <div className="lg:col-span-5 space-y-20">
              <div className="space-y-14">
                <ContactInfo 
                  icon={Mail} 
                  title="Direct Email" 
                  value="ranknexis@gmail.com" 
                  desc="General inquiries and project requests." 
                />
                <ContactInfo 
                  icon={MessageSquare} 
                  title="Quick Response" 
                  value="+880 1700-000000" 
                  desc="Available for quick chat and support." 
                />
                <ContactInfo 
                  icon={MapPin} 
                  title="Our Location" 
                  value="Chattogram, Bangladesh" 
                  desc="Our main office for project management." 
                />
              </div>

              {/* FAQ MINI */}
              <div className="space-y-10 pt-20 border-t border-stroke">
                <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Diagnostics</p>
                   <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none">Frequently Asked.</h3>
                </div>
                
                <div className="space-y-10">
                   <FaqItem question="When will I get a response?" answer="We review all messages carefully and usually get back to you within 24 hours." />
                   <FaqItem question="Do you work with small businesses?" answer="Yes! We specialize in providing smart and affordable solutions for small businesses of all sizes." />
                   <FaqItem question="Can we have a meeting?" answer="Of course. We can schedule a call or meeting to discuss your project needs." />
                </div>
              </div>
            </div>

            {/* RIGHT: ADVANCED FORM */}
            <div className="lg:col-span-7">
               <div className="p-8 md:p-16 glass border border-stroke rounded-[4rem] shadow-premium relative overflow-hidden grain">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.03] rounded-full blur-[100px] -z-10" />
                  
                  <form onSubmit={handleSubmit} className="space-y-10">
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
                               <option value="SEO">SEO Services</option>
                               <option value="Social Media Marketing">Social Media Marketing</option>
                               <option value="Graphic Design">Graphic Design</option>
                               <option value="Web Design">Web Design</option>
                               <option value="Facebook Ads">Facebook Ads Management</option>
                               <option value="Google Ads">Google Ads</option>
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
                         {["Starter", "Standard", "Professional", "Custom"].map(tier => (
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
                       <textarea name="message" required rows={6} className="w-full py-6 bg-white border border-stroke rounded-3xl px-8 focus:outline-none focus:border-brand transition-all text-lg font-medium resize-none shadow-sm placeholder:text-text-muted/30" placeholder="Tell us about your project goals and how we can help..."></textarea>
                     </div>

                    <button 
                      disabled={isSubmitting}
                      className="btn-primary w-full h-24 text-xs font-bold uppercase tracking-[0.4em] group shadow-premium"
                    >
                      {isSubmitting ? (
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Schedule Consultation <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                  <div className="pt-10 border-t border-stroke mt-12">
                     <p className="text-[11px] text-center text-text-muted font-bold uppercase tracking-[0.5em]">24/7 SUPPORT • WORLDWIDE SERVICE • RESULTS-DRIVEN APPROACH</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
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
        <p className="text-3xl font-bold tracking-tighter text-text-primary mb-3 leading-none uppercase">{value}</p>
        <p className="text-lg font-medium text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-4 group">
      <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary flex items-center gap-3 group-hover:text-brand transition-colors">
        <div className="w-2 h-2 bg-brand rounded-full shadow-lg shadow-brand/20" />
        {question}
      </h5>
      <p className="text-lg text-text-muted leading-relaxed font-medium pl-5 border-l border-stroke">{answer}</p>
    </div>
  );
}

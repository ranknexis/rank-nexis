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
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      budget: formData.get("budget"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Sync Failed");
      
      toast.success("Inquiry Synchronized. A growth architect will reach out shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="pt-32 pb-40">
        <div className="container-max px-6">
          {/* HERO */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Strategic Discovery</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] uppercase">
                Initialize <br /> <span className="text-brand">The Sync.</span>
              </h1>
              <p className="text-gray-600 max-w-2xl text-xl leading-relaxed font-medium">
                Ready to engineer your growth? Fill out our surgical discovery form below or choose a direct contact path.
              </p>
            </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* LEFT: DIRECT PATHS & FAQ */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12">
                <ContactInfo 
                  icon={Mail} 
                  title="Direct Intel" 
                  value="hello@ranknexis.com" 
                  desc="For general inquiries and partnerships." 
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
                  desc="Engineering and Strategy HQ." 
                />
              </div>

              {/* FAQ MINI */}
              <div className="space-y-8 pt-16 border-t border-gray-100">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <HelpCircle size={20} className="text-brand" />
                  Surgical Discovery FAQ
                </h3>
                <div className="space-y-6">
                  <FaqItem question="When can I expect a response?" answer="Our architects analyze every inquiry. You'll receive a detailed strategic response within 24-48 hours." />
                  <FaqItem question="Do you have a minimum engagement?" answer="We focus on high-ticket sector scaling. Our typical engagement starts at $2k/mo or $5k per project node." />
                  <FaqItem question="Can we schedule a call directly?" answer="Yes, after initial sync via the form, we'll provide a Calendly link for a technical discovery call." />
                </div>
              </div>
            </div>

            {/* RIGHT: ADVANCED FORM */}
            <div className="lg:col-span-7">
               <div className="p-8 md:p-14 bg-gray-50 border border-gray-100 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] -z-10" />
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Your Name</label>
                        <input name="name" type="text" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="System Lead" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Company Name</label>
                        <input name="company" type="text" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="Ecosystem Inc." />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Work Email</label>
                        <input name="email" type="email" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium placeholder:text-gray-500" placeholder="lead@ecosystem.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Primary Objective</label>
                        <select name="service" required className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium appearance-none">
                          <option value="Growth Marketing">Growth Marketing</option>
                          <option value="Software Engineering">Software Engineering</option>
                          <option value="AI & Automation">AI & Automation</option>
                          <option value="Full Digital Transformation">Ecosystem Sync</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Monthly Scale Budget</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["< $2k", "$2k - $5k", "$5k - $15k", "$15k+"].map(tier => (
                          <label key={tier} className="relative group cursor-pointer">
                            <input type="radio" name="budget" value={tier} className="peer sr-only" required />
                            <div className="h-12 border border-gray-100 peer-checked:border-brand peer-checked:bg-brand/10 rounded-xl flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-600 peer-checked:text-brand transition-all">
                              {tier}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-2">Operational Message</label>
                      <textarea name="message" required rows={5} className="w-full py-4 bg-white border border-gray-100 rounded-2xl px-6 focus:outline-none focus:border-brand transition-all font-medium resize-none shadow-sm placeholder:text-gray-500" placeholder="Tell us about your current digital bottlenecks..."></textarea>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full h-20 bg-brand text-white font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-4"
                    >
                      {isSubmitting ? (
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Initialize Growth Sync <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                  <div className="pt-8 border-t border-gray-100 mt-10">
                     <p className="text-[9px] text-center text-gray-600 font-bold uppercase tracking-[0.3em]">SECURE SYSTEM SYNC • GLOBAL OPERATIONS • ROI-MANDATED ARCHITECTURE</p>
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
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-lg">
        <Icon size={28} />
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-1">{title}</h4>
        <p className="text-2xl font-black tracking-tighter text-text-primary mb-2">{value}</p>
        <p className="text-xs font-medium text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-2">
        <div className="w-1 h-1 bg-brand rounded-full" />
        {question}
      </h5>
      <p className="text-xs text-gray-600 leading-relaxed font-medium pl-3">{answer}</p>
    </div>
  );
}

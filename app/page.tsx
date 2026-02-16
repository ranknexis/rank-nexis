"use client";

import { motion } from "framer-motion";
import {
   Activity,
   ArrowRight,
   ArrowUpRight,
   Code2,
   MessageSquare,
   Palette,
   ShieldCheck,
   TrendingUp,
   Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      toast.success("Sync Initialized. Our engineers will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Lightning Accent Background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />
          
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full mb-8 shadow-sm">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Growth Engineering Company</p>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                  Engineering <span className="text-brand">Growth</span> Through <br /> 
                  Software Systems.
                </h1>
                <p className="text-gray-600 max-w-xl mb-12 text-xl leading-relaxed font-medium">
                  We design, build and scale high-performance digital ecosystems for ambitious brands who demand measurable results.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link href="/#contact" className="btn-primary h-14 px-10 text-sm uppercase tracking-widest font-black shadow-[0_0_30px_rgba(255,122,0,0.3)]">
                    Book Strategy Call
                  </Link>
                  <Link href="/work" className="btn-outline h-14 px-10 text-sm uppercase tracking-widest font-black border-stroke hover:border-brand text-text-primary">
                    View Case Studies
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Visual System Diagram Mockup */}
                <div className="aspect-square bg-surface border border-stroke rounded-[3rem] p-8 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Abstract System visualization */}
                  <div className="relative h-full flex flex-col justify-center items-center gap-8">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-48 h-16 bg-white border border-brand/20 rounded-2xl flex items-center justify-center shadow-xl relative z-10"
                    >
                      <Code2 className="text-brand mr-3" />
                      <span className="text-xs font-bold uppercase tracking-widest">Scalable MVP</span>
                    </motion.div>
                    
                    <div className="flex gap-8">
                       <motion.div 
                        animate={{ x: [-10, 0, -10] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-40 h-32 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-md"
                      >
                        <TrendingUp className="text-green-600 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">ROAS 4.2x</span>
                      </motion.div>
                      
                       <motion.div 
                        animate={{ x: [10, 0, 10] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-40 h-32 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-md"
                      >
                        <Activity className="text-brand mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">LTV Max</span>
                      </motion.div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand/20 to-transparent -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent -z-10" />
                  </div>

                  {/* Lightning Icon Overlay */}
                  <div className="absolute top-10 right-10 text-brand opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
                    <Zap size={64} fill="currentColor" />
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute -bottom-10 -left-10 bg-surface border border-stroke p-8 rounded-[2rem] shadow-2xl flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-black">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-tighter">$14M+</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Revenue Generated</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. TRUST INDICATORS (Metrics & Logos) */}
        <section className="py-20 border-y border-gray-100 bg-gray-50/50">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-center">
              <div>
                <h3 className="text-4xl font-black text-brand mb-2">5+</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Years Authority</p>
             </div>
             <div>
               <p className="text-4xl font-black tracking-tighter text-brand">250+</p>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Projects Delivered</p>
             </div>
             <div>
               <p className="text-4xl font-black tracking-tighter text-brand">10k+</p>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Active Users</p>
             </div>
             <div>
               <p className="text-4xl font-black tracking-tighter text-brand">98%</p>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Client ROAS Lift</p>
              </div>
            </div>

            <p className="text-[10px] font-bold text-center uppercase tracking-[0.5em] text-text-muted mb-12 opacity-50">Trust established with global innovators</p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-30 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100">
               <span className="text-2xl font-black tracking-tighter">RAAFIDAN</span>
               <span className="text-2xl font-black tracking-tighter">STYLEHUNT</span>
               <span className="text-2xl font-black tracking-tighter">BENGOLSALE</span>
               <span className="text-2xl font-black tracking-tighter">NEXTZEN</span>
               <span className="text-2xl font-black tracking-tighter">OLLYO</span>
            </div>
          </div>
        </section>
        {/* 3. SERVICES OVERVIEW */}
        <section id="services" className="section-padding bg-white overflow-hidden">
          <div className="container-max">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Growth Systems & Engineering</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                  We don't just build assets; we engineer high-performance engines that drive sustainable revenue and market authority.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <ServiceCard 
                icon={TrendingUp} 
                title="Growth Solutions" 
                desc="High-velocity acquisition engines designed to maximize ROAS and dominate tactical market nodes."
                items={["Surgical SEO", "Ads Performance", "Social Sync"]}
              />
              <ServiceCard 
                icon={Palette} 
                title="Experience Design" 
                desc="Premium visual logic and design systems built to elevate brand authority and conversion intent."
                items={["UI/UX Systems", "Branding Design", "Graphics"]}
              />
              <ServiceCard 
                icon={Code2} 
                title="Digital Engineering" 
                desc="High-precision digital platforms built for sub-second performance and enterprise-grade scale."
                items={["Web Development", "API Systems", "SaaS Infrastructure"]}
              />
            </div>
          </div>
        </section>

        {/* 4. INDUSTRIES SERVED */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="container-max">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Industries We Scale</h2>
                <p className="text-gray-600 font-medium">Deep expertise across complex sectors requiring high-precision growth systems.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto">
                {["SaaS", "E-commerce", "Fintech", "Healthcare", "Education", "Enterprise"].map((industry) => (
                  <div key={industry} className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center hover:border-brand transition-colors cursor-default">
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. FEATURED CASE STUDIES */}
        <section id="work" className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Measurable Impact</h2>
                <p className="text-gray-600 max-w-xl text-lg">Real numbers. Real growth. Verified results from the RankNexis engineering lab.</p>
              </div>
              <Link href="/work" className="hidden md:flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
                View Archive <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <CaseStudyCard 
                title="Revenue Scaling for Raafidan" 
                stats="+220% Revenue growth"
                tag="E-commerce"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <CaseStudyCard 
                title="SaaS Architecture for NextZen" 
                stats="3.2x User Retention"
                tag="SaaS"
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
        </section>

        {/* 6. OUR PROCESS */}
        <section className="section-padding bg-gray-50 border-y border-gray-100">
          <div className="container-max">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">The Growth Roadmap</h2>
              <p className="text-gray-600 max-w-xl mx-auto text-lg">Our structured 5-step engineering framework for scaling category leaders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              <ProcessItem step="01" title="Discover" desc="Deep-dive into market intent and growth bottlenecks." />
              <ProcessItem step="02" title="Strategy" desc="Architecting a high-precision digital roadmap." />
              <ProcessItem step="03" title="Engineer" desc="Building the software and marketing systems." />
              <ProcessItem step="04" title="Optimize" desc="Data-driven refinements for peak performance." />
              <ProcessItem step="05" title="Scale" desc="Aggressive expansion based on proven ROI nodes." />
              
              {/* Connecting Desktop Line */}
              <div className="hidden md:block absolute top-[40px] left-[50px] right-[50px] h-px bg-stroke -z-10" />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION - High Impact Brand Color */}
        {/* 7. WHY RANKNEXIS */}
        <section className="section-padding bg-background-dark">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-video bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" alt="Team Session" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-all duration-700" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-brand text-white p-6 rounded-2xl shadow-2xl">
                  <p className="text-3xl font-black tracking-tighter">ROI 1st</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Always & Forever</p>
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Engineered for Category Dominance.</h2>
                <p className="text-text-muted mb-12 text-lg font-medium leading-relaxed">
                  We don't follow trends; we build systems. Our multidisciplinary team of engineers and growth strategists work in sync to solve complex scaling bottlenecks.
                </p>
                
                <div className="space-y-6">
                  <ValueProp title="ROI-Driven Mindset" desc="Every line of code and every pixel is measured against conversion metrics." />
                  <ValueProp title="Dedicated High-Performance Team" desc="In-house veterans specialized in full-stack dev and performance marketing." />
                  <ValueProp title="Transparent Growth Dashboards" desc="Real-time reporting on the metrics that actually move the needle." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Verified Perspectives</h2>
              <p className="text-text-muted">Global founders on the impact of RankNexis growth engines.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonyCard 
                name="Ayman Sadiq" 
                role="Founder, 10 Minute School" 
                quote="The RankNexis team doesn't just deliver software; they deliver business leverage. Their systems are built for scale from day one."
              />
              <TestimonyCard 
                name="Fahim Mashroor" 
                role="CEO, Bdjobs" 
                quote="Exceptional engineering and strategic foresight. They solved architectural bottlenecks that were holding back our growth for years."
              />
              <TestimonyCard 
                name="Zubayer Ahmed" 
                role="Founder, Hishab" 
                quote="Partnering with RankNexis was a pivotal decision. Their ROI-first approach to marketing and development is unparalleled."
              />
            </div>
          </div>
        </section>

        {/* 9. INSIGHTS PREVIEW */}
        <section className="section-padding bg-background-dark">
          <div className="container-max">
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Growth Insights</h2>
                <p className="text-text-muted max-w-xl text-lg">Engineering frameworks and strategic playbooks to fuel your digital growth.</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
                Read More <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <BlogSnippet 
                title="Building Scalable SaaS Architecture for 2026" 
                date="Feb 12, 2026"
                category="Engineering"
              />
              <BlogSnippet 
                title="The SEO Engine: How to Outrank Enterprise Competitors" 
                date="Feb 10, 2026"
                category="Marketing"
              />
              <BlogSnippet 
                title="Leveraging AI for Workflow Automation in E-commerce" 
                date="Feb 05, 2026"
                category="Automation"
              />
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section id="contact" className="py-32 bg-gray-50 relative overflow-hidden px-6">
          <div className="absolute inset-0 bg-brand/5 opacity-50" />
          <div className="container-max relative z-10">
            <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-[3rem] p-8 md:p-24 shadow-2xl shadow-brand/5">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Let's Build Your <br /> <span className="text-brand">Growth Engine</span></h2>
                <p className="text-text-muted text-xl max-w-2xl mx-auto font-medium">Ready to engineering measurable digital success? Initialize your growth sync today.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand ml-4">Full Identity</label>
                    <input required name="name" type="text" placeholder="Mahdi Monir" className="w-full h-16 px-8 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand transition-colors text-[#0F0F0F]" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand ml-4">Corporate Email</label>
                    <input required name="email" type="email" placeholder="mahdi@raafidan.com" className="w-full h-16 px-8 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand transition-colors text-[#0F0F0F]" />
                  </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand ml-4">Growth Inquiry</label>
                   <textarea required name="message" rows={5} placeholder="Describe your current scaling objectives and bottlenecks..." className="w-full p-8 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand transition-colors text-[#0F0F0F] resize-none"></textarea>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-4 text-gray-600 opacity-60">
                    <ShieldCheck size={20} className="text-brand" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Data Sync</span>
                  </div>
                  <button disabled={isFormSubmitting} type="submit" className="btn-primary h-16 px-16 text-sm uppercase tracking-widest font-black shadow-2xl shadow-brand/20 active:scale-95 group w-full md:w-auto">
                    {isFormSubmitting ? "Initializing Sync..." : "Initialize Growth Sync"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* HELPER COMPONENTS */

function ServiceCard({ icon: Icon, title, desc, items }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 p-10 rounded-3xl group hover:border-brand transition-all duration-500 shadow-xl"
    >
      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-500">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">{title}</h3>
      <p className="text-gray-600 mb-8 font-medium leading-relaxed">{desc}</p>
      <ul className="space-y-3">
        {items.map((item: string) => (
          <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-600">
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CaseStudyCard({ title, stats, tag, image }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden group shadow-xl"
    >
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div className="absolute top-8 right-8 px-4 py-2 bg-brand text-black text-[10px] font-black uppercase tracking-widest rounded-full">{tag}</div>
      </div>
      <div className="p-10">
        <h3 className="text-3xl font-black mb-4 tracking-tighter">{title}</h3>
        <p className="text-brand font-black text-xl mb-8 uppercase tracking-widest">{stats}</p>
        <Link href="/work" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-primary hover:text-brand transition-colors">
          View Detailed Strategy <ArrowUpRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}

function ProcessItem({ step, title, desc }: any) {
  return (
    <div className="text-center md:text-left relative z-10 group">
      <div className="w-20 h-20 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-sm group-hover:border-brand group-hover:scale-110 transition-all duration-500">
        <span className="text-brand font-black text-xl">{step}</span>
      </div>
      <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">{title}</h4>
      <p className="text-gray-600 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ValueProp({ title, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 shrink-0 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand">
        <ShieldCheck size={24} />
      </div>
      <div>
        <h4 className="text-lg font-black mb-2 uppercase tracking-tighter">{title}</h4>
        <p className="text-gray-600 text-sm font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonyCard({ name, role, quote }: any) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-3xl relative shadow-xl hover:border-brand/50 transition-colors">
      <MessageSquare className="text-brand/10 absolute top-10 right-10" size={48} />
      <p className="text-gray-600 italic text-lg mb-10 leading-relaxed font-medium relative z-10">"{quote}"</p>
      <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-brand border border-gray-100">
          {name[0]}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-text-primary">{name}</p>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">{role}</p>
        </div>
      </div>
    </div>
  );
}

function BlogSnippet({ title, date, category }: any) {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-3xl group hover:border-brand transition-all shadow-xl">
      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand">{category}</span>
        <div className="w-1 h-1 bg-stroke rounded-full" />
        <span className="text-[10px] font-medium text-gray-600 uppercase tracking-widest">{date}</span>
      </div>
      <h4 className="text-lg font-black tracking-tighter uppercase group-hover:text-brand transition-colors line-clamp-2">{title}</h4>
      <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
        Read Intel <ArrowRight size={14} />
      </Link>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const SERVICES_DATA: Record<string, any> = {
  "seo": {
    title: "Search Optimization",
    subtitle: "Grow Your Online Visibility",
    description: "We help your business get noticed on search engines by improving your website's ranking and attracting more potential customers.",
    highlights: [
      { title: "Smart Keywords", desc: "Finding the best terms your customers are searching for." },
      { title: "Better Ranking", desc: "Helping your site appear at the top of results." },
      { title: "Local Presence", desc: "Connecting you with customers in your area." }
    ],
    features: [
      "Website Performance Check",
      "Creative Content Writing",
      "Link Building Strategy",
      "Local Map Optimization",
      "Monthly Growth Reports",
      "Full Site SEO Audit"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  "design": {
    title: "Graphic Design",
    subtitle: "Professional Brand Identity",
    description: "Our creative team designs beautiful logos, social media graphics, and brand materials that make your business stand out from the competition.",
    highlights: [
      { title: "Custom Logos", desc: "Unique designs that represent your brand perfectly." },
      { title: "Social Media", desc: "Eye-catching graphics for all your platforms." },
      { title: "Print Materials", desc: "Professional designs for banners and cards." }
    ],
    features: [
      "Brand Color Palette",
      "Modern Typography",
      "Custom Illustrations",
      "Banner & Ad Design",
      "Professional Layouts",
      "Unlimited Revisions"
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070"
  },
  "web": {
    title: "Web Development",
    subtitle: "Fast & Modern Websites",
    description: "We build easy-to-use and high-performing websites that help you provide a great experience for your customers on any device.",
    highlights: [
      { title: "Custom Build", desc: "Websites tailored to your specific needs." },
      { title: "Fast Loading", desc: "Ensuring your customers don't have to wait." },
      { title: "Mobile Ready", desc: "Perfect experience on phones and tablets." }
    ],
    features: [
      "Responsive Layouts",
      "Modern Web Tech",
      "Clean Dashboard",
      "Secure Hosting",
      "Ongoing Support",
      "E-commerce Ready"
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA[slug as string] || SERVICES_DATA["seo"];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
            <img 
               src={service.image} 
               alt={service.title} 
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.03]" 
            />
          </div>
          
          <div className="container-max relative z-10">
            <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full"
              >
                <Link href="/services" className="text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-brand">Services</Link>
                <ChevronRight size={12} className="text-text-muted" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{service.title}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase"
              >
                {service.title.split(' ')[0]} <br /> <span className="text-brand">{service.title.split(' ')[1]}.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed"
              >
                {service.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-32">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-24">
                <div className="space-y-12">
                   <h2 className="text-4xl font-bold uppercase tracking-tighter">Diagnostic <span className="text-brand">Context.</span></h2>
                   <p className="text-text-secondary text-xl leading-relaxed font-medium">
                     {service.description}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {service.highlights.map((h: any, i: number) => (
                    <div key={h.title} className="corporate-card grain group">
                       <h4 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">{h.title}</h4>
                       <p className="text-text-muted text-base font-medium leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-12 pt-16 border-t border-stroke">
                   <h2 className="text-4xl font-bold uppercase tracking-tighter">System <span className="text-brand">Capabilities.</span></h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.features.map((f: string) => (
                        <div key={f} className="flex items-center gap-4 p-4 glass rounded-2xl border border-stroke">
                          <CheckCircle2 className="text-brand" size={20} />
                          <span className="text-xs font-bold uppercase tracking-wider text-text-primary">{f}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
                <div className="corporate-card bg-brand p-12 text-white space-y-8 shadow-2xl shadow-brand/20">
                   <Zap size={48} fill="currentColor" />
                   <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none">Initialize <br /> Deployment.</h3>
                   <p className="text-white/80 text-sm font-bold uppercase tracking-wider leading-relaxed">
                     Ready to architect your scaling protocol? Start a technical sync today.
                   </p>
                   <Link href="/contact" className="btn-primary bg-white text-brand hover:bg-white/90 w-full h-16 flex items-center justify-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all">
                      Sync Initializer <ArrowRight size={16} className="ml-3" />
                   </Link>
                </div>

                <div className="corporate-card p-10 space-y-8 grain">
                   <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand border-b border-stroke pb-4">Related Intelligence</h4>
                   <nav className="space-y-6">
                      {Object.entries(SERVICES_DATA)
                        .filter(([k]) => k !== slug)
                        .map(([k, s]) => (
                        <Link key={k} href={`/services/${k}`} className="flex items-center justify-between group/link">
                           <span className="text-xs font-bold uppercase tracking-wider group-hover/link:text-brand transition-colors">{s.title}</span>
                           <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                   </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white relative overflow-hidden px-6 grain border-t border-stroke">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] -z-10" />
          
          <div className="container-max text-center relative z-10 space-y-16">
            <div className="space-y-8">
               <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Strategic Hub</p>
               <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Start A <br /> <span className="text-brand">Global Sync.</span>
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
               Work with our technical leads to audit your current architecture and build a scalable revenue ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contact" className="btn-primary h-20 px-16 text-xs font-bold uppercase tracking-[0.3em] group shadow-premium">
                Initialize Consultation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

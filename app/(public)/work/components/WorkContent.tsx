"use client";

import { motion } from "framer-motion";
import { ArrowRight, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface WorkContentProps {
  initialStudies: any[];
}

export default function WorkContent({ initialStudies }: WorkContentProps) {
  
  const CATEGORIES = ["All", ...Array.from(new Set(initialStudies.map(s => s.tag)))];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredStudies = activeCategory === "All" 
    ? initialStudies 
    : initialStudies.filter(s => s.tag === activeCategory);

  return (
    <>

      <section 
        className={`sticky z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-6 transition-all duration-500 ${
          isNavVisible ? "top-20" : "top-0"
        }`}
      >
         <div className="container-max flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
               <Filter size={18} className="text-text-muted" />
               <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                           activeCategory === cat 
                           ? "bg-brand text-white shadow-lg shadow-brand/20" 
                           : "glass text-text-muted hover:text-brand"
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-24">
         <div className="container-max">
            <div className="grid grid-cols-1 gap-32">
               {filteredStudies.map((study, i) => (
                  <motion.div 
                     key={study.id}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center group"
                  >
                     <div className="lg:col-span-7 relative overflow-hidden rounded-[3rem] shadow-premium grain border border-stroke">
                        <Image 
                           src={study.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
                           alt={study.title} 
                           fill
                           sizes="(max-width: 1024px) 100vw, 60vw"
                           className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 antialiased" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-10 left-10 p-6 glass-dark rounded-2xl text-white border border-white/10">
                           <p className="text-5xl font-bold tracking-tighter text-brand leading-none mb-1">{study.stats}</p>
                           <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{study.kpi}</p>
                        </div>
                     </div>
                     
                     <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                           <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-brand border border-stroke">
                              {study.tag}
                           </div>
                           <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.85] group-hover:text-brand transition-colors antialiased">
                              {study.title}
                           </h3>
                           <p className="text-text-muted text-lg md:text-xl font-medium leading-relaxed antialiased">
                              {study.description}
                           </p>
                        </div>
                        
                        <Link href={`/work/${study.slug}`} className="btn-primary h-16 inline-flex items-center px-10 text-[10px] font-bold uppercase tracking-[0.3em] shadow-premium group">
                           View Case Study <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Link>
                     </div>
                  </motion.div>
               ))}
               
               {filteredStudies.length === 0 && (
                 <div className="py-48 text-center glass border border-stroke rounded-[4rem] shadow-premium grain">
                    <p className="text-text-muted text-xl font-medium italic mb-8">"No operational case studies match this filter protocol."</p>
                    <button 
                      onClick={() => setActiveCategory("All")} 
                      className="btn-outline h-14 px-10 text-[11px] font-bold uppercase glass tracking-widest"
                    >
                      Reset Filter Archive
                    </button>
                 </div>
               )}
            </div>
         </div>
      </section>
    </>
  );
}

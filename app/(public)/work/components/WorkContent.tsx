"use client";

import { motion } from "framer-motion";
import { ArrowRight, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface WorkContentProps {
  initialStudies: any[];
}

export default function WorkContent({ initialStudies }: WorkContentProps) {
  
  const CATEGORIES = ["All", ...Array.from(new Set(initialStudies.map(s => s.tag)))];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(prev => prev ? false : prev);
      } else {
        setIsNavVisible(prev => !prev ? true : prev);
      }
      
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const filteredStudies = activeCategory === "All" 
    ? initialStudies 
    : initialStudies.filter(s => s.tag === activeCategory);

  return (
    <>

      <section 
        className={`sticky z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-4 md:py-6 transition-all duration-500 ${
          isNavVisible ? "top-20" : "top-0"
        }`}
      >
         <div className="container-max px-4 md:px-0">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
               <div className="flex items-center gap-3 shrink-0">
                  <Filter size={14} className="text-text-muted" />
               </div>
               <div className="flex gap-2 flex-nowrap md:flex-wrap shrink-0">
                  {CATEGORIES.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
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

      <section className="py-16 md:py-24">
         <div className="container-max">
            <div className="grid grid-cols-1 gap-16 md:gap-32 px-4 md:px-0">
               {filteredStudies.map((study, i) => (
                  <motion.div 
                     key={study.id}
                     initial={{ opacity: 0, y: 15 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "0px" }}
                     transition={{ duration: 0.4 }}
                     className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group will-change-gpu"
                  >
                     <div className="lg:col-span-7 aspect-[16/10] md:aspect-video relative overflow-hidden rounded-3xl md:rounded-[3rem] shadow-premium grain border border-stroke w-full h-full min-h-[220px] sm:min-h-[350px] lg:min-h-[450px]">
                        <Image 
                           src={study.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
                           alt={study.title} 
                           fill
                           sizes="(max-width: 1024px) 100vw, 60vw"
                           className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 antialiased" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 p-4 md:p-6 glass-dark rounded-xl md:rounded-2xl text-white border border-white/10">
                           <p className="text-2xl md:text-5xl font-bold tracking-tighter text-brand leading-none mb-1">{study.stats}</p>
                           <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-80">{study.kpi}</p>
                        </div>
                     </div>
                     
                     <div className="lg:col-span-5 space-y-6 md:space-y-10">
                        <div className="space-y-4 md:space-y-6">
                           <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-brand border border-stroke">
                              {study.tag}
                           </div>
                           <h3 className="text-2xl md:text-6xl font-bold uppercase tracking-tighter leading-tight lg:leading-[0.85] group-hover:text-brand transition-colors antialiased">
                              {study.title}
                           </h3>
                           <p className="text-text-muted text-base md:text-xl font-medium leading-relaxed antialiased">
                              {study.description}
                           </p>
                        </div>
                        
                        <Link href={`/work/${study.slug}`} className="btn-primary w-full sm:w-auto h-14 md:h-16 flex items-center justify-center px-10 text-[10px] font-bold uppercase tracking-[0.3em] shadow-premium group">
                           View Case Study <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Link>
                     </div>
                  </motion.div>
               ))}
               
               {filteredStudies.length === 0 && (
                  <div className="py-24 md:py-48 text-center glass border border-stroke rounded-3xl md:rounded-[4rem] shadow-premium grain">
                     <p className="text-text-muted text-base md:text-xl font-medium italic mb-6 md:mb-8">"No operational case studies match this filter protocol."</p>
                     <button 
                       onClick={() => setActiveCategory("All")} 
                       className="btn-outline h-12 md:h-14 px-8 md:px-10 text-[11px] font-bold uppercase glass tracking-widest"
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

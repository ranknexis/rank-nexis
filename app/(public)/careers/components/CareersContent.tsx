"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Search, ArrowRight, Sparkles, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CareersContentProps {
  initialJobs: any[];
}

export default function CareersContent({ initialJobs }: CareersContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = initialJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white py-8 md:py-16">

      <section className="mb-8 md:mb-16">
         <div className="container-max px-4 md:px-0">
            <div className="relative max-w-2xl mx-auto group">
               <div className="absolute inset-0 bg-brand/10 blur-xl group-focus-within:bg-brand/20 transition-all rounded-2xl -z-10" />
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand" size={22} />
               <input 
                  type="text" 
                  placeholder="Search open positions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-8 bg-white border border-stroke rounded-2xl text-xs sm:text-sm font-bold uppercase focus:border-brand transition-all outline-none text-text-primary placeholder:text-text-muted/60 shadow-premium" 
               />
            </div>
         </div>
      </section>

      <section className="pb-16 md:pb-32">
         <div className="container-max px-4 md:px-0">
            <div className="space-y-6 md:space-y-8">
               {filteredJobs.length > 0 ? (
                 filteredJobs.map((job, i) => (
                    <motion.div 
                       key={job.id}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                    >
                       <Link href={`/careers/${job.slug}`} className="group block">
                          <div className="bg-white border border-stroke p-6 md:p-12 rounded-3xl md:rounded-[2rem] hover:border-brand/30 hover:shadow-premium transition-all duration-500 relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 grain">
                             <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                   <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-brand bg-brand/5 border border-brand/20 px-3 md:px-4 py-1.5 rounded-full">
                                      Active Role
                                   </span>
                                   <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted bg-surface px-3 md:px-4 py-1.5 rounded-full border border-stroke">
                                      <Briefcase size={10} /> {job.type}
                                   </span>
                                   <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted bg-surface px-3 md:px-4 py-1.5 rounded-full border border-stroke">
                                      <MapPin size={10} /> {job.location}
                                   </span>
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors duration-300">
                                   {job.title}
                                </h3>
                                <p className="text-text-muted text-sm md:text-base font-medium leading-relaxed max-w-2xl line-clamp-2">
                                   {job.description}
                                 </p>
                             </div>
                             
                             <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 min-w-[200px] border-t border-stroke pt-4 md:border-none md:pt-0">
                                <span className="text-base md:text-xl font-bold tracking-tight text-text-primary">Competitive Salary</span>
                                <div className="btn-primary h-11 md:h-12 px-5 md:px-6 text-[10px] md:text-xs font-bold uppercase group-hover:shadow-lg transition-all rounded-xl inline-flex items-center justify-center gap-2">
                                   Apply Now <ArrowRight size={14} />
                                </div>
                             </div>
                          </div>
                       </Link>
                    </motion.div>
                 ))
               ) : (
                  <div className="text-center py-16 md:py-24 bg-surface/30 border border-stroke rounded-3xl md:rounded-[3rem] shadow-premium grain relative max-w-4xl mx-auto p-6 md:p-12 overflow-hidden">
                     <div className="absolute inset-0 bg-brand/[0.01] -z-10" />
                     <div className="w-16 h-16 bg-white border border-stroke rounded-2xl flex items-center justify-center text-brand mx-auto mb-6 shadow-sm">
                        <Sparkles size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-text-primary mb-3">No matching roles found</h3>
                      <p className="text-text-muted text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-8 md:mb-10 antialiased">
                         We don't have any matching positions open right now, but we are always scouting for top-tier creative and digital growth talent. Direct-email us with your resume!
                      </p>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto px-4 md:px-0">
                         <button 
                            onClick={() => setSearchQuery("")} 
                            className="btn-outline w-full sm:w-auto h-14 px-8 text-xs font-bold uppercase rounded-xl transition-all hover:bg-surface flex items-center justify-center"
                          >
                            Reset Search
                         </button>
                         <a 
                            href="mailto:careers@ranknexis.com" 
                            className="btn-primary w-full sm:w-auto h-14 px-8 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-premium"
                         >
                            Drop Your Resume <Send size={16} />
                         </a>
                      </div>
                   </div>
                )}
             </div>
          </div>
       </section>
    </div>
  );
}

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
    <div className="bg-white py-16">
      {/* SEARCH & FILTERS */}
      <section className="mb-16">
         <div className="container-max">
            <div className="relative max-w-2xl mx-auto group">
               <div className="absolute inset-0 bg-brand/10 blur-xl group-focus-within:bg-brand/20 transition-all rounded-2xl -z-10" />
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand" size={22} />
               <input 
                  type="text" 
                  placeholder="Search open positions (e.g. Designer, Developer, Marketing)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-8 bg-white border border-stroke rounded-2xl text-sm font-bold uppercase focus:border-brand transition-all outline-none text-text-primary placeholder:text-text-muted/60 shadow-premium" 
               />
            </div>
         </div>
      </section>

      {/* JOBS LIST / EMPTY STATE */}
      <section className="pb-32">
         <div className="container-max">
            <div className="space-y-8">
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
                         <div className="bg-white border border-stroke p-8 md:p-12 rounded-[2rem] hover:border-brand/30 hover:shadow-premium transition-all duration-500 relative flex flex-col md:flex-row md:items-center justify-between gap-8 grain">
                            <div className="space-y-4">
                               <div className="flex flex-wrap gap-3">
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand bg-brand/5 border border-brand/20 px-4 py-1.5 rounded-full">
                                     Active Role
                                  </span>
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted bg-surface px-4 py-1.5 rounded-full border border-stroke">
                                     <Briefcase size={12} /> {job.type}
                                  </span>
                                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted bg-surface px-4 py-1.5 rounded-full border border-stroke">
                                     <MapPin size={12} /> {job.location}
                                  </span>
                               </div>
                               <h3 className="text-3xl font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors duration-300">
                                  {job.title}
                               </h3>
                               <p className="text-text-muted text-base font-medium leading-relaxed max-w-2xl line-clamp-2">
                                  {job.description}
                                </p>
                            </div>
                            
                            <div className="flex flex-col md:items-end justify-center gap-4 min-w-[200px]">
                               <span className="text-xl font-bold tracking-tight text-text-primary">Competitive Salary</span>
                               <div className="btn-primary h-12 px-6 text-xs font-bold uppercase group-hover:shadow-lg transition-all rounded-xl inline-flex items-center justify-center gap-2">
                                  Apply Now <ArrowRight size={16} />
                               </div>
                            </div>
                         </div>
                      </Link>
                   </motion.div>
                 ))
               ) : (
                  <div className="text-center py-24 bg-surface/30 border border-stroke rounded-[3rem] shadow-premium grain relative max-w-4xl mx-auto p-12 overflow-hidden">
                     <div className="absolute inset-0 bg-brand/[0.01] -z-10" />
                     <div className="w-16 h-16 bg-white border border-stroke rounded-2xl flex items-center justify-center text-brand mx-auto mb-6 shadow-sm">
                        <Sparkles size={32} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary mb-3">No matching roles found</h3>
                     <p className="text-text-muted text-lg font-medium leading-relaxed max-w-xl mx-auto mb-10 antialiased">
                        We don't have any matching positions open right now, but we are always scouting for top tier marketing & engineering talent. Direct-email us with your resume!
                     </p>
                     
                     <div className="flex flex-wrap justify-center gap-4">
                        <button 
                           onClick={() => setSearchQuery("")} 
                           className="btn-outline h-14 px-10 text-xs font-bold uppercase rounded-xl transition-all hover:bg-surface"
                         >
                           Reset Search
                        </button>
                        <a 
                           href="mailto:careers@ranknexis.com" 
                           className="btn-primary h-14 px-10 text-xs font-bold uppercase rounded-xl flex items-center gap-2 shadow-premium"
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

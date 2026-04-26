"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Search } from "lucide-react";
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
    <>
      {/* SEARCH & FILTERS */}
      <section className="py-12 border-b border-stroke bg-surface/30">
         <div className="container-max">
            <div className="relative max-w-2xl mx-auto">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input 
                   type="text" 
                   placeholder="Search positions (e.g. Designer, Engineer)..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full h-16 pl-16 pr-8 glass border border-stroke rounded-2xl text-[10px] font-bold uppercase focus:border-brand transition-all outline-none text-text-primary placeholder:text-text-muted/50" 
               />
            </div>
         </div>
      </section>

      {/* JOBS LIST */}
      <section className="py-32">
         <div className="container-max">
            <div className="space-y-8">
               {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                  <motion.div 
                     key={job.id}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                  >
                     <Link href={`/careers/${job.slug}`} className="group block">
                        <div className="corporate-card grain flex flex-col md:flex-row md:items-center justify-between gap-8 group-hover:border-brand transition-all duration-500">
                           <div className="space-y-4">
                              <div className="flex flex-wrap gap-4">
                                 <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-brand px-3 py-1 glass rounded-full">
                                    Engineering
                                 </div>
                                 <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                    <Briefcase size={12} /> {job.type}
                                 </div>
                                 <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                    <MapPin size={12} /> {job.location}
                                 </div>
                              </div>
                              <h3 className="text-3xl font-bold uppercase tracking-tighter text-text-primary group-hover:text-brand transition-colors">{job.title}</h3>
                              <p className="text-text-muted text-base font-medium leading-relaxed max-w-2xl line-clamp-2">
                                 {job.description}
                              </p>
                           </div>
                           
                           <div className="flex flex-col items-end gap-4 min-w-[200px]">
                              <span className="text-xl font-bold tracking-tighter text-text-primary">Competitive Salary</span>
                              <div className="btn-outline h-12 px-6 text-[10px] font-bold uppercase group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all shadow-sm">
                                 Apply Now
                              </div>
                           </div>
                        </div>
                     </Link>
                  </motion.div>
               )) : (
                  <div className="text-center py-48 glass border border-stroke rounded-[4rem] shadow-premium grain">
                     <p className="text-text-muted text-xl font-medium italic mb-8">"No operational roles currently match your search."</p>
                     <button 
                        onClick={() => setSearchQuery("")} 
                        className="btn-outline h-14 px-10 text-[11px] font-bold uppercase glass"
                      >
                        Reset Search Archive
                      </button>
                  </div>
               )}
            </div>
         </div>
      </section>
    </>
  );
}


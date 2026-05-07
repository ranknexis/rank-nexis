import { motion } from "framer-motion";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface JobCardProps {
  title: string;
  location: string;
  type: string;
  slug: string;
  department: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, type, slug, department }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="corporate-card p-10 group hover:-translate-y-2 shadow-premium grain"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-6 flex-grow max-w-2xl">
          <div className="flex items-center gap-4">
             <div className="px-4 py-1.5 glass-dark border border-white/5 bg-brand text-white text-[11px] font-bold uppercase rounded-full shadow-lg">
                {department === "Systems" ? "Design" : department === "Marketing" ? "Marketing" : department}
             </div>
             <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse opacity-40" />
             <p className="text-[11px] font-bold uppercase text-text-muted">Active Opening</p>
          </div>
          
          <h3 className="text-3xl font-bold tracking-tighter uppercase leading-[0.9] group-hover:text-brand transition-colors">
            {title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold text-text-muted uppercase">
             <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-brand" />
                {location}
             </div>
             <div className="flex items-center gap-2.5">
                <Briefcase size={16} className="text-brand" />
                {type}
             </div>
             <div className="flex items-center gap-2.5">
                <TrendingUp size={16} className="text-brand" />
                Full-time Role
             </div>
          </div>
        </div>
 
        <Link 
          href={`/careers/${slug}`} 
          className="btn-primary h-18 px-12 text-[11px] font-bold uppercase shadow-xl shadow-brand/10 hover:shadow-brand/20 active:scale-95 transition-all text-center whitespace-nowrap min-w-[240px]"
        >
          Apply Now
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;


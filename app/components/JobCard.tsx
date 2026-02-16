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
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-gray-100 p-8 rounded-[2rem] hover:border-brand transition-all duration-500 shadow-lg hover:shadow-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
              {department === "Systems" ? "Engineering" : department === "Marketing" ? "Growth" : department}
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-brand transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
             <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand" />
                {location}
             </div>
             <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-brand" />
                {type}
             </div>
             <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-brand" />
                Rapid Scale Role
             </div>
          </div>
        </div>

        <Link 
          href={`/careers/${slug}`} 
          className="w-full md:w-auto px-8 py-4 bg-text-primary border border-text-primary hover:bg-brand hover:border-brand text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 text-center shadow-lg hover:shadow-brand/20"
        >
          View Position Sync
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;

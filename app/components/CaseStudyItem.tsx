import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import MetricNode from "./MetricNode";

interface CaseStudyItemProps {
  title: string;
  category: string;
  stats: { label: string; value: string }[];
  image: string;
  brand: string;
  slug: string;
}

const CaseStudyItem: React.FC<CaseStudyItemProps> = ({ title, category, stats, image, brand, slug }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group bg-surface border border-stroke rounded-[2.5rem] overflow-hidden hover:border-brand transition-all duration-500 shadow-2xl"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
        />
        <div className="absolute top-8 left-8 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-text-primary shadow-sm">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-10 space-y-8">
        <div className="space-y-4">
          <p className="text-xs font-bold text-brand uppercase tracking-[0.2em]">{brand}</p>
          <h3 className="text-3xl font-black tracking-tighter leading-tight group-hover:text-brand transition-colors">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-8 py-6 border-y border-stroke">
          {stats.map((stat, index) => (
            <MetricNode key={index} label={stat.label} value={stat.value} />
          ))}
        </div>

        <Link 
          href={`/work/${slug}`} 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-primary hover:text-brand transition-colors group/link pb-2"
        >
          View Implementation Sync 
          <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyItem;

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="corporate-card p-0 group overflow-hidden hover:-translate-y-2 transition-all duration-700 shadow-premium"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-100 md:opacity-70 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-1000" 
        />
        <div className="absolute top-8 left-8 px-6 py-2 glass-dark border border-white/10 rounded-full text-[11px] font-bold uppercase text-white shadow-xl">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-40" />
      </div>
      
      <div className="p-12 space-y-10">
        <div className="space-y-4">
          <p className="text-[11px] font-bold text-brand uppercase">{brand}</p>
          <h3 className="text-4xl font-bold tracking-tighter uppercase leading-[0.9] group-hover:text-brand transition-colors">{title}</h3>
        </div>

        <div className="grid grid-cols-3 gap-8 py-8 border-y border-stroke">
          {stats.map((stat, index) => (
            <MetricNode key={index} label={stat.label} value={stat.value} />
          ))}
        </div>

        <Link 
          href={`/work/${slug}`} 
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase text-text-muted hover:text-brand transition-colors group/link"
        >
          View Case Study 
          <ArrowUpRight size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyItem;


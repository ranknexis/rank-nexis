import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, category, author, date, slug, image }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-brand transition-all duration-500 shadow-xl flex flex-col h-full"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
        />
        <div className="absolute top-6 left-6 px-3 py-1 bg-brand text-black text-[10px] font-black uppercase tracking-widest rounded-full">
          {category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-brand" />
            {author}
          </div>
          <div className="w-1 h-1 bg-stroke rounded-full" />
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-brand" />
            {date}
          </div>
        </div>

        <h3 className="text-2xl font-black mb-4 tracking-tighter leading-tight group-hover:text-brand transition-colors line-clamp-2 uppercase">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 line-clamp-3 font-medium leading-relaxed flex-grow">
          {excerpt}
        </p>

        <Link 
          href={`/blog/${slug}`} 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-primary hover:text-brand transition-colors group/link pb-2"
        >
          Read Publication 
          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;

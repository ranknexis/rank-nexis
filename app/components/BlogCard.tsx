"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import React from 'react';
import Image from "next/image";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="corporate-card p-0 group overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-700 shadow-premium grain"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image 
          src={image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-100 transition-all duration-1000 group-hover:scale-105" 
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-brand text-black text-[10px] font-bold uppercase rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-brand" />
              {date}
            </div>
          </div>
        </div>

        <div className="space-y-3 flex-grow">
           <h3 className="text-xl md:text-2xl font-bold tracking-tighter leading-[1.1] group-hover:text-brand transition-colors line-clamp-2 uppercase">
             {title}
           </h3>
           <p className="text-text-muted text-sm md:text-base line-clamp-2 font-medium leading-relaxed">
             {excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stroke">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
            <User size={12} className="text-brand" />
            {author}
          </div>
          <Link 
            href={`/blog/${slug}`} 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-text-primary hover:text-brand transition-colors group/link"
          >
            Read <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

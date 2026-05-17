"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  initialPosts: any[];
  categories: any[];
}

export default function BlogContent({ initialPosts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category?.name === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryNames = ["All", ...categories.map(c => c.name)];

  return (
    <section className="py-24">
      <div className="container-max">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-24 gap-12">

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 p-2 glass border border-stroke rounded-[2rem] shadow-premium overflow-x-auto max-w-full bg-white">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
                  activeCategory === cat 
                    ? "bg-brand text-white shadow-lg shadow-brand/20" 
                    : "text-text-muted hover:text-brand hover:bg-brand/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH PUBLICATIONS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 glass border border-stroke rounded-2xl pl-16 pr-8 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-text-muted/30 shadow-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px 0px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="will-change-gpu"
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="glass border border-stroke rounded-[2.5rem] overflow-hidden hover:border-brand/40 transition-all duration-700 shadow-sm hover:shadow-premium h-full flex flex-col bg-white">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image 
                        src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
                        alt={post.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 antialiased" 
                      />
                      <div className="absolute top-6 left-6">
                        <div className="px-4 py-1.5 glass-dark rounded-full text-[9px] font-bold uppercase tracking-widest text-brand border border-white/10 backdrop-blur-md">
                          {post.category?.name || "Strategy"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-10 flex flex-col flex-grow space-y-6">
                      <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        <div className="flex items-center gap-2">
                           <User size={12} className="text-brand" />
                           {post.author?.name || "RankNexis Team"}
                        </div>
                        <div className="flex items-center gap-2">
                           <Calendar size={12} className="text-brand" />
                           {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight group-hover:text-brand transition-colors antialiased">
                        {post.title}
                      </h3>
                      
                      <p className="text-text-muted text-base font-medium leading-relaxed line-clamp-3 antialiased flex-grow">
                        {post.excerpt || post.description}
                      </p>
                      
                      <div className="pt-6 border-t border-stroke flex items-center justify-between group/link">
                        <span className="text-[10px] font-bold uppercase tracking-widest group-hover/link:text-brand transition-colors">Read Publication</span>
                        <ArrowRight size={16} className="text-brand group-hover/link:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-48 text-center glass border border-stroke rounded-[4rem] grain shadow-premium bg-white">
              <p className="text-text-muted text-xl font-medium italic mb-8">"No strategic publications match your search archive."</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} 
                className="btn-outline h-14 px-10 text-[11px] font-bold uppercase tracking-[0.3em] glass bg-white"
              >
                Reset Archive Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

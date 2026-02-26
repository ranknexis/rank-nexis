"use client";

import BlogCard from "@/components/BlogCard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

interface BlogContentProps {
  initialPosts: any[];
  categories: any[];
}

export default function BlogContent({ initialPosts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category.name === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryNames = ["All", ...categories.map(c => c.name)];

  return (
    <>
      {/* SEARCH & FILTER SECTION */}
      <section className="pb-24">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-12">
            {/* Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 p-2 glass border border-stroke rounded-[2rem] shadow-premium overflow-x-auto max-w-full">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
                    activeCategory === cat 
                      ? "bg-brand text-white shadow-lg shadow-brand/20" 
                      : "text-text-muted hover:text-brand hover:bg-brand/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 glass border border-stroke rounded-2xl pl-16 pr-8 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-text-muted shadow-sm"
              />
            </div>
          </div>

          {/* BLOG GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard 
                  key={post.id}
                  title={post.title}
                  excerpt={post.content.split(' (')[0]} // Simple excerpt from content
                  category={post.category.name}
                  author={post.author.name || "Admin"}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  slug={post.slug}
                  image={post.image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"}
                />
              ))
            ) : (
              <div className="col-span-full py-48 text-center glass border border-stroke rounded-[4rem] grain shadow-premium">
                <p className="text-text-muted text-xl font-medium italic mb-8">"No strategic publications found in this category."</p>
                <button 
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} 
                  className="btn-outline h-14 px-10 text-[11px] font-bold uppercase tracking-[0.3em] glass"
                >
                  Reset Archive Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

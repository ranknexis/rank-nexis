"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Engineering Growth: Why Traditional Marketing is Dying",
    excerpt: "In a world driven by algorithms and sub-second precision, traditional creative agencies are falling behind. Here's why you need an engineering-first approach.",
    category: "Strategy",
    author: "Mahdi Monir",
    date: "Feb 15, 2026",
    slug: "engineering-growth-philosophy",
    image: "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "2",
    title: "Advanced Search Strategies: Beyond Keywords and Backlinks",
    excerpt: "Learn how we build automated content pipelines and technical SEO infrastructure that dominates enterprise Search Results.",
    category: "Marketing",
    author: "SEO Lead",
    date: "Feb 12, 2026",
    slug: "advanced-search-strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  {
    id: "3",
    title: "Leveraging Agentic AI for Workflow Scaling",
    excerpt: "AI is more than just chatbots. Discover how to deploy agentic workflows that automate high-level decision making and operational logic.",
    category: "AI",
    author: "AI Architect",
    date: "Feb 10, 2026",
    slug: "agentic-ai-workflows",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "4",
    title: "Next.js Architecture for High-Scale SaaS",
    excerpt: "A deep dive into multi-tenant systems, sub-second rendering, and edge computing for modern enterprise applications.",
    category: "Engineering",
    author: "System Principal",
    date: "Feb 08, 2026",
    slug: "nextjs-saas-architecture",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "5",
    title: "Data Sovereignty: Reclaiming Your Growth Intelligence",
    excerpt: "Stop relying on black-box platforms. Learn how to build transparent tracking systems that give you absolute data clarity.",
    category: "Strategy",
    author: "Mahdi Monir",
    date: "Feb 05, 2026",
    slug: "data-sovereignty-guide",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "6",
    title: "Sub-Second UX: The Core Web Vital for ROAS",
    excerpt: "How site performance directly impacts your advertising return and why engineering is your best marketing tool.",
    category: "Performance",
    author: "UX Engineer",
    date: "Feb 01, 2026",
    slug: "sub-second-ux-performance",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2055"
  },
  {
    id: "7",
    title: "Architecting the Future: Multi-Agent Systems in Enterprise",
    excerpt: "Moving beyond simple LLM implementations to robust, hierarchical agent architectures that drive real business value.",
    category: "AI",
    author: "Mahdi Monir",
    date: "Jan 28, 2026",
    slug: "enterprise-multi-agent-systems",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "8",
    title: "The Death of Static Content: Dynamic Personalization at Scale",
    excerpt: "How we use edge-side rendering and real-time user intent signals to deliver hyper-relevant experiences without performance hits.",
    category: "Strategy",
    author: "Growth Lead",
    date: "Jan 25, 2026",
    slug: "dynamic-personalization-scale",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  {
    id: "9",
    title: "Technical Debt vs. Growth Speed: A Balancing Act",
    excerpt: "Strategic diagnostics on when to build for scale and when to optimize for market speed in high-growth engineering environments.",
    category: "Engineering",
    author: "System Principal",
    date: "Jan 20, 2026",
    slug: "technical-debt-vs-growth",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  }
];

const CATEGORIES = ["All", "Strategy", "Marketing", "Engineering", "AI", "Performance"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="container-max relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Strategic Intelligence</p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase">
                Insights & <br /> <span className="text-brand">Strategy.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Technical diagnostics, architectural patterns, and strategic growth logic for the modern enterprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <section className="pb-24">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-12">
              {/* Categories */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 p-2 glass border border-stroke rounded-[2rem] shadow-premium overflow-x-auto max-w-full">
                {CATEGORIES.map((cat) => (
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
                    excerpt={post.excerpt}
                    category={post.category}
                    author={post.author}
                    date={post.date}
                    slug={post.slug}
                    image={post.image}
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

        {/* NEWSLETTER CTA */}
        <section className="py-24 bg-white border-t border-stroke relative overflow-hidden grain">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.02] -z-10" />
          <div className="container-max text-center max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand">Stay Synchronized</p>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Knowledge</span> <br /> Hub.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  Insights, strategies, and technical benchmarks from our team of digital engineers and growth specialists.
                </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4 p-2 glass border border-stroke rounded-[2rem] shadow-premium max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-grow h-14 bg-transparent px-8 focus:outline-none text-[10px] uppercase font-bold tracking-widest text-text-primary placeholder:text-text-muted"
                required
              />
              <button type="submit" className="btn-primary h-14 px-10 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl group shadow-xl shadow-brand/10">
                Subscribe <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

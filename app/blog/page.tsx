"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
    title: "The SEO Engine: Beyond Keywords and Backlinks",
    excerpt: "Learn how we build automated content pipelines and technical SEO infrastructure that dominates enterprise Search Nodes.",
    category: "Marketing",
    author: "SEO Lead",
    date: "Feb 12, 2026",
    slug: "technical-seo-engine",
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

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.05),transparent)] pointer-events-none" />
          
          <div className="container-max relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] font-bold text-brand uppercase tracking-[0.5em] mb-8">Strategic Intelligence</p>
              <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                Insights & <span className="text-brand">Strategy.</span>
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                Deep dives into growth engineering, technical SEO systems, and the future of digital revenue ecosystems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <section className="pb-32 px-6">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
              {/* Categories */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 p-2 bg-gray-50 border border-gray-100 rounded-2xl overflow-x-auto max-w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      activeCategory === cat 
                        ? "bg-text-primary text-white shadow-xl shadow-black/20" 
                        : "bg-gray-50 text-gray-600 border border-gray-100 hover:border-brand"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80 group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search Publications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-brand transition-all text-text-primary placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* BLOG GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <div className="col-span-full py-32 text-center">
                  <p className="text-gray-600 text-lg font-medium italic">"No strategic publications found in this node."</p>
                  <button 
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} 
                    className="mt-6 text-brand font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="py-40 bg-gray-50 border-y border-gray-100 relative overflow-hidden px-6">
          <div className="absolute inset-0 bg-brand/[0.01] -z-10" />
          <div className="container-max text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-text-primary">Stay Synchronized.</h2>
            <p className="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
              Join 5,000+ growth leaders receiving our weekly technical strategy and sector intelligence. No fluff, just engineering logic.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 p-2 bg-white border border-gray-100 rounded-[2rem] shadow-xl">
              <input 
                type="email" 
                placeholder="Synchronize your email address..." 
                className="flex-grow h-16 bg-transparent px-8 focus:outline-none text-text-primary font-medium placeholder:text-gray-500"
                required
              />
              <button type="submit" className="h-16 px-12 bg-brand text-white font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-xl shadow-brand/20">
                Subscribe to Intel
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

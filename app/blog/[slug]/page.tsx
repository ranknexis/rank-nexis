"use client";

import { motion } from "framer-motion";
import { Calendar, Share2, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// Mock data finder (in a real app, this would be a Prisma query or API call)
const getPostBySlug = (slug: string) => {
  const posts = [
    {
      title: "Engineering Growth: Why Traditional Marketing is Dying",
      excerpt: "In a world driven by algorithms and sub-second precision, traditional creative agencies are falling behind. Here's why you need an engineering-first approach.",
      category: "Strategy",
      author: "Mahdi Monir",
      date: "Feb 15, 2026",
      slug: "engineering-growth-philosophy",
      image: "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070",
      content: `
        <p>The digital landscape is undergoing a fundamental shift. For decades, "marketing" was synonymous with creativity—catchy slogans, beautiful imagery, and emotional storytelling. While these elements still hold value, the <strong>mechanism of delivery</strong> has changed entirely.</p>
        
        <h3>The Algorithmic Reality</h3>
        <p>Today, your growth is governed by complex mathematical models. Whether it's the Google Search algorithm, Meta's ad auction logic, or TikTok's recommendation engine, these systems don't care about your mood board. They care about data, signals, and technical precision.</p>
        
        <p>This is where the traditional agency model fails. They treat digital platforms as canvas, when they should be treating them as <strong>infrastructure</strong>. When you separate "the creative" from "the implementation," you create friction. In an environment where sub-second latency and attribution accuracy determine ROI, friction is fatal.</p>
        
        <h3>Enter Growth Engineering</h3>
        <p>At RankNexis, we view growth as an engineering problem. This means:</p>
        <ul>
          <li><strong>Integrated Loops:</strong> Copy is optimized in real-time based on conversion data pipelines.</li>
          <li><strong>Technical Dominance:</strong> SEO is treated as search node optimization, ensuring site architecture is perfectly aligned with crawler logic.</li>
          <li><strong>Sub-Second UX:</strong> We treat load times as a primary conversion factor, knowing that every 100ms of delay kills revenue.</li>
        </ul>
        
        <p>The companies that will dominate the next decade are the ones that stop "doing marketing" and start <strong>engineering growth systems</strong>. The era of the generalist agency is over. The era of the Growth Architect has begun.</p>
      `
    }
    // ... other posts would be here
  ];
  return posts.find(p => p.slug === slug) || posts[0]; // Default to first for demo
};

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug as string);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="pt-24 pb-24 md:pt-32 md:pb-40 grain">
        <div className="container-max">
          {/* IMPACT HERO SECTION */}
          <header className="max-w-4xl mx-auto mb-20 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-3 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full mb-8"
            >
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">Publication / Knowledge Hub</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] uppercase"
            >
              {post.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 mb-16 px-6"
            >
               <div className="flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-full border-2 border-brand/20 p-0.5 bg-white">
                     <div className="w-full h-full rounded-full bg-brand/10 flex items-center justify-center text-brand">
                        <User size={20} strokeWidth={1.5} />
                     </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary leading-none mb-1">{post.author}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Principal Architect</p>
                  </div>
               </div>
               <div className="h-10 w-px bg-gray-100 hidden sm:block" />
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                     <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary leading-none mb-1">{post.date}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Eng. Timestamp</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="aspect-[4/3] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-premium group relative"
            >
               <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
               
               <div className="absolute bottom-8 right-8 z-20">
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-brand shadow-xl hover:rotate-12 transition-all">
                     <Share2 size={24} />
                  </button>
               </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            {/* SIDEBAR / TOC */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 order-2 lg:order-1">
               <div className="space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand pb-4 border-b border-brand/20">System Content</h4>
                    <nav className="space-y-4">
                       {["Executive Summary", "Dynamic Context", "Growth Protocol", "Structural Audit"].map((link, i) => (
                         <a href="#" key={link} className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand transition-colors pl-4 border-l border-gray-100 hover:border-brand">
                           {link}
                         </a>
                       ))}
                    </nav>
                  </div>

                  <div className="corporate-card bg-brand p-8 text-white space-y-4">
                     <TrendingUp size={32} strokeWidth={1} />
                     <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">Deploy Scaling Pulse</h4>
                     <p className="text-white/80 text-[10px] leading-relaxed uppercase font-bold tracking-widest">Architect your growth engine with 1:1 precision.</p>
                     <Link href="/contact" className="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest py-3 px-6 bg-white text-brand rounded-lg hover:scale-105 transition-transform">
                        Initialize Sync
                     </Link>
                  </div>
               </div>
            </aside>

            {/* MAIN ARTICLE BODY */}
            <article className="lg:col-span-9 order-1 lg:order-2">
               <div className="max-w-3xl prose prose-lg prose-gray prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase">
                  <div 
                    className="text-gray-800 text-xl leading-[1.8] font-medium space-y-12 drop-cap"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                    {["Strategy", "Systems", "Growth", "Engineering"].map(tag => (
                      <span key={tag} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">#{tag}</span>
                    ))}
                  </div>
               </div>
            </article>
          </div>

          {/* RELATED PUBLICATIONS */}
          <section className="mt-40 pt-20 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand">Deep Stack Analysis</span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-none">Related <br />Engineering.</h2>
              </div>
              <Link href="/blog" className="btn-outline h-14 px-10 text-[10px] uppercase tracking-[0.3em]">
                View All Intelligence
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <BlogCard 
                title="The SEO Engine: Beyond Keywords and Backlinks"
                excerpt="Learn how we build automated content pipelines and technical SEO infrastructure that dominates enterprise Search Nodes."
                category="Marketing"
                author="SEO Lead"
                date="Feb 12, 2026"
                slug="technical-seo-engine"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <BlogCard 
                title="Leveraging Agentic AI for Workflow Scaling"
                excerpt="AI is more than just chatbots. Discover how to deploy agentic workflows that automate high-level decision making."
                category="AI"
                author="AI Architect"
                date="Feb 10, 2026"
                slug="agentic-ai-workflows"
                image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

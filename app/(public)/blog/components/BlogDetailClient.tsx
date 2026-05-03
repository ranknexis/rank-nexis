"use client";

import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import { Calendar, Share2, TrendingUp, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  post: any;
  relatedPosts: any[];
}

export default function BlogDetailClient({ post, relatedPosts }: Props) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="pt-24 pb-24 md:pt-32 md:pb-40 grain">
        <div className="container-max">
          {/* IMPACT HERO SECTION */}
          <header className="max-w-4xl mx-auto mb-20 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-3 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full mb-8"
            >
               <span className="text-[10px] font-bold uppercase text-brand">Publication / {post.category?.name || 'Knowledge Hub'}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tighter leading-[1.1] uppercase"
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
                    <p className="text-[10px] font-bold uppercase text-text-primary leading-none mb-1">{post.author?.name || 'Admin'}</p>
                    <p className="text-[9px] font-bold uppercase text-gray-400">{post.author?.role || 'Expert Strategist'}</p>
                  </div>
               </div>
               <div className="h-10 w-px bg-gray-100 hidden sm:block" />
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                     <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-text-primary leading-none mb-1">{formattedDate}</p>
                    <p className="text-[9px] font-bold uppercase text-gray-400">Published Date</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="aspect-[4/3] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[3.rem] overflow-hidden border border-gray-100 shadow-premium group relative"
            >
               <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
               <img src={post.image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"} alt={post.title} className="w-full h-full object-contain bg-surface/50 transition-transform duration-1000" />
               
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
                    <h4 className="text-[11px] font-bold uppercase text-brand pb-4 border-b border-brand/20">Navigation</h4>
                    <Link href="/blog" className="flex items-center gap-3 text-[10px] font-bold uppercase text-gray-400 hover:text-brand transition-colors">
                      <ArrowLeft size={14} /> Back to Blog
                    </Link>
                  </div>

                  <div className="corporate-card bg-brand p-8 text-white space-y-4 rounded-3xl">
                     <TrendingUp size={32} strokeWidth={1} />
                     <h4 className="text-[10px] font-bold uppercase">Grow Your Business</h4>
                     <p className="text-white/80 text-[10px] items-center leading-relaxed uppercase font-bold">Let us help you build a professional online presence.</p>
                     <Link href="/contact" className="inline-flex items-center gap-2 text-[8px] font-bold uppercase py-3 px-6 bg-white text-brand rounded-lg hover:scale-105 transition-transform">
                        Get Started
                     </Link>
                  </div>
               </div>
            </aside>

            {/* MAIN ARTICLE BODY */}
            <article className="lg:col-span-9 order-1 lg:order-2">
               <div className="max-w-3xl prose prose-xl prose-gray 
                 prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-text-primary
                 prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:font-medium
                 prose-strong:text-text-primary prose-strong:font-bold
                 prose-ul:list-disc prose-li:marker:text-brand
                 prose-img:rounded-3xl prose-img:shadow-premium">
                  <div 
                    className="drop-cap"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  
                  {post.tags?.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[9px] font-bold uppercase text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  )}
               </div>
            </article>
          </div>

          {/* RELATED PUBLICATIONS */}
          {relatedPosts.length > 0 && (
            <section className="mt-40 pt-20 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase text-brand">Deep Stack Analysis</span>
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-none">More <br />Insights.</h2>
                </div>
                <Link href="/blog" className="btn-outline h-14 px-10 text-[10px] uppercase">
                  View All Articles
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {relatedPosts.map((rPost: any) => (
                  <BlogCard 
                    key={rPost.id}
                    title={rPost.title}
                    excerpt={rPost.excerpt}
                    category={rPost.category?.name}
                    author={rPost.author?.name}
                    date={new Date(rPost.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    slug={rPost.slug}
                    image={rPost.image}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}


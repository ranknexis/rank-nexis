"use client";

import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";
import { Calendar, Share2, TrendingUp, User, ArrowLeft, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";

interface Props {
  post: any;
  relatedPosts: any[];
}

export default function BlogDetailClient({ post, relatedPosts }: Props) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      const renderedHeadings = contentRef.current.querySelectorAll('h2, h3');
      const headingsData = Array.from(renderedHeadings).map((heading, index) => {
        const id = heading.id || `section-${index}`;
        heading.id = id;
        return { 
          id, 
          text: heading.textContent || '',
          level: heading.tagName.toLowerCase() 
        };
      });
      setHeadings(headingsData);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-100px 0px -70% 0px' }
      );

      renderedHeadings.forEach((heading) => observer.observe(heading));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [post.content]);

  const formattedDate = useMemo(() => new Date(post.createdAt).toLocaleDateString(undefined, { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }), [post.createdAt]);

  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const noOfWords = post.content.split(/\s/g).length;
    return Math.ceil(noOfWords / wordsPerMinute);
  }, [post.content]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="pt-24 pb-24 md:pt-32 md:pb-40 grain">
        <div className="container-max">

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
              className="flex items-center justify-center gap-8 mb-16 px-6"
            >
               <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-full border-2 border-brand/20 p-0.5 bg-white shadow-sm">
                     <div className="w-full h-full rounded-full bg-brand/10 flex items-center justify-center text-brand">
                        <User size={20} strokeWidth={1.5} />
                     </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-text-primary leading-none mb-1">{post.author?.name || 'Admin'}</p>
                    <p className="text-[9px] font-bold uppercase text-gray-400">{post.author?.teamProfile?.role || post.author?.role || 'Expert Strategist'}</p>
                  </div>
               </div>
               
               <div className="h-8 w-px bg-gray-200 hidden sm:block" />
               
               <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-sm">
                     <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-text-primary leading-none mb-1">{formattedDate}</p>
                    <p className="text-[9px] font-bold uppercase text-gray-400">Published Date</p>
                  </div>
               </div>

               <div className="h-8 w-px bg-gray-200 hidden md:block" />

               <div className="hidden md:flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-sm">
                     <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-text-primary leading-none mb-1">{readingTime} MIN READ</p>
                    <p className="text-[9px] font-bold uppercase text-gray-400">Est. Time</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="aspect-[4/3] md:aspect-[21/9] max-w-3xl mx-auto rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-premium group relative"
            >
               <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
               <Image src={post.image || "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"} alt={post.title} fill className="w-full h-full object-cover transition-transform duration-1000" />
               
               <div className="absolute bottom-8 right-8 z-20">
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-brand shadow-xl hover:rotate-12 transition-all">
                     <Share2 size={24} />
                  </button>
               </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

            <aside className="lg:col-span-3 lg:sticky lg:top-32 order-2 lg:order-1 self-start max-h-[calc(100vh-160px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
               <div className="space-y-12">

                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold uppercase text-brand tracking-widest pb-4">Navigation</h4>
                    <Link href="/blog" className="flex items-center gap-3 text-[10px] font-bold uppercase text-gray-400 hover:text-brand transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand/10 group-hover:text-brand transition-all">
                        <ArrowLeft size={14} />
                      </div>
                      Back to Insights
                    </Link>
                  </div>

                  {headings.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-[11px] font-bold uppercase text-brand tracking-widest pb-4">Contents</h4>
                      <nav className="flex flex-col gap-4">
                        {headings.map((heading) => (
                          <button 
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`flex items-start gap-3 text-[10px] font-bold uppercase transition-all duration-300 text-left group 
                              ${activeId === heading.id ? 'text-brand translate-x-2' : 'text-gray-500 hover:text-brand'}
                              ${heading.level === 'h3' ? 'ml-4 opacity-80' : ''}`}
                          >
                            <ChevronRight size={14} className={`mt-0.5 transition-colors ${activeId === heading.id ? 'text-brand' : 'text-brand/30 group-hover:text-brand'}`} />
                            <span className="line-clamp-2">{heading.text}</span>
                          </button>
                        ))}
                      </nav>
                    </div>
                  )}

                  <div className="relative overflow-hidden bg-brand p-8 text-white space-y-6 rounded-[2rem] shadow-xl group">
                     <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                     <TrendingUp size={32} strokeWidth={1.5} className="text-white/40" />
                     <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Grow Your Business</h4>
                        <p className="text-white text-lg font-bold leading-tight uppercase">Let us build your professional online presence.</p>
                     </div>
                     <Link href="/contact" className="flex items-center justify-between w-full text-[9px] font-bold uppercase py-4 px-6 bg-white text-brand rounded-xl hover:bg-gray-50 transition-all shadow-lg group">
                        Get Started
                        <ChevronRight size={16} />
                     </Link>
                  </div>
               </div>
            </aside>

            <article className="lg:col-span-9 order-1 lg:order-2">
               <div className="max-w-3xl prose prose-xl prose-gray blog-content-area
                 prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-text-primary
                 prose-h2:text-4xl md:prose-h2:text-5xl
                 prose-h2:scroll-mt-[120px] prose-h2:mt-40 prose-h2:mb-12
                 prose-h3:text-2xl md:prose-h3:text-3xl
                 prose-h3:scroll-mt-[120px] prose-h3:mt-24 prose-h3:mb-8
                 prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:font-medium prose-p:mb-12
                 prose-strong:text-text-primary prose-strong:font-bold
                 prose-ul:list-disc prose-li:marker:text-brand prose-li:text-gray-600 prose-li:mb-4
                 prose-hr:my-24 prose-hr:opacity-20
                 prose-img:rounded-[2.5rem] prose-img:shadow-premium prose-img:my-20">
                  <div 
                    ref={contentRef}
                    className="drop-cap-article"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {post.tags?.length > 0 && (
                    <div className="mt-32 pt-12 border-t border-gray-100 flex flex-wrap gap-3">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[9px] font-bold uppercase text-gray-500 hover:border-brand/20 hover:text-brand transition-all cursor-default">#{tag}</span>
                      ))}
                    </div>
                  )}
               </div>
            </article>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-40 pt-20 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                <div className="space-y-6">
                  <span className="text-[10px] font-bold uppercase text-brand tracking-[0.2em]">Deep Stack Analysis</span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.95]">More <br />Insights.</h2>
                </div>
                <Link href="/blog" className="btn-outline h-16 px-12 text-[10px] uppercase tracking-widest hover:bg-brand hover:text-white transition-all">
                  View All Articles
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
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


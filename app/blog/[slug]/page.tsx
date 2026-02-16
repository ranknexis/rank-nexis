"use client";

import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
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

      <main className="pt-32 pb-40">
        <div className="container-max px-6">
          {/* BACK LINK */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-brand transition-colors mb-20 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Intel Central
          </Link>

          {/* ARTICLE HEADER */}
          <header className="max-w-4xl mx-auto mb-20">
            <div className="flex items-center gap-3 mb-8">
               <span className="px-3 py-1 bg-brand text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                {post.category}
              </span>
              <div className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <User size={12} className="text-brand" />
                  {post.author}
                </div>
                <div className="w-1 h-1 bg-gray-200 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-brand" />
                  {post.date}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter leading-[1.1] uppercase">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-brand pl-8 mb-12">
              "{post.excerpt}"
            </p>

            <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-gray-100 mb-20 shadow-xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </header>

          {/* ARTICLE CONTENT */}
          <article className="max-w-3xl mx-auto prose prose-orange">
            <div 
              className="text-gray-700 text-lg leading-[1.8] font-medium space-y-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* SOCIAL SHARE & TAGS */}
          <div className="max-w-3xl mx-auto mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap gap-3">
              {["Strategy", "Scale", "Engineering"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600">#{tag}</span>
              ))}
            </div>
            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-primary hover:text-brand transition-colors p-4 bg-gray-50 border border-gray-100 rounded-2xl active:scale-95 shadow-sm">
              <Share2 size={16} className="text-brand" />
              Synchronize Intent
            </button>
          </div>

          {/* RELATED PUBLICATIONS */}
          <section className="mt-40 pt-40 border-t border-gray-100">
            <div className="flex justify-between items-end mb-20">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Related <br /><span className="text-brand">Strategy.</span></h2>
              <Link href="/blog" className="text-xs font-bold uppercase tracking-[0.2em] text-brand hover:translate-x-2 transition-transform pb-2">
                View All Intel Central
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

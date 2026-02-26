import prisma from "@/lib/prisma";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BlogContent from "./components/BlogContent";

export const metadata = {
  title: "Blog & Insights | RankNexis",
  description: "Explore the latest insights on SEO, marketing, and business growth from the experts at RankNexis.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blog.findMany({
      include: { 
        category: true,
        author: true 
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blogCategory.findMany()
  ]);

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
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                 <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                 <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">Strategic Intelligence</p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase">
                Expert <br /> <span className="text-brand">Strategy.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Simple tips, helpful guides, and smart marketing strategies to help your business grow.
              </p>
            </div>
          </div>
        </section>

        <BlogContent initialPosts={posts} categories={categories} />

        {/* NEWSLETTER CTA */}
        <section className="py-24 bg-white border-t border-stroke relative overflow-hidden grain">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.02] -z-10" />
          <div className="container-max text-center max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand">Stay Synchronized</p>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Knowledge</span> <br /> Center.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto">
                  Helpful insights and marketing tips from our team of professional designers and digital experts.
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
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

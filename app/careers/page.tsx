import prisma from "@/lib/prisma";
import { Layers, Zap } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CareersContent from "./components/CareersContent";

export const metadata = {
  title: "Careers | Join the RankNexis Team",
  description: "Explore career opportunities at RankNexis. We're looking for talented individuals to join our team of digital experts.",
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
           <div className="container-max relative z-10 text-center space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand">Careers</p>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase">
                  Build Your <br /> <span className="text-brand">Career.</span>
                </h1>
                <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  Join our team of experts. We are building the next generation of digital solutions.
                </p>
              </div>
           </div>
        </section>

        <CareersContent initialJobs={jobs} />

        {/* CULTURE SECTION */}
        <section className="py-48 bg-black text-white relative overflow-hidden grain">
           <div className="absolute top-0 left-0 w-full h-full bg-brand/5 -z-10" />
           <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand">The Environment</p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-tight">
                  <span className="text-brand">Join</span> <br /> Our Team.
                </h1>
                <p className="text-text-secondary text-xl font-medium leading-relaxed">
                  We are looking for creative and hardworking people to join our team. Together, we build simple and effective digital solutions for businesses.
                </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <Zap className="text-brand" size={32} />
                        <h4 className="text-lg font-bold uppercase tracking-tight">Focus on Results</h4>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-relaxed">We work together to achieve the best results for every client.</p>
                     </div>
                     <div className="space-y-4">
                        <Layers className="text-brand" size={32} />
                        <h4 className="text-lg font-bold uppercase tracking-tight">Team Spirit</h4>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-relaxed">We value clear communication and support within our team.</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="aspect-square glass rounded-[4rem] overflow-hidden grain shadow-2xl shadow-brand/10">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" alt="Team Session" className="w-full h-full object-cover grayscale opacity-20" />
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

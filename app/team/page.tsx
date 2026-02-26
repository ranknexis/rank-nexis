import prisma from "@/lib/prisma";
import {
   ArrowRight,
   Award,
   Briefcase,
   Facebook,
   Linkedin,
   Mail,
   Users
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Our Team | Expert Strategists & Creatives",
  description: "Meet the dedicated team of experts at RankNexis, committed to helping your business grow through innovation and technical excellence.",
};

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
           </div>
           
           <div className="container-max relative z-10 text-center space-y-12">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full shadow-premium">
                   <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                   <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Expert Agency</p>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] uppercase text-text-primary">
                  Our <br /> <span className="text-brand">Expert Team.</span>
                </h1>
                <p className="text-text-secondary max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                  We are a group of dedicated strategists, designers, and developers committed to helping your business grow through innovation and technical excellence.
                </p>
              </div>
           </div>
        </section>

        {/* TEAM GRID */}
        <section className="py-32">
           <div className="container-max">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 {team.map((member: any) => (
                    <div 
                       key={member.id}
                       className="group"
                    >
                       <div className="space-y-10">
                          <div className="aspect-[3/4] rounded-[4rem] overflow-hidden glass shadow-premium group-hover:shadow-2xl group-hover:shadow-brand/10 transition-all duration-700 relative grain">
                             <img 
                                src={member.image || "/team/placeholder.png"} 
                                alt={member.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                             />
                             <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4 justify-center">
                                   {member.facebook && <Link href={member.facebook} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand transition-colors"><Facebook size={18} /></Link>}
                                   {member.linkedin && <Link href={member.linkedin} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand transition-colors"><Linkedin size={18} /></Link>}
                                   {member.email && <Link href={`mailto:${member.email}`} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand transition-colors"><Mail size={18} /></Link>}
                                </div>
                             </div>
                          </div>
                          
                          <div className="space-y-6 text-center">
                             <div className="space-y-2">
                                <h3 className="text-4xl font-bold uppercase tracking-tighter group-hover:text-brand transition-colors leading-none text-text-primary">{member.name}</h3>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{member.role}</p>
                             </div>
                             <p className="text-text-muted text-lg font-medium leading-relaxed max-w-[90%] mx-auto">
                                {member.bio}
                             </p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CORE STRENGTHS */}
        <section className="py-48 bg-surface/30 border-y border-stroke relative overflow-hidden">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                 <div className="space-y-8">
                    <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                       <Award size={32} />
                    </div>
                    <h3 className="text-3xl font-bold uppercase tracking-tighter text-text-primary">Strategic Excellence</h3>
                    <p className="text-text-muted text-lg font-medium leading-relaxed">
                       Our work is rooted in deep industry research and data-driven strategies that ensure long-term success.
                    </p>
                 </div>
                 <div className="space-y-8">
                    <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                       <Users size={32} />
                    </div>
                    <h3 className="text-3xl font-bold uppercase tracking-tighter text-text-primary">Creative Collaboration</h3>
                    <p className="text-text-muted text-lg font-medium leading-relaxed">
                       We work as an extension of your team, ensuring clear communication and shared goals throughout every project.
                    </p>
                 </div>
                 <div className="space-y-8">
                    <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                       <Briefcase size={32} />
                    </div>
                    <h3 className="text-3xl font-bold uppercase tracking-tighter text-text-primary">Proven Results</h3>
                    <p className="text-text-muted text-lg font-medium leading-relaxed">
                       With hundreds of successful projects delivered, our expertise helps brands scale their impact globally.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-48 bg-white relative px-6 overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] -z-10" />
          
          <div className="container-max text-center relative z-10 space-y-16">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] text-text-primary">
               Ready to grow <br /> <span className="text-brand">Together?</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
               Partner with our team of experts and let's build something exceptional for your brand.
            </p>
            <div className="flex justify-center text-text-primary">
              <Link href="/contact" className="btn-primary h-20 px-16 text-[11px] font-bold uppercase tracking-wider group shadow-premium">
                Book a Consultation <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

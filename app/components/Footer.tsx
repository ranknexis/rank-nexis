import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stroke pt-24 pb-16 px-6 grain relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.02] rounded-full blur-[100px] -z-10" />
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-x-12 gap-y-16 mb-24">
          <div className="md:col-span-4 lg:col-span-5 space-y-10">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo />
            </Link>
            <p className="text-text-muted text-lg leading-relaxed max-w-md font-medium">
              We provide high-quality digital marketing, creative design, and web development services. We help brands grow through clear strategies and technical expertise.
            </p>
            <div className="flex gap-6">
                <a href="#" className="w-12 h-12 glass border border-stroke rounded-xl flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a href="#" className="w-12 h-12 glass border border-stroke rounded-xl flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 space-y-8">
            <h4 className="text-[11px] font-bold text-brand uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Services
              </Link></li>
              <li><Link href="/work" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Case Studies
              </Link></li>
              <li><Link href="/blog" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Knowledge Hub
              </Link></li>
              <li><Link href="/about" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 About
              </Link></li>
              <li><Link href="/team" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Our Team
              </Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2 space-y-8">
            <h4 className="text-[11px] font-bold text-brand uppercase tracking-wider">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="/careers" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Careers
              </Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-text-muted hover:text-brand transition-all duration-300 uppercase tracking-wider block group flex items-center gap-2 px-1">
                 <div className="w-1 h-1 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 Contact Us
              </Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <h4 className="text-[11px] font-bold text-brand uppercase tracking-widest">Locations</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                 <p className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Headquarters</p>
                 <p className="text-sm font-medium text-text-muted">Dhaka, Bangladesh</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Email</p>
                 <a href="mailto:hello@ranknexis.com" className="text-sm font-bold text-brand hover:underline tracking-tight">hello@ranknexis.com</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-stroke flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider">© 2026 RankNexis Systems. All Rights Reserved.</p>
          <div className="flex gap-10 text-[11px] text-text-muted font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

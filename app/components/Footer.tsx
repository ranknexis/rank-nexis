import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 px-6">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Engineering growth through high-performance software systems and data-driven marketing engines. We build revenue systems for ambitious brands worldwide.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">Services</Link></li>
              <li><Link href="/work" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">Work</Link></li>
              <li><Link href="/blog" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">Insights</Link></li>
              <li><Link href="/careers" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">Careers</Link></li>
              <li><Link href="/about" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">About</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em]">Connect</h4>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="text-xs font-medium text-gray-500 uppercase tracking-tight">Dhaka, Bangladesh</li>
                <li><a href="mailto:hello@ranknexis.com" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors uppercase tracking-tight">hello@ranknexis.com</a></li>
              </ul>
              
              <div className="flex gap-4 pt-2">
                <a href="#" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-brand hover:bg-brand/5 transition-all">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-brand hover:bg-brand/5 transition-all">
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">© 2026 RankNexis Systems. All rights reserved.</p>
          <div className="flex gap-8 text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

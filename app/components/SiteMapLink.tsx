"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Map } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SiteMapProps {
  services: { title: string; slug: string }[];
  blogs: { title: string; slug: string }[];
  work: { title: string; slug: string }[];
}

export default function SiteMapLink({ services, blogs, work }: SiteMapProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SITEMAP = [
    {
      title: "Main Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Case Studies", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "About Us", href: "/about" },
        { label: "Meet the Team", href: "/team" },
      ]
    },
    {
      title: "Core Services",
      links: services.map(s => ({
        label: s.title,
        href: `/services/${s.slug}`
      }))
    },
    {
      title: "Success Stories",
      links: work.map(w => ({
        label: w.title,
        href: `/work/${w.slug}`
      }))
    },
    {
      title: "Latest Insights",
      links: blogs.map(b => ({
        label: b.title,
        href: `/blog/${b.slug}`
      }))
    },
    {
      title: "Legal & Support",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Contact Us", href: "/contact" },
        { label: "Careers", href: "/careers" },
      ]
    }
  ];

  return (
    <>
      <li>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-sm font-medium text-text-secondary hover:text-brand transition-colors text-left"
        >
          Site Map
        </button>
      </li>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-white border border-stroke rounded-[40px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] grain max-h-[90vh] flex flex-col"
            >
              <div className="p-8 sm:p-12 border-b border-stroke flex justify-between items-center bg-white/80 sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand/20 shrink-0">
                    <Map size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-text-primary">Site Index</h3>
                    <p className="text-[10px] font-bold uppercase text-brand tracking-[0.2em] mt-1.5">RankNexis Navigation Hub</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full border border-stroke flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all duration-300 hover:rotate-90"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
                  {SITEMAP.map((section, idx) => (
                    <div key={idx} className="space-y-8">
                      <div className="space-y-4">
                        <p className="text-[11px] font-black uppercase text-brand tracking-widest flex items-center gap-3">
                          <span className="w-6 h-[1px] bg-brand/30" />
                          {section.title}
                        </p>
                        <ul className="space-y-4">
                          {section.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              <Link 
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center justify-between text-base font-bold text-text-secondary hover:text-text-primary transition-all duration-300"
                              >
                                <span className="relative">
                                  {link.label}
                                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full" />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

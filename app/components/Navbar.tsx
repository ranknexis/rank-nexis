"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BarChart3,
  Box,
  ChevronDown,
  Code2,
  Cpu,
  Layers,
  Layout,
  Menu,
  Palette,
  Search,
  Share2,
  Target,
  TrendingUp,
  X,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const services = [
  {
    category: "Growth Solutions",
    icon: TrendingUp,
    status: "Active",
    items: [
      { name: "Surgical SEO Strategy", href: "/services#seo", icon: Search },
      { name: "Google Ads Performance", href: "/services#google-ads", icon: Target },
      { name: "Meta Ads Scaling", href: "/services#meta-ads", icon: BarChart3 },
      { name: "Social Media Marketing", href: "/services#smm", icon: Share2 },
    ]
  },
  {
    category: "Experience Design",
    icon: Palette,
    status: "Syncing",
    items: [
      { name: "UI/UX Design Systems", href: "/services#uiux", icon: Layout },
      { name: "Branding Design", href: "/services#branding", icon: Zap },
      { name: "Graphic Design Nodes", href: "/services#graphics", icon: Layers },
    ]
  },
  {
    category: "Digital Engineering",
    icon: Code2,
    status: "Stable",
    items: [
      { name: "Web Systems Development", href: "/services#web", icon: Code2 },
      { name: "Enterprise Architecture", href: "/services#architecture", icon: Cpu },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  return (
    <>
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20 transition-transform duration-500",
        !isVisible && "-translate-y-full"
      )}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="container-max h-full flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group relative z-[60]">
          <Logo />
        </Link>
        
        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-10">
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button 
              className={cn(
                "text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors",
                isMegaMenuOpen || pathname === "/services" ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Services <ChevronDown size={14} className={cn("transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
            </button>

            {/* MEGA MENU */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] bg-white border border-gray-100 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)] p-6 z-50"
                >
                  <div className="grid grid-cols-3 gap-6">
                    {services.map((section) => (
                      <div key={section.category} className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                          <div className="flex items-center gap-2 text-brand">
                            <section.icon size={18} className="shrink-0" />
                            <h3 className="text-[9px] font-black uppercase tracking-[0.2em]">{section.category}</h3>
                          </div>
                          <span className="text-[6px] font-black uppercase px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md border border-gray-100">
                            {section.status}
                          </span>
                        </div>
                        <ul className="space-y-0.5">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link 
                                href={item.href} 
                                className="group/item p-2 -mx-2 rounded-xl flex items-center gap-3 text-xs font-semibold text-gray-600 hover:text-brand hover:bg-brand/5 transition-all"
                              >
                                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-sm transition-all">
                                  <item.icon size={12} className="text-gray-500 group-hover/item:text-brand transition-colors" />
                                </div>
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* MINI FOOTER INSTEAD OF BIG ONE */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center">
                    <Link 
                      href="/services" 
                      className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-brand flex items-center gap-2 transition-colors group/explore"
                    >
                      View All Ecosystem Nodes <Box size={12} className="group-hover/explore:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/work" 
            className={cn(
              "text-sm font-bold uppercase tracking-widest transition-colors",
              pathname === "/work" ? "text-brand" : "text-text-primary hover:text-brand"
            )}
          >
            Work
          </Link>
          
          <div className="relative h-20 flex items-center group/company">
            <button 
              className={cn(
                "text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors",
                ["/about", "/blog", "/careers"].some(p => pathname.startsWith(p)) ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Company <ChevronDown size={14} className="group-hover/company:rotate-180 transition-transform duration-300" />
            </button>

            {/* COMPANY DROPDOWN */}
            <div className="absolute top-20 left-0 pt-0 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-300 translate-y-2 group-hover/company:translate-y-0 z-50">
              <div className="w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 space-y-1">
                <Link href="/about" className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-brand/5 hover:text-brand transition-all">
                  About
                </Link>
                <Link href="/blog" className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-brand/5 hover:text-brand transition-all">
                  Insights
                </Link>
                <Link href="/careers" className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-brand/5 hover:text-brand transition-all">
                  Careers
                </Link>
                <Link href="/contact" className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-brand/5 hover:text-brand transition-all">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <Link href="/contact" className="btn-primary h-12 px-8 text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand/20 active:scale-95">
            Book Call
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-[90] p-2 text-text-primary active:scale-90 transition-transform"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>

    {/* MOBILE MENU OVERLAY - Moved outside nav to break transform context */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-md lg:hidden"
          />
          
              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-[60%] z-[100] bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.1)] p-6 pt-24 overflow-y-auto lg:hidden flex flex-col"
              >
                {/* Dedicated Close Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 text-text-primary active:scale-90 transition-transform"
                >
                  <X size={24} />
                </button>

                <div className="flex-1 space-y-8">
                  {services.map((section) => (
                    <div key={section.category} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand/70">{section.category}</p>
                        <span className="text-[5px] font-black uppercase px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded-sm border border-gray-100 shrink-0">{section.status}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {section.items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-tight text-text-primary hover:text-brand transition-all active:translate-x-1"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-brand/5 transition-colors">
                              <item.icon size={12} className="text-gray-400 group-hover:text-brand transition-colors" />
                            </div>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-8 border-t border-gray-100 space-y-4 pb-8">
                     <div className="grid grid-cols-1 gap-2.5">
                        <Link 
                          href="/work" 
                          className="p-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Work
                        </Link>
                        <Link 
                          href="/about" 
                          className="p-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          About
                        </Link>
                        <Link 
                          href="/blog" 
                          className="p-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Insights
                        </Link>
                        <Link 
                          href="/careers" 
                          className="p-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Careers
                        </Link>
                        <Link 
                          href="/#contact" 
                          className="p-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Contact
                        </Link>
                     </div>
                     <Link 
                       href="/#contact" 
                       className="btn-primary w-full h-12 text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand/20 active:scale-[0.98] transition-all"
                     >
                        Book Call
                     </Link>
                  </div>
                </div>
              </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
}

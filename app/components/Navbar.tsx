"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronRight,
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
    category: "Digital Marketing",
    icon: TrendingUp,
    status: "Top Service",
    items: [
      { name: "Social Media Marketing", href: "/services#smm", icon: Share2 },
      { name: "Facebook Ads Management", href: "/services#fb-ads", icon: Target },
      { name: "Google Ads Performance", href: "/services#google-ads", icon: BarChart3 },
      { name: "SEO Excellence", href: "/services#seo", icon: Search },
    ]
  },
  {
    category: "Creative Design",
    icon: Palette,
    status: "Active",
    items: [
      { name: "Graphic Design", href: "/services#graphics", icon: Layout },
      { name: "Video & Motion", href: "/services#video", icon: Zap },
      { name: "UI/UX Design", href: "/services#uiux", icon: Layers },
    ]
  },
  {
    category: "Development",
    icon: Code2,
    status: "Active",
    items: [
      { name: "Web Development", href: "/services#web", icon: Code2 },
      { name: "Full-Stack Solutions", href: "/services#fullstack", icon: Cpu },
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
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full",
        scrollY.get() > 50 ? "glass border-b border-white/10" : "bg-transparent"
      )}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="container-max h-full flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group relative z-[60] hover:scale-105 transition-transform duration-300">
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
                "text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300",
                isMegaMenuOpen || pathname === "/services" ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Services <ChevronDown size={12} className={cn("transition-transform duration-500", isMegaMenuOpen && "rotate-180")} />
            </button>

            {/* MEGA MENU */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] bg-white/95 backdrop-blur-xl border border-black/5 rounded-[2.5rem] shadow-premium p-10 z-50 overflow-hidden grain"
                >
                  <div className="grid grid-cols-3 gap-10 relative z-10">
                    {services.map((section, idx) => (
                      <motion.div 
                        key={section.category} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-black/5">
                          <div className="flex items-center gap-3 text-brand">
                            <section.icon size={20} className="shrink-0" />
                            <h3 className="text-[11px] font-bold uppercase tracking-wider">{section.category}</h3>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-brand/5 text-brand rounded-lg border border-brand/10">
                            {section.status}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link 
                                href={item.href} 
                                className="group/item p-3 -mx-3 rounded-2xl flex items-center gap-4 text-xs font-bold text-gray-600 hover:text-brand hover:bg-brand/5 transition-all duration-300"
                              >
                                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-md transition-all duration-500 group-hover/item:scale-110">
                                  <item.icon size={14} className="text-gray-400 group-hover/item:text-brand transition-colors" />
                                </div>
                                <span className="tracking-tight">{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-black/5 flex items-center justify-center">
                    <Link 
                      href="/services" 
                      className="text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-brand flex items-center gap-3 transition-all group/explore"
                    >
                      View All Services <Box size={14} className="group-hover/explore:rotate-12 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/work" 
            className={cn(
              "text-[11px] font-bold uppercase tracking-wider transition-all duration-300 relative group",
              pathname === "/work" ? "text-brand" : "text-text-primary hover:text-brand"
            )}
          >
            Work
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full",
              pathname === "/work" && "w-full"
            )} />
          </Link>
          
          <div className="relative h-20 flex items-center group/company">
            <button 
              className={cn(
                "text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300",
                ["/about", "/blog", "/careers"].some(p => pathname.startsWith(p)) ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Company <ChevronDown size={14} className="group-hover/company:rotate-180 transition-transform duration-500" />
            </button>

            {/* COMPANY DROPDOWN - Upgraded Aesthetic */}
            <div className="absolute top-20 right-0 pt-0 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-500 translate-y-4 group-hover/company:translate-y-0 z-50">
              <div className="w-64 bg-white/95 backdrop-blur-xl border border-black/5 rounded-[2.5rem] shadow-premium p-6 space-y-2 grain relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-brand/5 rotate-12 pointer-events-none">
                  <Box size={80} strokeWidth={1} />
                </div>
                
                {[
                  { name: "About Us", href: "/about", desc: "Our vision & mission" },
                  { name: "Our Team", href: "/team", desc: "Meet the experts" },
                  { name: "Knowledge Hub", href: "/blog", desc: "Expertise & strategy" },
                  { name: "Careers", href: "/careers", desc: "Join our team" },
                  { name: "Contact", href: "/contact", desc: "Get in touch" }
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex flex-col gap-1 p-4 rounded-2xl hover:bg-brand/5 group/link transition-all duration-300 relative z-10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-800 group-hover/link:text-brand transition-colors">{item.name}</span>
                      <ChevronRight size={12} className="text-brand opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className="btn-primary h-12 px-10 text-[11px] font-bold uppercase tracking-wider bg-brand hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all">
            Book Call
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-[90] p-3 text-text-primary active:scale-90 transition-transform glass rounded-2xl"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand/70">{section.category}</p>
                        <span className="text-[5px] font-bold uppercase px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded-sm border border-gray-100 shrink-0">{section.status}</span>
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
                          className="p-3 rounded-xl bg-gray-50 text-[11px] font-bold uppercase tracking-wider hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Work
                        </Link>
                        <Link 
                          href="/about" 
                          className="p-3 rounded-xl bg-gray-50 text-[11px] font-bold uppercase tracking-wider hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          About
                        </Link>
                        <Link 
                          href="/blog" 
                          className="p-3 rounded-xl bg-gray-50 text-[11px] font-bold uppercase tracking-wider hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Insights
                        </Link>
                        <Link 
                          href="/careers" 
                          className="p-3 rounded-xl bg-gray-50 text-[11px] font-bold uppercase tracking-wider hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Careers
                        </Link>
                        <Link 
                          href="/#contact" 
                          className="p-3 rounded-xl bg-gray-50 text-[11px] font-bold uppercase tracking-wider hover:bg-brand/5 hover:text-brand transition-all text-center"
                        >
                          Contact
                        </Link>
                     </div>
                     <Link 
                       href="/#contact" 
                       className="btn-primary w-full h-12 text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-brand/20 active:scale-[0.98] transition-all"
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

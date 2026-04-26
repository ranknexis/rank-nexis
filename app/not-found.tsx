"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, LayoutGrid, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden grain">
      {/* Background Element - Huge 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[30vw] md:text-[40vw] font-black tracking-tighter text-black leading-none"
        >
          404
        </motion.span>
      </div>

      <div className="container-max relative z-10 text-center space-y-12">
        {/* Terminal Error Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand/5 border border-brand/10 rounded-full"
        >
          <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase text-brand">Node Connection Error // 404</span>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.85]"
          >
            Protocol <br /> <span className="text-brand">Interrupted.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            The digital destination you are attempting to access has been deindexed or moved beyond our current protocol.
          </motion.p>
        </div>

        {/* Search Bar Mockup / Recovery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto relative group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand" size={20} />
          <input 
            type="text" 
            placeholder="Try searching for a service..."
            className="w-full h-16 glass border border-stroke rounded-2xl pl-16 pr-8 text-[11px] font-bold uppercase focus:outline-none focus:border-brand transition-all shadow-sm"
          />
        </motion.div>

        {/* Primary Navigation Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <Link href="/" className="btn-primary h-16 px-10 text-[10px] font-bold uppercase group flex gap-4 w-full sm:w-auto">
            <Home size={18} /> Re-route Home <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
          <Link href="/services" className="btn-outline h-16 px-10 text-[10px] font-bold uppercase flex gap-4 w-full sm:w-auto">
            <LayoutGrid size={18} /> Systems Overview
          </Link>
        </motion.div>

        {/* Quick Links Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-12 pt-16 border-t border-stroke/50 max-w-2xl mx-auto"
        >
          <Link href="/work" className="text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Case Studies</Link>
          <Link href="/careers" className="text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Join Team</Link>
          <Link href="/about" className="text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Philosophy</Link>
          <Link href="/contact" className="text-[10px] font-bold uppercase text-text-muted hover:text-brand transition-colors">Direct Support</Link>
        </motion.div>
      </div>

      {/* Decorative Particle Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/5 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/5 to-transparent opacity-50" />
    </div>
  );
}


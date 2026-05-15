"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white grain">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="w-20 h-20 bg-brand rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-brand/20 animate-pulse">
            <Zap size={40} fill="currentColor" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -inset-4 border-2 border-brand/20 border-t-brand rounded-[2.5rem]"
        />
        
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}

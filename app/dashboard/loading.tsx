"use client";

import { motion } from "framer-motion";

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center border border-brand/20"
        >
          <div className="w-8 h-8 bg-brand rounded-lg shadow-lg shadow-brand/20" />
        </motion.div>
        <div className="absolute -inset-4 border border-stroke rounded-[2rem] animate-spin-slow opacity-20" />
      </div>
      
      <div className="space-y-2 text-center">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-primary">Loading Dashboard</h3>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-brand rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

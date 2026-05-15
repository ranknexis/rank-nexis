"use client";

import { motion } from "framer-motion";

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-10">
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 bg-text-primary rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand/20 animate-pulse" />
          <div className="w-8 h-8 bg-brand rounded-lg shadow-lg shadow-brand/40 z-10" />
        </motion.div>
        <div className="absolute -inset-8 border-2 border-brand/10 rounded-[3rem] animate-pulse" />
      </div>
      
      <div className="space-y-4 text-center">
        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-text-primary animate-pulse">Synchronizing <span className="text-brand">Nodes.</span></h3>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              animate={{ 
                scaleY: [1, 2, 1],
                backgroundColor: ["#000", "#FF4D00", "#000"]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 h-3 bg-text-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

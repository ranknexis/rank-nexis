"use client";
 
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
  }, [error]);
 
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden grain">
      <div className="container-max relative z-10 text-center space-y-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-red-100"
        >
          <AlertCircle size={48} strokeWidth={1.5} />
        </motion.div>
 
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight"
          >
            Unexpected <br /> <span className="text-red-500">Error.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-md mx-auto text-lg font-medium leading-relaxed"
          >
            An unexpected error occurred while loading this page. Please try reloading or go back to the dashboard.
          </motion.p>
        </div>
 
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => reset()}
            className="btn-primary h-16 px-10 text-[10px] font-bold uppercase flex gap-4 w-full sm:w-auto"
          >
            <RefreshCw size={18} /> Reload Page
          </button>
          <Link href="/dashboard" className="btn-outline h-16 px-10 text-[10px] font-bold uppercase flex gap-4 w-full sm:w-auto">
            <Home size={18} /> Return to Dashboard
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0" />
    </div>
  );
}

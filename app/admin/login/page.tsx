"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back, Administrator.");
        router.push("/admin");
      } else {
        toast.error(data.error || "Access Denied");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 relative overflow-hidden grain">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-[2.5rem] p-10 md:p-12 shadow-premium border border-stroke bg-white/40 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col items-center text-center mb-10 space-y-4">
            <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20 mb-2">
              <Zap size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tighter">Admin Portal</h1>
              <p className="text-[10px] font-bold uppercase text-brand">Secure Access Control</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-4">Corporate Email</label>
              <div className="relative">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ranknexis.com" 
                  className="input-field pl-12 h-14"
                />
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/40" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-4">Security Key</label>
              <div className="relative">
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="input-field pl-12 h-14"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/40" size={18} />
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="btn-primary w-full h-16 text-[11px] font-bold uppercase group bg-brand shadow-lg shadow-brand/20"
            >
              {isLoading ? "Validating..." : "Initialize Access"}
              {!isLoading && <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-stroke text-center">
             <p className="text-[9px] font-bold uppercase text-text-muted">
               RankNexis Administrative Protocol v2.4
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


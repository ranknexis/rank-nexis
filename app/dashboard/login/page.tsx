"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PasswordInput from "../components/PasswordInput";
import Link from "next/link";

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
        toast.success("Authentication successful. Welcome to the Node.");
        if (data.passwordSet === false) {
          router.push("/dashboard/setup-password");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(data.error || "Invalid Credentials");
      }
    } catch (error) {
      toast.error("Process error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white/80 border border-stroke rounded-[2.5rem] p-10 md:p-14 shadow-premium backdrop-blur-xl relative overflow-hidden grain">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          
          <div className="flex flex-col items-center text-center mb-10 space-y-4">
            <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20 mb-2 transform hover:rotate-12 transition-all duration-300">
              <Zap size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-text-primary">Console Access</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-1 flex items-center gap-2 justify-center">
                <Sparkles size={12} className="animate-pulse" /> Protected Administrative Hub
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-muted ml-2">Secure Email</label>
              <div className="relative">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ranknexis.com" 
                  className="w-full h-14 pl-12 pr-6 bg-white border border-stroke rounded-xl text-sm font-medium focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm text-text-primary placeholder:text-text-muted/40"
                />
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/50" size={18} />
              </div>
            </div>

            <PasswordInput 
              required
              label="Security Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex justify-end px-2">
              <Link 
                href="/dashboard/forgot-password" 
                className="text-[10px] font-bold uppercase text-brand hover:underline tracking-widest"
              >
                Reset Access Node?
              </Link>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="btn-primary w-full h-14 text-xs font-bold uppercase group bg-brand shadow-lg hover:shadow-brand/20 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Initialize Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stroke text-center">
             <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider antialiased">
               Authorized Personnel Only • RankNexis Ops Node
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

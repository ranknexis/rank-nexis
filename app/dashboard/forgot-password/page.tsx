"use client";

import { useState } from "react";
import { forgotPassword } from "@/actions/auth";
import { toast } from "sonner";
import { ShieldAlert, ArrowRight, Mail, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await forgotPassword(email);
        if (res.success) {
            setSubmitted(true);
            toast.success("Recovery protocol initiated. Check your inbox.");
        } else {
            toast.error(res.error || "Failed to initiate recovery");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/4 -z-10" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 border border-stroke rounded-[2.5rem] p-10 shadow-premium backdrop-blur-xl relative overflow-hidden grain">
                    <Link href="/dashboard/login" className="absolute top-8 left-8 text-text-muted hover:text-brand transition-colors">
                        <ChevronLeft size={24} />
                    </Link>

                    <div className="flex flex-col items-center text-center mb-10 space-y-4 pt-4">
                        <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center text-brand shadow-sm mb-2">
                            <ShieldAlert size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-text-primary">Recover Access</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                                System Recovery Protocol
                            </p>
                        </div>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-2">Identity Email</label>
                                <div className="relative">
                                    <input 
                                        required
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="expert@ranknexis.com" 
                                        className="w-full h-14 pl-12 pr-6 bg-white border border-stroke rounded-xl text-sm font-medium focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/50" size={18} />
                                </div>
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
                                        Send Recovery Link <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs font-medium leading-relaxed">
                                A secure recovery link has been dispatched to <span className="font-bold underline">{email}</span>. Please check your inbox and spam folder.
                            </div>
                            <Link 
                                href="/dashboard/login"
                                className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand hover:underline"
                            >
                                Return to Login Console
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

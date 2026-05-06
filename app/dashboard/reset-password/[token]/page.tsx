"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "@/actions/auth";
import { toast } from "sonner";
import { KeyRound, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
import PasswordInput from "../../components/PasswordInput";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        const res = await resetPassword(token as string, password);
        if (res.success) {
            toast.success("Identity node restored. Please login with your new credentials.");
            router.push("/dashboard/login");
        } else {
            toast.error(res.error || "Reset failed. Token may be expired.");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Dynamic Background Accents */}
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[140px] -translate-x-1/4 translate-y-1/4 -z-10" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 border border-stroke rounded-[2.5rem] p-10 shadow-premium backdrop-blur-xl relative overflow-hidden grain">
                    <div className="flex flex-col items-center text-center mb-10 space-y-4">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl mb-2">
                            <KeyRound size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-text-primary">Reset Access</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                                Secure Identity Initialization
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <PasswordInput 
                            required
                            label="New Security Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        <PasswordInput 
                            required
                            label="Confirm New Code"
                            icon={<ShieldCheck size={18} />}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="••••••••"
                        />

                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="btn-primary w-full h-14 text-xs font-bold uppercase group bg-black text-white shadow-lg rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Update Identity Node <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

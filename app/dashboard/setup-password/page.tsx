"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setupPassword } from "@/actions/setup";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";

export default function SetupPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
        const res = await setupPassword(password);
        if (res.success) {
            toast.success("Security configuration complete. Access granted.");
            router.push("/dashboard");
        } else {
            toast.error(res.error || "Update failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="bg-white border border-stroke rounded-[2rem] p-10 shadow-premium relative overflow-hidden grain">
                    <div className="flex flex-col items-center text-center mb-10 space-y-4">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-2">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-text-primary">Account Security</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-1">
                                Initialize your permanent access credentials
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <PasswordInput 
                            required
                            label="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        <PasswordInput 
                            required
                            label="Confirm Code"
                            icon={<KeyRound size={18} />}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="••••••••"
                        />

                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="btn-primary w-full h-14 text-xs font-bold uppercase group bg-black text-white shadow-lg hover:shadow-black/10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Finalize Setup <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

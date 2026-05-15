"use client";

import { useState } from "react";
import { changePassword } from "@/actions/auth";
import { toast } from "sonner";
import { ShieldCheck, Save, KeyRound } from "lucide-react";
import PasswordInput from "../../components/PasswordInput";

export default function SecurityForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        const res = await changePassword({ old: oldPassword, new: newPassword });
        if (res.success) {
            toast.success("Password updated successfully.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            toast.error(res.error || "Update failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="bg-white border border-stroke rounded-[3rem] p-12 shadow-premium space-y-12 relative overflow-hidden grain">

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-text-primary uppercase">Security <span className="text-brand">Protocol.</span></h2>
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest mt-1">Manage credential nodes and access keys</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl">
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-text-muted px-2">Current Key</label>
                    <PasswordInput 
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">New Key</label>
                        <PasswordInput 
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-text-muted px-2">Verify New Key</label>
                        <PasswordInput 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button 
                        disabled={isLoading}
                        className="px-12 h-16 bg-brand text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                        {isLoading ? "Synchronizing..." : (
                            <>
                                <Save size={20} />
                                Update Credentials
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}


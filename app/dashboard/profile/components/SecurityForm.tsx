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
            <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">

            <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-brand" />
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-text-primary">Account Security</h2>
                    <p className="text-sm text-text-muted mt-1">Manage your login information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <PasswordInput 
                    required
                    label="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PasswordInput 
                        required
                        label="New Password"
                        icon={<KeyRound size={18} />}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                    <PasswordInput 
                        required
                        label="Confirm New Password"
                        icon={<ShieldCheck size={18} />}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button 
                        disabled={isLoading}
                        className="btn-primary flex items-center gap-3 px-8 h-12 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : (
                            <>
                                <Save size={16} />
                                Change Password
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}


"use client";

import { changePassword } from "@/actions/auth";
import { Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
            <div className="bg-white border border-stroke rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">Change Password</h2>
                        <p className="text-[9px] font-bold uppercase text-text-muted mt-0.5 tracking-wider">Update your account password to ensure your credentials remain secure.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Current Password</label>
                        <PasswordInput 
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter current password"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">New Password</label>
                            <PasswordInput 
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Confirm New Password</label>
                            <PasswordInput 
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button 
                            disabled={isLoading}
                            className="px-6 h-10 bg-black hover:bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
                        >
                            {isLoading ? "Saving..." : (
                                <>
                                    <Save size={14} />
                                    Update Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

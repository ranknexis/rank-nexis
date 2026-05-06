"use client";

import { useState } from "react";
import { UserPlus, Trash2, Mail, Shield, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { createUser, deleteUser } from "@/actions/users";
import { toast } from "sonner";

export default function UsersList({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("TEAM_MEMBER");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await createUser({ name: newName, email: newEmail, role: newRole });
        if (res.success) {
            toast.success("User invited successfully.");
            setUsers([res.user, ...users]);
            setIsAdding(false);
            setNewName("");
            setNewEmail("");
        } else {
            toast.error(res.error || "Failed to create user");
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will remove all access for this user.")) return;
        const res = await deleteUser(id);
        if (res.success) {
            toast.success("User removed.");
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg"
                >
                    <UserPlus size={16} />
                    {isAdding ? "Cancel" : "Add Expert Node"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white border-2 border-brand/20 p-8 rounded-[2rem] shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Full Name</label>
                            <input 
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full h-12 px-4 bg-surface border border-stroke rounded-xl text-sm font-medium focus:border-brand outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Email Address</label>
                            <input 
                                required
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full h-12 px-4 bg-surface border border-stroke rounded-xl text-sm font-medium focus:border-brand outline-none"
                                placeholder="john@ranknexis.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Access Level</label>
                            <select 
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full h-12 px-4 bg-surface border border-stroke rounded-xl text-sm font-medium focus:border-brand outline-none appearance-none"
                            >
                                <option value="TEAM_MEMBER">Team Member</option>
                                <option value="ADMIN">Administrator</option>
                            </select>
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button 
                                disabled={isLoading}
                                className="px-8 py-3 bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                            >
                                {isLoading ? "Initializing..." : "Create Account & Send Invite"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-stroke rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/50">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">User Node</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Access Level</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-surface/30 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-black text-xs uppercase">
                                            {user.name?.substring(0, 2) || "??"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary uppercase tracking-tight">{user.name}</p>
                                            <p className="text-[10px] font-medium text-text-muted lowercase">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        {user.role === "ADMIN" ? (
                                            <ShieldAlert size={14} className="text-brand" />
                                        ) : (
                                            <Shield size={14} className="text-text-muted" />
                                        )}
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${user.role === "ADMIN" ? "text-brand" : "text-text-muted"}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    {user.passwordSet ? (
                                        <div className="flex items-center gap-1.5 text-emerald-500">
                                            <CheckCircle2 size={14} />
                                            <span className="text-[10px] font-bold uppercase">Active</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-amber-500">
                                            <Mail size={14} />
                                            <span className="text-[10px] font-bold uppercase">Invited</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button 
                                        onClick={() => handleDelete(user.id)}
                                        className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client";

import { useState, useTransition } from "react";

import { 
    UserPlus, 
    Trash2, 
    Mail, 
    Shield, 
    ShieldAlert, 
    CheckCircle2, 
    XCircle,
    Fingerprint,
    Save,
    Settings2,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { createUser, deleteUser, updateUserPermissions } from "@/actions/users";
import { toast } from "sonner";
import ConfirmationModal from "../../components/ConfirmationModal";

const AVAILABLE_PERMISSIONS = [

    { id: "manage_pages", label: "Pages", desc: "Manage site pages and sections" },
    { id: "manage_services", label: "Services", desc: "Manage core business services" },
    { id: "manage_careers", label: "Careers", desc: "Handle job postings and applications" },
    { id: "manage_team", label: "Team", desc: "Manage team member profiles" },
    { id: "manage_blog", label: "Blog", desc: "Manage blog posts and articles" },
    { id: "manage_work", label: "Work", desc: "Manage portfolio and case studies" },
    { id: "manage_leads", label: "Leads", desc: "Access client lead data" },
    { id: "manage_feedback", label: "Feedback", desc: "Manage client testimonials" },
    { id: "manage_users", label: "Users", desc: "Manage system users and permissions" },
    { id: "manage_settings", label: "Settings", desc: "Manage global site settings" },

];

export default function UsersList({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("TEAM_MEMBER");
    const [isLoading, setIsLoading] = useState(false);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [isUpdating, startTransition] = useTransition();
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

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

    const handleDelete = async () => {
        if (!deleteConfirm.id) return;
        const res = await deleteUser(deleteConfirm.id);
        if (res.success) {
            toast.success("User removed from system.");
            setUsers(users.filter(u => u.id !== deleteConfirm.id));
            setDeleteConfirm({ isOpen: false, id: null });
        } else {
            toast.error(res.error || "Failed to remove user");
        }
    };

    const togglePermission = (userId: string, permId: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const currentPerms = Array.isArray(user.permissions) ? user.permissions : JSON.parse(user.permissions || "[]");
        const newPerms = currentPerms.includes(permId) 
            ? currentPerms.filter((p: string) => p !== permId)
            : [...currentPerms, permId];

        setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPerms } : u));
    };

    const savePermissions = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        startTransition(async () => {
            const perms = Array.isArray(user.permissions) ? user.permissions : JSON.parse(user.permissions || "[]");
            const res = await updateUserPermissions(userId, perms);
            if (res.success) {
                toast.success("Permissions updated successfully.");
                setExpandedUser(null);
            } else {
                toast.error(res.error || "Failed to update permissions");
            }
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-text-primary">Users</h2>
                    <p className="text-sm text-text-muted">Manage system users and their access levels.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg self-start md:self-auto"
                >
                    <UserPlus size={16} />
                    {isAdding ? "Cancel" : "Add New User"}
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
                                {isLoading ? "Saving..." : "Create Account & Send Invite"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-stroke rounded-[2rem] overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="border-b border-stroke bg-surface/50">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">User</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Access Level</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke">
                        {users.map((user) => {
                            const isExpanded = expandedUser === user.id;
                            const userPerms = Array.isArray(user.permissions) ? user.permissions : JSON.parse(user.permissions || "[]");
                            
                            return (
                                <React.Fragment key={user.id}>
                                    <tr className={`transition-colors group ${isExpanded ? 'bg-surface/50' : 'hover:bg-surface/30'}`}>
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
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                                                    className={`p-2 rounded-lg transition-all ${isExpanded ? 'bg-brand text-white' : 'text-text-muted hover:text-brand hover:bg-brand/5'}`}
                                                    title="Manage Permissions"
                                                >
                                                    <Fingerprint size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => setDeleteConfirm({ isOpen: true, id: user.id })}
                                                    className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-10 bg-surface/30">
                                                <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2.5 bg-brand/5 rounded-xl border border-brand/10 text-brand">
                                                                <Settings2 size={18} />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold tracking-tight text-text-primary">User Permissions</h4>
                                                                <p className="text-xs text-text-muted">Define access levels for this user.</p>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => savePermissions(user.id)}
                                                            disabled={isUpdating}
                                                            className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand/20 disabled:opacity-50"
                                                        >
                                                            <Save size={14} />
                                                            {isUpdating ? "Saving..." : "Save Permissions"}
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {AVAILABLE_PERMISSIONS.map((perm) => {
                                                            const isChecked = userPerms.includes(perm.id);
                                                            const isDisabled = user.role === "ADMIN";
                                                            return (
                                                                <label 
                                                                    key={perm.id} 
                                                                    className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer group ${
                                                                        isChecked 
                                                                        ? "bg-white border-brand shadow-md" 
                                                                        : "bg-white/50 border-stroke hover:border-brand/30"
                                                                    } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                                >
                                                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                                                        isChecked ? "bg-brand border-brand text-white" : "border-stroke bg-white group-hover:border-brand/50"
                                                                    }`}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            className="hidden" 
                                                                            checked={isChecked}
                                                                            disabled={isDisabled}
                                                                            onChange={() => togglePermission(user.id, perm.id)}
                                                                        />
                                                                        {isChecked && <CheckCircle2 size={12} strokeWidth={3} />}
                                                                    </div>
                                                                    <div>
                                                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isChecked ? 'text-brand' : 'text-text-primary'}`}>
                                                                            {perm.label}
                                                                        </p>
                                                                        <p className="text-[9px] font-medium text-text-muted mt-1 leading-relaxed">
                                                                            {perm.desc}
                                                                        </p>
                                                                    </div>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    {user.role === "ADMIN" && (
                                                        <div className="p-4 bg-brand/5 rounded-xl border border-brand/10 flex items-center gap-3">
                                                            <ShieldAlert size={14} className="text-brand" />
                                                            <p className="text-xs text-brand">Admins have full access to all modules by default.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal 
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Delete User"
            />
        </div>
    );
}

import React from "react";

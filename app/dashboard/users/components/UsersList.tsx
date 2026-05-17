"use client";

import { createUser, deleteUser, updateUser, updateUserPermissions } from "@/actions/users";
import {
    Check,
    CheckCircle2,
    Fingerprint,
    Mail,
    Save,
    Settings2,
    Shield,
    ShieldAlert,
    Trash2,
    UserPlus
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ConfirmationModal from "../../components/ConfirmationModal";

const AVAILABLE_PERMISSIONS = [
    { id: "view_overview", label: "Overview", desc: "Access the overview stats and activity charts" },
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

const DEFAULT_TEAM_MEMBER_PERMISSIONS: string[] = [];

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

    const handleUpdateUser = async (userId: string, name: string, email: string, role: string) => {
        setIsLoading(true);
        const res = await updateUser(userId, { name, email, role });
        if (res.success) {
            toast.success("User profile updated successfully.");
            setExpandedUser(null);
        } else {
            toast.error(res.error || "Failed to update user profile");
        }
        setIsLoading(false);
    };

    const togglePermission = (userId: string, permId: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const rawPerms = Array.isArray(user.permissions) 
            ? user.permissions 
            : typeof user.permissions === 'string' 
                ? JSON.parse(user.permissions || "[]") 
                : (user.permissions as any) || [];

        const currentPerms = (user.role === "TEAM_MEMBER" && rawPerms.length === 0) 
            ? DEFAULT_TEAM_MEMBER_PERMISSIONS 
            : rawPerms;

        const newPerms = currentPerms.includes(permId) 
            ? currentPerms.filter((p: string) => p !== permId)
            : [...currentPerms, permId];

        setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPerms } : u));
    };

    const savePermissions = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        startTransition(async () => {
            const rawPerms = Array.isArray(user.permissions) 
                ? user.permissions 
                : typeof user.permissions === 'string' 
                    ? JSON.parse(user.permissions || "[]") 
                    : (user.permissions as any) || [];
            
            const perms = (user.role === "TEAM_MEMBER" && rawPerms.length === 0)
                ? DEFAULT_TEAM_MEMBER_PERMISSIONS
                : rawPerms;

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
        <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stroke pb-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight text-text-primary">Users & Roles</h1>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Invite administrators and team members, and manage their workspace permissions.</p>
                </div>
                <button 
                    type="button"
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-5 h-10 bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-brand-dark active:scale-95 transition-all shadow-sm"
                >
                    <UserPlus size={14} />
                    {isAdding ? "Cancel" : "Invite User"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white border border-stroke p-5 rounded-xl shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Full Name</label>
                            <input 
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Email Address</label>
                            <input 
                                required
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none"
                                placeholder="john@ranknexis.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Access Level</label>
                            <select 
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full h-11 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none cursor-pointer"
                            >
                                <option value="TEAM_MEMBER">Team Member</option>
                                <option value="ADMIN">Administrator</option>
                            </select>
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button 
                                disabled={isLoading}
                                className="px-6 h-10 bg-black hover:bg-brand text-white rounded-xl text-[10px] font-bold uppercase tracking-wider disabled:opacity-50 transition-all"
                            >
                                {isLoading ? "Saving..." : "Send Invitation"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-stroke rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-fixed">
                        <thead>
                            <tr className="border-b border-stroke bg-surface/50">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-text-muted">User</th>
                                <th className="w-48 px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-text-muted">Access Level</th>
                                <th className="w-44 px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-text-muted">Status</th>
                                <th className="w-36 px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-text-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                            {users.map((user) => {
                                 const isExpanded = expandedUser === user.id;
                                 const rawPerms = Array.isArray(user.permissions) 
                                    ? user.permissions 
                                    : typeof user.permissions === 'string' 
                                        ? JSON.parse(user.permissions || "[]") 
                                        : (user.permissions as any) || [];
                                
                                 const userPerms = (user.role === "TEAM_MEMBER" && rawPerms.length === 0) 
                                    ? DEFAULT_TEAM_MEMBER_PERMISSIONS 
                                    : rawPerms;
                                
                                return (
                                    <React.Fragment key={user.id}>
                                        <tr className={`group transition-colors ${isExpanded ? 'bg-surface/50' : 'hover:bg-surface/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className="w-9 h-9 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-black text-xs uppercase shrink-0">
                                                        {user.name?.substring(0, 2) || "??"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-text-primary uppercase tracking-tight truncate">{user.name}</p>
                                                        <p className="text-[10px] font-medium text-text-muted lowercase truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.role === "ADMIN" ? (
                                                        <ShieldAlert size={14} className="text-brand shrink-0" />
                                                    ) : (
                                                        <Shield size={14} className="text-text-muted shrink-0" />
                                                    )}
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${user.role === "ADMIN" ? "text-brand" : "text-text-muted"}`}>
                                                        {user.role === "ADMIN" ? "Administrator" : "Team Member"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.passwordSet ? (
                                                    <div className="flex items-center gap-1.5 text-emerald-500">
                                                        <CheckCircle2 size={14} className="shrink-0" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-amber-500">
                                                        <Mail size={14} className="shrink-0" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">Invited</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                                                        className={`p-2 rounded-xl border transition-all flex items-center justify-center shrink-0 ${isExpanded ? 'bg-brand text-white border-brand shadow-sm' : 'bg-white border-stroke text-text-muted hover:text-brand hover:border-brand/30 hover:bg-brand/5 shadow-sm'}`}
                                                        title="Manage Permissions"
                                                    >
                                                        <Fingerprint size={16} />
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setDeleteConfirm({ isOpen: true, id: user.id })}
                                                        className="p-2 bg-white border border-stroke text-text-muted hover:text-red-500 hover:border-red-200 rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-6 bg-surface/30">
                                                    <div className="max-w-6xl w-full space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                                                        
                                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                                            
                                                            {/* User Profile Details section */}
                                                            <div className="lg:col-span-4 bg-white border border-stroke rounded-2xl p-5 space-y-4 shadow-sm">
                                                                <div className="flex items-center gap-2.5 pb-2 border-b border-stroke">
                                                                    <Settings2 size={16} className="text-brand shrink-0" />
                                                                    <div>
                                                                        <h4 className="text-xs font-bold tracking-tight text-text-primary uppercase">Profile Details</h4>
                                                                        <p className="text-[9px] text-text-muted">Edit system operator credentials.</p>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3.5">
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Full Name</label>
                                                                        <input 
                                                                            type="text"
                                                                            value={user.name}
                                                                            onChange={(e) => {
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, name: e.target.value } : u));
                                                                            }}
                                                                            className="w-full h-10 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none"
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Email Address</label>
                                                                        <input 
                                                                            type="email"
                                                                            value={user.email}
                                                                            onChange={(e) => {
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, email: e.target.value } : u));
                                                                            }}
                                                                            className="w-full h-10 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none"
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[9px] font-black uppercase text-text-muted ml-1 tracking-wider">Access Level</label>
                                                                        <select 
                                                                            value={user.role}
                                                                            onChange={(e) => {
                                                                                const newRole = e.target.value;
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
                                                                            }}
                                                                            className="w-full h-10 px-4 bg-surface border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none cursor-pointer"
                                                                        >
                                                                            <option value="TEAM_MEMBER">Team Member</option>
                                                                            <option value="ADMIN">Administrator</option>
                                                                        </select>
                                                                    </div>

                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => handleUpdateUser(user.id, user.name, user.email, user.role)}
                                                                        disabled={isLoading}
                                                                        className="w-full h-10 bg-black text-white hover:bg-brand text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                                                    >
                                                                        <Save size={14} />
                                                                        {isLoading ? "Saving..." : "Save Profile"}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* User Permissions section */}
                                                            <div className="lg:col-span-8 bg-white border border-stroke rounded-2xl p-5 space-y-4 shadow-sm">
                                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                                    <div className="flex items-center gap-2.5">
                                                                        <Fingerprint size={16} className="text-brand shrink-0" />
                                                                        <div>
                                                                            <h4 className="text-xs font-bold tracking-tight text-text-primary uppercase">User Permissions</h4>
                                                                            <p className="text-[9px] text-text-muted">Define modular access roles for this team member.</p>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, permissions: DEFAULT_TEAM_MEMBER_PERMISSIONS } : u));
                                                                            }}
                                                                            disabled={user.role === "ADMIN"}
                                                                            className="px-3 py-1.5 bg-brand/5 border border-brand/15 hover:bg-brand hover:text-white rounded-lg text-[9px] font-black uppercase tracking-wider text-brand transition-all disabled:opacity-50 cursor-pointer"
                                                                        >
                                                                            Standard Access
                                                                        </button>
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, permissions: AVAILABLE_PERMISSIONS.map(p => p.id) } : u));
                                                                            }}
                                                                            disabled={user.role === "ADMIN"}
                                                                            className="px-3 py-1.5 bg-white border border-stroke hover:bg-zinc-800 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-wider text-text-muted transition-all disabled:opacity-50 cursor-pointer"
                                                                        >
                                                                            Select All
                                                                        </button>
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setUsers(users.map(u => u.id === user.id ? { ...u, permissions: [] } : u));
                                                                            }}
                                                                            disabled={user.role === "ADMIN"}
                                                                            className="px-3 py-1.5 bg-white border border-stroke hover:bg-red-50 hover:text-red-500 rounded-lg text-[9px] font-black uppercase tracking-wider text-text-muted transition-all disabled:opacity-50 cursor-pointer"
                                                                        >
                                                                            Clear All
                                                                        </button>
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => savePermissions(user.id)}
                                                                            disabled={isUpdating}
                                                                            className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-sm hover:bg-brand-dark transition-all disabled:opacity-50 cursor-pointer"
                                                                        >
                                                                            <Save size={12} />
                                                                            {isUpdating ? "Saving..." : "Save"}
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                    {AVAILABLE_PERMISSIONS.map((perm) => {
                                                                        const isChecked = user.role === "ADMIN" || userPerms.includes(perm.id);
                                                                        const isDisabled = user.role === "ADMIN";
                                                                        return (
                                                                            <label 
                                                                                key={perm.id} 
                                                                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                                                                                    isChecked 
                                                                                    ? "bg-white border-brand shadow-sm scale-[1.01]" 
                                                                                    : "bg-white/50 border-stroke hover:border-brand/30"
                                                                                } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                                            >
                                                                                <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                                                                                    isChecked ? "bg-brand border-brand text-white" : "border-stroke bg-white group-hover:border-brand/50"
                                                                                }`}>
                                                                                    <input 
                                                                                        type="checkbox" 
                                                                                        className="hidden" 
                                                                                        checked={isChecked}
                                                                                        disabled={isDisabled}
                                                                                        onChange={() => togglePermission(user.id, perm.id)}
                                                                                    />
                                                                                    {isChecked && <Check size={10} strokeWidth={3} />}
                                                                                </div>
                                                                                <div>
                                                                                    <p className={`text-[10px] font-black uppercase tracking-wider ${isChecked ? 'text-brand' : 'text-text-primary'}`}>
                                                                                        {perm.label}
                                                                                    </p>
                                                                                    <p className="text-[9px] font-semibold text-text-muted mt-0.5 leading-normal">
                                                                                        {perm.desc}
                                                                                    </p>
                                                                                </div>
                                                                            </label>
                                                                        );
                                                                    })}
                                                                </div>
                                                                
                                                                {user.role === "ADMIN" && (
                                                                    <div className="p-3.5 bg-brand/5 rounded-xl border border-brand/10 flex items-center gap-2.5">
                                                                        <ShieldAlert size={14} className="text-brand shrink-0" />
                                                                        <p className="text-[10px] font-bold text-brand uppercase tracking-wider">Admins have absolute system-wide permissions by default.</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>
                                                        
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
            </div>

            <ConfirmationModal 
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Remove System Operator"
                message="Are you sure you want to permanently delete this user account? This will terminate their workspace access instantly."
                confirmText="Delete"
            />
        </div>
    );
}

import React from "react";

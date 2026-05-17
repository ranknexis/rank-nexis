"use client";

import { deleteTeamMember } from '@/actions/team';
import {
  Edit3,
  Plus,
  Search,
  Trash2,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ConfirmationModal from "../../components/ConfirmationModal";

interface TeamListProps {
  initialTeam: any[];
}

export default function TeamList({ initialTeam }: TeamListProps) {
  const [team, setTeam] = useState(initialTeam);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTeam(initialTeam);
  }, [initialTeam]);

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null
  });

  const handleDelete = async () => {
    if (!deleteConfirm.id) return;
    const res = await deleteTeamMember(deleteConfirm.id);
    if (res.success) {
      setTeam(team.filter(m => m.id !== deleteConfirm.id));
      toast.success("Team member deleted");
      setDeleteConfirm({ isOpen: false, id: null });
    } else {
      toast.error(res.error || "Failed to delete team member");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stroke pb-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">Team <span className="text-brand">Directory.</span></h1>
          <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Manage your organization's team member directory and profiles.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input 
              type="text"
              placeholder="Search team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white border border-stroke rounded-xl text-xs font-semibold focus:border-brand outline-none shadow-sm transition-all"
            />
          </div>
          <Link 
            href="/dashboard/team/new" 
            className="h-11 px-5 bg-brand text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand/20 w-full sm:w-auto shrink-0"
          >
            <Plus size={14} /> Add Team Member
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map((member) => (
          <div key={member.id} className="group bg-white border border-stroke rounded-2xl p-5 shadow-sm hover:shadow-premium hover:border-brand/30 transition-all flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand/[0.02] rounded-full blur-3xl -z-10 group-hover:bg-brand/[0.05] transition-all" />
             
             <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 border border-stroke shadow-inner">
                {member.image ? (
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                   <div className="w-full h-full bg-surface flex items-center justify-center text-text-muted">
                      <UserIcon size={24} />
                   </div>
                )}
             </div>

             <div className="space-y-0.5 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{member.name}</h3>
                <p className="text-[9px] font-black uppercase text-brand tracking-widest">{member.role}</p>
             </div>

             <div className="flex items-center gap-2 w-full pt-4 border-t border-stroke mt-auto">
                <Link 
                  href={`/dashboard/team/${member.id}`}
                  className="flex-grow h-10 bg-surface border border-stroke rounded-xl text-[9px] font-black uppercase flex items-center justify-center gap-2 hover:bg-brand hover:text-white hover:border-brand transition-all text-text-muted hover:text-white"
                >
                   <Edit3 size={12} /> Edit Profile
                </Link>
                <button 
                  type="button"
                  onClick={() => setDeleteConfirm({ isOpen: true, id: member.id })}
                  className="w-10 h-10 bg-surface border border-stroke rounded-xl text-text-muted hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shrink-0"
                >
                   <Trash2 size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {filteredTeam.length === 0 && (
        <div className="py-20 border-2 border-dashed border-stroke rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface/30">
           <div className="w-16 h-16 rounded-2xl bg-white border border-stroke flex items-center justify-center text-text-muted shadow-sm">
              <UserIcon size={24} strokeWidth={1.5} />
           </div>
           <p className="text-[10px] font-black uppercase text-text-muted tracking-wider">No team members found.</p>
        </div>
      )}
      <ConfirmationModal 
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Team Member Profile?"
        message="Are you sure you want to permanently remove this profile from the directory? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

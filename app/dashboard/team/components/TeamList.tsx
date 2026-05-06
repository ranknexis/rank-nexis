"use client";

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  User as UserIcon,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteTeamMember } from '@/actions/team';

interface TeamListProps {
  initialTeam: any[];
}

export default function TeamList({ initialTeam }: TeamListProps) {
  const [team, setTeam] = useState(initialTeam);
  const [search, setSearch] = useState("");

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Decommission this expert node?")) return;
    const res = await deleteTeamMember(id);
    if (res.success) {
      setTeam(team.filter(m => m.id !== id));
      toast.success("Expert node terminated");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search Expert Nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 pl-14 pr-8 bg-white border border-stroke rounded-2xl text-sm font-medium focus:border-brand outline-none shadow-sm transition-all"
          />
        </div>
        <Link 
          href="/dashboard/team/new" 
          className="w-full md:w-auto px-10 h-16 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} /> Forge New Expert
        </Link>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeam.map((member) => (
          <div key={member.id} className="group bg-white border border-stroke rounded-[2.5rem] p-8 shadow-sm hover:shadow-premium hover:border-brand/30 transition-all flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand/[0.02] rounded-full blur-3xl -z-10 group-hover:bg-brand/[0.05] transition-all" />
             
             <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-stroke shadow-inner">
                {member.image ? (
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                   <div className="w-full h-full bg-surface flex items-center justify-center text-text-muted">
                      <UserIcon size={32} />
                   </div>
                )}
             </div>

             <div className="space-y-1 mb-8">
                <h3 className="text-lg font-black uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{member.name}</h3>
                <p className="text-[10px] font-bold uppercase text-brand tracking-widest">{member.role}</p>
             </div>

             <div className="flex items-center gap-3 w-full pt-6 border-t border-stroke mt-auto">
                <Link 
                  href={`/dashboard/team/${member.id}`}
                  className="flex-grow h-12 bg-surface border border-stroke rounded-xl text-[9px] font-black uppercase flex items-center justify-center gap-2 hover:bg-brand hover:text-white hover:border-brand transition-all"
                >
                   <Edit3 size={14} /> Refine Profile
                </Link>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="w-12 h-12 bg-surface border border-stroke rounded-xl text-text-muted hover:text-red-400 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center"
                >
                   <Trash2 size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {filteredTeam.length === 0 && (
        <div className="py-32 border-2 border-dashed border-stroke rounded-[4rem] flex flex-col items-center justify-center gap-6 bg-surface/30">
           <div className="w-20 h-20 rounded-full bg-white border border-stroke flex items-center justify-center text-text-muted">
              <UserIcon size={32} strokeWidth={1} />
           </div>
           <p className="text-[11px] font-black uppercase text-text-muted tracking-[0.2em]">No expert nodes discovered.</p>
        </div>
      )}
    </div>
  );
}

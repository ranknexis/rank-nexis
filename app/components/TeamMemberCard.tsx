import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, linkedin, twitter }) => {
  return (
    <div className="group relative overflow-hidden bg-white border border-stroke hover:border-brand/30 rounded-[2rem] p-6 shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col justify-between h-full hover:-translate-y-1">
      <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden relative border border-stroke/40 mb-6 bg-surface">
        <img 
          src={image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Subtle Social buttons overlay visible on hover */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
          <a href={linkedin || "#"} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-500 shadow-lg">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:hello@ranknexis.com`} className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-500 shadow-lg">
            <Mail size={20} />
          </a>
        </div>
      </div>
      
      <div className="space-y-2 text-left">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight leading-tight group-hover:text-brand transition-colors duration-300 uppercase">{name}</h3>
        <p className="text-xs font-bold text-brand uppercase tracking-wider">{role}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;

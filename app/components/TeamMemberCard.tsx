import React from 'react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, bio }) => {
  return (
    <div className="group space-y-10">
       <div className="aspect-[4/5] glass rounded-[3rem] border border-stroke overflow-hidden relative shadow-premium grain group-hover:shadow-2xl transition-all duration-1000 group-hover:-translate-y-2">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-brand/[0.03] group-hover:bg-transparent transition-colors" />
       </div>
       <div className="space-y-6">
          <div className="space-y-2">
             <h3 className="text-3xl font-bold text-text-primary group-hover:text-brand transition-colors uppercase tracking-tighter leading-none">{name}</h3>
             <p className="text-[11px] font-bold text-brand uppercase tracking-[0.3em]">{role}</p>
          </div>
          <p className="text-lg text-text-muted leading-relaxed font-medium line-clamp-3">{bio}</p>
       </div>
    </div>
  );
};

export default TeamMemberCard;

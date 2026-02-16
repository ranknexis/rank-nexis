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
    <div className="group space-y-8">
       <div className="aspect-[4/5] bg-surface rounded-[2rem] border border-stroke overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-sm hover:shadow-2xl hover:border-brand/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110" 
          />
       </div>
       <div className="space-y-4">
          <div className="space-y-1">
             <h3 className="text-2xl font-black text-text-primary group-hover:text-brand transition-colors uppercase tracking-tighter">{name}</h3>
             <p className="text-xs font-bold text-brand uppercase tracking-[0.2em]">{role}</p>
          </div>
          <p className="text-base text-text-muted leading-relaxed line-clamp-3 font-medium">{bio}</p>
       </div>
    </div>
  );
};

export default TeamMemberCard;

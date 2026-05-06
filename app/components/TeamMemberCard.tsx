"use client";

import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Github, Instagram, Youtube, Link2, Plus, Mail } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  socials?: SocialLink[];
  // Legacy props
  linkedin?: string;
  twitter?: string;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'linkedin': return <Linkedin size={16} />;
    case 'twitter': return <Twitter size={16} />;
    case 'facebook': return <Facebook size={16} />;
    case 'github': return <Github size={16} />;
    case 'instagram': return <Instagram size={16} />;
    case 'youtube': return <Youtube size={16} />;
    case 'dribbble': 
    case 'pinterest': 
      return <Link2 size={16} />; // Fallback since standard lucide might lack specific ones
    default: return <Link2 size={16} />;
  }
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, socials = [], linkedin, twitter }) => {
  const [expanded, setExpanded] = useState(false);

  // Normalize socials array to support legacy strings if socials is empty
  let activeSocials = Array.isArray(socials) ? [...socials] : [];
  if (activeSocials.length === 0) {
    if (linkedin) activeSocials.push({ platform: 'linkedin', url: linkedin });
    if (twitter) activeSocials.push({ platform: 'twitter', url: twitter });
  }

  // Ensure default fallback if still empty (optional, but requested "default keep only linkedin and twitter(X)")
  if (activeSocials.length === 0) {
     activeSocials = [
       { platform: 'linkedin', url: '#' },
       { platform: 'twitter', url: '#' }
     ];
  }

  const visibleSocials = activeSocials.slice(0, 2); // Show first 2 + More button if > 3
  const hasMore = activeSocials.length > 3;
  const extraSocials = activeSocials.slice(2); // Everything from 3rd onwards

  return (
    <div className="group space-y-6 relative">
      <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative border border-stroke bg-surface">
        <img 
          src={image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      
      <div className="flex items-center justify-between relative">
        <div className="space-y-1 text-left">
          <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight leading-tight group-hover:text-brand transition-colors duration-300 uppercase">{name}</h3>
          <p className="text-xs font-bold text-brand uppercase tracking-wider">{role}</p>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
          
          {/* Always show the first two (or three if exactly three) */}
          {(hasMore ? visibleSocials : activeSocials).map((s, idx) => (
             <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-surface border border-stroke rounded-xl flex items-center justify-center text-text-primary hover:bg-brand hover:text-white hover:border-brand transition-all">
               {getSocialIcon(s.platform)}
             </a>
          ))}

          {/* If there are more than 3, show the 3rd button as a trigger */}
          {hasMore && (
            <div className="relative">
               <button 
                 onClick={() => setExpanded(!expanded)}
                 onMouseEnter={() => setExpanded(true)}
                 className="w-10 h-10 bg-surface border border-stroke rounded-xl flex items-center justify-center text-text-primary hover:bg-brand hover:text-white hover:border-brand transition-all"
               >
                 <Plus size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
               </button>

               {/* Expanded Menu */}
               <div 
                 onMouseLeave={() => setExpanded(false)}
                 className={`absolute bottom-full right-0 mb-3 flex flex-col gap-2 transition-all duration-300 origin-bottom ${expanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
               >
                 {extraSocials.map((s, idx) => (
                    <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand hover:bg-brand hover:text-white hover:border-brand transition-all shadow-premium">
                      {getSocialIcon(s.platform)}
                    </a>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;

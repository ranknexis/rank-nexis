"use client";

import { motion } from 'framer-motion';
import { Facebook, Github, Instagram, Link2, Linkedin, Plus, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-stroke bg-surface"
    >
      <Image 
        src={image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070"} 
        alt={name} 
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      
      {/* Overlay - Glassmorphic details inside the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase leading-none">{name}</h3>
            <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">{role}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {(hasMore ? visibleSocials : activeSocials).map((s, idx) => (
              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="w-9 h-9 glass border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                {getSocialIcon(s.platform)}
              </a>
            ))}

            {hasMore && (
              <div className="relative">
                 <button 
                   onClick={() => setExpanded(!expanded)}
                   onMouseEnter={() => setExpanded(true)}
                   className="w-9 h-9 glass border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all"
                 >
                   <Plus size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
                 </button>

                 <div 
                   onMouseLeave={() => setExpanded(false)}
                   className={`absolute bottom-full right-0 mb-3 flex flex-col gap-2 transition-all duration-300 origin-bottom ${expanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                 >
                   {extraSocials.map((s, idx) => (
                      <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="w-9 h-9 glass-premium border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                        {getSocialIcon(s.platform)}
                      </a>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;

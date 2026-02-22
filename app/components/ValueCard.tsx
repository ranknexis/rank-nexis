import { LucideIcon } from 'lucide-react';
import React from 'react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, desc }) => {
  return (
    <div className="corporate-card grain group">
      <div className="w-16 h-16 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-xl shadow-brand/5">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h4 className="text-3xl font-bold tracking-tighter uppercase mb-6 leading-none">{title}</h4>
      <p className="text-text-muted text-lg leading-relaxed font-medium">{desc}</p>
    </div>
  );
};

export default ValueCard;

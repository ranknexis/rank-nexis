import { LucideIcon } from 'lucide-react';
import React from 'react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, desc }) => {
  return (
    <div className="p-10 bg-white border border-gray-100 rounded-[3rem] hover:border-brand transition-all duration-500 group shadow-xl">
      <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-inner">
        <Icon size={28} />
      </div>
      <h4 className="text-2xl font-black tracking-tighter uppercase mb-4">{title}</h4>
      <p className="text-gray-600 leading-relaxed font-medium">{desc}</p>
    </div>
  );
};

export default ValueCard;

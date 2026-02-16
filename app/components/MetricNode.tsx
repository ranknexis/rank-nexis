import React from 'react';

interface MetricNodeProps {
  label: string;
  value: string;
  className?: string;
}

const MetricNode: React.FC<MetricNodeProps> = ({ label, value, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-brand font-black text-xl tracking-tighter">{value}</span>
      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default MetricNode;

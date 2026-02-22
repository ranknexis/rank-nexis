import React from 'react';

interface MetricNodeProps {
  label: string;
  value: string;
  className?: string;
}

const MetricNode: React.FC<MetricNodeProps> = ({ label, value, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-brand font-bold text-3xl tracking-tighter leading-none">{value}</span>
      <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em] leading-none">{label}</span>
    </div>
  );
};

export default MetricNode;
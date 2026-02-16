"use client";

import Image from 'next/image';
import { useState } from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`flex items-center ${className}`}>
      {!error ? (
        <Image 
          src="/logo-d.png" 
          alt="RankNexis" 
          width={300} 
          height={100} 
          className="h-16 w-auto object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
          <div className="relative w-8 h-8 flex items-center justify-center bg-brand rounded-lg rotate-12 overflow-hidden shadow-[0_0_15px_rgba(255,122,0,0.5)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black -rotate-12"
            >
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-text-primary">
            Rank<span className="text-brand">Nexis</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

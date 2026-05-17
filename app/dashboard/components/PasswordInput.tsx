"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export default function PasswordInput({ label, icon, className, ...props }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-2">
            {label && <label className="text-[9px] font-black uppercase text-text-muted ml-2 tracking-wider">{label}</label>}
            <div className="relative">
                <input 
                    {...props}
                    type={show ? "text" : "password"} 
                    className={`w-full h-11 pl-10 pr-10 bg-white border border-stroke rounded-xl text-xs font-bold focus:border-brand outline-none transition-all shadow-sm text-text-primary placeholder:text-text-muted/40 ${className}`}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand">
                    {icon || <Lock size={14} />}
                </div>
                <button 
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand transition-colors p-1"
                >
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
            </div>
        </div>
    );
}


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
            {label && <label className="text-[10px] font-bold uppercase text-text-muted ml-2">{label}</label>}
            <div className="relative">
                <input 
                    {...props}
                    type={show ? "text" : "password"} 
                    className={`w-full h-14 pl-12 pr-12 bg-white border border-stroke rounded-xl text-sm font-medium focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm text-text-primary placeholder:text-text-muted/40 ${className}`}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/50">
                    {icon || <Lock size={18} />}
                </div>
                <button 
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-brand transition-colors p-1"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}

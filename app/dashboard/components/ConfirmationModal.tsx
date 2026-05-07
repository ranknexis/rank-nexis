"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm Operation",
    cancelText = "Abort Sync",
    type = "danger"
}: ConfirmationModalProps) {
    const colors = {
        danger: "bg-red-500 shadow-red-200",
        warning: "bg-amber-500 shadow-amber-200",
        info: "bg-brand shadow-brand/20"
    };

    const iconColors = {
        danger: "text-red-500 bg-red-50",
        warning: "text-amber-500 bg-amber-50",
        info: "text-brand bg-brand/5"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[3rem] border border-stroke shadow-3xl overflow-hidden p-10 md:p-12 space-y-8"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconColors[type]}`}>
                                <AlertTriangle size={28} />
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 text-text-muted hover:text-brand transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary leading-tight">
                                {title}
                            </h3>
                            <p className="text-xs font-medium text-text-muted leading-relaxed uppercase tracking-wider">
                                {message}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <button 
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`w-full h-14 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${colors[type]}`}
                            >
                                {confirmText}
                            </button>
                            <button 
                                onClick={onClose}
                                className="w-full h-14 rounded-2xl bg-surface border border-stroke text-[10px] font-black uppercase tracking-widest text-text-muted hover:bg-white transition-all"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

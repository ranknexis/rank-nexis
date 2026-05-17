"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger"
}: ConfirmationModalProps) {
    const colors = {
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/10",
        warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/10",
        info: "bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/10"
    };

    const iconColors = {
        danger: "text-red-500 bg-red-50",
        warning: "text-amber-500 bg-amber-50",
        info: "text-brand bg-brand/5"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
                   <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    />

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl border border-stroke shadow-2xl p-6 sm:p-8 space-y-6 z-10 overflow-hidden"
                    >
                        <button 
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface transition-colors animate-pulse"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconColors[type]}`}>
                                <AlertTriangle size={24} />
                            </div>
                            <div className="space-y-2 flex-1 pt-1">
                                <h3 className="text-lg font-bold text-text-primary tracking-tight leading-tight">
                                    {title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed font-normal">
                                    {message}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-stroke">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="h-11 px-5 rounded-xl bg-white border border-stroke hover:bg-surface hover:text-text-primary text-sm font-semibold text-text-muted transition-all duration-200 active:scale-[0.98]"
                            >
                                {cancelText}
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`h-11 px-6 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${colors[type]}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

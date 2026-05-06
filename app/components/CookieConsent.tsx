"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, Activity, Megaphone, Check } from "lucide-react";
import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("ranknexis_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }

    const handleShow = () => {
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener("show-cookie-consent", handleShow);
    return () => window.removeEventListener("show-cookie-consent", handleShow);
  }, []);

  const dispatchUpdate = () => {
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const handleAcceptAll = () => {
    localStorage.setItem("ranknexis_cookie_consent", "all");
    dispatchUpdate();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("ranknexis_cookie_consent", "rejected");
    dispatchUpdate();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("ranknexis_cookie_consent", JSON.stringify(preferences));
    dispatchUpdate();
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 z-[100] max-w-4xl mx-auto p-6 sm:p-8 glass border border-stroke rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] grain overflow-hidden"
        >
          {showCustomize ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-black uppercase tracking-tighter text-text-primary">Privacy Shield</h3>
                  <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Manage your data transmission preferences</p>
                </div>
                <button 
                  onClick={() => setShowCustomize(false)} 
                  className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Necessary */}
                <div className="p-5 rounded-2xl bg-white border border-stroke space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center text-brand">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase text-text-primary">Core Systems</p>
                      <p className="text-[9px] font-bold text-text-muted leading-relaxed">Required for the platform to function. Cannot be disabled.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Check size={14} strokeWidth={3} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                  </div>
                </div>

                {/* Analytics */}
                <div 
                  onClick={() => togglePreference('analytics')}
                  className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between space-y-4 ${preferences.analytics ? 'bg-brand/5 border-brand/20 shadow-lg shadow-brand/5' : 'bg-white border-stroke hover:border-brand/30'}`}
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${preferences.analytics ? 'bg-brand text-white' : 'bg-surface text-text-muted group-hover:text-brand'}`}>
                      <Activity size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase text-text-primary">Intelligence</p>
                      <p className="text-[9px] font-bold text-text-muted leading-relaxed">Helps us understand user behavior to optimize UX.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors duration-500 ${preferences.analytics ? 'bg-brand/30' : 'bg-stroke'}`}>
                    <motion.div 
                      animate={{ x: preferences.analytics ? 20 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`absolute top-1 w-3 h-3 rounded-full ${preferences.analytics ? 'bg-brand' : 'bg-text-muted'}`} 
                    />
                  </div>
                </div>

                {/* Marketing */}
                <div 
                  onClick={() => togglePreference('marketing')}
                  className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between space-y-4 ${preferences.marketing ? 'bg-brand/5 border-brand/20 shadow-lg shadow-brand/5' : 'bg-white border-stroke hover:border-brand/30'}`}
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${preferences.marketing ? 'bg-brand text-white' : 'bg-surface text-text-muted group-hover:text-brand'}`}>
                      <Megaphone size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase text-text-primary">Targeting</p>
                      <p className="text-[9px] font-bold text-text-muted leading-relaxed">Enables personalized marketing and campaign tracking.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors duration-500 ${preferences.marketing ? 'bg-brand/30' : 'bg-stroke'}`}>
                    <motion.div 
                      animate={{ x: preferences.marketing ? 20 : 4 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`absolute top-1 w-3 h-3 rounded-full ${preferences.marketing ? 'bg-brand' : 'bg-text-muted'}`} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stroke flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Changes apply immediately after saving</p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setShowCustomize(false)}
                    className="flex-1 sm:flex-none h-12 px-8 rounded-xl border border-stroke text-[10px] font-black uppercase tracking-widest text-text-primary hover:bg-surface transition-all"
                  >
                    Back
                  </button>
                  <button 
                      onClick={handleSavePreferences}
                      className="flex-1 sm:flex-none h-12 px-8 rounded-xl bg-brand text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                      Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center text-brand shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-text-primary">Cookie Governance</p>
                  <p className="text-xs text-text-muted font-medium">We use encrypted cookies to provide a premium, secure user experience.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setShowCustomize(true)}
                  className="flex-1 md:flex-none text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand transition-colors px-4"
                >
                  Configure
                </button>
                <button 
                  onClick={handleRejectAll}
                  className="flex-1 md:flex-none h-12 px-6 rounded-xl border border-stroke text-[10px] font-black uppercase tracking-widest text-text-primary hover:bg-surface transition-all"
                >
                  Reject All
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="flex-1 md:flex-none h-12 px-8 rounded-xl bg-brand text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

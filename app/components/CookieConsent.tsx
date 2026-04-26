"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
    // Check local storage for existing consent
    const consent = localStorage.getItem("ranknexis_cookie_consent");
    if (!consent) {
      // Delay initialization slightly for a better visual entry
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ranknexis_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("ranknexis_cookie_consent", "rejected");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("ranknexis_cookie_consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] w-full p-4 sm:p-5 glass border-t border-stroke shadow-[0_-8px_30px_rgba(0,0,0,0.12)] grain"
        >
          {showCustomize ? (
            <div className="space-y-6 max-w-md mx-auto w-full">
              <div className="flex items-center justify-between pb-4 border-b border-stroke">
                <h3 className="text-[11px] font-bold uppercase text-text-primary">Customize Preferences</h3>
                <button onClick={() => setShowCustomize(false)} className="text-text-muted hover:text-brand transition-colors">
                  <X size={16} />
                </button>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-text-primary">Strictly Necessary</p>
                    <p className="text-[9px] uppercase text-text-muted font-bold">Required for core function</p>
                  </div>
                  <div className="w-10 h-5 bg-brand/30 rounded-full relative opacity-50 cursor-not-allowed">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-brand rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-text-primary">Analytics & Traffic</p>
                    <p className="text-[9px] uppercase text-text-muted font-bold">Helps us improve UX</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('analytics')}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-500 hover:opacity-80 ${preferences.analytics ? 'bg-brand/30' : 'bg-stroke'}`}
                  >
                    <motion.div 
                      layout
                      className={`absolute top-1 w-3 h-3 rounded-full transition-colors duration-300 ${preferences.analytics ? 'bg-brand right-1' : 'bg-text-muted left-1'}`} 
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-text-primary">Targeted Marketing</p>
                    <p className="text-[9px] uppercase text-text-muted font-bold">For personalized ads</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('marketing')}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-500 hover:opacity-80 ${preferences.marketing ? 'bg-brand/30' : 'bg-stroke'}`}
                  >
                    <motion.div 
                      layout
                      className={`absolute top-1 w-3 h-3 rounded-full transition-colors duration-300 ${preferences.marketing ? 'bg-brand right-1' : 'bg-text-muted left-1'}`} 
                    />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-stroke">
                <button 
                    onClick={handleSavePreferences}
                    className="w-full btn-primary h-12 text-[10px] uppercase shadow-sm"
                >
                    Save Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-4">
              <p className="text-text-primary text-sm font-medium text-center sm:text-left">
                We use cookies to improve your experience on our site. By using our site, you consent to cookies.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setShowCustomize(true)}
                  className="text-xs font-bold text-text-muted hover:text-brand transition-colors px-2"
                >
                  Customize
                </button>
                <button 
                  onClick={handleRejectAll}
                  className="btn-outline h-10 text-xs px-4 rounded-full"
                >
                  Reject All
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="btn-primary h-10 text-xs px-4 shadow-sm rounded-full"
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


"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";
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
    const handleShow = () => {
      const saved = localStorage.getItem("ranknexis_cookie_consent");
      if (saved && saved !== "all" && saved !== "rejected") {
        try {
          setPreferences(JSON.parse(saved));
        } catch (e) {}
      } else if (saved === "all") {
        setPreferences({ necessary: true, analytics: true, marketing: true });
      } else if (saved === "rejected") {
        setPreferences({ necessary: true, analytics: false, marketing: false });
      }
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener("show-cookie-consent", handleShow);

    const consent = localStorage.getItem("ranknexis_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("show-cookie-consent", handleShow);
      };
    }

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto glass border border-white/20 rounded-2xl shadow-2xl overflow-hidden shadow-black/5">
            <div className="px-6 py-5 md:py-6 relative z-10">
              {showCustomize ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-primary">Cookie Settings</h3>
                    <button onClick={() => setShowCustomize(false)} className="text-text-muted hover:text-brand transition-colors">
                      <X size={18}/>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-text-primary">Strictly Necessary</span>
                      <Check size={14} className="text-emerald-500" />
                    </div>

                    <div 
                      onClick={() => togglePreference('analytics')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-xl ${preferences.analytics ? 'border-brand bg-brand/5' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                    >
                      <span className="text-[10px] font-bold uppercase text-text-primary">Analytics Cookies</span>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${preferences.analytics ? 'bg-brand' : 'bg-gray-200'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${preferences.analytics ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                    </div>

                    <div 
                      onClick={() => togglePreference('marketing')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-xl ${preferences.marketing ? 'border-brand bg-brand/5' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                    >
                      <span className="text-[10px] font-bold uppercase text-text-primary">Marketing Cookies</span>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${preferences.marketing ? 'bg-brand' : 'bg-gray-200'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${preferences.marketing ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button onClick={handleSavePreferences} className="w-full md:w-auto px-10 py-3 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-brand/10">Save Settings</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center md:text-left">
                    <ShieldCheck size={20} className="text-brand hidden md:block" />
                    <p className="text-[11px] font-medium text-text-primary leading-relaxed uppercase max-w-4xl tracking-tight">
                      We use cookies to optimize your experience.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
                    <button 
                      onClick={() => setShowCustomize(true)}
                      className="flex-1 md:flex-none text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand transition-colors"
                    >
                      Settings
                    </button>
                    <button 
                      onClick={handleRejectAll}
                      className="flex-1 md:flex-none px-6 py-3 text-[10px] font-bold uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={handleAcceptAll}
                      className="flex-1 md:flex-none px-10 py-3 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl shadow-brand/20"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


"use client";

export default function CookiePreferencesLink() {
  const openCookieConsent = () => {
    window.dispatchEvent(new Event("show-cookie-consent"));
  };

  return (
    <li>
      <button 
        onClick={openCookieConsent}
        className="text-sm font-medium text-text-secondary hover:text-brand transition-colors text-left"
      >
        Cookie Preferences
      </button>
    </li>
  );
}

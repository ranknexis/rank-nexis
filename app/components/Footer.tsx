import prisma from "@/lib/prisma";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import CookiePreferencesLink from "./CookiePreferencesLink";
import Logo from "./Logo";
import SiteMapLink from "./SiteMapLink";

export default async function Footer() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  const socialLinks = [
    { key: 'linkedinUrl', icon: Linkedin, label: 'LinkedIn' },
    { key: 'facebookUrl', icon: Facebook, label: 'Facebook' },
    { key: 'twitterUrl', icon: Twitter, label: 'Twitter' },
    { key: 'instagramUrl', icon: Instagram, label: 'Instagram' },
    { key: 'youtubeUrl', icon: Youtube, label: 'YouTube' },
  ];

  const activeSocials = socialLinks.filter(s => settings?.[s.key as keyof typeof settings]);

  return (
    <footer className="bg-white border-t border-stroke pt-24 pb-12 px-6 grain relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.02] rounded-full blur-[100px] -z-10" />
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-x-12 gap-y-16 mb-20">
          <div className="sm:col-span-3 lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo />
            </Link>
            <div className="space-y-6">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md font-medium">
                {settings?.siteDescription || "Leading Digital Marketing Agency for Business Growth: Scaling Startups through ROI-Driven Marketing and Systems Engineering."}
              </p>

              {activeSocials.length > 0 && (
                <div className="flex gap-4">
                  {activeSocials.map(social => {
                    const Icon = social.icon;
                    return (
                      <Link 
                        key={social.key}
                        href={settings?.[social.key as keyof typeof settings] as string} 
                        target="_blank"
                        className="w-10 h-10 border border-stroke rounded-lg flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all duration-500 shadow-sm hover:shadow-lg bg-white"
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-1 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold text-brand uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Services</Link></li>
              <li><Link href="/work" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold text-brand uppercase tracking-widest">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="/careers" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Contact Us</Link></li>
              {settings?.contactEmail && (
                <li><a href={`mailto:${settings.contactEmail}`} className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Email Support</a></li>
              )}
              <li><Link href="/team" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Our Team</Link></li>
              <li><Link href="/dashboard/login" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Staff Login</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-bold text-brand uppercase tracking-widest">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">Terms of Use</Link></li>
              
              {/* Separate Interactive Links */}
              <CookiePreferencesLink />
              <SiteMapLink />

              <li className="pt-2">
                <p className="text-[10px] font-bold text-text-primary uppercase mb-1">HQ Distribution</p>
                <p className="text-sm font-medium text-text-muted">{settings?.address || "Global Operations"}</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-stroke text-center">
          <p className="text-[10px] text-text-muted font-medium">
            © 2026 {settings?.siteName || "RankNexis"} • All Rights Reserved <span className="mx-2">|</span> Developed by <Link href="https://moniruzzaman-mahdi.vercel.app" target="_blank" className="hover:text-brand transition-colors">Mahdi</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}

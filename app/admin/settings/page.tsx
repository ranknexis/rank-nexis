import prisma from "@/lib/prisma";
import { Globe, Mail, Phone, MapPin, Share2, Shield, Layout, Save } from "lucide-react";
import SettingsForm from "./components/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  }) || {
    siteName: "RankNexis",
    siteTitleSuffix: "RankNexis Strategy & Vision",
    siteDescription: "RankNexis is a premier digital growth agency.",
    ogImage: "/og-image.png",
    contactEmail: "hello@ranknexis.com",
    contactPhone: "+1 (555) 000-0000",
    address: "New York, USA",
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Global <span className="text-brand">Settings.</span></h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">Configure site-wide branding, SEO and business identity.</p>
        </div>
      </div>

      <SettingsForm initialData={JSON.parse(JSON.stringify(settings))} />
    </div>
  );
}


import prisma from "@/lib/prisma";
import { Globe, Mail, Phone, MapPin, Share2, Shield, Layout, Save } from "lucide-react";
import SettingsForm from "./components/SettingsForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/dashboard");
  }

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Website <span className="text-brand">Settings.</span></h1>
          <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Manage your website settings, branding details, and contact options.</p>
        </div>
      </div>

      <SettingsForm initialData={JSON.parse(JSON.stringify(settings))} />
    </div>
  );
}

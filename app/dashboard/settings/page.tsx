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
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Global <span className="text-brand">Configurations.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Master control for platform branding and environmental parameters.</p>
        </div>
      </div>

      <SettingsForm initialData={JSON.parse(JSON.stringify(settings))} />
    </div>
  );
}

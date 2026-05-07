import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import AnalyticsScripts from "./components/AnalyticsScripts";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  const siteName = settings?.siteName || "RankNexis";
  const suffix = settings?.siteTitleSuffix || "High-Performance Digital Growth";

  return {
    metadataBase: new URL("https://www.ranknexis.com"),

    title: {
      default: `${siteName} | ${suffix}`,
      template: `%s | ${siteName}`
    },
    description: settings?.siteDescription || "RankNexis is a premier digital growth agency specializing in SEO, Ads, and Technical Solutions.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.ranknexis.com",
      siteName: siteName,
      title: `${siteName} | Growth Engineering`,
      description: settings?.siteDescription || "Scale your brand with high-performance digital marketing.",
      images: [
        {
          url: settings?.ogImage || "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteName} Growth Engineering`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Digital Growth Agency`,
      description: settings?.siteDescription || "High-performance marketing and development solutions.",
      images: [settings?.ogImage || "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    manifest: "/manifest.json",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-text-primary bg-background`}>
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        <CookieConsent />
        <AnalyticsScripts settings={settings} />
        {children}
      </body>
    </html>
  );
}

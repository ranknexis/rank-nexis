import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RankNexis | High-Performance Digital Marketing & Growth Engineering",
    template: "%s | RankNexis"
  },
  description: "RankNexis is a premier digital growth agency specializing in SEO, Meta Ads, Google Ads, and Full-Stack Development. We engineer scalable digital systems for global impact.",
  keywords: ["Digital Marketing", "SEO", "Facebook Ads", "Google Ads", "Web Development", "Growth Engineering", "RankNexis"],
  authors: [{ name: "RankNexis Team" }],
  creator: "RankNexis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ranknexis.com",
    siteName: "RankNexis",
    title: "RankNexis | Engineering Digital Growth",
    description: "Scale your brand with high-performance digital marketing and technical excellence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RankNexis Growth Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankNexis | Digital Growth Agency",
    description: "High-performance marketing and development solutions for modern brands.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        {children}
      </body>
    </html>
  );
}

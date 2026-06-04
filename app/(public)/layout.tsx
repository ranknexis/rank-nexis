import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCachedSiteSettings } from "@/lib/dbCache";
import TrackingScripts from "../../components/TrackingScripts";
import SmoothScroll from "../components/SmoothScroll";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services] = await Promise.all([
    getCachedSiteSettings(),
    prisma.service.findMany({
      where: { active: true },
      select: {
        title: true,
        slug: true,
        category: true,
        icon: true,
      },
      orderBy: { order: "asc" },
    })
  ]);

  return (
    <SmoothScroll>
      {settings && <TrackingScripts settings={JSON.parse(JSON.stringify(settings))} />}
      <Navbar services={JSON.parse(JSON.stringify(services))} />
      {children}
      <Footer />
    </SmoothScroll>
  );
}


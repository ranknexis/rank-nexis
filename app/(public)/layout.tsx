import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import prisma from "@/lib/prisma";
import TrackingScripts from "../../components/TrackingScripts";
import SmoothScroll from "../components/SmoothScroll";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <SmoothScroll>
      {settings && <TrackingScripts settings={JSON.parse(JSON.stringify(settings))} />}
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}


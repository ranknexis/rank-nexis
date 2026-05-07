import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import prisma from "@/lib/prisma";
import TrackingScripts from "../../components/TrackingScripts";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <>
      {settings && <TrackingScripts settings={JSON.parse(JSON.stringify(settings))} />}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


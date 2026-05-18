import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCachedSiteSettings } from "@/lib/dbCache";
import TrackingScripts from "../../components/TrackingScripts";
import SmoothScroll from "../components/SmoothScroll";

export const revalidate = 3600;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getCachedSiteSettings();

  return (
    <SmoothScroll>
      {settings && <TrackingScripts settings={JSON.parse(JSON.stringify(settings))} />}
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}


import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import ContactClient from "./ContactClient";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";
import prisma from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("contact");
  return buildSeoMetadata(page, {
    title: "Contact Us | Get a Free Consultation",
    description: "Ready to grow? Contact the experts at RankNexis for a customized growth strategy and digital audit.",
  });
}

export default async function ContactPage() {
  const [pageData, settings] = await Promise.all([
    getPageData("contact"),
    prisma.siteSettings.findFirst()
  ]);
  
  return (
    <>
      <ContactClient 
        sectionsMap={pageData?.sectionsMap || {}} 
        settings={JSON.parse(JSON.stringify(settings))}
      />
      <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
    </>
  );
}


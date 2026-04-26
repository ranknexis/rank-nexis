import prisma from "@/lib/prisma";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import ServicesClient from "./ServicesClient";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("services");
  return buildSeoMetadata(page, {
    title: "Our Services | Digital Marketing & Scale Engineering",
    description: "Explore our specialized services in SEO, Ads, Design and Development.",
  });
}

export default async function ServicesPage() {
  const [services, pageData] = await Promise.all([
    prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    }),
    getPageData("services")
  ]);

  return (
    <>
      <ServicesClient services={services} sectionsMap={pageData?.sectionsMap || {}} />
      <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
    </>
  );
}


import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "../components/ServiceDetailClient";
import InternalLinksSection from "@/components/InternalLinksSection";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings, pageData] = await Promise.all([
    prisma.service.findUnique({ where: { slug } }),
    prisma.siteSettings.findUnique({ where: { id: "global" } }),
    getPageData(`services/${slug}`)
  ]);

  if (!service) return { title: "Service Not Found" };

  const suffix = settings?.siteTitleSuffix || "RankNexis Solution";
  
  return buildSeoMetadata(pageData, {
    title: `${service.title} | ${suffix}`,
    description: service.description,
  });
}

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, pageData] = await Promise.all([
    prisma.service.findUnique({ where: { slug } }),
    getPageData(`services/${slug}`)
  ]);

  if (!service) notFound();

  // Fetch related case studies
  const relatedCaseStudies = await prisma.caseStudy.findMany({
    where: {
      OR: [
        { tag: { contains: service.title, mode: 'insensitive' } },
        { title: { contains: service.title.split(' ')[0], mode: 'insensitive' } }
      ]
    },
    take: 2,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <ServiceDetailClient 
        service={JSON.parse(JSON.stringify(service))} 
        pageData={JSON.parse(JSON.stringify(pageData))}
        relatedCaseStudies={JSON.parse(JSON.stringify(relatedCaseStudies))} 
      />
      {pageData?.internalLinks && <InternalLinksSection links={pageData.internalLinks as any[]} />}
    </>
  );
}


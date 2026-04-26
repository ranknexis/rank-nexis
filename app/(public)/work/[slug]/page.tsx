import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailClient from "../components/CaseStudyDetailClient";
import InternalLinksSection from "@/components/InternalLinksSection";
import { getPageData } from "@/lib/pageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [study, settings] = await Promise.all([
    prisma.caseStudy.findUnique({ where: { slug } }),
    prisma.siteSettings.findUnique({ where: { id: "global" } })
  ]);

  if (!study) return { title: "Case Study Not Found" };

  const suffix = settings?.siteTitleSuffix || "Success Story";

  return {
    title: `${study.title} | ${suffix}`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: study.image ? [{ url: study.image }] : [],
    },
    alternates: {
      canonical: `/work/${study.slug}`
    }
  };
}

export async function generateStaticParams() {
  const studies = await prisma.caseStudy.findMany({ select: { slug: true } });
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const [study, pageData] = await Promise.all([
    prisma.caseStudy.findUnique({ where: { slug } }),
    getPageData("work")
  ]);

  if (!study) notFound();

  return (
    <>
      <CaseStudyDetailClient study={JSON.parse(JSON.stringify(study))} />
      <InternalLinksSection links={pageData?.internalLinks as any[] || []} />
    </>
  );
}


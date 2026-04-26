import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import HomeClient from "./HomeClient";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");
  return buildSeoMetadata(page, {
    title: "RankNexis | High-Performance Digital Marketing & Growth Engineering",
    description: "RankNexis is a professional digital marketing agency specializing in SEO, Facebook Ads, Google Ads, and custom Web Development.",
  });
}

import InternalLinksSection from "@/components/InternalLinksSection";

export default async function HomePage() {
  const [pageData, studies, posts] = await Promise.all([
    getPageData("home"),
    prisma.caseStudy.findMany({ take: 2, orderBy: { createdAt: 'desc' } }),
    prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' }, include: { category: true } })
  ]);
  
  return (
    <>
      <HomeClient 
        sectionsMap={pageData?.sectionsMap || {}} 
        studies={JSON.parse(JSON.stringify(studies))}
        posts={JSON.parse(JSON.stringify(posts))}
      />
      <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
    </>
  );
}


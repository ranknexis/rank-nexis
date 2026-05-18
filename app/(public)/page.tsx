import InternalLinksSection from "@/components/InternalLinksSection";
import { getCachedHomeData } from "@/lib/dbCache";
import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");
  return buildSeoMetadata(page, {
    title: "RankNexis | High-Performance Digital Marketing & Strategic Growth",
    description: "RankNexis is a professional digital marketing agency specializing in SEO, Facebook Ads, Google Ads, and custom Web Development.",
  });
}

export default async function HomePage() {
  const [pageData, homeData] = await Promise.all([
    getPageData("home"),
    getCachedHomeData()
  ]);
  
  const { studies, posts, testimonials } = homeData;
  
  return (
    <>
      <HomeClient 
        sectionsMap={pageData?.sectionsMap || {}} 
        studies={JSON.parse(JSON.stringify(studies))}
        posts={JSON.parse(JSON.stringify(posts))}
        testimonials={JSON.parse(JSON.stringify(testimonials))}
      />
      <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
    </>
  );
}


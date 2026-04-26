import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata } from "@/lib/pageUtils";
import AboutClient from "./AboutClient";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";
import prisma from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("about");
  return buildSeoMetadata(page, {
    title: "About Us | RankNexis Strategy & Vision",
    description: "Learn about the mission, vision, and the expert team behind RankNexis digital excellence.",
  });
}

export default async function AboutPage() {
  const [pageData, teamMembers] = await Promise.all([
    getPageData("about"),
    prisma.teamMember.findMany({
      orderBy: { order: "asc" }
    })
  ]);
  
  return (
    <>
      <AboutClient 
        sectionsMap={pageData?.sectionsMap || {}} 
        teamMembers={JSON.parse(JSON.stringify(teamMembers))} 
      />
      <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
    </>
  );
}



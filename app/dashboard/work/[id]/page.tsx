import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import WorkEditor from "../components/WorkEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCaseStudyPage({ params }: Props) {
  const { id } = await params;
  
  const [study, allServices, allBlogs, allCaseStudies] = await Promise.all([
    id === "new" ? null : prisma.caseStudy.findUnique({
      where: { id }
    }),
    prisma.service.findMany({ select: { id: true, title: true, slug: true } }),
    prisma.blog.findMany({ select: { id: true, title: true, slug: true } }),
    prisma.caseStudy.findMany({ select: { id: true, title: true, slug: true } })
  ]);

  if (id !== "new" && !study) {
    notFound();
  }

  return (
    <WorkEditor 
      initialData={study} 
      allServices={allServices}
      allBlogs={allBlogs}
      allCaseStudies={allCaseStudies}
    />
  );
}


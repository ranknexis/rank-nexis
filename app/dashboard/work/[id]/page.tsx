import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import WorkEditor from "../components/WorkEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCaseStudyPage({ params }: Props) {
  const { id } = await params;
  
  const study = id === "new" ? null : await prisma.caseStudy.findUnique({
    where: { id }
  });

  if (id !== "new" && !study) {
    notFound();
  }

  return <WorkEditor initialData={study} />;
}


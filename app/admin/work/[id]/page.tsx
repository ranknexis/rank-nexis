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

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
            {id === "new" ? "New" : "Edit"} <span className="text-brand">Case Study.</span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">
            {id === "new" ? "Build a new growth narrative node." : `Editing: ${study?.title}`}
          </p>
        </div>
      </div>

      <WorkEditor initialData={study} />
    </div>
  );
}


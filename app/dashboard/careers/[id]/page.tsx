import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobEditor from "../components/JobEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditJobListingPage({ params }: Props) {
  const { id } = await params;
  
  const job = id === "new" ? null : await prisma.job.findUnique({
    where: { id }
  });

  if (id !== "new" && !job) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
            {id === "new" ? "New" : "Edit"} <span className="text-brand">Opportunity.</span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">
            {id === "new" ? "Deploy a new human capital recruitment node." : `Editing: ${job?.title}`}
          </p>
        </div>
      </div>

      <JobEditor initialData={job} />
    </div>
  );
}


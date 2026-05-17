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
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">
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


import prisma from "@/lib/prisma";
import TeamEditor from "../components/TeamEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";
  
  let initialData = null;
  if (!isNew) {
    initialData = await prisma.teamMember.findUnique({
      where: { id },
      include: { user: true }
    });

    if (initialData && !Array.isArray(initialData.socials)) {
      initialData.socials = [];
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4 border-b border-stroke pb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
          {isNew ? "Add" : "Edit"} <span className="text-brand">Member.</span>
        </h1>
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
          {isNew ? "Create a new team member profile." : "Update team member details and links."}
        </p>
      </div>

      <TeamEditor initialData={initialData} />
    </div>
  );
}

import prisma from "@/lib/prisma";
import TeamEditor from "../components/TeamEditor";

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let initialData = null;
  if (!isNew) {
    initialData = await prisma.teamMember.findUnique({
      where: { id: params.id }
    });
    
    // Ensure socials is an array for the client component
    if (initialData && !Array.isArray(initialData.socials)) {
      initialData.socials = [];
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
          {isNew ? "Add" : "Edit"} <span className="text-brand">Expert Node.</span>
        </h1>
        <p className="text-text-muted text-[10px] font-bold uppercase">Update personnel protocols and core expertise fields.</p>
      </div>

      <TeamEditor initialData={initialData} />
    </div>
  );
}

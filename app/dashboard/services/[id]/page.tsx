import ServiceEditor from "../components/ServiceEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: Props) {
    const { id } = await params;
    
    const service = id === "new" ? null : await prisma.service.findUnique({
        where: { id }
    });

    if (id !== "new" && !service) {
        notFound();
    }

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
                    {id === "new" ? "New" : "Edit"} <span className="text-brand">Service Node.</span>
                </h1>
                <p className="text-text-muted text-[10px] font-bold uppercase">Configure service architecture and parameters.</p>
            </div>
            <ServiceEditor initialData={service ? JSON.parse(JSON.stringify(service)) : null} />
        </div>
    );
}

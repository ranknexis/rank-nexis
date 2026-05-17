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
        <div className="space-y-6">
            <div className="space-y-1 pb-4 border-b border-stroke">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">
                    {id === "new" ? "New" : "Edit"} <span className="text-brand">Service.</span>
                </h1>
                <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider">Manage details, categories, and value features.</p>
            </div>
            <ServiceEditor initialData={service ? JSON.parse(JSON.stringify(service)) : null} />
        </div>
    );
}

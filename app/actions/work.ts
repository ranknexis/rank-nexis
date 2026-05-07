"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function createCaseStudy(data: any) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    const authorId = session.role === "ADMIN" ? data.authorId : session.id;

    try {
        const caseStudy = await prisma.caseStudy.create({
            data: {
                ...data,
                authorId
            }
        });
        revalidatePath("/work");
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true, caseStudy };
    } catch (error) {
        console.error("Create Case Study Error:", error);
        return { error: "Failed to create case study." };
    }
}

export async function updateCaseStudy(id: string, data: any) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        const existing = await prisma.caseStudy.findUnique({ where: { id } });
        if (!existing) return { error: "Case study not found" };

        if (session.role !== "ADMIN" && existing.authorId !== session.id) {
            return { error: "Permission denied" };
        }

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: {
                ...data,
                authorId: session.role === "ADMIN" ? data.authorId : existing.authorId
            }
        });
        revalidatePath("/work");
        revalidatePath(`/work/${caseStudy.slug}`);
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true, caseStudy };
    } catch (error) {
        console.error("Update Case Study Error:", error);
        return { error: "Failed to update case study." };
    }
}

export async function deleteCaseStudy(id: string) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        const existing = await prisma.caseStudy.findUnique({ where: { id } });
        if (!existing) return { error: "Case study not found" };

        if (session.role !== "ADMIN" && existing.authorId !== session.id) {
            return { error: "Permission denied" };
        }

        await prisma.caseStudy.delete({ where: { id } });
        revalidatePath("/work");
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete Case Study Error:", error);
        return { error: "Failed to delete case study." };
    }
}

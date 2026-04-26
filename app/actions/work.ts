"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCaseStudy(data: {
    title: string;
    slug: string;
    description: string;
    image?: string;
    stats: string;
    kpi: string;
    tag: string;
    challenge: string;
    solution: string;
    execution: string[];
    results: string[];
    client: string;
    technologies: string[];
}) {
    try {
        const caseStudy = await prisma.caseStudy.create({
            data
        });
        revalidatePath("/work");
        revalidatePath("/admin/work");
        return { success: true, caseStudy };
    } catch (error) {
        console.error("Create Case Study Error:", error);
        return { error: "Failed to create case study." };
    }
}

export async function updateCaseStudy(id: string, data: any) {
    try {
        await prisma.caseStudy.update({
            where: { id },
            data
        });
        revalidatePath("/work");
        revalidatePath(`/work/${data.slug || ''}`);
        revalidatePath("/admin/work");
        return { success: true };
    } catch (error) {
        console.error("Update Case Study Error:", error);
        return { error: "Failed to update case study." };
    }
}

export async function deleteCaseStudy(id: string) {
    try {
        await prisma.caseStudy.delete({ where: { id } });
        revalidatePath("/work");
        revalidatePath("/admin/work");
        return { success: true };
    } catch (error) {
        console.error("Delete Case Study Error:", error);
        return { error: "Failed to delete case study." };
    }
}


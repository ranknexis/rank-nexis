"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJob(data: {
    title: string;
    slug: string;
    description: string;
    location: string;
    type: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}) {
    try {
        const job = await prisma.job.create({
            data: {
                ...data,
                active: true
            }
        });
        revalidatePath("/careers");
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true, job };
    } catch (error) {
        console.error("Create Job Error:", error);
        return { error: "Failed to create job opening." };
    }
}

export async function toggleJobStatus(id: string, active: boolean) {
    try {
        const job = await prisma.job.update({
            where: { id },
            data: { active }
        });
        revalidatePath("/careers");
        revalidatePath(`/careers/${job.slug}`);
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Toggle Job Status Error:", error);
        return { error: "Failed to update job status." };
    }
}

export async function deleteJob(id: string) {
    try {
        const job = await prisma.job.findUnique({ where: { id } });
        await prisma.job.delete({ where: { id } });
        revalidatePath("/careers");
        if (job) revalidatePath(`/careers/${job.slug}`);
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete Job Error:", error);
        return { error: "Failed to delete job opening." };
    }
}


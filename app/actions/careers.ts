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
        revalidatePath("/careers/[slug]", "layout");
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true, job };
    } catch (error) {
        
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
        revalidatePath("/careers/[slug]", "layout");
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to update job status." };
    }
}

export async function deleteJob(id: string) {
    try {
        const job = await prisma.job.findUnique({ where: { id } });
        await prisma.job.delete({ where: { id } });
        revalidatePath("/careers");
        if (job) revalidatePath(`/careers/${job.slug}`);
        revalidatePath("/careers/[slug]", "layout");
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        revalidatePath("/careers", "page");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to delete job opening." };
    }
}

export async function submitJobApplication(data: {
    jobId: string;
    name: string;
    email: string;
    resume: string;
    portfolio?: string;
    coverLetter?: string;
}) {
    try {
        await prisma.application.create({
            data: {
                jobId: data.jobId,
                name: data.name,
                email: data.email,
                resume: data.resume,
                portfolio: data.portfolio,
                coverLetter: data.coverLetter,
            }
        });
        revalidatePath("/dashboard/careers");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to submit application. Please try again." };
    }
}


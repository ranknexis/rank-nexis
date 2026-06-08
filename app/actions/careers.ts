"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkCareersPermission() {
    const session = await getSession();
    if (!session) return { allowed: false };
    const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
    const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_careers");
    return { allowed: isAllowed };
}

export async function createJob(data: {
    title: string;
    slug: string;
    description: string;
    location: string;
    type: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    internalLinks?: any;
}) {
    const { allowed } = await checkCareersPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

    try {
        const job = await prisma.job.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                location: data.location,
                type: data.type,
                responsibilities: data.responsibilities,
                requirements: data.requirements,
                benefits: data.benefits,
                active: true,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords || [],
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                ogImage: data.ogImage,
                canonicalUrl: data.canonicalUrl,
                noIndex: data.noIndex || false,
                internalLinks: data.internalLinks || []
            }
        });
        revalidatePath("/careers");
        revalidatePath("/careers/[slug]", "layout");
        revalidatePath("/dashboard/careers");
        revalidatePath("/");
        return { success: true, job, data: job };
    } catch (error) {
        return { success: false, error: "Failed to create job opening." };
    }
}

export async function toggleJobStatus(id: string, active: boolean) {
    const { allowed } = await checkCareersPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

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
        return { success: false, error: "Failed to update job status." };
    }
}

export async function deleteJob(id: string) {
    const { allowed } = await checkCareersPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

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
        return { success: false, error: "Failed to delete job opening." };
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
        return { success: false, error: "Failed to submit application. Please try again." };
    }
}

export async function updateJob(id: string, data: any) {
    const { allowed } = await checkCareersPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

    try {
        const updated = await prisma.job.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                location: data.location,
                type: data.type,
                responsibilities: data.responsibilities,
                requirements: data.requirements,
                benefits: data.benefits,
                active: data.active,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords || [],
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                ogImage: data.ogImage,
                canonicalUrl: data.canonicalUrl,
                noIndex: data.noIndex || false,
                internalLinks: data.internalLinks || []
            },
        });
        revalidatePath("/dashboard/careers");
        revalidatePath("/careers");
        revalidatePath(`/careers`);
        return { success: true, data: updated };
    } catch (error) {
        return { success: false, error: "Failed to save job listing." };
    }
}


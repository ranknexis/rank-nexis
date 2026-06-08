"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function createCaseStudy(data: any) {
    const session = await getSession();
    const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
    const hasPermission = session?.role === "ADMIN" || userPermissions.includes("manage_work");
    if (!session || !hasPermission) return { success: false, error: "Unauthorized" };

    const authorId = session.role === "ADMIN" ? data.authorId : session.id;

    try {
        const caseStudy = await prisma.caseStudy.create({
            data: {
                title: data.title,
                slug: data.slug,
                client: data.client,
                description: data.description,
                challenge: data.challenge,
                solution: data.solution,
                execution: data.execution,
                results: data.results,
                image: data.image,
                stats: data.stats,
                kpi: data.kpi,
                tag: data.tag,
                technologies: data.technologies,
                authorId,
                recommendations: data.recommendations || [],
                liveUrl: data.liveUrl || "",
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
        revalidatePath("/work");
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true, caseStudy, data: caseStudy };
    } catch (error) {
        return { success: false, error: "Failed to create case study." };
    }
}

export async function updateCaseStudy(id: string, data: any) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        const existing = await prisma.caseStudy.findUnique({ where: { id } });
        if (!existing) return { success: false, error: "Case study not found" };

        const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
        const hasManageWork = session.role === "ADMIN" || userPermissions.includes("manage_work");

        if (!hasManageWork && existing.authorId !== session.id) {
            return { success: false, error: "Permission denied" };
        }

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                client: data.client,
                description: data.description,
                challenge: data.challenge,
                solution: data.solution,
                execution: data.execution,
                results: data.results,
                image: data.image,
                stats: data.stats,
                kpi: data.kpi,
                tag: data.tag,
                technologies: data.technologies,
                authorId: session.role === "ADMIN" ? data.authorId : existing.authorId,
                recommendations: data.recommendations || [],
                liveUrl: data.liveUrl || "",
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
        revalidatePath("/work");
        revalidatePath(`/work/${caseStudy.slug}`);
        revalidatePath("/work/[slug]", "layout");
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true, caseStudy, data: caseStudy };
    } catch (error) {
        return { success: false, error: "Failed to update case study." };
    }
}

export async function deleteCaseStudy(id: string) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        const existing = await prisma.caseStudy.findUnique({ where: { id } });
        if (!existing) return { success: false, error: "Case study not found" };

        const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
        const hasManageWork = session.role === "ADMIN" || userPermissions.includes("manage_work");

        if (!hasManageWork && existing.authorId !== session.id) {
            return { success: false, error: "Permission denied" };
        }

        await prisma.caseStudy.delete({ where: { id } });
        revalidatePath("/work");
        revalidatePath("/dashboard/work");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete case study." };
    }
}

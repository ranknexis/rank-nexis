"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkServicesPermission() {
    const session = await getSession();
    if (!session) return { allowed: false };
    const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
    const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_services");
    return { allowed: isAllowed };
}

export async function createService(data: {
    title: string;
    slug: string;
    description: string;
    icon?: string;
    features: string[];
    order: number;
    category: string;
}) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { error: "Unauthorized" };

    try {
        const service = await prisma.service.create({
            data: {
                ...data,
                active: true
            }
        });
        revalidatePath("/services");
        revalidatePath("/services/[slug]", "layout");
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        return { success: true, service };
    } catch (error) {
        
        return { error: "Failed to create service." };
    }
}

export async function updateService(id: string, data: any) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { error: "Unauthorized" };

    try {
        const service = await prisma.service.update({
            where: { id },
            data
        });
        revalidatePath("/services");
        revalidatePath(`/services/${service.slug}`);
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        return { success: true, service };
    } catch (error) {
        
        return { error: "Failed to update service." };
    }
}

export async function toggleServiceStatus(id: string, active: boolean) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { error: "Unauthorized" };

    try {
        const service = await prisma.service.update({
            where: { id },
            data: { active }
        });
        revalidatePath("/services");
        revalidatePath(`/services/${service.slug}`);
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to update service status." };
    }
}

export async function deleteService(id: string) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { error: "Unauthorized" };

    try {
        const service = await prisma.service.findUnique({ where: { id } });
        await prisma.service.delete({ where: { id } });
        revalidatePath("/services");
        if (service) revalidatePath(`/services/${service.slug}`);
        revalidatePath("/services/[slug]", "layout");
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        revalidatePath("/services", "page");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to delete service." };
    }
}


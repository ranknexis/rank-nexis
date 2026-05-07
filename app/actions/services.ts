"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createService(data: {
    title: string;
    slug: string;
    description: string;
    icon?: string;
    features: string[];
    order: number;
    category: string;
}) {
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


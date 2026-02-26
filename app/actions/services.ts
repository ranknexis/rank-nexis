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
        revalidatePath("/admin/services");
        return { success: true, service };
    } catch (error) {
        console.error("Create Service Error:", error);
        return { error: "Failed to create service." };
    }
}

export async function updateService(id: string, data: any) {
    try {
        await prisma.service.update({
            where: { id },
            data
        });
        revalidatePath("/services");
        revalidatePath("/admin/services");
        return { success: true };
    } catch (error) {
        console.error("Update Service Error:", error);
        return { error: "Failed to update service." };
    }
}

export async function toggleServiceStatus(id: string, active: boolean) {
    try {
        await prisma.service.update({
            where: { id },
            data: { active }
        });
        revalidatePath("/services");
        revalidatePath("/admin/services");
        return { success: true };
    } catch (error) {
        console.error("Toggle Service Status Error:", error);
        return { error: "Failed to update service status." };
    }
}

export async function deleteService(id: string) {
    try {
        await prisma.service.delete({ where: { id } });
        revalidatePath("/services");
        revalidatePath("/admin/services");
        return { success: true };
    } catch (error) {
        console.error("Delete Service Error:", error);
        return { error: "Failed to delete service." };
    }
}

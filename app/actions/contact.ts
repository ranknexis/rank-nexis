"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Missing required identification or mission objectives." };
    }

    try {
        await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                service: service || "Strategic Sync",
                message,
                status: "NEW"
            }
        });

        revalidatePath("/dashboard/leads");
        return { success: true };
    } catch (error) {
        
        return { error: "Transmission error. Please verify your connection and retry." };
    }
}

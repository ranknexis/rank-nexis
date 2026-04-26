"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const budget = formData.get("budget") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Missing required fields" };
    }

    try {
        await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                message: `[Service: ${service}] [Budget: ${budget}] ${message}`,
                status: "NEW"
            }
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Submission Error:", error);
        return { error: "Submission failed. Please try again later." };
    }
}


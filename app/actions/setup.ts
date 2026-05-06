"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function setupPassword(password: string) {
    const session = await getSession();
    if (!session) return { error: "Session expired" };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await prisma.user.update({
            where: { id: session.id },
            data: {
                password: hashedPassword,
                passwordSet: true
            }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update password" };
    }
}

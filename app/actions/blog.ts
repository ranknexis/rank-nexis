"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function createBlogPost(data: {
    title: string;
    slug: string;
    content: string;
    categoryId: string;
    authorId: string;
    image?: string;
    metaTitle?: string;
    metaDescription?: string;
}) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    // If not admin, force authorId to current user
    const finalAuthorId = session.role === "ADMIN" ? data.authorId : session.id;

    try {
        const post = await prisma.blog.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                categoryId: data.categoryId,
                authorId: finalAuthorId,
                image: data.image,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
            }
        });
        revalidatePath("/blog");
        revalidatePath("/dashboard/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Create Blog Error:", error);
        return { error: "Failed to create blog post." };
    }
}

export async function updateBlogPost(id: string, data: any) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        // Ownership check
        const existing = await prisma.blog.findUnique({ where: { id } });
        if (!existing) return { error: "Post not found" };
        
        if (session.role !== "ADMIN" && existing.authorId !== session.id) {
            return { error: "Permission denied" };
        }

        const post = await prisma.blog.update({
            where: { id },
            data: {
                ...data,
                // Ensure non-admins can't change author
                authorId: session.role === "ADMIN" ? data.authorId : existing.authorId
            }
        });
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/dashboard/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Update Blog Error:", error);
        return { error: "Failed to update blog post." };
    }
}

export async function deleteBlogPost(id: string) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        const existing = await prisma.blog.findUnique({ where: { id } });
        if (!existing) return { error: "Post not found" };
        
        if (session.role !== "ADMIN" && existing.authorId !== session.id) {
            return { error: "Permission denied" };
        }

        await prisma.blog.delete({ where: { id } });
        revalidatePath("/blog");
        revalidatePath("/dashboard/blog");
        return { success: true };
    } catch (error) {
        console.error("Delete Blog Error:", error);
        return { error: "Failed to delete blog post." };
    }
}

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(data: {
    title: string;
    slug: string;
    content: string;
    categoryId: string;
    authorId: string;
    image?: string;
}) {
    try {
        const post = await prisma.blog.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                categoryId: data.categoryId,
                authorId: data.authorId,
                image: data.image,
            }
        });
        revalidatePath("/blog");
        revalidatePath("/admin/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Create Blog Error:", error);
        return { error: "Failed to create blog post." };
    }
}

export async function updateBlogPost(id: string, data: any) {
    try {
        const post = await prisma.blog.update({
            where: { id },
            data
        });
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/admin/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Update Blog Error:", error);
        return { error: "Failed to update blog post." };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await prisma.blog.delete({ where: { id } });
        revalidatePath("/blog");
        revalidatePath("/admin/blog");
        return { success: true };
    } catch (error) {
        console.error("Delete Blog Error:", error);
        return { error: "Failed to delete blog post." };
    }
}


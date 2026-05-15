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
        revalidatePath("/");
        return { success: true, data: post };
    } catch (error) {
        
        return { error: "Failed to create blog post." };
    }
}

export async function updateBlogPost(id: string, data: any) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    try {
        
        const existing = await prisma.blog.findUnique({ where: { id } });
        if (!existing) return { error: "Post not found" };
        
        if (session.role !== "ADMIN" && existing.authorId !== session.id) {
            return { error: "Permission denied" };
        }

        const post = await prisma.blog.update({
            where: { id },
            data: {
                ...data,
                
                authorId: session.role === "ADMIN" ? data.authorId : existing.authorId
            }
        });
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/blog/[slug]", "layout");
        revalidatePath("/dashboard/blog");
        revalidatePath("/");
        revalidatePath("/blog", "page");
        return { success: true, data: post };
    } catch (error) {
        
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
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        
        return { error: "Failed to delete blog post." };
    }
}

export async function createBlogCategory(data: { name: string; slug: string }) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        const category = await prisma.blogCategory.create({ data });
        revalidatePath("/dashboard/blog");
        return { success: true, data: category };
    } catch (error) {
        return { error: "Failed to create category." };
    }
}

export async function updateBlogCategory(id: string, data: any) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        const category = await prisma.blogCategory.update({
            where: { id },
            data
        });
        revalidatePath("/dashboard/blog");
        return { success: true, data: category };
    } catch (error) {
        return { error: "Failed to update category." };
    }
}

export async function deleteBlogCategory(id: string) {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

    try {
        const blogsCount = await prisma.blog.count({ where: { categoryId: id } });
        if (blogsCount > 0) return { error: "Category is not empty. Reassign blogs first." };

        await prisma.blogCategory.delete({ where: { id } });
        revalidatePath("/dashboard/blog");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete category." };
    }
}

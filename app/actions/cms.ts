"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- BLOG ACTIONS ---
export async function updateBlogPost(id: string, data: any) {
  try {
    const updated = await prisma.blog.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/blog");
    revalidatePath(`/blog/${updated.slug}`);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { success: false, error: "Failed to save publication." };
  }
}

export async function createBlogPost(data: any) {
  try {
    const created = await prisma.blog.create({
      data,
    });
    revalidatePath("/dashboard/blog");
    return { success: true, data: created };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false, error: "Failed to create publication." };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/dashboard/blog");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- CASE STUDY ACTIONS ---
export async function updateCaseStudy(id: string, data: any) {
  try {
    const updated = await prisma.caseStudy.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/work");
    revalidatePath(`/work/${updated.slug}`);
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: "Failed to save case study." };
  }
}

export async function createCaseStudy(data: any) {
  try {
    const created = await prisma.caseStudy.create({ data });
    revalidatePath("/dashboard/work");
    return { success: true, data: created };
  } catch (error) {
    return { success: false, error: "Failed to create case study." };
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    await prisma.caseStudy.delete({ where: { id } });
    revalidatePath("/dashboard/work");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- JOB ACTIONS ---
export async function updateJob(id: string, data: any) {
  try {
    const updated = await prisma.job.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/careers");
    revalidatePath(`/careers`); // List page
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: "Failed to save job listing." };
  }
}

export async function createJob(data: any) {
  try {
    const created = await prisma.job.create({ data });
    revalidatePath("/dashboard/careers");
    return { success: true, data: created };
  } catch (error) {
    return { success: false, error: "Failed to create job listing." };
  }
}

export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({ where: { id } });
    revalidatePath("/dashboard/careers");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}


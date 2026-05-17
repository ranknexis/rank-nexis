"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkFeedbackPermission() {
  const session = await getSession();
  if (!session) return { allowed: false };
  const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
  const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_feedback");
  return { allowed: isAllowed };
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, testimonials };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addTestimonial(data: any) {
  const { allowed } = await checkFeedbackPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        content: data.content,
        image: data.image,
        rating: data.rating || 5,
        status: data.status || 'published'
      }
    });
    revalidatePath('/dashboard/feedback');
    revalidatePath('/');
    revalidatePath('/', 'layout');
    return { success: true, testimonial };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTestimonial(id: string, data: any) {
  const { allowed } = await checkFeedbackPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data
    });
    revalidatePath('/dashboard/feedback');
    revalidatePath('/');
    revalidatePath('/', 'layout');
    return { success: true, testimonial };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  const { allowed } = await checkFeedbackPermission();
  if (!allowed) return { success: false, error: "Unauthorized" };

  try {
    await prisma.testimonial.delete({
      where: { id }
    });
    revalidatePath('/dashboard/feedback');
    revalidatePath('/');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

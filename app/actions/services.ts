"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function checkServicesPermission() {
    const session = await getSession();
    if (!session) return { allowed: false };
    const userPermissions = Array.isArray(session?.permissions) ? session.permissions : JSON.parse((session?.permissions as string) || "[]");
    const isAllowed = session.role === "ADMIN" || userPermissions.includes("manage_services");
    return { allowed: isAllowed };
}

export async function createService(data: {
    title: string;
    slug: string;
    description: string;
    icon?: string;
    features: string[];
    order: number;
    category: string;
    active?: boolean;
    subItems?: any[];
    industries?: any;
    recommendations?: any;
    faqs?: any;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    internalLinks?: any;
}) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

    try {
        const service = await prisma.$transaction(async (tx) => {
            const s = await tx.service.create({
                data: {
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    icon: data.icon,
                    features: data.features,
                    order: Number(data.order) || 0,
                    category: data.category,
                    active: data.active !== undefined ? data.active : true,
                    recommendations: data.recommendations || [],
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    metaKeywords: data.metaKeywords || [],
                    ogTitle: data.ogTitle,
                    ogDescription: data.ogDescription,
                    ogImage: data.ogImage,
                    canonicalUrl: data.canonicalUrl,
                    noIndex: data.noIndex || false,
                    internalLinks: data.internalLinks || []
                }
            });

            const defaultSubItems = data.subItems || [
                {
                    label: "Core Expertise",
                    title: `Advanced Solutions in ${data.title}`,
                    body: `<p>We provide full scale strategy and optimization services designed to elevate your business performance. Our approach is custom built around key client outcomes.</p>`,
                    imageUrl: "",
                    tags: data.features.map((f: string) => ({ text: f }))
                }
            ];

            const initialSections: any[] = [
                {
                    sectionKey: "hero",
                    sectionType: "hero",
                    label: "Hero Header",
                    order: 0,
                    content: {
                        badge: data.category === "MARKETING" ? "Marketing & Growth" : data.category === "CREATIVE" ? "Creative & Design" : "Development & Software",
                        title: `${data.title} Services`,
                        titleAccent: "",
                        subtext: data.description,
                        metrics: [
                            { value: "100+", label: "Successful Projects" },
                            { value: "5x", label: "Average Growth Rate" },
                            { value: "99%", label: "Client Satisfaction" }
                        ]
                    }
                }
            ];

            defaultSubItems.forEach((item: any, i: number) => {
                initialSections.push({
                    sectionKey: `text_block_${i + 1}`,
                    sectionType: "text_block",
                    label: `Sub-Item #${i + 1}`,
                    order: i + 1,
                    content: {
                        label: item.label || "Core Expertise",
                        title: item.title || `Expertise in ${data.title}`,
                        body: item.body || "",
                        imageUrl: item.imageUrl || "",
                        tags: item.tags || []
                    }
                });
            });

            if (data.industries) {
                initialSections.push({
                    sectionKey: "table_01",
                    sectionType: "table",
                    label: "Industries Served Details",
                    order: defaultSubItems.length + 1,
                    content: {
                        badge: "Market Sectors",
                        heading: data.industries.heading || "Industries We Support",
                        rows: data.industries.rows || []
                    }
                });
            } else {
                initialSections.push({
                    sectionKey: "table_01",
                    sectionType: "table",
                    label: "Industries Served Details",
                    order: defaultSubItems.length + 1,
                    content: {
                        badge: "Market Sectors",
                        heading: "Industries We Support",
                        rows: [
                            { industry: "E-Commerce & Retail", specialty: "Revenue Scaling & Customer Retention" },
                            { industry: "SaaS & Tech Startups", specialty: "Lead Generation & Product Traction" },
                            { industry: "Healthcare & FinTech", specialty: "Compliance-Driven Customer Acquisition" }
                        ]
                    }
                });
            }

            const defaultFaqs = data.faqs || {
                heading: "Frequently Asked Questions",
                items: [
                    { question: "What is your project timeline?", answer: "Typical engagements deliver strategy in 2 weeks and full deployment in 4-6 weeks." },
                    { question: "How do you measure project success?", answer: "We define precise KPIs around organic ranking increases, conversions, and revenue growth." }
                ]
            };

            initialSections.push({
                sectionKey: "faq_01",
                sectionType: "faq",
                label: "Frequently Asked Questions",
                order: defaultSubItems.length + 2,
                content: {
                    heading: defaultFaqs.heading || "Frequently Asked Questions",
                    items: defaultFaqs.items || []
                }
            });

            await tx.pageContent.create({
                data: {
                    slug: `services/${data.slug}`,
                    title: `${data.title} Services`,
                    metaTitle: `${data.title} | RankNexis`,
                    metaDescription: data.description,
                    status: "published",
                    sections: {
                        create: initialSections
                    }
                }
            });

            return s;
        });

        revalidatePath("/services");
        revalidatePath("/services/[slug]", "layout");
        revalidatePath(`/services/${service.slug}`);
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        revalidatePath("/", "layout");
        revalidatePath("/sitemap.xml");
        return { success: true, service, data: service };
    } catch (error) {
        console.error("Failed to create service:", error);
        return { success: false, error: "Failed to create service." };
    }
}

export async function updateService(id: string, data: any) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

    try {
        const oldService = await prisma.service.findUnique({ where: { id } });
        if (!oldService) {
            return { success: false, error: "Service not found." };
        }

        const service = await prisma.$transaction(async (tx) => {
            const updated = await tx.service.update({
                where: { id },
                data: {
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    icon: data.icon,
                    features: data.features,
                    order: Number(data.order) || 0,
                    category: data.category,
                    active: data.active,
                    recommendations: data.recommendations || [],
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    metaKeywords: data.metaKeywords || [],
                    ogTitle: data.ogTitle,
                    ogDescription: data.ogDescription,
                    ogImage: data.ogImage,
                    canonicalUrl: data.canonicalUrl,
                    noIndex: data.noIndex || false,
                    internalLinks: data.internalLinks || []
                }
            });

            const existingPage = await tx.pageContent.findUnique({
                where: { slug: `services/${oldService.slug}` }
            });

            const subItemsList = data.subItems || [];
            const industriesData = data.industries || { heading: "Industries We Support", rows: [] };
            const faqsData = data.faqs || { heading: "Frequently Asked Questions", items: [] };

            if (existingPage) {
                await tx.pageContent.update({
                    where: { id: existingPage.id },
                    data: {
                        slug: `services/${data.slug}`,
                        title: `${data.title} Services`,
                        metaTitle: `${data.title} | RankNexis`,
                        metaDescription: data.description,
                    }
                });

                // Update Hero content details (if it exists)
                const heroSection = await tx.pageSection.findFirst({
                    where: { pageId: existingPage.id, sectionType: "hero" }
                });
                if (heroSection) {
                    const heroContent = (heroSection.content as any) || {};
                    await tx.pageSection.update({
                        where: { id: heroSection.id },
                        data: {
                            content: {
                                ...heroContent,
                                title: `${data.title} Services`,
                                subtext: data.description
                            }
                        }
                    });
                }

                // Re-create text block/table sections
                await tx.pageSection.deleteMany({
                    where: {
                        pageId: existingPage.id,
                        sectionType: { in: ["text_block", "text_image", "table", "faq"] }
                    }
                });

                const sectionsToCreate: any[] = [];
                subItemsList.forEach((item: any, i: number) => {
                    sectionsToCreate.push({
                        pageId: existingPage.id,
                        sectionKey: `text_block_${i + 1}`,
                        sectionType: "text_block",
                        label: `Sub-Item #${i + 1}`,
                        order: i + 1,
                        content: {
                            label: item.label || "Core Expertise",
                            title: item.title,
                            body: item.body,
                            imageUrl: item.imageUrl,
                            tags: item.tags || []
                        }
                    });
                });

                sectionsToCreate.push({
                    pageId: existingPage.id,
                    sectionKey: "table_01",
                    sectionType: "table",
                    label: "Industries Served Details",
                    order: subItemsList.length + 1,
                    content: {
                        badge: "Market Sectors",
                        heading: industriesData.heading,
                        rows: industriesData.rows || []
                    }
                });

                sectionsToCreate.push({
                    pageId: existingPage.id,
                    sectionKey: "faq_01",
                    sectionType: "faq",
                    label: "Frequently Asked Questions",
                    order: subItemsList.length + 2,
                    content: {
                        heading: faqsData.heading || "Frequently Asked Questions",
                        items: faqsData.items || []
                    }
                });

                await tx.pageSection.createMany({
                    data: sectionsToCreate
                });

            } else {
                // Page Content didn't exist, create fresh
                const initialSections: any[] = [
                    {
                        sectionKey: "hero",
                        sectionType: "hero",
                        label: "Hero Header",
                        order: 0,
                        content: {
                            badge: data.category === "MARKETING" ? "Marketing & Growth" : data.category === "CREATIVE" ? "Creative & Design" : "Development & Software",
                            title: `${data.title} Services`,
                            titleAccent: "",
                            subtext: data.description,
                            metrics: [
                                { value: "100+", label: "Successful Projects" },
                                { value: "5x", label: "Average Growth Rate" },
                                { value: "99%", label: "Client Satisfaction" }
                            ]
                        }
                    }
                ];

                subItemsList.forEach((item: any, i: number) => {
                    initialSections.push({
                        sectionKey: `text_block_${i + 1}`,
                        sectionType: "text_block",
                        label: `Sub-Item #${i + 1}`,
                        order: i + 1,
                        content: {
                            label: "Core Expertise",
                            title: item.title,
                            body: item.body,
                            imageUrl: item.imageUrl,
                            tags: item.tags || []
                        }
                    });
                });

                initialSections.push({
                    sectionKey: "table_01",
                    sectionType: "table",
                    label: "Industries Served Details",
                    order: subItemsList.length + 1,
                    content: {
                        badge: "Market Sectors",
                        heading: industriesData.heading,
                        rows: industriesData.rows || []
                    }
                });

                initialSections.push({
                    sectionKey: "faq_01",
                    sectionType: "faq",
                    label: "Frequently Asked Questions",
                    order: subItemsList.length + 2,
                    content: {
                        heading: faqsData.heading || "Frequently Asked Questions",
                        items: faqsData.items || []
                    }
                });

                await tx.pageContent.create({
                    data: {
                        slug: `services/${data.slug}`,
                        title: `${data.title} Services`,
                        metaTitle: `${data.title} | RankNexis`,
                        metaDescription: data.description,
                        status: "published",
                        sections: {
                            create: initialSections
                        }
                    }
                });
            }

            return updated;
        });

        revalidatePath("/services");
        revalidatePath(`/services/${oldService.slug}`);
        revalidatePath(`/services/${service.slug}`);
        revalidatePath("/dashboard/services");
        revalidatePath("/");
        revalidatePath("/", "layout");
        revalidatePath("/sitemap.xml");
        return { success: true, service, data: service };
    } catch (error) {
        console.error("Failed to update service:", error);
        return { success: false, error: "Failed to update service." };
    }
}

export async function toggleServiceStatus(id: string, active: boolean) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

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
        return { success: false, error: "Failed to update service status." };
    }
}

export async function deleteService(id: string) {
    const { allowed } = await checkServicesPermission();
    if (!allowed) return { success: false, error: "Unauthorized" };

    try {
        const service = await prisma.service.findUnique({ where: { id } });
        if (service) {
            await prisma.$transaction([
                prisma.pageContent.deleteMany({
                    where: { slug: `services/${service.slug}` }
                }),
                prisma.service.delete({ where: { id } })
            ]);
            revalidatePath("/services");
            revalidatePath(`/services/${service.slug}`);
            revalidatePath("/services/[slug]", "layout");
            revalidatePath("/dashboard/services");
            revalidatePath("/");
            revalidatePath("/services", "page");
            revalidatePath("/", "layout");
            revalidatePath("/sitemap.xml");
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to delete service:", error);
        return { success: false, error: "Failed to delete service." };
    }
}


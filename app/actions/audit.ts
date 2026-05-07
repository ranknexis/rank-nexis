"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function createAuditLog(action: string, target: string, details?: string) {
    const session = await getSession();
    
    try {
        await prisma.auditLog.create({
            data: {
                action,
                target,
                details,
                userId: session?.id,
                userName: session?.name,
                userRole: session?.role
            }
        });
    } catch (error) {
        
    }
}

export async function getAuditLogs(limit = 10) {
    try {
        return await prisma.auditLog.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        
        return [];
    }
}

export async function getSystemReportData() {
    const [users, leads, blogs, studies, logs] = await Promise.all([
        prisma.user.count(),
        prisma.lead.count(),
        prisma.blog.count(),
        prisma.caseStudy.count(),
        prisma.auditLog.findMany({ take: 20, orderBy: { createdAt: 'desc' } })
    ]);

    return {
        counts: {
            users,
            leads,
            blogs,
            studies
        },
        recentLogs: JSON.parse(JSON.stringify(logs))
    };
}

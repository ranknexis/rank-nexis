import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save to NeonDB via Prisma
        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                message,
                status: "NEW"
            }
        });

        console.log("Lead Synchronized:", lead.id);

        return NextResponse.json({
            success: true,
            message: "Growth Sync Initialized Successfully",
            syncId: lead.id,
        });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

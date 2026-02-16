// import prisma from "@/lib/prisma";
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

        // Save to NeonDB via Prisma (Disabled for UI-only deploy)
        /*
        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                message,
                status: "NEW"
            }
        });
        */

        console.log("Lead Received (UI-Only Mode):", { name, email });

        return NextResponse.json({
            success: true,
            message: "Growth Sync Initialized Successfully",
            syncId: "mock-sync-id-" + Date.now(),
        });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

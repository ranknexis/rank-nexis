import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                company: company || null,
                message,
                status: "NEW"
            }
        });

        return NextResponse.json({ 
            success: true,
            message: "Success"
        });
    } catch (error) {
        
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

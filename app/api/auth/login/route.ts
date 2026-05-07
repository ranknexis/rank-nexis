import { login } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const allowedRoles = ["ADMIN", "TEAM_MEMBER"];
        if (!allowedRoles.includes(user.role)) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 403 }
            );
        }

        await login({
            id: user.id,
            email: user.email,
            role: user.role,
            passwordSet: user.passwordSet,
            permissions: user.permissions
        });

        return NextResponse.json({ 
            success: true,
            passwordSet: user.passwordSet
        });
    } catch (error) {
        
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        );
    }
}

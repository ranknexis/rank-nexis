"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

import { ACCESS_SECRET, REFRESH_SECRET } from "./auth-config";

export async function encrypt(payload: any, secret: Uint8Array, expiresIn: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function decrypt(input: string, secret: Uint8Array): Promise<any> {
    const { payload } = await jwtVerify(input, secret, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function verifyToken(token: string) {
    return await decrypt(token, ACCESS_SECRET);
}

export async function login(userData: { id: string; email: string; name?: string | null; role: string; permissions?: any }) {
    const accessToken = await encrypt(userData, ACCESS_SECRET, "24h");
    const refreshToken = await encrypt({ id: userData.id }, REFRESH_SECRET, "7d");

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: userData.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
    });

    const cookieStore = await cookies();
    
    cookieStore.set("session", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60,
        path: "/"
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/"
    });
}

export async function logout() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
        await prisma.refreshToken.deleteMany({
            where: { token: refreshToken }
        });
    }

    cookieStore.set("session", "", { expires: new Date(0) });
    cookieStore.set("refreshToken", "", { expires: new Date(0) });
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    
    try {
        return await decrypt(token, ACCESS_SECRET);
    } catch (error) {
        return null;
    }
}

export async function refreshAccessToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) return null;

    try {
        const payload = await decrypt(refreshToken, REFRESH_SECRET);
        
        const dbToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true }
        });

        if (!dbToken || dbToken.expiresAt < new Date()) {
            return null;
        }

        const user = dbToken.user;
        const newAccessToken = await encrypt({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: user.permissions
        }, ACCESS_SECRET, "24h");

        cookieStore.set("session", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60,
            path: "/"
        });

        return { accessToken: newAccessToken, user: { id: user.id, email: user.email, role: user.role } };
    } catch (error) {
        return null;
    }
}

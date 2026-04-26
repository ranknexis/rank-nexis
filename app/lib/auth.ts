import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || "rank_nexis_secret_fallback_key_2026"
);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, SECRET_KEY, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(userData: { id: string; email: string; role: string }) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ ...userData, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });
    return res;
}


import { jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "rank_nexis_access_secret_2026"
);

export async function decrypt(input: string, secret: Uint8Array): Promise<any> {
    const { payload } = await jwtVerify(input, secret, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSessionFromToken(token: string) {
    try {
        return await decrypt(token, ACCESS_SECRET);
    } catch (error) {
        return null;
    }
}

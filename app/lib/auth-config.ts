export const ACCESS_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "rank_nexis_access_secret_2026"
);

export const REFRESH_SECRET = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET || "rank_nexis_refresh_secret_2026"
);

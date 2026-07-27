export const CONFIG = {
    DB_PATH: "./primordia.db",
    // AI
    AI_URL: Deno.env.get("AI_URL"),
    // Identity / tokens
    X_TOKEN: Deno.env.get("X_TOKEN"),
    IG_TOKEN: Deno.env.get("IG_TOKEN"),
    YT_TOKEN: Deno.env.get("YT_TOKEN"),
    REDDIT_TOKEN: Deno.env.get("REDDIT_TOKEN"),
    FB_TOKEN: Deno.env.get("FB_TOKEN"),
    LINKEDIN_TOKEN: Deno.env.get("LINKEDIN_TOKEN"),
    // Optional: identity metadata
    SERVICE_ID: Deno.env.get("PRIMORDIA_SERVICE_ID") ?? "PrimordiaOS",
};

import { CONFIG } from "./config.ts";
export function getIdentity() {
    return {
        serviceId: CONFIG.SERVICE_ID,
        platforms: {
            x: !!CONFIG.X_TOKEN,
            instagram: !!CONFIG.IG_TOKEN,
            youtube: !!CONFIG.YT_TOKEN,
            reddit: !!CONFIG.REDDIT_TOKEN,
            facebook: !!CONFIG.FB_TOKEN,
            linkedin: !!CONFIG.LINKEDIN_TOKEN,
        },
    };
}
export function assertPlatformIdentity(platform) {
    const id = getIdentity();
    if (!id.platforms[platform]) {
        throw new Error(`Identity for platform "${platform}" is not configured. Set the appropriate token in environment variables.`);
    }
}

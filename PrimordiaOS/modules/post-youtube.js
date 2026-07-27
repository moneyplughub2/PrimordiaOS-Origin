import { assertPlatformIdentity } from "../identity.ts";
export async function postToYouTube(caption) {
    assertPlatformIdentity("youtube");
    console.log("[YouTube] Posting:", caption);
    // Placeholder until real YouTube upload API is added
    return {
        status: "ok",
        caption,
    };
}

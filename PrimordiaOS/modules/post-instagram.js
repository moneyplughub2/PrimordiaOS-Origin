import { assertPlatformIdentity } from "../identity.ts";
export async function postToInstagram(caption) {
    assertPlatformIdentity("instagram");
    console.log("[Instagram] Posting:", caption);
    // Placeholder until real IG Graph API is added
    return {
        status: "ok",
        caption,
    };
}

import { CONFIG } from "../config.ts";
import { assertPlatformIdentity } from "../identity.ts";
export async function postToX(caption) {
    assertPlatformIdentity("reddit");
    await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${CONFIG.X_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: caption }),
    });
}

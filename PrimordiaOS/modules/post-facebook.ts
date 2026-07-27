import { CONFIG } from "../config";
import { assertPlatformIdentity } from "../identity";

export async function postToFacebook(caption: string) {
  assertPlatformIdentity("facebook");

  await fetch("https://graph.facebook.com/v18.0/me/feed", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(CONFIG as any).FB_TOKEN || ''}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: caption }),
  });
}

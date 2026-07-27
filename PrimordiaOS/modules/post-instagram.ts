import { CONFIG } from "../config";
import { assertPlatformIdentity } from "../identity";

export async function postToInstagram(caption: string, mediaUrl: string) {
  assertPlatformIdentity("instagram");

  await fetch("https://graph.facebook.com/v18.0/me/media", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(CONFIG as any).IG_TOKEN || ''}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ caption, image_url: mediaUrl }),
  });
}

import { CONFIG } from "../config";
import { assertPlatformIdentity } from "../identity";

export async function postToX(caption: string) {
  assertPlatformIdentity("x");

  await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(CONFIG as any).X_TOKEN || ''}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: caption }),
  });
}

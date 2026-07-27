import { CONFIG } from "../config";
import { assertPlatformIdentity } from "../identity";

export async function postToReddit(title: string, text: string) {
  assertPlatformIdentity("reddit");

  await fetch("https://oauth.reddit.com/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(CONFIG as any).REDDIT_TOKEN || ''}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `kind=self&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`,
  });
}

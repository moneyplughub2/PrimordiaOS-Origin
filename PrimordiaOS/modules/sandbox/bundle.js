import { bootstrapUnrealIntegration } from "../unreal/bootstrap.js";
import { TikTokLive } from "../live/tiktok-live-engine.js";
import { Platform } from "../platform/unified-platform.js";
import { Social } from "../platform/social-graph.js";
import { Content } from "../platform/content-graph.js";
import { Scheduler } from "../automation/scheduler.js";

export function startSandbox() {
  console.log("[PrimordiaOS] Sandbox bundle starting...");

  bootstrapUnrealIntegration();
  TikTokLive.start();
  Scheduler.start();

  const enabled = Social.enabled();
  console.log("[PrimordiaOS] Enabled social platforms:", enabled);

  const allContent = Content.all();
  console.log("[PrimordiaOS] Content graph:", allContent);

  Platform.registerContent({ id: "sandbox-demo", type: "test" });
  Platform.broadcastContent({ id: "sandbox-demo", type: "test" });
}

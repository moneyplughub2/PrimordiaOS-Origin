type LiveSegment =
  | { type: "podcast"; id: string }
  | { type: "technophysical_episode"; id: string }
  | { type: "affiliate_overlay" }
  | { type: "stats" }
  | { type: "cosmic_visual" };

export class TikTokLiveEngine {
  private running = false;
  private queue: LiveSegment[] = [];

  start() {
    this.running = true;
    console.log("[TikTokLive] Started 24h loop");
    this.loop();
  }

  stop() {
    this.running = false;
    console.log("[TikTokLive] Stopped");
  }

  enqueue(segment: LiveSegment) {
    this.queue.push(segment);
  }

  private async loop() {
    while (this.running) {
      const segment = this.queue.shift();
      if (!segment) {
        console.log("[TikTokLive] Idle cosmic visual");
      } else {
        console.log("[TikTokLive] Playing segment:", segment);
      }
      await new Promise(r => setTimeout(r, 60_000)); // 1 minute per segment
    }
  }
}

export const TikTokLive = new TikTokLiveEngine();

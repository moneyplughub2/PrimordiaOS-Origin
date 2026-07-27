// ────────────────────────────────────────────────────────────
//  PrimordiaPostSkill.ts
//  Multi‑Platform Posting Engine of PrimordiaOS
//  TikTok → Instagram → YouTube
// ────────────────────────────────────────────────────────────
import { TikTokChannel } from "../channels/TikTokChannel";
import { InstagramChannel } from "../channels/InstagramChannel";
import { YouTubeChannel } from "../channels/YouTubeChannel";
import { PrimordiaLogStream } from "../PrimordiaLogStream";
export const PrimordiaPostSkill = {
    name: "PrimordiaPostSkill",
    description: "Routes content to one or more PrimordiaChannels for posting.",
    async run(task) {
        const { payload } = task;
        const { caption, video_url, tags } = payload;
        const channels = [TikTokChannel, InstagramChannel, YouTubeChannel];
        const results = [];
        for (const channel of channels) {
            const res = await channel.post({ caption, video_url, tags });
            PrimordiaLogStream.recordChannel({
                event: "PrimordiaChannel.Post",
                channel: channel.name,
                payload,
                result: res,
                timestamp: new Date().toISOString(),
            });
            results.push({
                channel: channel.name,
                ...res,
            });
        }
        const primary = results[0] || {
            success: false,
            post_id: null,
            status: "No channels available",
        };
        return {
            success: primary.success,
            post_id: primary.post_id,
            status: primary.status,
            channels: results,
        };
    },
};

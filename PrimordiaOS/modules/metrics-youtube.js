import { CONFIG } from "../config.ts";
export async function fetchYouTubeMetrics() {
    const res = await fetch("https://youtube.googleapis.com/youtube/v3/analytics", {
        headers: { Authorization: `Bearer ${CONFIG.YT_TOKEN}` }
    });
    const data = await res.json();
    return {
        retention: data.retention ?? 50,
        completion: data.completion ?? 50,
        ctr: data.ctr ?? 5,
        engagement: data.engagement ?? 10
    };
}

import { fetchYouTubeMetrics } from "./modules/metrics-youtube.ts";
export async function ingestMetrics() {
    const yt = await fetchYouTubeMetrics();
    return yt;
}

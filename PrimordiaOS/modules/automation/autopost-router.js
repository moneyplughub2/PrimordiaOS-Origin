import { Channels } from "./channel-registry";
import { postToMoneyPlugHub } from "./channels/moneyplughub";
import { postToTechnophysical } from "./channels/technophysical";
import { postToTikTok } from "./channels/tiktok";
import { scheduleTikTokLiveSegment } from "./channels/tiktok_live";
export async function autopost(channel, content) {
    const cfg = Channels.get(channel);
    if (!cfg) {
        console.warn("[Autopost] Channel disabled or missing:", channel);
        return;
    }
    switch (channel) {
        case "moneyplughub":
            return postToMoneyPlugHub(content);
        case "technophysical":
            return postToTechnophysical(content);
        case "tiktok":
            return postToTikTok(content);
        case "tiktok_live":
            return scheduleTikTokLiveSegment(content);
        default:
            console.log("[Autopost] Generic channel:", channel, "content:", content);
    }
}

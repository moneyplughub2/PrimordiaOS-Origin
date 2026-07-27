import { uid } from "../../core/utils/id";
export function generateReferralLink(config, userId, campaign) {
    const clickId = uid();
    const url = new URL(config.baseUrl);
    url.searchParams.set("cid", clickId);
    url.searchParams.set("user", userId);
    url.searchParams.set("campaign", campaign);
    if (config.params) {
        for (const [k, v] of Object.entries(config.params)) {
            url.searchParams.set(k, v);
        }
    }
    return {
        clickId,
        url: url.toString()
    };
}

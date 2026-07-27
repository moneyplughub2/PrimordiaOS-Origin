import { uid } from "../../core/utils/id";

export type ReferralLinkConfig = {
  source: string;          // "maxbounty" | "stack30" | "crypto" | "moneyplughub"
  baseUrl: string;         // e.g. "https://track.example.com/click"
  params?: Record<string, string>;
};

export function generateReferralLink(
  config: ReferralLinkConfig,
  userId: string,
  campaign: string
) {
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

import { uid } from "../../core/utils/id";
import { now } from "../../core/utils/time";

export type ReferralSource = "maxbounty" | "stack30" | "crypto" | "moneyplughub";

export type ReferralEvent = {
  id: string;
  source: ReferralSource;
  campaign: string;
  clickId?: string;
  userId?: string;
  meta?: any;
  timestamp: number;
};

export class ReferralEngine {
  private events: ReferralEvent[] = [];

  track(event: ReferralEvent) {
    this.events.push(event);
    console.log("[ReferralEngine] Event:", event);
  }

  all() {
    return this.events;
  }

  bySource(source: ReferralSource) {
    return this.events.filter(e => e.source === source);
  }

  byCampaign(campaign: string) {
    return this.events.filter(e => e.campaign === campaign);
  }
}

export const Referrals = new ReferralEngine();

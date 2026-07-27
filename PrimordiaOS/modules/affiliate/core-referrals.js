export class ReferralEngine {
    events = [];
    track(event) {
        this.events.push(event);
        console.log("[ReferralEngine] Event:", event);
    }
    all() {
        return this.events;
    }
    bySource(source) {
        return this.events.filter(e => e.source === source);
    }
    byCampaign(campaign) {
        return this.events.filter(e => e.campaign === campaign);
    }
}
export const Referrals = new ReferralEngine();

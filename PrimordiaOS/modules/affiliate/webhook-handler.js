import { Webhooks } from "./webhook-registry";
import { routeReferral } from "./referral-router";
export function handleWebhookEvent(source, payload, signature) {
    const configs = Webhooks.bySource(source);
    if (configs.length === 0) {
        console.warn("[WebhookHandler] No webhook registered for source:", source);
        return;
    }
    for (const config of configs) {
        const verified = Webhooks.verifySignature(config.secret, signature);
        if (!verified) {
            console.warn("[WebhookHandler] Signature mismatch for:", source);
            continue;
        }
        console.log("[WebhookHandler] Verified webhook event:", source);
        routeReferral(source, payload);
    }
}

import { uid } from "../../core/utils/id";
export class WebhookRegistry {
    hooks = [];
    register(source, url, secret) {
        const config = {
            id: uid(),
            source,
            url,
            secret,
            active: true
        };
        this.hooks.push(config);
        console.log("[WebhookRegistry] Registered:", config);
        return config;
    }
    all() {
        return this.hooks;
    }
    bySource(source) {
        return this.hooks.filter(h => h.source === source && h.active);
    }
    verifySignature(secret, provided) {
        if (!secret)
            return true;
        return secret === provided;
    }
}
export const Webhooks = new WebhookRegistry();

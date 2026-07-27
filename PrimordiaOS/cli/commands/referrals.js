import { Webhooks } from "../../modules/affiliate/webhook-registry";
export function registerWebhookCLI(source, url, secret) {
    const config = Webhooks.register(source, url, secret);
    console.log("Webhook registered:", config);
}

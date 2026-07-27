import { Webhooks } from "../../modules/affiliate/webhook-registry";

export function registerWebhookCLI(source: string, url: string, secret?: string) {
  const config = Webhooks.register(source, url, secret);
  console.log("Webhook registered:", config);
}

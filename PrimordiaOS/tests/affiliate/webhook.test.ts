import { Webhooks } from "../../modules/affiliate/webhook-registry";

console.log("Testing webhook auto-registration...");

const config = Webhooks.register("moneyplughub", "https://example.com/hook", "secret123");

if (config.source === "moneyplughub") {
  console.log("Webhook registration test passed.");
} else {
  console.log("Webhook registration test failed.");
}

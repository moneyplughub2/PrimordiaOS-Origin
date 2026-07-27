import { autopost } from "./posting.ts";
import { ingestMetrics } from "./metrics.ts";
import { computePulse, maybePatchDefaults } from "./evolution.ts";

export async function handleUCL(args: string[]) {
  const goal = args[0];

  switch (goal) {
    case "autopost":
      await autopost();
      break;

    case "metrics":
      await ingestMetrics();
      break;

    case "pulse":
      const m = await ingestMetrics();
      console.log("Pulse:", computePulse(m));
      break;

    case "patch":
      const mm = await ingestMetrics();
      const p = computePulse(mm);
      await maybePatchDefaults(p);
      break;

    default:
      console.log("Unknown UCL command.");
  }
}

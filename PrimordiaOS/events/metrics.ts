import { emitEngineEvent } from "../ws-server.ts";

export function sendMetricUpdate(platform: string, views: number, retention: number, ctr: number, energy: number) {
  emitEngineEvent({
    type: "METRIC_UPDATE",
    payload: { platform, views, retention, ctr, energy },
  });
}

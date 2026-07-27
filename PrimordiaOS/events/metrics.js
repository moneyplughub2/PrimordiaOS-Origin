import { emitEngineEvent } from "../ws-server.ts";
export function sendMetricUpdate(platform, views, retention, ctr, energy) {
    emitEngineEvent({
        type: "METRIC_UPDATE",
        payload: { platform, views, retention, ctr, energy },
    });
}

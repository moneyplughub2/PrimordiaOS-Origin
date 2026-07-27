import { emitEngineEvent } from "../ws-server.ts";
export function sendPostCycle(caption, platforms, timestamp) {
    emitEngineEvent({
        type: "POST_CYCLE",
        payload: { caption, platforms, timestamp },
    });
}

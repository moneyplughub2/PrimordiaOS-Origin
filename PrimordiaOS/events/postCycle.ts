import { emitEngineEvent } from "../ws-server.ts";

export function sendPostCycle(caption: string, platforms: string[], timestamp: number) {
  emitEngineEvent({
    type: "POST_CYCLE",
    payload: { caption, platforms, timestamp },
  });
}

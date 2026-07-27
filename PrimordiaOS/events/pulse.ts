import { emitEngineEvent } from "../ws-server.ts";

export function sendPulseUpdate(pulse: number, trend: "rising" | "falling" | "stable", color: string) {
  emitEngineEvent({
    type: "PULSE_UPDATE",
    payload: { pulse, trend, color },
  });
}

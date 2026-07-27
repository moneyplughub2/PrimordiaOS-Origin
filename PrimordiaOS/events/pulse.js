import { emitEngineEvent } from "../ws-server.ts";
export function sendPulseUpdate(pulse, trend, color) {
    emitEngineEvent({
        type: "PULSE_UPDATE",
        payload: { pulse, trend, color },
    });
}

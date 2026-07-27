import { broadcast } from "../../core/bus/broadcast";
import { now } from "../../core/utils/time";

export function reportLightingWarning(code: string, message: string, severity: number) {
  broadcast({
    type: "Unreal_LightingWarning",
    payload: { code, message, severity, timestamp: now() }
  });
}

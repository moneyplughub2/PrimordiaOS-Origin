import { broadcast } from "../../core/bus/broadcast";
import { now } from "../../core/utils/time";
export function reportLightingWarning(code, message, severity) {
    broadcast({
        type: "Unreal_LightingWarning",
        payload: { code, message, severity, timestamp: now() }
    });
}

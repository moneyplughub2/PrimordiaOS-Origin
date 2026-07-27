import { broadcast } from "../../../core/bus/broadcast";
export function handleBlueprintEvent(eventName, payload) {
    broadcast({
        type: "Blueprint_Event",
        payload: { eventName, data: payload }
    });
}

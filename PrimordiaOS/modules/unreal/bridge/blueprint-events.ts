import { broadcast } from "../../../core/bus/broadcast";

export function handleBlueprintEvent(eventName: string, payload: any) {
  broadcast({
    type: "Blueprint_Event",
    payload: { eventName, data: payload }
  });
}

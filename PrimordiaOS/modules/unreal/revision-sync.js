import { broadcast } from "../../core/bus/broadcast";
import { now } from "../../core/utils/time";
export function handleUnrealRevision(revision, changelist, date) {
    broadcast({
        type: "Unreal_RevisionUpdate",
        payload: { revision, changelist, date, timestamp: now() }
    });
}

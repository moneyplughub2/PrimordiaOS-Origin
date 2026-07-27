import { broadcast } from "../../core/bus/broadcast";
import { now } from "../../core/utils/time";

export function handleUnrealRevision(revision: number, changelist: number, date: string) {
  broadcast({
    type: "Unreal_RevisionUpdate",
    payload: { revision, changelist, date, timestamp: now() }
  });
}

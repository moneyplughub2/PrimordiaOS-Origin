import { emitEngineEvent } from "../ws-server.ts";
export function sendEvolutionPatch(patchId, reason, change, intensity) {
    emitEngineEvent({
        type: "EVOLUTION_PATCH",
        payload: { patchId, reason, change, intensity },
    });
}

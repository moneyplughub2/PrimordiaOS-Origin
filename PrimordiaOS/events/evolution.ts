import { emitEngineEvent } from "../ws-server.ts";

export function sendEvolutionPatch(patchId: string, reason: string, change: string, intensity: number) {
  emitEngineEvent({
    type: "EVOLUTION_PATCH",
    payload: { patchId, reason, change, intensity },
  });
}

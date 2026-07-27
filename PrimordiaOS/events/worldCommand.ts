import { emitEngineEvent } from "../ws-server.ts";

export function sendWorldCommand(command: string, intensity: number) {
  emitEngineEvent({
    type: "WORLD_COMMAND",
    payload: { command, intensity },
  });
}

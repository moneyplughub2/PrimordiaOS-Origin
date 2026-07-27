import { emitEngineEvent } from "../ws-server.ts";
export function sendWorldCommand(command, intensity) {
    emitEngineEvent({
        type: "WORLD_COMMAND",
        payload: { command, intensity },
    });
}

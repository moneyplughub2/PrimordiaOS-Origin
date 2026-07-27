import { broadcast } from "../../core/bus/broadcast";
export function applyPhysicsUpdate(update) {
    broadcast({
        type: "PhysicsPipeline_Update",
        payload: update
    });
}

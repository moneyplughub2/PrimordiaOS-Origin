import { broadcast } from "../../core/bus/broadcast";

export function applyPhysicsUpdate(update: any) {
  broadcast({
    type: "PhysicsPipeline_Update",
    payload: update
  });
}

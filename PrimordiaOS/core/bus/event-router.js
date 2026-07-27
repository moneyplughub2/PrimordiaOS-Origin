import { Hub } from "./websocket-hub";
import { PhysicsBus } from "./physics-channel";
export class EventRouter {
    route(event) {
        switch (event.type) {
            case "PhysicsPipeline_Update":
                PhysicsBus.broadcast(event);
                break;
            default:
                Hub.broadcast(event);
                break;
        }
    }
}
export const Router = new EventRouter();

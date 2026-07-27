import { Router } from "./event-router";
export function broadcast(event) {
    Router.route(event);
}

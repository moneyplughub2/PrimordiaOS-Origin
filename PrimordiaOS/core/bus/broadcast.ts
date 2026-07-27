import { Router } from "./event-router";

export function broadcast(event: any) {
  Router.route(event);
}

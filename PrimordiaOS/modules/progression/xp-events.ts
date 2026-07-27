// modules/progression/xp-events.ts

import { XPEngine, XPSource } from "./xp-engine";

export type XPEventType =
  | "AUTOMATION_RUN"
  | "WORLD_ENTER"
  | "WORLD_INTERACT"
  | "CLI_COMMAND"
  | "PHYSICS_SIM"
  | "SOCIAL_AUTPOST"
  | "LORE_UNLOCK"
  | "SYSTEM_MILESTONE";

export interface XPEvent {
  type: XPEventType;
  source: XPSource;
  metadata?: Record<string, any>;
}

const XP_EVENT_VALUES: Record<XPEventType, number> = {
  AUTOMATION_RUN: 10,
  WORLD_ENTER: 25,
  WORLD_INTERACT: 40,
  CLI_COMMAND: 5,
  PHYSICS_SIM: 30,
  SOCIAL_AUTPOST: 20,
  LORE_UNLOCK: 50,
  SYSTEM_MILESTONE: 200,
};

export class XPEventRouter {
  constructor(private xp: XPEngine) {}

  handle(event: XPEvent) {
    const amount = XP_EVENT_VALUES[event.type] ?? 0;
    if (amount <= 0) return this.xp.getState();

    // TODO: route to logging / analytics if needed
    return this.xp.addXP(amount, event.source);
  }
}

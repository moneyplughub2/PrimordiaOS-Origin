// modules/progression/xp-events.ts
const XP_EVENT_VALUES = {
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
    xp;
    constructor(xp) {
        this.xp = xp;
    }
    handle(event) {
        const amount = XP_EVENT_VALUES[event.type] ?? 0;
        if (amount <= 0)
            return this.xp.getState();
        // TODO: route to logging / analytics if needed
        return this.xp.addXP(amount, event.source);
    }
}

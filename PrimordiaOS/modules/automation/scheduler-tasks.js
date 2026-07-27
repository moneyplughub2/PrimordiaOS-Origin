import { Primordia } from "../../core/kernel/primordia-runtime";
export function registerAutomationTasks() {
    Primordia.scheduler.register(() => {
        console.log("[Automation] Running scheduled tasks...");
    });
}

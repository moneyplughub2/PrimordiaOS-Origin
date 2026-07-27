export const Scheduler = {
  start() {
    console.log("[PrimordiaOS] Scheduler starting...");
    // TODO: hook into cron-like loop, timers, etc.
  },
  schedule(task, when) {
    console.log("[PrimordiaOS] Scheduling task:", task, "at", when);
  }
};

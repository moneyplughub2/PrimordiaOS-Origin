export class PrimordiaScheduler {
  private tasks: Array<() => void> = [];

  register(task: () => void) {
    this.tasks.push(task);
  }

  run() {
    for (const task of this.tasks) {
      try {
        task();
      } catch (err) {
        console.error("[Scheduler] Task error:", err);
      }
    }
  }
}

export class PrimordiaScheduler {
    tasks = [];
    register(task) {
        this.tasks.push(task);
    }
    run() {
        for (const task of this.tasks) {
            try {
                task();
            }
            catch (err) {
                console.error("[Scheduler] Task error:", err);
            }
        }
    }
}

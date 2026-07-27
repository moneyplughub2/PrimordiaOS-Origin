import { PrimordiaScheduler } from "./scheduler";
import { PrimordiaStateMachine } from "./state-machine";

export class PrimordiaRuntime {
  scheduler = new PrimordiaScheduler();
  state = new PrimordiaStateMachine();

  start() {
    console.log("[PrimordiaRuntime] Booting PrimordiaOS...");
    this.state.setState("running");
    this.scheduler.run();
  }
}

export const Primordia = new PrimordiaRuntime();

export class PrimordiaStateMachine {
  private state: string = "idle";

  setState(newState: string) {
    console.log(`[StateMachine] ${this.state} → ${newState}`);
    this.state = newState;
  }

  getState() {
    return this.state;
  }
}

export class PrimordiaStateMachine {
    state = "idle";
    setState(newState) {
        console.log(`[StateMachine] ${this.state} → ${newState}`);
        this.state = newState;
    }
    getState() {
        return this.state;
    }
}

import { PrimordiaState, initialState } from "./state";
import { routeCommand } from "./router";

export class PrimordiaKernel {
    state: PrimordiaState;

    constructor() {
        this.state = initialState;
        console.log("[PrimordiaOS] Kernel initialized.");
    }

    async command(cmd: any) {
        console.log("[PrimordiaOS] Incoming command:", cmd);
        return await routeCommand(cmd, this.state);
    }

    getState() {
        return this.state;
    }
}

export const Kernel = new PrimordiaKernel();

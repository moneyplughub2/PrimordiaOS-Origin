import express from "express";
const initialState = {
    evolutionLevel: 1,
    unrealConnected: false,
    memory: {
        shortTerm: [],
        lore: []
    }
};
const MemoryEngine = {
    pushShortTerm(state, item) {
        state.memory.shortTerm.push(item);
    },
    pushLore(state, item) {
        state.memory.lore.push(item);
    }
};
// ---------- Kernel ----------
class PrimordiaKernel {
    state = initialState;
    async command(cmd) {
        MemoryEngine.pushShortTerm(this.state, cmd);
        switch (cmd.verb) {
            case "connect_unreal":
                this.state.unrealConnected = true;
                return { ok: true, msg: "Unreal auto-connected.", state: this.state };
            case "unreal":
                return {
                    ok: true,
                    agent: "UnrealControlAgent",
                    action: cmd.action,
                    payload: cmd.payload,
                    msg: "Unreal command dispatched."
                };
            case "state":
                return this.state;
            default:
                return { ok: false, msg: "Unknown command." };
        }
    }
    getState() {
        return this.state;
    }
}
const Kernel = new PrimordiaKernel();
// ---------- Unreal OS Bridge ----------
export function startUnrealOSBridge(port = 7777) {
    const app = express();
    app.use(express.json());
    // Auto-connect Unreal on boot
    Kernel.command({ verb: "connect_unreal" }).then(() => {
        console.log("[PrimordiaOS] Unreal auto-connected.");
    });
    app.post("/kernel/command", async (req, res) => {
        const result = await Kernel.command(req.body);
        res.json(result);
    });
    app.post("/unreal/command", async (req, res) => {
        const result = await Kernel.command({
            verb: "unreal",
            action: req.body.action,
            payload: req.body.payload
        });
        res.json(result);
    });
    // Manual connect still available
    app.post("/unreal/connect", async (_req, res) => {
        const result = await Kernel.command({ verb: "connect_unreal" });
        res.json(result);
    });
    app.get("/kernel/state", (_req, res) => {
        res.json(Kernel.getState());
    });
    app.listen(port, () => {
        console.log(`[PrimordiaOS] Unreal OS bridge running on port ${port}`);
    });
}
if (require.main === module) {
    startUnrealOSBridge(7777);
}

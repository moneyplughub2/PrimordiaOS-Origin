import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
const initialState = {
    evolutionLevel: 1,
    unrealConnected: false,
    memory: {
        shortTerm: [],
        lore: [],
        events: []
    },
    world: {
        actorsToSpawn: [],
        lighting: {
            intensity: 0.5,
            color: "#88aaff"
        }
    }
};
const MemoryEngine = {
    pushShortTerm(state, item) {
        state.memory.shortTerm.push({ item, ts: Date.now() });
    },
    pushLore(state, item) {
        state.memory.lore.push({ item, ts: Date.now() });
    },
    pushEvent(state, event) {
        state.memory.events.push({ event, ts: Date.now() });
    }
};
// ---------- Kernel ----------
class PrimordiaKernel {
    state = structuredClone(initialState);
    async command(cmd) {
        MemoryEngine.pushShortTerm(this.state, cmd);
        switch (cmd.verb) {
            case "connect_unreal":
                this.state.unrealConnected = true;
                MemoryEngine.pushEvent(this.state, {
                    type: "UNREAL_CONNECTED",
                    source: "auto_boot"
                });
                return { ok: true, msg: "Unreal auto-connected.", state: this.state };
            case "unreal":
                return this.handleUnrealCommand(cmd);
            case "evolve":
                return this.evolveWorld(cmd);
            case "spawn_actor":
                return this.queueActorSpawn(cmd);
            case "lighting":
                return this.updateLighting(cmd);
            case "state":
                return this.state;
            default:
                return { ok: false, msg: "Unknown command.", cmd };
        }
    }
    getState() {
        return this.state;
    }
    handleUnrealCommand(cmd) {
        const action = cmd.action ?? "none";
        const payload = cmd.payload ?? {};
        MemoryEngine.pushEvent(this.state, {
            type: "UNREAL_COMMAND",
            action,
            payload
        });
        if (action === "spawn_design_node") {
            this.queueActorSpawn({
                verb: "spawn_actor",
                actorType: "DesignNode",
                params: payload
            });
        }
        if (action === "increase_evolution") {
            this.evolveWorld({
                verb: "evolve",
                delta: payload.delta ?? 1
            });
        }
        return {
            ok: true,
            agent: "UnrealControlAgent",
            action,
            payload,
            msg: "Unreal command dispatched."
        };
    }
    evolveWorld(cmd) {
        const delta = cmd.delta ?? 1;
        this.state.evolutionLevel += delta;
        this.state.world.lighting.intensity = Math.min(1, 0.2 + this.state.evolutionLevel * 0.1);
        MemoryEngine.pushEvent(this.state, {
            type: "EVOLUTION_CHANGED",
            evolutionLevel: this.state.evolutionLevel,
            lighting: this.state.world.lighting
        });
        return {
            ok: true,
            msg: "World evolved.",
            evolutionLevel: this.state.evolutionLevel,
            lighting: this.state.world.lighting
        };
    }
    queueActorSpawn(cmd) {
        const actorType = cmd.actorType ?? "GenericActor";
        const id = cmd.id ?? `actor_${Date.now()}`;
        const params = cmd.params ?? {};
        const actorSpec = { id, type: actorType, params };
        this.state.world.actorsToSpawn.push(actorSpec);
        MemoryEngine.pushEvent(this.state, {
            type: "ACTOR_QUEUED",
            actor: actorSpec
        });
        return {
            ok: true,
            msg: "Actor queued for spawn.",
            actor: actorSpec
        };
    }
    updateLighting(cmd) {
        const intensity = cmd.intensity ?? this.state.world.lighting.intensity;
        const color = cmd.color ?? this.state.world.lighting.color;
        this.state.world.lighting = { intensity, color };
        MemoryEngine.pushEvent(this.state, {
            type: "LIGHTING_UPDATED",
            lighting: this.state.world.lighting
        });
        return {
            ok: true,
            msg: "Lighting updated.",
            lighting: this.state.world.lighting
        };
    }
}
const Kernel = new PrimordiaKernel();
// ---------- WebSocket Broadcast ----------
class PrimordiaBus {
    wss = null;
    attach(server) {
        this.wss = new WebSocketServer({ server });
        this.wss.on("connection", (ws) => {
            ws.send(JSON.stringify({
                type: "BOOT",
                msg: "PrimordiaOS WebSocket bus connected."
            }));
        });
    }
    broadcast(event) {
        if (!this.wss)
            return;
        const payload = JSON.stringify(event);
        this.wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(payload);
            }
        });
    }
}
const Bus = new PrimordiaBus();
// ---------- Unreal OS Mega Bootstrap ----------
export function startUnrealMegaBootstrap(port = 7777) {
    const app = express();
    app.use(express.json());
    const server = http.createServer(app);
    Bus.attach(server);
    Kernel.command({ verb: "connect_unreal" }).then((result) => {
        console.log("[PrimordiaOS] Unreal auto-connected.");
        Bus.broadcast({
            type: "UNREAL_CONNECTED",
            state: result.state
        });
    });
    app.post("/kernel/command", async (req, res) => {
        const result = await Kernel.command(req.body);
        Bus.broadcast({
            type: "KERNEL_COMMAND",
            input: req.body,
            result
        });
        res.json(result);
    });
    app.post("/unreal/command", async (req, res) => {
        const result = await Kernel.command({
            verb: "unreal",
            action: req.body.action,
            payload: req.body.payload
        });
        Bus.broadcast({
            type: "UNREAL_COMMAND",
            action: req.body.action,
            payload: req.body.payload,
            result
        });
        res.json(result);
    });
    app.post("/unreal/connect", async (_req, res) => {
        const result = await Kernel.command({ verb: "connect_unreal" });
        Bus.broadcast({
            type: "UNREAL_CONNECTED_MANUAL",
            state: result.state
        });
        res.json(result);
    });
    app.post("/kernel/evolve", async (req, res) => {
        const result = await Kernel.command({
            verb: "evolve",
            delta: req.body.delta ?? 1
        });
        Bus.broadcast({
            type: "EVOLUTION_CHANGED",
            result
        });
        res.json(result);
    });
    app.post("/kernel/spawn_actor", async (req, res) => {
        const result = await Kernel.command({
            verb: "spawn_actor",
            actorType: req.body.actorType,
            params: req.body.params
        });
        Bus.broadcast({
            type: "ACTOR_QUEUED",
            result
        });
        res.json(result);
    });
    app.post("/kernel/lighting", async (req, res) => {
        const result = await Kernel.command({
            verb: "lighting",
            intensity: req.body.intensity,
            color: req.body.color
        });
        Bus.broadcast({
            type: "LIGHTING_UPDATED",
            result
        });
        res.json(result);
    });
    app.get("/kernel/state", (_req, res) => {
        const state = Kernel.getState();
        res.json(state);
    });
    server.listen(port, () => {
        console.log(`[PrimordiaOS] Unreal MEGA bootstrap running on port ${port}`);
        console.log(`[PrimordiaOS] WebSocket bus attached at ws://localhost:${port}`);
    });
}
if (require.main === module) {
    startUnrealMegaBootstrap(7777);
}

import WebSocket, { WebSocketServer } from 'ws';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { AutomationLoop } = require('./dist/modules/automation/automation-loop.js');

// PrimordiaOS Event Server
const wss = new WebSocketServer({ port: 17800 });
const loop = new AutomationLoop();

console.log("PrimordiaOS Event Server running on ws://localhost:17800");

// Hook the loop to emit actions to Unreal client connections
loop.setClientCallback((event) => {
    const payload = {
        type: "ACTION_TRIGGERED",
        event
    };
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });
});

wss.on('connection', (socket) => {
    console.log("Client connected (Unreal or Dashboard)");

    // Send initial telemetry on connect
    socket.send(JSON.stringify({
        type: 'telemetry',
        data: loop.getTelemetry()
    }));

    socket.on('message', (msg) => {
        try {
            const data = JSON.parse(msg.toString());
            console.log("Received client message:", data);
            if (data.type === 'get_telemetry') {
                socket.send(JSON.stringify({
                    type: 'telemetry',
                    data: loop.getTelemetry()
                }));
            }
        } catch {
            console.log("Received raw client message:", msg.toString());
        }
    });
});

// Start loop ticker (runs every 2 seconds)
setInterval(() => {
    loop.tick();

    // Broadcast updated telemetry to all clients (for dashboard visualization)
    const telemetryPayload = {
        type: 'telemetry_update',
        data: loop.getTelemetry()
    };

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(telemetryPayload));
        }
    });
}, 2000);

// CLI trigger support
const arg = process.argv[2];
if (arg === "--emit" && process.argv[3]) {
    const eventType = process.argv[3];

    const payload = {
        type: eventType,
        payload: {
            atmosphere: true,
            volumetrics: true,
            fog: true,
            reflection: true,
            postprocess: true,
            bridge_init: true,
            physics_init: true,
            heartbeat: true
        }
    };

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });

    console.log("Emitted manual event:", eventType);
}

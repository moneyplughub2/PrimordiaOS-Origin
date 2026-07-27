import WebSocket, { WebSocketServer } from "ws";
export class PhysicsChannel {
    wss = new WebSocketServer({ port: 17900 });
    constructor() {
        console.log("[PhysicsChannel] Ready on ws://localhost:17900");
    }
    broadcast(update) {
        const msg = JSON.stringify(update);
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(msg);
        });
    }
}
export const PhysicsBus = new PhysicsChannel();

import WebSocket, { WebSocketServer } from "ws";
export class PrimordiaWSServer {
    wss = new WebSocketServer({ port: 3010 });
    constructor() {
        this.wss.on("connection", ws => {
            ws.send(JSON.stringify({ status: "connected", channel: "internal" }));
            console.log("[WS Server] Internal client connected");
        });
    }
    broadcast(data) {
        const msg = JSON.stringify(data);
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(msg);
        });
    }
}
export const InternalWS = new PrimordiaWSServer();

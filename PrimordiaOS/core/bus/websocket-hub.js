import WebSocket, { WebSocketServer } from "ws";
export class WebSocketHub {
    wss = new WebSocketServer({ port: 17899 });
    constructor() {
        this.wss.on("connection", ws => {
            console.log("[WS Hub] Client connected");
            ws.send(JSON.stringify({ status: "connected", channel: "hub" }));
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
export const Hub = new WebSocketHub();

import WebSocket from "ws";
export class PrimordiaWSClient {
    ws;
    constructor(url) {
        this.ws = new WebSocket(url);
        this.ws.on("open", () => {
            console.log(`[WS Client] Connected to ${url}`);
        });
        this.ws.on("message", msg => {
            console.log("[WS Client] Received:", msg.toString());
        });
    }
    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}

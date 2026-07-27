import WebSocket from "ws";

export class PrimordiaWebSocket {
  ws: WebSocket | null = null;

  attach(ws: WebSocket) {
    this.ws = ws;
  }

  send(data: any) {
    if (!this.ws) return;
    this.ws.send(JSON.stringify(data));
  }

  onMessage(handler: (msg: any) => void) {
    if (!this.ws) return;
    this.ws.on("message", (raw) => {
      try {
        handler(JSON.parse(raw.toString()));
      } catch {
        handler(raw.toString());
      }
    });
  }
}

export const WS = new PrimordiaWebSocket();

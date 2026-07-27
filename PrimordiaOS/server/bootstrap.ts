import WebSocket, { WebSocketServer } from "ws";
import { Kernel } from "../kernel/core/kernel.js";

const PORT = 7777;

export function startPrimordiaServer() {
  console.log("[PrimordiaOS] Bootstrapping server...");

  Kernel.init();

  const wss = new WebSocketServer({ port: PORT });
  console.log(`[PrimordiaOS] WS Server running on port ${PORT}`);

  wss.on("connection", (ws) => {
    console.log("[PrimordiaOS] Unreal connected");

    ws.on("message", (msg) => {
      let data;
      try {
        data = JSON.parse(msg.toString());
      } catch {
        console.log("[PrimordiaOS] Invalid JSON");
        return;
      }

      const result = Kernel.handleIntent(data);
      ws.send(JSON.stringify(result));
    });
  });
}

startPrimordiaServer();

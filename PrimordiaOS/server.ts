import { WebSocketServer } from "ws";
import { Kernel } from "../../kernel/core/kernel.js";
import { interpretSentence } from "../../kernel/runtime/interpreter.js";

export function startPrimordiaWSServer(port: number = 7777) {
  console.log("[PrimordiaOS] WebSocket server booting...");

  const wss = new WebSocketServer({ port });

  console.log(`[PrimordiaOS] WS Server running on port ${port}`);

  wss.on("connection", (socket) => {
    console.log("[PrimordiaOS] Unreal connected to WS server.");
    Kernel.emit("ws.server.connection");

    socket.on("message", async (msg: Buffer) => {
      const text = msg.toString();
      console.log("[PrimordiaOS] Unreal →", text);

      try {
        const intent = await interpretSentence(text);
        console.log("[PrimordiaOS] Intent →", intent);
      } catch (err) {
        console.error("[PrimordiaOS] Interpreter error:", err);
      }
    });

    socket.on("close", () => {
      console.log("[PrimordiaOS] Unreal disconnected.");
      Kernel.emit("ws.server.closed");
    });
  });

  return wss;
}

// Auto‑boot when running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startPrimordiaWSServer(7777);
}

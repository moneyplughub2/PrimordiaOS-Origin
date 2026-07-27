import { Kernel } from "../core/kernel.js";
import { PrimordiaWebSocket } from "../net/websocket.js";
import { interpretSentence } from "./interpreter.js";

export async function bootPrimordiaOS() {
  console.log("=== PrimordiaOS Boot Sequence Initiated ===");

  Kernel.registerModule("ws", new PrimordiaWebSocket());
  Kernel.emit("kernel.boot");
  Kernel.markReady();

  console.log("=== PrimordiaOS Ready for Natural Language Commands ===");

  // Example: you can wire this to CLI, HTTP, or WS
  // interpretSentence("spawn a glowing cube in front of me");
}

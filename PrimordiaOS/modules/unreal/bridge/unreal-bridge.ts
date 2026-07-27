import WebSocket from "ws";
import { broadcast } from "../../../core/bus/broadcast";

export class UnrealBridge {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket("ws://localhost:17899");

    this.ws.on("open", () => {
      console.log("[UnrealBridge] Connected to Unreal WebSocket");
    });

    this.ws.on("message", msg => {
      try {
        const event = JSON.parse(msg.toString());
        broadcast(event);
      } catch (err) {
        console.error("[UnrealBridge] Bad message:", err);
      }
    });
  }
}

export const Unreal = new UnrealBridge();

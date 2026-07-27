// kernel/runtime/primordia-runtime.ts
// Minimal PrimordiaOS runtime kernel for Fly.io deployment

import { EventEmitter } from "events";
import path from "path";
import fs from "fs";

// ---- Basic State ----
export interface PrimordiaState {
  bootTime: number;
  version: string;
  status: "booting" | "ready";
}

export const state: PrimordiaState = {
  bootTime: Date.now(),
  version: "1.0.0-minimal",
  status: "booting"
};

// ---- Event Bus ----
export const bus = new EventEmitter();

// ---- Logger ----
export function log(...msg: any[]) {
  console.log("[PrimordiaOS]", ...msg);
}

// ---- Runtime Boot ----
export async function bootRuntime() {
  log("Booting PrimordiaOS minimal runtime…");

  // Load environment config if present
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    log("Loading .env");
  }

  // Mark runtime ready
  state.status = "ready";
  log("PrimordiaOS runtime ready.");
}

// ---- Export Runtime API ----
export default {
  state,
  bus,
  log,
  bootRuntime
};

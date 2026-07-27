/**
 * Structured Telemetry & Logging Utility for PrimordiaOS Workers
 */

import { Env } from "./types";

export class Logger {
  private workerName: string;
  private env?: Env;

  constructor(workerName: string, env?: Env) {
    this.workerName = workerName;
    this.env = env;
  }

  log(level: "debug" | "info" | "warn" | "error", message: string, meta: Record<string, any> = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      worker: this.workerName,
      level,
      message,
      environment: this.env?.ENVIRONMENT || "dev",
      ...meta
    };

    console.log(JSON.stringify(entry));

    // Async stream log to D1 if database binding is present
    if (this.env?.PRIMORDIA_CORE_DB && (level === "warn" || level === "error")) {
      try {
        this.env.PRIMORDIA_CORE_DB.prepare(
          "INSERT INTO system_logs (timestamp, worker, level, message, metadata) VALUES (?, ?, ?, ?, ?)"
        ).bind(entry.timestamp, entry.worker, entry.level, entry.message, JSON.stringify(meta)).run();
      } catch (err) {
        console.error("Failed to write log to D1:", err);
      }
    }
  }

  debug(msg: string, meta?: Record<string, any>) { this.log("debug", msg, meta); }
  info(msg: string, meta?: Record<string, any>) { this.log("info", msg, meta); }
  warn(msg: string, meta?: Record<string, any>) { this.log("warn", msg, meta); }
  error(msg: string, meta?: Record<string, any>) { this.log("error", msg, meta); }
}

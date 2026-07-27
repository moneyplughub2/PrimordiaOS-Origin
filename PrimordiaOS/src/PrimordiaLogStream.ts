// ────────────────────────────────────────────────────────────
//  PrimordiaLogStream.ts
//  Unified Telemetry + Event Logging for PrimordiaOS
// ────────────────────────────────────────────────────────────

export const PrimordiaLogStream = {
  recordInbound(event: any) {
    console.log("[PrimordiaLog.Inbound]", event);
  },

  recordOutbound(event: any) {
    console.log("[PrimordiaLog.Outbound]", event);
  },

  recordChannel(event: any) {
    console.log("[PrimordiaLog.Channel]", event);
  },
};

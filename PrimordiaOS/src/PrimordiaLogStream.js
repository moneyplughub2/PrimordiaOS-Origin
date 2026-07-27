// ────────────────────────────────────────────────────────────
//  PrimordiaLogStream.ts
//  Unified Telemetry + Event Logging for PrimordiaOS
// ────────────────────────────────────────────────────────────
export const PrimordiaLogStream = {
    recordInbound(event) {
        console.log("[PrimordiaLog.Inbound]", event);
    },
    recordOutbound(event) {
        console.log("[PrimordiaLog.Outbound]", event);
    },
    recordChannel(event) {
        console.log("[PrimordiaLog.Channel]", event);
    },
};

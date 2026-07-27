export type DiagnosticEvent = {
  subsystem: string;
  message: string;
  level: "info" | "warn" | "error";
  timestamp: number;
};

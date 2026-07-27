/**
 * Shared Type Definitions & Environment Bindings for PrimordiaOS Workers
 */

export interface Env {
  // Environment Metadata
  ENVIRONMENT: "development" | "dev" | "staging" | "production";
  APP_NAME: string;
  API_VERSION: string;
  LOG_LEVEL?: "debug" | "info" | "warn" | "error";
  JWT_SECRET?: string;

  // KV Bindings
  PRIMORDIA_SESSIONS: KVNamespace;
  PRIMORDIA_CONFIG: KVNamespace;

  // D1 Database Binding
  PRIMORDIA_CORE_DB: D1Database;

  // R2 Bucket Binding
  PRIMORDIA_ASSETS: R2Bucket;

  // Queue Binding
  AUTOMATION_QUEUE: Queue<AutomationJob>;

  // Durable Object Binding
  SESSION_MANAGER: DurableObjectNamespace;

  // Workers AI (Optional)
  AI?: any;
}

export interface SessionData {
  userId: string;
  roles: string[];
  issuedAt: number;
  expiresAt: number;
  metadata?: Record<string, any>;
}

export interface AutomationJob {
  id: string;
  type: "INDEX_MEMORY" | "SYNC_UNREAL" | "WEBHOOK_EVENT" | "PRUNE_LOGS" | "EXECUTE_COMMAND";
  payload: Record<string, any>;
  timestamp: string;
  attempts?: number;
}

export interface BridgeMessage {
  clientType: "UNREAL" | "ELECTRON" | "CLI";
  clientId: string;
  command: string;
  parameters: Record<string, any>;
  signature?: string;
}

export interface WebhookEvent {
  provider: "stripe" | "zapier" | "github" | "custom";
  eventId: string;
  payload: Record<string, any>;
  receivedAt: string;
}

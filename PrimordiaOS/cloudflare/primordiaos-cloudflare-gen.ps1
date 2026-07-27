# ================================
# PRIMORDIAOS CLOUDLARE WORKER SUITE GENERATOR
# ================================

$root = "C:\Users\Shane\Documents\dev\PrimordiaOS\cloudflare"

Write-Host "⚡ Generating PrimordiaOS Cloudflare Worker Suite..." -ForegroundColor Cyan

# --- Create directory structure ---
$dirs = @(
    "$root",
    "$root\workers",
    "$root\workers\gateway",
    "$root\workers\auth",
    "$root\workers\automation",
    "$root\workers\webhooks",
    "$root\workers\bridge",
    "$root\workers\logs",
    "$root\lib",
    "$root\durable-objects"
)

foreach ($d in $dirs) {
    if (!(Test-Path $d)) {
        New-Item -ItemType Directory -Path $d | Out-Null
        Write-Host "Created: $d"
    }
}

# --- Write wrangler.toml ---
@"
name = "primordiaos"
main = "workers/gateway/index.ts"
compatibility_date = "2024-07-01"

[vars]
APP_NAME = "PrimordiaOS Core"
API_VERSION = "v4.0"

[durable_objects]
bindings = [
  { name = "SESSION_MANAGER", class_name = "PrimordiaSessionManager" }
]

[[durable_objects.classes]]
name = "PrimordiaSessionManager"
class_name = "PrimordiaSessionManager"

[[kv_namespaces]]
binding = "PRIMORDIA_SESSIONS"
id = "primordia_sessions_dev"

[[kv_namespaces]]
binding = "PRIMORDIA_CONFIG"
id = "primordia_config_dev"

[[d1_databases]]
binding = "PRIMORDIA_CORE_DB"
database_name = "primordia_core_db_dev"
database_id = "primordia_core_db_dev"

[[queues.producers]]
binding = "AUTOMATION_QUEUE"
queue = "primordia-automation-queue-dev"

[[queues.consumers]]
queue = "primordia-automation-queue-dev"
max_batch_size = 10
max_batch_timeout = 30
worker = "workers/automation/index.ts"

[[r2_buckets]]
binding = "PRIMORDIA_ASSETS"
bucket_name = "primordia-assets-dev"

[env.dev]
vars = { ENVIRONMENT = "development" }

[env.staging]
vars = { ENVIRONMENT = "staging" }

[env.prod]
vars = { ENVIRONMENT = "production" }

[routes]
patterns = [
  "https://api.primordiaos.com/*",
  "https://bridge.primordiaos.com/*",
  "https://hooks.primordiaos.com/*"
]
"@ | Set-Content "$root\wrangler.toml"

Write-Host "✓ wrangler.toml written"

# --- Write package.json ---
@"
{
  "name": "primordiaos-cloudflare-workers",
  "version": "4.0.0",
  "private": true,
  "scripts": {
    "dev:gateway": "wrangler dev workers/gateway/index.ts --name primordiaos-gateway",
    "dev:auth": "wrangler dev workers/auth/index.ts --name primordiaos-auth",
    "dev:automation": "wrangler dev workers/automation/index.ts --name primordiaos-automation",
    "dev:webhooks": "wrangler dev workers/webhooks/index.ts --name primordiaos-webhooks",
    "dev:bridge": "wrangler dev workers/bridge/index.ts --name primordiaos-bridge",
    "dev:logs": "wrangler dev workers/logs/index.ts --name primordiaos-logs",
    "deploy:dev": "wrangler deploy --env dev",
    "deploy:staging": "wrangler deploy --env staging",
    "deploy:prod": "wrangler deploy --env prod"
  },
  "dependencies": {
    "@cloudflare/workers-types": "^4.2024.7.1"
  },
  "devDependencies": {
    "typescript": "^5.5.0"
  }
}
"@ | Set-Content "$root\package.json"

Write-Host "✓ package.json written"

# --- Shared libs ---
@"
export interface PrimordiaEnv {
  ENVIRONMENT: string;
  APP_NAME: string;
  API_VERSION: string;
}

export function getConfig(env: any): PrimordiaEnv {
  return {
    ENVIRONMENT: env.ENVIRONMENT ?? "development",
    APP_NAME: env.APP_NAME ?? "PrimordiaOS Core",
    API_VERSION: env.API_VERSION ?? "v4.0"
  };
}
"@ | Set-Content "$root\lib\config.ts"

@"
export function log(env: any, message: string, meta: Record<string, unknown> = {}) {
  console.log("[PrimordiaOS]", message, JSON.stringify(meta));
}
"@ | Set-Content "$root\lib\logger.ts"

@"
export class PrimordiaError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export function jsonError(message: string, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
"@ | Set-Content "$root\lib\errors.ts"

@"
type Handler = (request: Request, env: any, ctx: ExecutionContext) => Promise<Response>;

interface Route {
  method: string;
  path: RegExp;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  on(method: string, path: RegExp, handler: Handler) {
    this.routes.push({ method: method.toUpperCase(), path, handler });
  }

  async handle(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    for (const route of this.routes) {
      if (route.method === request.method.toUpperCase() && route.path.test(url.pathname)) {
        return route.handler(request, env, ctx);
      }
    }
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
}
"@ | Set-Content "$root\lib\router.ts"

Write-Host "✓ Shared libs written"

# --- Durable Object ---
@"
export class PrimordiaSessionManager {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/session/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Unknown session route" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
}
"@ | Set-Content "$root\durable-objects\PrimordiaSessionManager.ts"

Write-Host "✓ Durable Object written"

# --- Workers ---
# Gateway
@"
import { Router } from "../../lib/router";
import { getConfig } from "../../lib/config";
import { log } from "../../lib/logger";
import { jsonError } from "../../lib/errors";
import { PrimordiaSessionManager } from "../../durable-objects/PrimordiaSessionManager";

export { PrimordiaSessionManager };

const router = new Router();

router.on("GET", /^\/v4\/health$/, async (_req, env) => {
  const cfg = getConfig(env);
  return new Response(JSON.stringify({
    status: "ok",
    app: cfg.APP_NAME,
    version: cfg.API_VERSION,
    env: cfg.ENVIRONMENT
  }), { headers: { "Content-Type": "application/json" } });
});

router.on("GET", /^\/v4\/session\/health$/, async (_req, env) => {
  const id = env.SESSION_MANAGER.idFromName("global");
  const stub = env.SESSION_MANAGER.get(id);
  return await stub.fetch("https://primordiaos/session/health");
});

export default {
  async fetch(request, env, ctx) {
    try {
      log(env, "Gateway request", { url: request.url });
      return await router.handle(request, env, ctx);
    } catch (err) {
      return jsonError(err.message);
    }
  }
};
"@ | Set-Content "$root\workers\gateway\index.ts"

# Auth
@"
import { getConfig } from "../../lib/config";
import { log } from "../../lib/logger";
import { jsonError } from "../../lib/errors";

export default {
  async fetch(request, env) {
    try {
      const cfg = getConfig(env);
      const url = new URL(request.url);

      if (url.pathname === "/v4/auth/health") {
        return new Response(JSON.stringify({ ok: true, env: cfg.ENVIRONMENT }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ error: "Auth route not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      log(env, "Auth error", { error: err.message });
      return jsonError("Auth worker failure");
    }
  }
};
"@ | Set-Content "$root\workers\auth\index.ts"

# Automation
@"
import { log } from "../../lib/logger";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/v4/automation/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Automation route not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  },

  async queue(batch, env) {
    for (const msg of batch.messages) {
      log(env, "Automation job", { body: msg.body });
    }
  },

  async scheduled(event, env) {
    log(env, "Scheduled tick", { time: event.scheduledTime });
  }
};
"@ | Set-Content "$root\workers\automation\index.ts"

# Webhooks
@"
import { log } from "../../lib/logger";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/stripe")) {
      log(env, "Stripe webhook");
      return new Response("Stripe webhook received");
    }

    if (url.pathname.startsWith("/zapier")) {
      log(env, "Zapier webhook");
      return new Response("Zapier webhook received");
    }

    return new Response(JSON
# setup-and-deploy.ps1
# Usage:
# 1) Save this file to C:\Users\Shane\Documents\dev\PrimordiaOS\cloudflare\setup-and-deploy.ps1
# 2) Open PowerShell, cd to that folder, then run:
#    .\setup-and-deploy.ps1
# Note: wrangler must be installed and authenticated already.

$base = "C:\Users\Shane\Documents\dev\PrimordiaOS\cloudflare"
$workersDir = Join-Path $base "workers"
$gatewayDir = Join-Path $workersDir "gateway"
$indexFile = Join-Path $gatewayDir "index.ts"
$wranglerFile = Join-Path $base "wrangler.toml"

# Create directories if missing
Write-Host "Ensuring folder structure exists..."
New-Item -ItemType Directory -Force -Path $gatewayDir | Out-Null

# Write index.ts with required Durable Object export
Write-Host "Writing workers/gateway/index.ts..."
$indexContent = @'
/**
 * PrimordiaOS Gateway Worker
 * Minimal implementation that exports PrimordiaSessionManager
 */

export class PrimordiaSessionManager {
  state: DurableObjectState;
  env: any;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/do/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "PrimordiaSessionManager" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ service: "PrimordiaOS Gateway", status: "ONLINE" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("OK", { status: 200 });
  }
};
'@
Set-Content -Path $indexFile -Value $indexContent -Encoding UTF8

# Write wrangler.toml
Write-Host "Writing wrangler.toml..."
$wranglerContent = @'
name = "primordiaos"
main = "workers/gateway/index.ts"
compatibility_date = "2026-07-22"

[durable_objects]
bindings = [
  { name = "PRIMORDIA_SESSION", class_name = "PrimordiaSessionManager" }
]

[[queues.producers]]
binding = "AUTOMATION_QUEUE"
queue = "primordia-automation-queue-dev"

[[queues.consumers]]
queue = "primordia-automation-queue-dev"
max_batch_size = 10
max_batch_timeout = 30

[env.prod]
vars = { ENVIRONMENT = "production" }

[[env.prod.queues.producers]]
binding = "AUTOMATION_QUEUE"
queue = "primordia-automation-queue-prod"

[[env.prod.queues.consumers]]
queue = "primordia-automation-queue-prod"
max_batch_size = 10
max_batch_timeout = 30
'@
Set-Content -Path $wranglerFile -Value $wranglerContent -Encoding UTF8

# Confirm files written
Write-Host "Files created:"
Get-ChildItem -Path $gatewayDir -File | ForEach-Object { Write-Host " - $($_.FullName)" }
Write-Host " - $wranglerFile"

# Optional: run build step if you have one (uncomment and edit if needed)
# Write-Host "Running build step..."
# npm run build

# Deploy with wrangler
Write-Host "Running wrangler deploy --env prod ..."
$deploy = Start-Process -FilePath "wrangler" -ArgumentList "deploy --env prod" -NoNewWindow -Wait -PassThru

if ($deploy.ExitCode -eq 0) {
  Write-Host "Deploy finished successfully."
} else {
  Write-Host "Deploy exited with code $($deploy.ExitCode). Check the wrangler logs for details."
}

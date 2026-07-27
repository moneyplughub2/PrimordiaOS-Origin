# disable-preview-and-deploy.ps1
# Usage: .\disable-preview-and-deploy.ps1
$wranglerPath = Join-Path (Get-Location) "wrangler.toml"
if (-not (Test-Path $wranglerPath)) {
  Write-Host "wrangler.toml not found in current folder." -ForegroundColor Red
  exit 1
}

# Backup
Copy-Item -Path $wranglerPath -Destination "$wranglerPath.bak" -Force
Write-Host "Backup created at wrangler.toml.bak"

# Read file and ensure flags exist at top-level
$content = Get-Content -Raw -Path $wranglerPath
if ($content -notmatch "workers_dev\s*=") {
  $content = "workers_dev = false`npreview_urls = false`n`n" + $content
} else {
  $content = $content -replace "workers_dev\s*=\s*true", "workers_dev = false"
  $content = $content -replace "preview_urls\s*=\s*true", "preview_urls = false"
  if ($content -notmatch "preview_urls\s*=") {
    $content = $content -replace "(?s)^(name\s*=.*?$)", "workers_dev = false`npreview_urls = false`n`n$1"
  }
}

Set-Content -Path $wranglerPath -Value $content -Encoding UTF8
Write-Host "wrangler.toml updated to disable workers_dev and preview_urls."

# Deploy
Write-Host "Running: wrangler deploy --env prod"
$proc = Start-Process -FilePath "wrangler" -ArgumentList "deploy --env prod" -NoNewWindow -Wait -PassThru
if ($proc.ExitCode -eq 0) {
  Write-Host "Deploy succeeded." -ForegroundColor Green
} else {
  Write-Host "Deploy failed with exit code $($proc.ExitCode)." -ForegroundColor Red
}

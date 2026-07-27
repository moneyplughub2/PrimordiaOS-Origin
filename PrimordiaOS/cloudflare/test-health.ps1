# test-health.ps1
# Usage: .\test-health.ps1
$uri = "https://primordiaos-prod.cashplughub.workers.dev/health"
try {
  $resp = Invoke-RestMethod -Uri $uri -Method Get -UseBasicParsing -ErrorAction Stop
  $resp | ConvertTo-Json -Depth 5
} catch {
  Write-Host "Request failed:" -ForegroundColor Red
  Write-Host $_.Exception.Message
}

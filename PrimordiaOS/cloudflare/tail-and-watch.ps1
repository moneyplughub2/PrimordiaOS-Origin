# tail-and-watch.ps1
# Usage: .\tail-and-watch.ps1
Write-Host "Starting wrangler tail --env prod. Press Ctrl+C to stop."
Start-Process -FilePath "wrangler" -ArgumentList "tail --env prod" -NoNewWindow

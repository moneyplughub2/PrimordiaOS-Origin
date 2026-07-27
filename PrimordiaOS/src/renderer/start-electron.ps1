# Save as start-electron.ps1 in the project root and run it
Set-Location "C:\Users\Shane\Documents\dev\PrimordiaOS\electron-app"

# Create .env from example if missing
if (-not (Test-Path .env) -and (Test-Path .env.example)) {
  Copy-Item .env.example .env
  Write-Host "Created .env from .env.example. Edit .env if needed."
}

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting Electron..."
npx electron .

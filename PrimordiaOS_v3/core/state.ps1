[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding           = [System.Text.Encoding]::UTF8

if (-not $Global:PrimordiaState) {
    $Global:PrimordiaState = @{
        shell        = "IDLE"
        loop         = "STOPPED"
        lastCommand  = ""
        lastContent  = ""
        lastRender   = ""
        lastPackage  = ""
        lastPost     = ""
        iterations   = 0
        nodes        = @()
    }
}

function Save-PrimordiaState {
    try {
        $json = $Global:PrimordiaState | ConvertTo-Json -Depth 6
        Set-Content -Path $Global:PrimordiaStateFile -Value $json -Encoding UTF8
    } catch {
        Write-Host "PrimordiaOS v3: Failed to save state." -ForegroundColor Red
    }
}

if (Test-Path $Global:PrimordiaStateFile) {
    try {
        $loaded = Get-Content -Path $Global:PrimordiaStateFile -Encoding UTF8 | ConvertFrom-Json
        if ($loaded) { $Global:PrimordiaState = $loaded }
    } catch { }
} else {
    Save-PrimordiaState
}

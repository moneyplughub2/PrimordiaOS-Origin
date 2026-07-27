<#
    PrimordiaOS Swarm Subsystem
    - Auto-creates folders and files
    - Terminal-ready
    - v1.0
#>

# Root of PrimordiaOS (adjust if needed)
$PrimordiaRoot = "C:\PrimordiaOS"

# Swarm paths
$SwarmRoot        = Join-Path $PrimordiaRoot "swarm"
$SwarmConfigDir   = Join-Path $SwarmRoot "config"
$SwarmAgentsDir   = Join-Path $SwarmRoot "agents"
$SwarmLogsDir     = Join-Path $SwarmRoot "logs"
$SwarmRuntimeDir  = Join-Path $SwarmRoot "runtime"
$SwarmConfigFile  = Join-Path $SwarmConfigDir "swarm.config.json"
$SwarmStateFile   = Join-Path $SwarmRuntimeDir "state.json"

function New-PrimordiaSwarmStructure {
    Write-Host "[PrimordiaOS::Swarm] Ensuring swarm directory structure..." -ForegroundColor Cyan

    $dirs = @(
        $SwarmRoot,
        $SwarmConfigDir,
        $SwarmAgentsDir,
        $SwarmLogsDir,
        $SwarmRuntimeDir
    )

    foreach ($dir in $dirs) {
        if (-not (Test-Path $dir)) {
            Write-Host "  + Creating $dir" -ForegroundColor DarkGray
            New-Item -ItemType Directory -Path $dir | Out-Null
        }
    }

    if (-not (Test-Path $SwarmConfigFile)) {
        Write-Host "  + Creating default swarm.config.json" -ForegroundColor DarkGray
        $defaultConfig = @{
            version      = "1.0.0"
            enabled      = $true
            maxAgents    = 16
            heartbeatSec = 10
            logLevel     = "info"
        } | ConvertTo-Json -Depth 4

        $defaultConfig | Set-Content -Path $SwarmConfigFile -Encoding UTF8
    }

    if (-not (Test-Path $SwarmStateFile)) {
        Write-Host "  + Creating initial state.json" -ForegroundColor DarkGray
        $initialState = @{
            status      = "IDLE"
            agents      = @()
            tasks       = @()
            lastUpdated = (Get-Date).ToString("o")
        } | ConvertTo-Json -Depth 4

        $initialState | Set-Content -Path $SwarmStateFile -Encoding UTF8
    }

    Write-Host "[PrimordiaOS::Swarm] Structure ready." -ForegroundColor Green
}

function Get-PrimordiaSwarmConfig {
    if (-not (Test-Path $SwarmConfigFile)) {
        New-PrimordiaSwarmStructure
    }
    Get-Content -Path $SwarmConfigFile -Raw | ConvertFrom-Json
}

function Save-PrimordiaSwarmState {
    param(
        [Parameter(Mandatory=$true)]
        [hashtable]$State
    )

    $State.lastUpdated = (Get-Date).ToString("o")
    $json = $State | ConvertTo-Json -Depth 6
    $json | Set-Content -Path $SwarmStateFile -Encoding UTF8
}

function Get-PrimordiaSwarmState {
    if (-not (Test-Path $SwarmStateFile)) {
        New-PrimordiaSwarmStructure
    }
    Get-Content -Path $SwarmStateFile -Raw | ConvertFrom-Json
}

function Write-PrimordiaSwarmLog {
    param(
        [string]$Message,
        [string]$Level = "info"
    )

    $logFile = Join-Path $SwarmLogsDir ("swarm-" + (Get-Date -Format "yyyyMMdd") + ".log")
    $entry = "[{0}] [{1}] {2}" -f (Get-Date -Format "o"), $Level.ToUpper(), $Message
    Add-Content -Path $logFile -Value $entry
}

function Start-PrimordiaSwarm {
    Write-Host "[PrimordiaOS::Swarm] Starting swarm..." -ForegroundColor Cyan
    New-PrimordiaSwarmStructure

    $config = Get-PrimordiaSwarmConfig
    $state  = Get-PrimordiaSwarmState

    if (-not $config.enabled) {
        Write-Host "[PrimordiaOS::Swarm] Swarm disabled in config." -ForegroundColor Yellow
        Write-PrimordiaSwarmLog "Attempted start while disabled." "warn"
        return
    }

    $state.status = "ACTIVE"
    Save-PrimordiaSwarmState -State $state
    Write-PrimordiaSwarmLog "Swarm started." "info"

    Write-Host "[PrimordiaOS::Swarm] ACTIVE | maxAgents: $($config.maxAgents) | heartbeat: $($config.heartbeatSec)s" -ForegroundColor Green
}

function Stop-PrimordiaSwarm {
    Write-Host "[PrimordiaOS::Swarm] Stopping swarm..." -ForegroundColor Cyan
    $state = Get-PrimordiaSwarmState
    $state.status = "IDLE"
    Save-PrimordiaSwarmState -State $state
    Write-PrimordiaSwarmLog "Swarm stopped." "info"
    Write-Host "[PrimordiaOS::Swarm] IDLE" -ForegroundColor Yellow
}

function Get-PrimordiaSwarmStatus {
    $state  = Get-PrimordiaSwarmState
    $config = Get-PrimordiaSwarmConfig

    $agentCount = if ($state.agents) { $state.agents.Count } else { 0 }
    $taskCount  = if ($state.tasks)  { $state.tasks.Count }  else { 0 }

    Write-Host ("[PrimordiaOS::Swarm] status: {0} | agents: {1} | tasks: {2} | maxAgents: {3}" -f `
        $state.status, $agentCount, $taskCount, $config.maxAgents) -ForegroundColor Cyan
}

function Invoke-Primordia-Swarm {
    param(
        [string]$Intent
    )

    switch ($Intent) {
        "status" {
            Get-PrimordiaSwarmStatus
        }
        "start" {
            Start-PrimordiaSwarm
        }
        "stop" {
            Stop-PrimordiaSwarm
        }
        default {
            Write-Host "[PrimordiaOS::Swarm] Unknown intent '$Intent'" -ForegroundColor Red
        }
    }
}

# --- Dispatcher registration (to be pasted into your main PrimordiaOS shell file) ---
# In your main dispatcher file (where $PrimordiaIntents is defined), add:
# $PrimordiaIntents["swarm"] = { param($intent) Invoke-Primordia-Swarm $intent }

# Optional: auto-init on import
New-PrimordiaSwarmStructure
Write-Host "[PrimordiaOS::Swarm] Module loaded." -ForegroundColor Green

function Invoke-Primordia-Swarm {
    param(
        [string]$Intent
    )

    switch ($Intent) {
        "status" {
            Write-Host "PrimordiaOS Swarm: ACTIVE"
        }
        "start" {
            Write-Host "PrimordiaOS Swarm: Booting distributed agents..."
        }
        "stop" {
            Write-Host "PrimordiaOS Swarm: Halting all distributed agents."
        }
        default {
            Write-Host "PrimordiaOS Swarm: Unknown intent '$Intent'"
        }
    }
}

function Invoke-PrimordiaCommand {
    param($cmd, $arg1, $arg2)

    $Global:PrimordiaState.lastCommand = $cmd
    Save-PrimordiaState

    switch ($cmd) {

        # -------------------------
        # Native Shell Controls
        # -------------------------
        "shell.native" {
            Write-Host "PrimordiaOS: entering native PowerShell shell..." -ForegroundColor Cyan
            Start-Process powershell
        }

        "shell.exit" {
            Write-Host "PrimordiaOS: exiting OS shell..." -ForegroundColor Cyan
            $Global:PrimordiaState.shell = "IDLE"
            Save-PrimordiaState
            exit
        }

        # -------------------------
        # Basic Navigation
        # -------------------------
        "cd" {
            if (-not $arg1 -or $arg1 -eq "") {
                Write-Host "PrimordiaOS: cd requires a path." -ForegroundColor Yellow
            } else {
                Set-Location $arg1
                Write-Host "Changed directory to $arg1"
            }
        }

        "ls" {
            if ($arg1 -and $arg1 -ne "") {
                Get-ChildItem $arg1
            } else {
                Get-ChildItem
            }
        }

        "pwd" {
            Get-Location
        }

        # -------------------------
        # Loop Engine
        # -------------------------
        "engine.loop.start" {
            Primordia-LoopStart -profile $arg1 -channel $arg2
        }

        "engine.loop.stop" {
            Primordia-LoopStop
        }

        "agent.spawn" {
            Primordia-AgentSpawn -profile $arg1 -channel $arg2
        }

        # -------------------------
        # Cloud & Unreal Bridges
        # -------------------------
        "cloud.agent" {
            Primordia-CloudAgent -channel $arg1
        }

        "unreal.bridge" {
            Primordia-UnrealBridge -scene $arg1
        }

        # -------------------------
        # Content Engine
        # -------------------------
        "content.generate" {
            Primordia-ContentGenerate -profile $arg1
        }

        "autopost" {
            Primordia-AutoPoster -channel $arg1
        }

        "content.render" {
            Primordia-ContentRender -target $arg1
        }

        "content.package" {
            Primordia-ContentPackage -packName $arg1
        }

        "content.post" {
            Primordia-ContentPost -channel $arg1
        }

        # -------------------------
        # Diagnostics
        # -------------------------
        "system.state" {
            Primordia-Diagnostics
        }

        # -------------------------
        # Default Case
        # -------------------------
        default {
            Write-Host "PrimordiaOS: Unknown intent '$cmd'" -ForegroundColor Red
        }
    }
}

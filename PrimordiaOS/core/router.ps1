function Invoke-PrimordiaCommand {
    param($cmd, $arg1, $arg2)

    $Global:PrimordiaState.lastCommand = $cmd
    Save-PrimordiaState

    switch ($cmd) {

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

        "engine.loop.start" {
            Primordia-LoopStart -profile $arg1 -channel $arg2
        }

        "engine.loop.stop" {
            Primordia-LoopStop
        }

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

        "system.state" {
            Primordia-Diagnostics
        }

        default {
            Write-Host "PrimordiaOS: Unknown intent '$cmd'" -ForegroundColor Red
        }
    }
}

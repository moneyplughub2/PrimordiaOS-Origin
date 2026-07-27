$Global:PrimordiaLoopToken = $null

function Primordia-LoopStart {
    param(
        $profile = "default",
        $channel = "MoneyPlugHub",
        [int]$delaySeconds = 10
    )

    if ($Global:PrimordiaState.loop -eq "RUNNING") {
        Write-Host "PrimordiaOS: Loop already running." -ForegroundColor Yellow
        return
    }

    Write-Host "`n⟐ Autonomous Content Engine" -ForegroundColor Cyan
    Write-Host "Starting loop: profile='$profile', channel='$channel', delay=${delaySeconds}s"

    $Global:PrimordiaState.loop = "RUNNING"
    Save-PrimordiaState
    Log-Primordia "LOOP START: profile=$profile channel=$channel delay=$delaySeconds"

    $Global:PrimordiaLoopToken = [System.Guid]::NewGuid().ToString()

    Start-Job -Name "PrimordiaLoop-$($Global:PrimordiaLoopToken)" -ScriptBlock {
        param($profile, $channel, $delaySeconds, $stateFile, $logFile)

        while ($true) {
            try {
                $state = Get-Content -Path $stateFile -Encoding UTF8 | ConvertFrom-Json
                if ($state.loop -ne "RUNNING") {
                    break
                }

                # Increment iterations
                $state.iterations++
                Set-Content -Path $stateFile -Value ($state | ConvertTo-Json -Depth 5)

                # Rotation tables
                $channels = @("MoneyPlugHub","TikTok","YouTube","Instagram","X","Reddit","Facebook")
                $profiles = @("default","then","cosmic","moneyplug","primordial","creatorOS","loop")

                $i = $state.iterations

                $nextChannel = $channels[$i % $channels.Count]
                $nextProfile = $profiles[$i % $profiles.Count]

                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                $line = "[$timestamp] LOOP STEP: profile=$nextProfile channel=$nextChannel iteration=$i"
                Add-Content -Path $logFile -Value $line -Encoding UTF8

                Primordia-AutoPoster -channel $nextChannel -content $state.lastContent

                Start-Sleep -Seconds $delaySeconds
            } catch {
                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                $line = "[$timestamp] LOOP ERROR: $($_.Exception.Message)"
                Add-Content -Path $logFile -Value $line -Encoding UTF8
                break
            }
        }
    } -ArgumentList $profile, $channel, $delaySeconds, $Global:PrimordiaStateFile, $Global:PrimordiaLogFile
}

function Primordia-LoopStop {
    Write-Host "`n⟐ Autonomous Content Engine" -ForegroundColor Red
    Write-Host "Stopping loop."

    $Global:PrimordiaState.loop = "STOPPED"
    Save-PrimordiaState
    Log-Primordia "LOOP STOP"

    Get-Job | Where-Object { $_.Name -like "PrimordiaLoop-*" } | Remove-Job -Force
}

# Parallel agent spawn stub
function Primordia-AgentSpawn {
    param(
        $profile = "default",
        $channel = "MoneyPlugHub"
    )

    Start-Job -Name "PrimordiaAgent-$([guid]::NewGuid())" -ScriptBlock {
        param($profile, $channel, $stateFile, $logFile)

        while ($true) {
            try {
                $state = Get-Content -Path $stateFile -Encoding UTF8 | ConvertFrom-Json
                Primordia-AutoPoster -channel $channel -content $state.lastContent
                Start-Sleep -Seconds 15
            } catch {
                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                $line = "[$timestamp] AGENT ERROR: $($_.Exception.Message)"
                Add-Content -Path $logFile -Value $line -Encoding UTF8
                break
            }
        }
    } -ArgumentList $profile, $channel, $Global:PrimordiaStateFile, $Global:PrimordiaLogFile

    Log-Primordia "AGENT SPAWN: profile=$profile channel=$channel"
}

Export-ModuleMember -Function Primordia-LoopStart,Primordia-LoopStop,Primordia-AgentSpawn

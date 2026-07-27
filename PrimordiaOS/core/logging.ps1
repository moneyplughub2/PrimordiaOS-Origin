function Log-Primordia {
    param($message)

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] $message"
    Add-Content -Path $Global:PrimordiaLogFile -Value $line -Encoding UTF8
}

function prompt {
    $fire = "⟐"
    $mode = $Global:PrimordiaState.shell
    $loop = $Global:PrimordiaState.loop
    return "$fire PRIMORDIAOS [$mode/$loop] > "
}

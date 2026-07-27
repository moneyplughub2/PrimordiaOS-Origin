function Invoke-Primordia {
    param(
        [Parameter(ValueFromPipeline=$true, ValueFromRemainingArguments=$true)]
        $Input
    )

    if (-not $Input -and $PSBoundParameters.ContainsKey('Input')) {
        $Input = $PSBoundParameters['Input']
    }
    if (-not $Input -and $args) {
        $Input = $args
    }

    $Input = ($Input | Out-String).Trim()

    if (-not $Input -or $Input -eq "") {
        return
    }

    $parts = $Input -split "\s+"
    $cmd   = $parts[0]
    $arg1  = $null
    $arg2  = $null

    if ($parts.Count -ge 2) { $arg1 = $parts[1] }
    if ($parts.Count -ge 3) { $arg2 = $parts[2] }

    $Global:PrimordiaState.shell = "ACTIVE"
    Save-PrimordiaState

    Invoke-PrimordiaCommand $cmd $arg1 $arg2
}

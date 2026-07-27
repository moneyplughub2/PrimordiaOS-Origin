function Primordia-Diagnostics {
    Write-Host "`n⟐ PrimordiaOS Production Diagnostics" -ForegroundColor Cyan
    Write-Host "Shell State : $($Global:PrimordiaState.shell)"
    Write-Host "Loop State  : $($Global:PrimordiaState.loop)"
    Write-Host "Iterations  : $($Global:PrimordiaState.iterations)"
    Write-Host "Last Script : $($Global:PrimordiaState.lastContent)"
    Write-Host "Last Render : $($Global:PrimordiaState.lastRender)"
    Write-Host "Last Package: $($Global:PrimordiaState.lastPackage)"
    Write-Host "Last Post   : $($Global:PrimordiaState.lastPost)"
}

Export-ModuleMember -Function Primordia-Diagnostics

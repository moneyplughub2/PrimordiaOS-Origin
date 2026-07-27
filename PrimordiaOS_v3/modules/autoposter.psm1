function Primordia-AutoPoster {
    param(
        $channel = "MoneyPlugHub",
        $content = $Global:PrimordiaState.lastContent
    )

    if (-not $content -or $content -eq "") {
        Write-Host "`n⟐ AutoPoster Engine v3" -ForegroundColor Blue
        Write-Host "No content found. Auto-generating new content..." -ForegroundColor Yellow

        Primordia-ContentGenerate -profile "default"
        $content = $Global:PrimordiaState.lastContent
    }

    $postInfo = "v3 AutoPoster pushed content '$content' to '$channel' at $(Get-Date -Format 'HH:mm:ss')"

    Write-Host "`n⟐ AutoPoster Engine v3" -ForegroundColor Blue
    Write-Host "Auto-posting: $postInfo"

    Log-Primordia "AUTOPOST: $postInfo"
    $Global:PrimordiaState.lastPost = $postInfo
    Save-PrimordiaState
}

Export-ModuleMember -Function Primordia-AutoPoster

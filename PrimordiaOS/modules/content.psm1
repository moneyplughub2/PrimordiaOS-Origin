function Primordia-ContentGenerate {
    param($profile = "default")

    $idea = "Auto-script for profile '$profile' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastContent = $idea

    Write-Host "`n⟐ Content Engine" -ForegroundColor Cyan
    Write-Host "Generated script idea: $idea"

    Log-Primordia "CONTENT: $idea"
    Save-PrimordiaState
}

function Primordia-ContentRender {
    param($target = "video.mp4")

    $renderInfo = "Render task for '$target' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastRender = $renderInfo

    Write-Host "`n⟐ Render Engine" -ForegroundColor Yellow
    Write-Host "Queued render: $renderInfo"

    Log-Primordia "RENDER: $renderInfo"
    Save-PrimordiaState
}

function Primordia-ContentPackage {
    param($packName = "Primordia_VFX_Pack")

    $packageInfo = "Package '$packName' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastPackage = $packageInfo

    Write-Host "`n⟐ Packaging Engine" -ForegroundColor Green
    Write-Host "Packaging: $packageInfo"

    Log-Primordia "PACKAGE: $packageInfo"
    Save-PrimordiaState
}

function Primordia-ContentPost {
    param($channel = "MoneyPlugHub")

    $postInfo = "Post to '$channel' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastPost = $postInfo

    Write-Host "`n⟐ Posting Engine" -ForegroundColor Magenta
    Write-Host "Posting: $postInfo"

    Log-Primordia "POST: $postInfo"
    Save-PrimordiaState
}

Export-ModuleMember -Function *-Content*

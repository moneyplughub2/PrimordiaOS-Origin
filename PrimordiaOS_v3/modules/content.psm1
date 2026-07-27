function Primordia-ContentGenerate {
    param($profile = "default")

    $idea = "v3 auto-script for profile '$profile' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastContent = $idea

    Write-Host "`n⟐ Content Engine v3" -ForegroundColor Cyan
    Write-Host "Generated script idea: $idea"

    Log-Primordia "CONTENT: $idea"
    Save-PrimordiaState
}

function Primordia-ContentRender {
    param($target = "video.mp4")

    $renderInfo = "v3 render task for '$target' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastRender = $renderInfo

    Write-Host "`n⟐ Render Engine v3" -ForegroundColor Yellow
    Write-Host "Queued render: $renderInfo"

    Log-Primordia "RENDER: $renderInfo"
    Save-PrimordiaState
}

function Primordia-ContentPackage {
    param($packName = "Primordia_VFX_Pack_v3")

    $packageInfo = "v3 package '$packName' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastPackage = $packageInfo

    Write-Host "`n⟐ Packaging Engine v3" -ForegroundColor Green
    Write-Host "Packaging: $packageInfo"

    Log-Primordia "PACKAGE: $packageInfo"
    Save-PrimordiaState
}

function Primordia-ContentPost {
    param($channel = "MoneyPlugHub")

    $postInfo = "v3 post to '$channel' at $(Get-Date -Format 'HH:mm:ss')"
    $Global:PrimordiaState.lastPost = $postInfo

    Write-Host "`n⟐ Posting Engine v3" -ForegroundColor Magenta
    Write-Host "Posting: $postInfo"

    Log-Primordia "POST: $postInfo"
    Save-PrimordiaState
}

Export-ModuleMember -Function *-Content*

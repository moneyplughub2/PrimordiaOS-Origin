# ================================
# PrimordiaOS Kernel Folder Builder
# ================================

$root = "C:\Users\Shane\Documents\dev\PrimordiaOS\kernel"

Write-Host "Creating PrimordiaOS kernel structure..."

# Create root
if (!(Test-Path $root)) {
    New-Item -ItemType Directory -Path $root
}

# Create core folders
$folders = @(
    "$root\src",
    "$root\src\agents",
    "$root\src\memory",
    "$root\src\plugin",
    "$root\dist"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder
        Write-Host "Created: $folder"
    } else {
        Write-Host "Exists:  $folder"
    }
}

# Create empty starter files
$files = @(
    "$root\kernel.js",
    "$root\package.json",
    "$root\tsconfig.json",
    "$root\src\kernel.ts",
    "$root\src\router.ts",
    "$root\src\state.ts",
    "$root\src\plugin\profile.json",
    "$root\src\plugin\capabilities.ts",
    "$root\src\plugin\governance.ts"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "Created file: $file"
    } else {
        Write-Host "Exists file:  $file"
    }
}

Write-Host "`nPrimordiaOS kernel folder tree is ready."

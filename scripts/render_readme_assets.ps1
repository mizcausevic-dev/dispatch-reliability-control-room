$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
    param(
        [string]$Path,
        [string]$Title,
        [string]$Subtitle,
        [string[]]$Bullets
    )

    $bitmap = New-Object System.Drawing.Bitmap 1600, 1000
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(9, 20, 32))

    $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(17, 32, 45))
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(96, 215, 255))
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232, 241, 247))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(156, 176, 191))
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(48, 96, 124), 2)

    $graphics.FillRectangle($panelBrush, 48, 48, 1504, 904)
    $graphics.DrawRectangle($borderPen, 48, 48, 1504, 904)

    $eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
    $titleFont = New-Object System.Drawing.Font("Georgia", 34, [System.Drawing.FontStyle]::Bold)
    $bodyFont = New-Object System.Drawing.Font("Segoe UI", 18)
    $bulletFont = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)

    $graphics.DrawString("Dispatch Reliability Control Room", $eyebrowFont, $accentBrush, 92, 92)
    $graphics.DrawString($Title, $titleFont, $textBrush, 92, 142)
    $graphics.DrawString($Subtitle, $bodyFont, $mutedBrush, 92, 214)

    $y = 320
    foreach ($bullet in $Bullets) {
        $graphics.DrawString("•", $bulletFont, $accentBrush, 108, $y)
        $graphics.DrawString($bullet, $bodyFont, $textBrush, 138, $y + 2)
        $y += 82
    }

    $footer = "Synthetic proof render for README packaging."
    $graphics.DrawString($footer, $bodyFont, $mutedBrush, 92, 880)

    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
}

New-ProofImage -Path (Join-Path $screenshots "01-overview-proof.png") `
    -Title "Overview proof" `
    -Subtitle "Dispatch counts, urgent lanes, blocked handoffs, and route risk in one control room." `
    -Bullets @(
        "Queue pressure maps to service impact and next action.",
        "Blocked handoffs are visible before SLA promises break.",
        "Route-risk posture is buyer-readable and operator-safe."
    )

New-ProofImage -Path (Join-Path $screenshots "02-dispatch-lane-proof.png") `
    -Title "Dispatch lane" `
    -Subtitle "Each incident ties region, owner, route issue, and intervention path together." `
    -Bullets @(
        "Driver reassignment delays surface immediately.",
        "Dock-release lag is separated from route drift.",
        "Operators can see who owns the next move."
    )

New-ProofImage -Path (Join-Path $screenshots "03-handoff-risks-proof.png") `
    -Title "Handoff risks" `
    -Subtitle "Partner, staffing, and fleet blockers stay linked to required evidence and readiness." `
    -Bullets @(
        "Each blocker shows proof needed before release.",
        "Service impact stays visible for prioritization.",
        "Recovery work is mapped to a named owner."
    )

New-ProofImage -Path (Join-Path $screenshots "04-route-adherence-proof.png") `
    -Title "Route adherence" `
    -Subtitle "Routes show adherence score, SLA posture, and intervention window." `
    -Bullets @(
        "Red routes show immediate intervention pressure.",
        "Yellow routes preserve the next promise reset window.",
        "Green routes stay monitored without noise."
    )

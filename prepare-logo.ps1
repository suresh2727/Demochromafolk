Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile('d:\XenoConnect\website\logo.jpeg')
$w = $source.Width
$h = $source.Height

# 1. Dark logo with transparent background (black bird & text)
$destDark = New-Object System.Drawing.Bitmap($w, $h)

# 2. White logo with transparent background (white bird & text)
$destLight = New-Object System.Drawing.Bitmap($w, $h)

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $c = $source.GetPixel($x, $y)
        $brightness = ($c.R * 0.299 + $c.G * 0.587 + $c.B * 0.114)
        if ($brightness -gt 235) {
            $destDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $destLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            $alpha = [int](255 - $brightness)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $destDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 15, 17, 23))
            $destLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
    }
}

$destDark.Save('d:\XenoConnect\website\logo-dark.png', [System.Drawing.Imaging.ImageFormat]::Png)
$destLight.Save('d:\XenoConnect\website\logo-light.png', [System.Drawing.Imaging.ImageFormat]::Png)

$source.Dispose()
$destDark.Dispose()
$destLight.Dispose()

Write-Host "Logos generated successfully: logo-dark.png and logo-light.png"

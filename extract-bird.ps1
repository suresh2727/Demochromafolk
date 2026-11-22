Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile('d:\XenoConnect\website\logo.jpeg')
$w = $source.Width
$h = $source.Height

# Find bounding box of pixels in top half (the bird)
$birdMinX = $w; $birdMaxX = 0; $birdMinY = $h; $birdMaxY = 0

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt 230; $y++) {
        $c = $source.GetPixel($x, $y)
        $brightness = ($c.R * 0.299 + $c.G * 0.587 + $c.B * 0.114)
        if ($brightness -lt 200) {
            if ($x -lt $birdMinX) { $birdMinX = $x }
            if ($x -gt $birdMaxX) { $birdMaxX = $x }
            if ($y -lt $birdMinY) { $birdMinY = $y }
            if ($y -gt $birdMaxY) { $birdMaxY = $y }
        }
    }
}

Write-Host "Bird bounds: X=[$birdMinX, $birdMaxX], Y=[$birdMinY, $birdMaxY]"

# Add padding
$pad = 16
$bx = [Math]::Max(0, $birdMinX - $pad)
$by = [Math]::Max(0, $birdMinY - $pad)
$bw = [Math]::Min($w - $bx, ($birdMaxX - $birdMinX) + 2 * $pad)
$bh = [Math]::Min($h - $by, ($birdMaxY - $birdMinY) + 2 * $pad)

$birdLight = New-Object System.Drawing.Bitmap($bw, $bh)
$birdDark = New-Object System.Drawing.Bitmap($bw, $bh)

for ($x = 0; $x -lt $bw; $x++) {
    for ($y = 0; $y -lt $bh; $y++) {
        $srcX = $bx + $x
        $srcY = $by + $y
        $c = $source.GetPixel($srcX, $srcY)
        $brightness = ($c.R * 0.299 + $c.G * 0.587 + $c.B * 0.114)
        if ($brightness -gt 235) {
            $birdDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $birdLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            $alpha = [int](255 - $brightness)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $birdDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 15, 17, 23))
            $birdLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
    }
}

$birdDark.Save('d:\XenoConnect\website\bird-dark.png', [System.Drawing.Imaging.ImageFormat]::Png)
$birdLight.Save('d:\XenoConnect\website\bird-light.png', [System.Drawing.Imaging.ImageFormat]::Png)

$source.Dispose()
$birdDark.Dispose()
$birdLight.Dispose()

Write-Host "Bird icons generated: bird-dark.png and bird-light.png"

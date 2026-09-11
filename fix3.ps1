$files = Get-ChildItem -Path "C:\MASTERCODE_COMPANY\CLIENTES_APP\pagina_camilo_alvarez\frontend\src\layouts" -Filter "*.jsx"
foreach ($file in $files) {
    $path = $file.FullName
    $content = Get-Content $path -Raw
    if ($content -match "\.\./\.\./") {
        $new = $content -replace "\.\./\.\./", "../"
        Set-Content -Path $path -Value $new -NoNewline
        Write-Host "Fixed: $($file.Name)"
    } else {
        Write-Host "OK: $($file.Name)"
    }
}

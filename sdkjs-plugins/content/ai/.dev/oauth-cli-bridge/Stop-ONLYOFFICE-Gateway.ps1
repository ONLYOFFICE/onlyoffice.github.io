param([string]$GatewayDirectory = (Join-Path $PSScriptRoot 'runtime\cliproxyapi'))
$ErrorActionPreference = 'Stop'
$gatewayRoot = [IO.Path]::GetFullPath($GatewayDirectory)
$gatewayExe = Join-Path $gatewayRoot 'bin\cli-proxy-api.exe'
$gatewayConfig = Join-Path $gatewayRoot 'config.yaml'
$ownedProcesses = Get-CimInstance Win32_Process -Filter "Name='cli-proxy-api.exe'" | Where-Object {
    $_.ExecutablePath -eq $gatewayExe -and $_.CommandLine -like "*$gatewayConfig*"
}
foreach ($ownedProcess in $ownedProcesses) { Stop-Process -Id $ownedProcess.ProcessId -ErrorAction Stop }
Write-Output "Stopped $(@($ownedProcesses).Count) matching ONLYOFFICE gateway process(es)."

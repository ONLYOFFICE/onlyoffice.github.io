param([string]$GatewayDirectory = (Join-Path $PSScriptRoot 'runtime\cliproxyapi'))
$ErrorActionPreference = 'Stop'
$gatewayRoot = [IO.Path]::GetFullPath($GatewayDirectory)
$gatewayExe = Join-Path $gatewayRoot 'bin\cli-proxy-api.exe'
$gatewayConfig = Join-Path $gatewayRoot 'config.yaml'
$clientKey = [IO.File]::ReadAllText((Join-Path $gatewayRoot 'client-key.txt')).Trim()
$gatewayHeaders = @{ Authorization = "Bearer $clientKey" }
try {
    Invoke-RestMethod 'http://127.0.0.1:8317/v1/models' -Headers $gatewayHeaders -TimeoutSec 3 | Out-Null
    Write-Output 'CLIProxyAPI is already responding at http://127.0.0.1:8317/v1'
    return
} catch {}
if (!(Test-Path -LiteralPath $gatewayExe) -or !(Test-Path -LiteralPath $gatewayConfig)) { throw 'Gateway installation or private configuration is missing.' }
$startupOptions = New-CimInstance -ClassName Win32_ProcessStartup -ClientOnly -Property @{ ShowWindow = [uint16]0 }
$createdProcess = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
    CommandLine = ('"' + $gatewayExe + '" --config "' + $gatewayConfig + '"')
    CurrentDirectory = $gatewayRoot
    ProcessStartupInformation = $startupOptions
}
if ($createdProcess.ReturnValue -ne 0) { throw "Gateway launch failed: Win32 return code $($createdProcess.ReturnValue)" }
for ($attempt = 0; $attempt -lt 15; $attempt++) {
    Start-Sleep -Seconds 1
    try {
        Invoke-RestMethod 'http://127.0.0.1:8317/v1/models' -Headers $gatewayHeaders -TimeoutSec 2 | Out-Null
        Write-Output "CLIProxyAPI started (PID $($createdProcess.ProcessId)) at http://127.0.0.1:8317/v1"
        return
    } catch {}
}
throw 'Gateway did not become ready. Inspect the private configuration and process status.'

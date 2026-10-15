# SPDX-License-Identifier: AGPL-3.0-only
$ErrorActionPreference = 'Stop'
$adapterScript = Join-Path $PSScriptRoot 'onlyoffice-oauth-adapter.mjs'
$configFile = Join-Path $PSScriptRoot 'bridge.config.json'
if (-not (Test-Path -LiteralPath $configFile)) { throw 'Copy bridge.config.example.json to bridge.config.json and configure your CLI paths first.' }
$bridgePort = (Get-Content -LiteralPath $configFile -Raw | ConvertFrom-Json).port
$existingListener = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $bridgePort -State Listen -ErrorAction SilentlyContinue
if ($existingListener) {
    $listenerProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$($existingListener.OwningProcess)"
    if ($listenerProcess.CommandLine -notlike "*$adapterScript*") { throw 'Port 18741 is occupied by another process.' }
    Write-Output "ONLYOFFICE adapter is already running at http://127.0.0.1:$bridgePort/v1"
    return
}
$runtimeDirectory = Join-Path $PSScriptRoot 'runtime'
New-Item -ItemType Directory -Path $runtimeDirectory -Force | Out-Null
$nodeExecutable = (Get-Command node.exe -ErrorAction Stop).Source
$adapterProcess = Start-Process -FilePath $nodeExecutable -ArgumentList ('"' + $adapterScript + '"') -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 1
if ($adapterProcess.HasExited) { throw 'Adapter exited. Run node onlyoffice-oauth-adapter.mjs to see the error.' }
Invoke-RestMethod -Uri "http://127.0.0.1:$bridgePort/v1/models" -TimeoutSec 5 | Out-Null
Write-Output "ONLYOFFICE adapter started (PID $($adapterProcess.Id)) at http://127.0.0.1:$bridgePort/v1"

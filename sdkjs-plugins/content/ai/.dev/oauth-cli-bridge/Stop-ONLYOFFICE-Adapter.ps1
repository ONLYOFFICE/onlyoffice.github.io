# SPDX-License-Identifier: AGPL-3.0-only
$ErrorActionPreference = 'Stop'
$adapterScript = Join-Path $PSScriptRoot 'onlyoffice-oauth-adapter.mjs'
$adapterProcesses = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -like "*$adapterScript*" }
foreach ($adapterProcess in $adapterProcesses) { Stop-Process -Id $adapterProcess.ProcessId }
Write-Output "Stopped $(@($adapterProcesses).Count) ONLYOFFICE adapter process(es)."

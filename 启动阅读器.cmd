@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:3000' -TimeoutSec 3; if ($r.Content -match 'Koodo Reader') { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 (
  start "" "http://127.0.0.1:3000"
  exit /b 0
)
set BROWSER=
set HOST=127.0.0.1
set PORT=3000
call npm.cmd start
pause

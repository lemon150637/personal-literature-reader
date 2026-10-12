@echo off
cd /d "%~dp0"
set BROWSER=none
set HOST=127.0.0.1
set PORT=3000
call npm.cmd start
pause

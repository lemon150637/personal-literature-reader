@echo off
cd /d "%~dp0"
call npx.cmd --yes yarn@1.22.22 install --frozen-lockfile --non-interactive --ignore-scripts
pause

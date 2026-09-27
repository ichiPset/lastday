@echo off
title Hari Terakhir
cd /d "%~dp0"
if not exist node_modules (
  echo [1/2] Menginstall dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Instalasi dependencies gagal.
    pause
    exit /b 1
  )
)
echo [2/2] Menjalankan Hari Terakhir...
call npm run dev
pause

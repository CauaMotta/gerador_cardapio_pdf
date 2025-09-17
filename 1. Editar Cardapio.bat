@echo off
title Editar Cardapio

set CAMINHO=%~dp0entrada\cardapio.json

if not exist "%CAMINHO%" (
    echo Arquivo nao encontrado: %CAMINHO%
    pause
    exit /b
)

where code >nul 2>nul
if %errorlevel%==0 (
    code "%CAMINHO%"
    exit /b
)

where subl >nul 2>nul
if %errorlevel%==0 (
    subl "%CAMINHO%"
    exit /b
)

echo Nao encontrei VS Code nem Sublime no PATH.
pause
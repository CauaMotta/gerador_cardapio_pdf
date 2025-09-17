@echo off
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Solicitando privilegios de administrador...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)
title Instalador de Dependencias

echo ================================================
echo      Instalar Dependencias com Winget
echo ================================================
echo.

for %%p in ("Git.Git" "SublimeHQ.SublimeText.4" "OpenJS.NodeJS.LTS") do (
    echo Instalando %%p ...
    winget install -e --id %%~p --accept-source-agreements --accept-package-agreements
    echo.
)

set "SUBLIME_DEFAULT_PATH=C:\Program Files\Sublime Text"

echo Verificando e configurando o PATH para o Sublime Text...
echo.

powershell -ExecutionPolicy Bypass -NoProfile -Command ^
    "$installPath = '%SUBLIME_DEFAULT_PATH%'; " ^
    "Write-Host ('Verificando o caminho padrao: ' + $installPath);" ^
    "" ^
    "if (Test-Path -Path $installPath -PathType Container) {" ^
    "    $systemPath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine');" ^
    "    if (($systemPath -split ';') -notcontains $installPath) {" ^
    "        Write-Host 'Adicionando Sublime Text ao PATH do Sistema...';" ^
    "        $newPath = $systemPath.TrimEnd(';') + ';' + $installPath;" ^
    "        [System.Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine');" ^
    "        Write-Host 'PATH atualizado com sucesso!' -ForegroundColor Green;" ^
    "    } else {" ^
    "        Write-Host 'O caminho ja esta configurado no PATH.' -ForegroundColor Yellow;" ^
    "    }" ^
    "} else {" ^
    "    Write-Host ('AVISO: A pasta padrao ''{0}'' nao foi encontrada.' -f $installPath) -ForegroundColor Red;" ^
    "    Write-Host 'A adicao ao PATH foi ignorada. Verifique se o programa foi instalado no local esperado.' -ForegroundColor Red;" ^
    "}"

echo.
echo ================================================
echo Todos os programas foram instalados (ou ja estavam)!
echo Pressione qualquer tecla para sair...
pause >nul
exit
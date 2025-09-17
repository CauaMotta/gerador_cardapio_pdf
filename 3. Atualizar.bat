@echo off
title Atualizar Projeto

echo ================================================
echo   Atualizando projeto...
echo ================================================
echo.

echo [1/4] Puxando atualizacoes do GitHub...
git pull
echo.

echo [2/4] Removendo node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo node_modules removido.
) else (
    echo node_modules nao existe, continuando...
)
echo.

echo [3/4] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo Erro ao instalar dependencias!
    pause
    exit /b
)
echo.

echo [4/4] Escondendo arquivos do sistema...
attrib +h node_modules
attrib +h app.js
attrib +h package-lock.json
attrib +h package.json
attrib +h .gitignore
echo.

echo ================================================
echo Atualizacao concluida com sucesso!
echo Pressione qualquer tecla para sair...
pause >nul
exit

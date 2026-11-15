@echo off
cls
setlocal enabledelayedexpansion

echo =========================================
echo   Updating Node.js Project Dependencies   
echo =========================================
echo.

:: 1. Clean installs current dependencies
echo [1/4] Installing existing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install initial packages.
    pause
    exit /b %errorlevel%
)

:: 2. Update all packages to latest allowed semver versions
echo.
echo [2/4] Updating packages...
call npm update --save --save-dev
if %errorlevel% neq 0 (
    echo [WARNING] npm update completed with warnings or errors.
)

:: 3. Run audit fix for safe security patches
echo.
echo [3/4] Running security audit fix...
call npm audit fix

:: 4. Prompt before running force audit fix (destructive breaking changes)
echo.
echo [4/4] Security Audit Check
set /p "FORCE_AUDIT=Do you want to run 'npm audit fix --force' (May introduce breaking changes)? [y/N]: "

if /i "%FORCE_AUDIT%"=="y" (
    echo Running forced audit fix...
    call npm audit fix --force
) else (
    echo Skipped forced audit fix.
)

echo.
echo =========================================
echo   Update Process Completed Successfully!  
echo =========================================
pause
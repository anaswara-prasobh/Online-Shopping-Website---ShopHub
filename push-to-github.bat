@echo off
REM Push ShopHub to GitHub - Automated Script
REM This script automates the git push process

echo.
echo ============================================
echo   ShopHub GitHub Push Script
echo ============================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please download and install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✓ Git is installed
echo.

REM Navigate to project directory
cd /d "c:\Users\prash\Desktop\Notes\PythonFSD"
if %errorlevel% neq 0 (
    echo ERROR: Could not navigate to project directory
    pause
    exit /b 1
)

echo ✓ Navigated to project directory
echo.

REM Check if git repository exists
if not exist .git (
    echo [STEP 1] Initializing Git Repository...
    git init
    if %errorlevel% neq 0 (
        echo ERROR: Failed to initialize git repository
        pause
        exit /b 1
    )
    echo ✓ Git repository initialized
    echo.
)

REM Add remote if not exists
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
    echo [STEP 2] Adding remote repository...
    git remote add origin https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git
    if %errorlevel% neq 0 (
        echo ERROR: Failed to add remote repository
        pause
        exit /b 1
    )
    echo ✓ Remote repository added
    echo.
)

REM Configure git user
echo [STEP 3] Configuring Git user...
git config user.name "Your Name"
git config user.email "your-email@example.com"
echo ✓ Git user configured
echo.

REM Stage all files
echo [STEP 4] Staging all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to stage files
    pause
    exit /b 1
)
echo ✓ All files staged
echo.

REM Show status
echo [STEP 5] Current Git Status:
echo.
git status
echo.

REM Ask for commit message
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" (
    set commit_msg="Initial commit: Online Shopping Website - ShopHub with Bootstrap, Material Design, LocalStorage, and complete CRUD operations"
)

REM Commit
echo [STEP 6] Creating commit...
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo ✓ Commit created
echo.

REM Set branch to main
echo [STEP 7] Setting branch to main...
git branch -M main
echo ✓ Branch set to main
echo.

REM Push to GitHub
echo [STEP 8] Pushing to GitHub...
echo (You may be asked to authenticate. Use your GitHub Personal Access Token as password)
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    echo Please check your credentials and internet connection
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub!
echo.

echo ============================================
echo   Push Complete!
echo ============================================
echo.
echo Repository: https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub
echo.
pause

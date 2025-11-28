# ShopHub GitHub Push Script (PowerShell)
# This script automates the git push process

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  ShopHub GitHub Push Script" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check if git is installed
$gitCheck = try { git --version 2>$null } catch { $null }
if (-not $gitCheck) {
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host "Download Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Git is installed" -ForegroundColor Green

# Navigate to project directory
$projectPath = "c:\Users\prash\Desktop\Notes\PythonFSD"
if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Project directory not found: $projectPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $projectPath
Write-Host "✓ Navigated to project directory`n" -ForegroundColor Green

# Initialize git if needed
if (-not (Test-Path .git)) {
    Write-Host "[STEP 1] Initializing Git Repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to initialize git repository" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✓ Git repository initialized`n" -ForegroundColor Green
}

# Add remote if not exists
$remoteUrl = try { git remote get-url origin 2>$null } catch { $null }
if (-not $remoteUrl) {
    Write-Host "[STEP 2] Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to add remote repository" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✓ Remote repository added`n" -ForegroundColor Green
}

# Configure git user
Write-Host "[STEP 3] Configuring Git user..." -ForegroundColor Yellow
$userName = Read-Host "Enter your name (or press Enter to skip)"
if ($userName) {
    git config user.name $userName
}

$userEmail = Read-Host "Enter your email (or press Enter to skip)"
if ($userEmail) {
    git config user.email $userEmail
}
Write-Host "✓ Git user configured`n" -ForegroundColor Green

# Stage all files
Write-Host "[STEP 4] Staging all files..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to stage files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ All files staged`n" -ForegroundColor Green

# Show status
Write-Host "[STEP 5] Current Git Status:" -ForegroundColor Yellow
Write-Host ""
git status
Write-Host ""

# Ask for commit message
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if (-not $commitMsg) {
    $commitMsg = "Initial commit: Online Shopping Website - ShopHub with Bootstrap, Material Design, LocalStorage, and complete CRUD operations"
}

# Commit
Write-Host "[STEP 6] Creating commit..." -ForegroundColor Yellow
git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create commit (might be because there are no changes)" -ForegroundColor Yellow
}
Write-Host "✓ Commit created`n" -ForegroundColor Green

# Set branch to main
Write-Host "[STEP 7] Setting branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to main`n" -ForegroundColor Green

# Push to GitHub
Write-Host "[STEP 8] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "(You may be asked to authenticate. Use your GitHub Personal Access Token as password)" -ForegroundColor Cyan
Write-Host ""
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Possible solutions:" -ForegroundColor Yellow
    Write-Host "1. Check your internet connection" -ForegroundColor Yellow
    Write-Host "2. Verify GitHub credentials (use Personal Access Token)" -ForegroundColor Yellow
    Write-Host "3. Check if repository URL is correct" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n============================================" -ForegroundColor Green
Write-Host "  Push Complete!" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Green

Write-Host "Repository: https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

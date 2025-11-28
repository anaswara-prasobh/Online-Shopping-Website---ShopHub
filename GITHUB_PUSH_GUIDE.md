# Push to GitHub - Step by Step Guide

## Prerequisites
1. **Git Installation**: Download and install Git from https://git-scm.com/download/win
2. **GitHub Account**: You should have a GitHub account
3. **Repository Created**: The repository should already exist on GitHub

## Steps to Push Your Project

### Step 1: Install Git (if not already installed)
- Download from: https://git-scm.com/download/win
- Run the installer with default settings
- Restart your terminal/PowerShell after installation

### Step 2: Configure Git (First time setup)
Open PowerShell and run:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 3: Navigate to Your Project
```powershell
cd "c:\Users\prash\Desktop\Notes\PythonFSD"
```

### Step 4: Initialize Git Repository (if not already initialized)
```powershell
git init
```

### Step 5: Add Remote Repository
```powershell
git remote add origin https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git
```

### Step 6: Create .gitignore File
Create a file named `.gitignore` in the project root:
```
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.egg-info/
dist/
build/
.env
.venv
venv/
ENV/
.DS_Store
*.log
node_modules/
```

### Step 7: Stage All Files
```powershell
git add .
```

### Step 8: Check Status
```powershell
git status
```

You should see all your files listed as "new file".

### Step 9: Create Initial Commit
```powershell
git commit -m "Initial commit: Online Shopping Website with Bootstrap, Material Design, and LocalStorage"
```

### Step 10: Push to GitHub
First, verify the branch name:
```powershell
git branch -M main
```

Then push:
```powershell
git push -u origin main
```

### Step 11: Authenticate with GitHub (if prompted)
- If you see authentication prompt, you can use:
  - **Personal Access Token** (recommended)
  - **GitHub CLI authentication**
  - **SSH keys**

## Using Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token
5. When git asks for password, paste the token instead

## Using SSH Keys (Alternative)

1. Generate SSH key:
```powershell
ssh-keygen -t rsa -b 4096 -f "$env:USERPROFILE\.ssh\github_key"
```

2. Add SSH key to SSH agent:
```powershell
ssh-add "$env:USERPROFILE\.ssh\github_key"
```

3. Copy public key to GitHub:
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste contents of `$env:USERPROFILE\.ssh\github_key.pub`

4. Update remote to use SSH:
```powershell
git remote set-url origin git@github.com:anaswara-prasobh/Online-Shopping-Website---ShopHub.git
```

## Verify Push Success

After pushing, verify on GitHub:
1. Go to https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub
2. You should see all your files uploaded
3. Check the commits tab to see your commit history

## Future Updates

For future updates:
```powershell
git add .
git commit -m "Your commit message"
git push origin main
```

## Useful Git Commands

```powershell
# Check status
git status

# View commit history
git log --oneline

# See changes
git diff

# Undo changes to a file
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Remove a file from tracking
git rm --cached filename

# Create a new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Merge branch
git merge branch-name
```

## Troubleshooting

### Error: "fatal: not a git repository"
Solution: Run `git init` first

### Error: "Permission denied"
Solution: Check your credentials, use Personal Access Token instead of password

### Error: "fatal: 'origin' does not appear to be a 'git' repository"
Solution: Run `git remote add origin <url>` again

### Large Files Error
If you have files over 100MB, use Git LFS (Large File Storage)

## File Structure Being Pushed

```
Online-Shopping-Website---ShopHub/
├── app.py                          # Flask application
├── README.md                       # Project documentation
├── DEVELOPMENT.md                  # Development guide
├── API_REFERENCE.md               # API documentation
├── static/
│   ├── script.js                  # JavaScript - all logic
│   └── style.css                  # CSS - styling
└── templates/
    ├── index.html                 # Home page
    ├── login.html                 # Login page
    ├── register.html              # Registration page
    ├── products.html              # Products page
    ├── product-form.html          # Product management
    └── cart.html                  # Shopping cart
```

## Next Steps After Push

1. **Update README**: Add badges, setup instructions on GitHub
2. **Create Issues**: Document any TODOs or bugs
3. **Enable GitHub Pages** (optional): For documentation
4. **Set up Actions** (optional): For CI/CD

---

**Need help?** Check GitHub documentation: https://docs.github.com/en/get-started/getting-started-with-git

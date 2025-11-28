# ShopHub - GitHub Push Instructions

## Quick Start (Easy Method)

### For Windows PowerShell Users:

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Run installer with default settings
   - Restart your terminal

2. **Run the Automated Script**:
   ```powershell
   cd "c:\Users\prash\Desktop\Notes\PythonFSD"
   .\push-to-github.ps1
   ```

3. **Follow the prompts** - The script will handle everything!

---

## Manual Steps (If Script Doesn't Work)

### Step 1: Install Git
- Download: https://git-scm.com/download/win
- Install with default settings
- Restart PowerShell

### Step 2: Open PowerShell and Navigate to Project
```powershell
cd "c:\Users\prash\Desktop\Notes\PythonFSD"
```

### Step 3: Initialize Git Repository
```powershell
git init
```

### Step 4: Configure Your Git
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Add Remote Repository
```powershell
git remote add origin https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git
```

### Step 6: Stage All Files
```powershell
git add .
```

### Step 7: Check What Will Be Pushed
```powershell
git status
```

### Step 8: Create Initial Commit
```powershell
git commit -m "Initial commit: Online Shopping Website - ShopHub"
```

### Step 9: Rename Branch to Main
```powershell
git branch -M main
```

### Step 10: Push to GitHub
```powershell
git push -u origin main
```

### Step 11: Authenticate
When prompted:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (see below)

---

## Creating a Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Give it a name (e.g., "ShopHub Push")
4. Select scopes:
   - ✓ repo (full control of private repositories)
   - ✓ workflow (if you want GitHub Actions)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When Git asks for password, **paste this token**

---

## Verification

After successful push, verify here:
- https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub

You should see:
- ✓ All files uploaded
- ✓ Project structure visible
- ✓ README.md displayed
- ✓ Commit history showing your push

---

## What Gets Pushed

```
├── .gitignore              # Files to ignore
├── .git/                   # Git repository data
├── app.py                  # Flask server
├── README.md               # Project documentation
├── DEVELOPMENT.md          # Development guide
├── API_REFERENCE.md        # API docs
├── GITHUB_PUSH_GUIDE.md    # This file
├── push-to-github.bat      # Batch script
├── push-to-github.ps1      # PowerShell script
├── static/
│   ├── script.js           # JavaScript logic
│   └── style.css           # Styling
└── templates/
    ├── index.html          # Home page
    ├── login.html          # Login
    ├── register.html       # Registration
    ├── products.html       # Products listing
    ├── product-form.html   # Add/Edit product
    └── cart.html           # Shopping cart
```

---

## Troubleshooting

### "Git is not recognized"
**Solution**: Install Git from https://git-scm.com/download/win and restart terminal

### "fatal: not a git repository"
**Solution**: Run `git init` first

### "Permission denied" or "fatal: Authentication failed"
**Solution**: 
- Use Personal Access Token (not password)
- Generate at: https://github.com/settings/tokens

### "fatal: 'origin' does not appear to be a 'git' repository"
**Solution**: Run `git remote add origin https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git`

### "Everything up-to-date" (but files not visible)
**Solution**: Files were already pushed, check GitHub to confirm

### Script runs but nothing gets pushed
**Solution**: 
1. Check internet connection
2. Verify repository exists on GitHub
3. Check credentials (use Personal Access Token)
4. Try manual steps instead

---

## Next Steps After Successful Push

### 1. Update README.md
Add the following to your GitHub README:

```markdown
# ShopHub - Online Shopping Website

A responsive, fully functional online shopping website with user authentication, CRUD operations, and shopping cart functionality.

## Features
- ✅ User Registration & Login
- ✅ Admin Product Management (Add/Edit/Delete)
- ✅ Shopping Cart with Quantity Control
- ✅ Responsive Design (Bootstrap 5)
- ✅ Material Design Components
- ✅ LocalStorage Database
- ✅ Form Validation
- ✅ Checkout Functionality

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Framework: Bootstrap 5, Material Design
- Backend: Flask (Python)
- Database: LocalStorage
- Deploy: Flask development server

## Demo Credentials
- **Admin Email**: admin@gmail.com
- **Admin Password**: admin123

## Installation

1. Clone the repository:
```bash
git clone https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub.git
cd Online-Shopping-Website---ShopHub
```

2. Install dependencies:
```bash
pip install flask
```

3. Run the application:
```bash
python app.py
```

4. Open browser:
```
http://localhost:5000
```

## Project Structure
See `DEVELOPMENT.md` and `API_REFERENCE.md` for detailed information.

## Pages
- Home Page - Landing page with hero banner
- Login Page - User authentication
- Register Page - New user signup
- Products Page - Browse and search products
- Product Form - Add/edit products (admin only)
- Cart Page - Manage shopping cart

## Author
[Your Name]

## License
MIT License
```

### 2. Create GitHub Issues
Document features you want to add:
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] User profile management
- [ ] Product reviews
- [ ] Wishlist feature

### 3. Enable GitHub Pages (Optional)
Go to Settings → Pages to publish documentation

### 4. Add Collaborators
Go to Settings → Collaborators to invite team members

---

## Common Git Commands for Future Updates

```powershell
# Check status
git status

# View recent commits
git log --oneline -10

# See what changed
git diff

# Add specific file
git add filename

# Commit changes
git commit -m "Description of changes"

# Push changes
git push origin main

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name
```

---

## Important Notes

⚠️ **Never Push**:
- API keys or secrets
- Passwords or credentials
- Large binary files (>100MB)
- `.env` files with sensitive data

✅ **Always Push**:
- Source code
- Documentation
- Configuration (without secrets)
- `.gitignore` file

---

## Need Help?

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Help**: https://docs.github.com
- **PowerShell Guide**: https://docs.microsoft.com/en-us/powershell/

---

**Successfully pushed ShopHub to GitHub! 🚀**

Repository: https://github.com/anaswara-prasobh/Online-Shopping-Website---ShopHub

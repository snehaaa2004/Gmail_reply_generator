@echo off
echo 🚀 Setting up GitHub repository for deployment...
echo.

echo Step 1: Create a new repository on GitHub
echo - Go to: https://github.com/new
echo - Name: gmail-reply-generator
echo - Make it public
echo - Don't add README, .gitignore, or license
echo.
pause

echo Step 2: Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit - Free Gmail Reply Generator"
echo.
echo 📝 Now copy the commands from GitHub to push:
echo (git remote add origin https://github.com/YOUR_USERNAME/gmail-reply-generator.git)
echo (git branch -M main)
echo (git push -u origin main)
echo.
pause

echo ✅ Done! Now you can deploy from any platform using your GitHub repo.
echo.
echo 🌐 Ready to deploy to:
echo - Railway: https://railway.app
echo - Render: https://render.com
echo - Fly.io: fly launch
echo.
pause
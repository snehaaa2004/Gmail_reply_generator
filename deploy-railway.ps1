# Quick Deploy to Railway (Windows)
Write-Host "🚀 Quick Deploy to Railway" -ForegroundColor Green
Write-Host "===========================" -ForegroundColor Green
Write-Host ""

# Check if railway CLI is installed
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

Write-Host "🔗 Logging into Railway..." -ForegroundColor Yellow
railway login

Write-Host "📁 Creating new Railway project..." -ForegroundColor Yellow
railway init gmail-reply-generator

Write-Host "🚀 Deploying..." -ForegroundColor Yellow
railway up

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your app URL:" -ForegroundColor Cyan
railway domain

Write-Host ""
Write-Host "🎉 Share this URL with your friends!" -ForegroundColor Magenta
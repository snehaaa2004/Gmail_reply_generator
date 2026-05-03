#!/bin/bash

echo "🚀 Quick Deploy to Railway"
echo "=========================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔗 Logging into Railway..."
railway login

echo "📁 Creating new Railway project..."
railway init gmail-reply-generator

echo "🚀 Deploying..."
railway up

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your app URL:"
railway domain

echo ""
echo "🎉 Share this URL with your friends!"
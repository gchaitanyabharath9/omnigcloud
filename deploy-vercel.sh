#!/bin/bash

# OmniGCloud - Vercel Deployment Guide
# Run this from your project root

echo "🚀 OmniGCloud Deployment to Vercel"
echo "===================================="
echo ""

# Step 1: Initialize Git (if not already)
echo "Step 1: Initializing Git repository..."
git init
git add .
git commit -m "Initial commit - Production-ready marketing site"

echo ""
echo "Step 2: Create GitHub repository"
echo "Go to: https://github.com/new"
echo "Repository name: omnigcloud"
echo "Visibility: Public (or Private)"
echo "Do NOT initialize with README, .gitignore, or license"
echo ""
read -p "Press Enter after creating the GitHub repo..."

# Step 3: Push to GitHub
echo ""
echo "Step 3: Enter your GitHub username:"
read GITHUB_USERNAME

git remote add origin https://github.com/$GITHUB_USERNAME/omnigcloud.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""

# Step 4: Deploy to Vercel
echo "Step 4: Deploy to Vercel"
echo "========================"
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New Project'"
echo "4. Import 'omnigcloud' repository"
echo "5. Framework Preset: Next.js (auto-detected)"
echo "6. Click 'Deploy'"
echo ""
read -p "Press Enter after deploying to Vercel..."

# Step 5: Environment Variables
echo ""
echo "Step 5: Add Environment Variables in Vercel"
echo "============================================="
echo ""
echo "Go to: Vercel Dashboard → Your Project → Settings → Environment Variables"
echo ""
echo "Add these variables:"
echo ""
echo "NEXT_PUBLIC_SITE_URL=https://omnigcloud.com"
echo "NEXT_PUBLIC_API_URL=https://omnigcloud.com/api"
echo "SOVEREIGN_CORE_SECRET=<generate-random-32-char-string>"
echo "AUTH_SECRET=<generate-random-32-char-string>"
echo "AUTH_URL=https://omnigcloud.com"
echo ""
echo "Optional (if using):"
echo "AUTH_GOOGLE_ID=<your-google-oauth-id>"
echo "AUTH_GOOGLE_SECRET=<your-google-oauth-secret>"
echo "REDIS_URL=<your-upstash-redis-url>"
echo "REDIS_TOKEN=<your-upstash-redis-token>"
echo ""
read -p "Press Enter after adding environment variables..."

# Step 6: Redeploy
echo ""
echo "Step 6: Trigger Redeploy"
echo "========================"
echo ""
echo "In Vercel Dashboard → Deployments → Click '...' → Redeploy"
echo ""
read -p "Press Enter after redeploying..."

# Step 7: Custom Domain
echo ""
echo "Step 7: Add Custom Domain"
echo "========================="
echo ""
echo "In Vercel Dashboard → Settings → Domains"
echo "Add domain: omnigcloud.com"
echo ""
echo "Vercel will provide DNS records. Add them to Cloudflare:"
echo ""
echo "In Cloudflare Dashboard → DNS → Add record:"
echo "  Type: CNAME"
echo "  Name: @"
echo "  Target: cname.vercel-dns.com"
echo "  Proxy: OFF (gray cloud)"
echo ""
echo "  Type: CNAME"
echo "  Name: www"
echo "  Target: cname.vercel-dns.com"
echo "  Proxy: OFF (gray cloud)"
echo ""
read -p "Press Enter after configuring DNS..."

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
echo "Your site should be live at:"
echo "  https://omnigcloud.com"
echo "  https://www.omnigcloud.com"
echo ""
echo "Vercel preview URL:"
echo "  https://omnigcloud.vercel.app"
echo ""
echo "Next steps:"
echo "  1. Test your site"
echo "  2. Configure OAuth providers (Google, Microsoft)"
echo "  3. Set up Upstash Redis (optional)"
echo "  4. Monitor analytics in Vercel dashboard"
echo ""
echo "✅ Done!"

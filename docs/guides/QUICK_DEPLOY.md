# Quick Deploy Commands - Copy & Paste

## Step 1: Create GitHub Repository First

Go to: https://github.com/new

- Repository name: `omnigcloud`
- Description: `Enterprise-grade multi-cloud governance platform`
- Visibility: **Public**
- **DO NOT** check any boxes (no README, .gitignore, or license)
- Click "Create repository"

---

## Step 2: Run These Commands

Open PowerShell in your project directory and run:

```powershell
# Navigate to project
cd .

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Production-ready OmniGCloud marketing site"

# Add remote (your GitHub repo)
git remote add origin https://github.com/gchaitanyabharath9/omnigcloud.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 3: Generate Secrets

Run these commands to generate random secrets:

```powershell
# Generate SOVEREIGN_CORE_SECRET
Write-Host "SOVEREIGN_CORE_SECRET:" -ForegroundColor Green
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

Write-Host "`n"

# Generate AUTH_SECRET
Write-Host "AUTH_SECRET:" -ForegroundColor Green
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Copy both outputs** - you'll need them for Vercel!

---

## Step 4: Deploy to Vercel

1. Go to: https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Click "New Project"
5. Import `gchaitanyabharath9/omnigcloud`
6. Click "Deploy"

---

## Step 5: Add Environment Variables in Vercel

Go to: **Vercel Dashboard → omnigcloud → Settings → Environment Variables**

Add these (use the secrets you generated above):

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://omnigcloud.com

Name: NEXT_PUBLIC_API_URL
Value: https://omnigcloud.com/api

Name: SOVEREIGN_CORE_SECRET
Value: <paste first secret here>

Name: AUTH_SECRET
Value: <paste second secret here>

Name: AUTH_URL
Value: https://omnigcloud.com
```

Then click **"Redeploy"** in the Deployments tab.

---

## Step 6: Connect Domain in Vercel

**Vercel Dashboard → Settings → Domains**

Add domain: `omnigcloud.com`

---

## Step 7: Configure DNS in Cloudflare

Go to: https://dash.cloudflare.com → omnigcloud.com → DNS

Add these records (delete any existing @ or www records first):

```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy: OFF (gray cloud)

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: OFF (gray cloud)
```

---

## Done! ✅

Wait 5-10 minutes for DNS propagation, then visit:

- https://omnigcloud.com
- https://www.omnigcloud.com

---

## Quick Reference

| What             | URL                                              |
| ---------------- | ------------------------------------------------ |
| GitHub Repo      | https://github.com/gchaitanyabharath9/omnigcloud |
| Vercel Dashboard | https://vercel.com/dashboard                     |
| Cloudflare DNS   | https://dash.cloudflare.com                      |
| Your Site        | https://omnigcloud.com                           |

---

**Total Time: ~15-20 minutes** 🚀

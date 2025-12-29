# 🚀 Deploy OmniGCloud to Production

## Quick Deploy Guide for @gchaitanyabharath9

---

## Step 1: Push to GitHub (5 minutes)

Open PowerShell/Terminal in your project directory:

```powershell
# Navigate to project
cd c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac

# Initialize Git
git init
git add .
git commit -m "Initial commit - Production-ready OmniGCloud marketing site"

# Add GitHub remote
git remote add origin https://github.com/gchaitanyabharath9/omnigcloud.git
git branch -M main
git push -u origin main
```

**Before running the above**, create the GitHub repository:
1. Go to: https://github.com/new
2. Repository name: `omnigcloud`
3. Description: `Enterprise-grade multi-cloud governance platform`
4. Visibility: **Public** (recommended for EB-1A visibility)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

---

## Step 2: Deploy to Vercel (3 minutes)

1. Go to: https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Click "New Project"
6. Find and import `gchaitanyabharath9/omnigcloud`
7. Vercel auto-detects Next.js settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
8. Click **"Deploy"**

Wait 2-3 minutes for the build to complete.

---

## Step 3: Add Environment Variables (2 minutes)

After deployment, go to:
**Vercel Dashboard → omnigcloud → Settings → Environment Variables**

Add these variables:

### Required Variables

```env
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com
NEXT_PUBLIC_API_URL=https://omnigcloud.com/api
SOVEREIGN_CORE_SECRET=<paste-secret-below>
AUTH_SECRET=<paste-secret-below>
AUTH_URL=https://omnigcloud.com
```

### Generate Secrets

Run this in PowerShell to generate random secrets:

```powershell
# Generate SOVEREIGN_CORE_SECRET
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Generate AUTH_SECRET (run again for different value)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

Copy each output and paste into Vercel environment variables.

### After Adding Variables

Click **"Redeploy"** in the Deployments tab to apply the new environment variables.

---

## Step 4: Connect Custom Domain (2 minutes)

### In Vercel Dashboard

1. Go to: **Settings → Domains**
2. Click "Add Domain"
3. Enter: `omnigcloud.com`
4. Click "Add"
5. Vercel will show DNS configuration instructions

### In Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com
2. Select your domain: `omnigcloud.com`
3. Go to: **DNS → Records**
4. Delete any existing A or CNAME records for `@` and `www`
5. Add these new records:

```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud) ← IMPORTANT
TTL: Auto

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud) ← IMPORTANT
TTL: Auto
```

**Important**: Make sure the cloud icon is **GRAY** (DNS only), not orange!

### Wait for DNS Propagation

- Usually takes 5-10 minutes
- Can take up to 24 hours in rare cases
- Check status in Vercel dashboard

---

## Step 5: Verify Deployment ✅

Once DNS propagates, visit:

- ✅ https://omnigcloud.com
- ✅ https://www.omnigcloud.com
- ✅ https://omnigcloud.vercel.app (Vercel preview URL)

Test these pages:
- [ ] Home page loads
- [ ] `/research` page works
- [ ] `/pricing` page works
- [ ] `/contact` form displays
- [ ] `/docs/whitepaper` accessible
- [ ] Navigation works
- [ ] Mobile responsive

---

## Your Deployment URLs

| Type | URL |
|------|-----|
| **Production** | https://omnigcloud.com |
| **WWW** | https://www.omnigcloud.com |
| **Vercel Preview** | https://omnigcloud.vercel.app |
| **GitHub Repo** | https://github.com/gchaitanyabharath9/omnigcloud |

---

## Continuous Deployment (Automatic)

From now on, every time you push to GitHub:

```bash
git add .
git commit -m "Update hero messaging"
git push
```

Vercel will automatically:
1. Detect the push
2. Build your site
3. Deploy to production
4. Update https://omnigcloud.com

**No manual deployment needed!** 🎉

---

## Optional: Set Up OAuth (Later)

### Google OAuth (for SSO login)

1. Go to: https://console.cloud.google.com
2. Create project: "OmniGCloud"
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Authorized redirect URI:
   ```
   https://omnigcloud.com/api/auth/callback/google
   ```
6. Add to Vercel environment variables:
   ```env
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

### Microsoft Entra ID (optional)

1. Go to: https://portal.azure.com
2. Azure AD → App registrations → New
3. Redirect URI:
   ```
   https://omnigcloud.com/api/auth/callback/microsoft-entra-id
   ```
4. Add to Vercel:
   ```env
   AUTH_ENTRA_ID=your_client_id
   AUTH_ENTRA_SECRET=your_client_secret
   AUTH_ENTRA_TENANT_ID=your_tenant_id
   ```

---

## Optional: Set Up Redis Rate Limiting (Later)

### Upstash Redis (Free Tier)

1. Go to: https://upstash.com
2. Sign up (free)
3. Create Redis database
4. Copy connection details
5. Add to Vercel:
   ```env
   ENABLE_REDIS_RATE_LIMIT=true
   REDIS_URL=your_upstash_url
   REDIS_TOKEN=your_upstash_token
   ```

---

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify environment variables are set
- Ensure Node.js version is 18+

### Domain Not Working
- Wait 10-15 minutes for DNS propagation
- Verify CNAME records in Cloudflare
- Ensure proxy is OFF (gray cloud)
- Check Vercel domain settings

### 500 Errors
- Check environment variables are correct
- Review Vercel function logs
- Verify API routes work locally

---

## Next Steps After Deployment

1. ✅ **Test all pages** on production
2. ✅ **Submit to Google Search Console**
   - Add property: https://omnigcloud.com
   - Submit sitemap: https://omnigcloud.com/sitemap.xml
3. ✅ **Set up monitoring**
   - UptimeRobot: https://uptimerobot.com
4. ✅ **Share your site!**
   - LinkedIn
   - Twitter
   - Your network

---

## Repository Information

**GitHub**: https://github.com/gchaitanyabharath9/omnigcloud  
**Vercel**: https://vercel.com/dashboard  
**Production**: https://omnigcloud.com  

---

## Support

**Documentation**:
- `README.md` - Project overview
- `DEPLOYMENT.md` - Full deployment guide
- `NEXT_STEPS.md` - What to do next

**Issues**:
- GitHub Issues: https://github.com/gchaitanyabharath9/omnigcloud/issues
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

## Estimated Timeline

| Task | Time |
|------|------|
| Create GitHub repo | 2 min |
| Push code | 3 min |
| Deploy to Vercel | 3 min |
| Add env variables | 2 min |
| Connect domain | 2 min |
| DNS propagation | 5-10 min |
| **Total** | **~15-20 min** |

---

**You're ready to deploy!** 🚀

Run the commands above and your site will be live at https://omnigcloud.com in ~20 minutes.

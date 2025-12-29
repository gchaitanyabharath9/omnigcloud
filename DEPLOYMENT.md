# 🚀 Deployment Guide - OmniGCloud

## Quick Comparison

| Platform | Effort | Cost | Best For |
|----------|--------|------|----------|
| **Vercel** ⭐ | 10 min | $0 | Next.js sites (RECOMMENDED) |
| **Cloudflare Pages** | 15 min | $0 | Cloudflare users |
| **Oracle Free Tier** | 1-2 hrs | $0 | Full control, learning |

---

## 🏆 Recommended: Vercel Deployment

### Why Vercel?
- ✅ Built specifically for Next.js
- ✅ Zero configuration
- ✅ Automatic SSL
- ✅ Global CDN (300+ locations)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Free tier (100GB bandwidth/month)
- ✅ Built-in analytics
- ✅ Easy rollbacks

### Step-by-Step Guide

#### 1. Push to GitHub (5 min)

```bash
# Navigate to project
cd c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac

# Initialize git
git init
git add .
git commit -m "Initial commit - Production-ready marketing site"

# Create GitHub repo at https://github.com/new
# Repository name: omnigcloud
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/omnigcloud.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel (3 min)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your `omnigcloud` repository
5. Vercel auto-detects Next.js settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click **"Deploy"**

#### 3. Add Environment Variables (2 min)

In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**:

**Required**:
```env
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com
NEXT_PUBLIC_API_URL=https://omnigcloud.com/api
SOVEREIGN_CORE_SECRET=<generate-random-32-char-string>
AUTH_SECRET=<generate-random-32-char-string>
AUTH_URL=https://omnigcloud.com
```

**Optional** (if using):
```env
# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Microsoft Entra ID
AUTH_ENTRA_ID=your_entra_client_id
AUTH_ENTRA_SECRET=your_entra_secret
AUTH_ENTRA_TENANT_ID=your_tenant_id

# Upstash Redis (for rate limiting)
ENABLE_REDIS_RATE_LIMIT=true
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_redis_token

# Email (Magic Link)
ENABLE_MAGIC_LINK=false
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_smtp_user
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=onboarding@omnigcloud.com
```

**Generate Secrets**:
```bash
# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# On Linux/Mac
openssl rand -base64 32
```

After adding variables, click **"Redeploy"** in Deployments tab.

#### 4. Connect Custom Domain (2 min)

**In Vercel**:
1. Go to **Settings** → **Domains**
2. Add domain: `omnigcloud.com`
3. Vercel provides DNS records

**In Cloudflare**:
1. Go to **DNS** → **Records**
2. Add these records:

```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud)

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud)
```

**Important**: Turn OFF Cloudflare proxy (gray cloud) for Vercel to work properly.

**Wait 5-10 minutes** for DNS propagation.

#### 5. Verify Deployment ✅

Visit:
- https://omnigcloud.com
- https://www.omnigcloud.com
- https://omnigcloud.vercel.app (Vercel preview URL)

---

## 🔄 Continuous Deployment

Once set up, every time you push to GitHub:
```bash
git add .
git commit -m "Update hero messaging"
git push
```

Vercel automatically:
1. Detects the push
2. Runs build
3. Deploys to production
4. Updates https://omnigcloud.com

**Preview Deployments**: Every PR gets a unique preview URL!

---

## 🌐 Alternative: Cloudflare Pages

If you prefer to keep everything in Cloudflare:

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Cloudflare Pages**:
   - Cloudflare Dashboard → **Pages** → **Create a project**
   - Connect to GitHub
   - Select `omnigcloud` repo
   - Build settings:
     ```
     Framework preset: Next.js
     Build command: npm run build
     Build output directory: .next
     Root directory: /
     ```

3. **Environment Variables**:
   - Add same variables as Vercel
   - Add: `NODE_VERSION=18`

4. **Custom Domain**:
   - Pages → **Custom domains** → Add `omnigcloud.com`
   - DNS automatically configured (already in Cloudflare!)

---

## 🖥️ Alternative: Oracle Free Tier

If you want full control and learning experience:

### Pros:
- Full server control
- Can run additional services
- 4 OCPUs, 24GB RAM (ARM) - FREE!
- Good for learning DevOps

### Cons:
- More setup time (1-2 hours)
- Manual SSL renewal
- No automatic deployments
- Need to manage updates

### Quick Setup:

1. **Create Compute Instance** (Oracle Cloud)
   - Ubuntu 22.04 LTS
   - ARM-based (free tier)
   - Assign public IP

2. **Install Dependencies**:
```bash
# SSH into instance
ssh ubuntu@YOUR_ORACLE_IP

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx

# Install Certbot
sudo apt install certbot python3-certbot-nginx
```

3. **Deploy App**:
```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/omnigcloud.git
cd omnigcloud

# Install & build
npm install
npm run build

# Create .env.local with your variables

# Start with PM2
pm2 start npm --name "omnigcloud" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx**:
```nginx
server {
    listen 80;
    server_name omnigcloud.com www.omnigcloud.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **SSL with Certbot**:
```bash
sudo certbot --nginx -d omnigcloud.com -d www.omnigcloud.com
```

6. **Cloudflare DNS**:
```
Type: A
Name: @
Content: YOUR_ORACLE_IP
Proxy: Enabled (orange cloud)
```

---

## 📊 Cost Comparison

| Platform | Free Tier | Paid (if needed) |
|----------|-----------|------------------|
| **Vercel** | 100GB bandwidth/month | $20/month (Pro) |
| **Cloudflare Pages** | Unlimited requests | $20/month (Pro) |
| **Oracle Free Tier** | Always free | N/A |

**Recommendation**: Start with Vercel free tier. Upgrade only if you exceed 100GB/month.

---

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables set (no secrets in code)
- [ ] HTTPS enabled (automatic with Vercel/Cloudflare)
- [ ] CSP headers configured (already in `next.config.ts`)
- [ ] Rate limiting enabled (optional, needs Redis)
- [ ] Auth providers configured (Google, Microsoft)
- [ ] Contact form tested
- [ ] 404/500 error pages work
- [ ] Robots.txt accessible
- [ ] Sitemap.xml accessible

---

## 📈 Post-Deployment

### Monitor:
- Vercel Analytics (built-in)
- Cloudflare Analytics (if using CF proxy)
- Google Search Console
- Uptime monitoring (UptimeRobot, free)

### Optimize:
- Add Upstash Redis for rate limiting
- Configure OAuth providers
- Set up email for magic links
- Add Google Analytics (optional)

---

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Node.js version (18+)
- Check build logs in Vercel/Cloudflare

### Domain Not Working
- Wait 10-15 minutes for DNS propagation
- Verify DNS records in Cloudflare
- Check Vercel domain settings

### 500 Errors
- Check environment variables
- Check server logs
- Verify API routes work

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Cloudflare
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] HTTPS working
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] SEO metadata correct
- [ ] Analytics configured (optional)
- [ ] Monitoring set up (optional)

---

## 🎉 You're Live!

Once deployed, your site will be available at:
- **Production**: https://omnigcloud.com
- **Preview**: https://omnigcloud.vercel.app

**Next Steps**:
1. Test all pages
2. Submit to Google Search Console
3. Share with stakeholders
4. Monitor analytics
5. Iterate based on feedback

---

**Recommended**: **Vercel** for minimal effort, maximum reliability.

**Time to Deploy**: ~15 minutes total 🚀

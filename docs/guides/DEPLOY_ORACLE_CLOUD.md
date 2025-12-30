# Deploy to Oracle Cloud Free Tier - Complete Guide

## 🎯 Why Oracle Cloud Free Tier?

**Advantages:**
- ✅ **Always Free**: 4 OCPUs, 24GB RAM (ARM-based)
- ✅ **Full Control**: Your own server
- ✅ **No Bandwidth Limits**: Unlike Vercel's 100GB/month
- ✅ **Run Anything**: Not just Next.js
- ✅ **Learning**: Great DevOps experience

**vs Vercel:**
- ⏱️ More setup time (1-2 hours vs 15 minutes)
- 🔧 Manual deployments (unless you set up CI/CD)
- 🛠️ You manage updates and security

---

## 📋 Prerequisites

- ✅ Oracle Cloud account (free tier)
- ✅ SSH client (built into Windows 10+)
- ✅ Your GitHub repo: https://github.com/gchaitanyabharath9/omnigcloud

---

## 🚀 Step-by-Step Deployment

### Part 1: Create Oracle Cloud Compute Instance (15 min)

#### 1. Sign in to Oracle Cloud
- Go to: https://cloud.oracle.com
- Sign in with your Oracle account

#### 2. Create Compute Instance
1. Click **"Create a VM instance"** (or go to Compute → Instances → Create Instance)
2. **Name**: `omnigcloud-server`
3. **Placement**: Leave default
4. **Image and Shape**:
   - Click "Change Image"
   - Select: **Ubuntu 22.04** (Canonical)
   - Click "Select Image"
   - Click "Change Shape"
   - Select: **Ampere (ARM)** → **VM.Standard.A1.Flex**
   - OCPUs: **4** (max free tier)
   - Memory: **24 GB** (max free tier)
   - Click "Select Shape"

5. **Networking**:
   - Create new VCN: `omnigcloud-vcn`
   - Create new subnet: `omnigcloud-subnet`
   - **Assign a public IPv4 address**: ✅ Yes

6. **SSH Keys**:
   - **Generate SSH key pair**: Click this
   - **Save Private Key**: Download and save securely
   - **Save Public Key**: Download (optional)

7. Click **"Create"**

Wait 2-3 minutes for instance to provision.

#### 3. Note Your Public IP
- Once instance is **Running**, note the **Public IP address**
- Example: `123.456.789.012`

---

### Part 2: Configure Firewall (5 min)

#### 1. Open Ports in Oracle Cloud

**In Oracle Cloud Console:**
1. Go to your instance → **Subnet** → **Default Security List**
2. Click **"Add Ingress Rules"**
3. Add these rules:

**Rule 1: HTTP**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 80
Description: HTTP
```

**Rule 2: HTTPS**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 443
Description: HTTPS
```

**Rule 3: Next.js Dev (optional)**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 3000
Description: Next.js
```

#### 2. Configure Ubuntu Firewall

We'll do this after SSH'ing in (next step).

---

### Part 3: Initial Server Setup (10 min)

#### 1. SSH into Your Server

**On Windows (PowerShell):**
```powershell
# Navigate to where you saved the private key
cd ~\Downloads

# Set correct permissions (Windows)
icacls ssh-key-*.key /inheritance:r
icacls ssh-key-*.key /grant:r "$($env:USERNAME):(R)"

# SSH into server (replace with your IP)
ssh -i ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

**On Mac/Linux:**
```bash
chmod 400 ~/Downloads/ssh-key-*.key
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

Type "yes" when prompted about fingerprint.

#### 2. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

#### 3. Configure Ubuntu Firewall

```bash
# Allow SSH (important!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Next.js (optional, for testing)
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable
# Type 'y' and press Enter

# Check status
sudo ufw status
```

---

### Part 4: Install Node.js & Dependencies (10 min)

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx

# Install Git
sudo apt install -y git
```

---

### Part 5: Deploy Your Application (15 min)

#### 1. Clone Your Repository

```bash
# Navigate to home directory
cd ~

# Clone your repo
git clone https://github.com/gchaitanyabharath9/omnigcloud.git

# Navigate into project
cd omnigcloud
```

#### 2. Create Environment File

```bash
# Create .env.local file
nano .env.local
```

**Paste this (update values):**
```env
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com
NEXT_PUBLIC_API_URL=https://omnigcloud.com/api
SOVEREIGN_CORE_SECRET=your_secret_here
AUTH_SECRET=your_secret_here
AUTH_URL=https://omnigcloud.com

# Optional: Add if you set them up
AUTH_GOOGLE_ID=your_google_id
AUTH_GOOGLE_SECRET=your_google_secret
```

**Save**: Press `Ctrl+X`, then `Y`, then `Enter`

#### 3. Install Dependencies & Build

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This will take 2-3 minutes.

#### 4. Start with PM2

```bash
# Start application
pm2 start npm --name "omnigcloud" -- start

# Save PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
# Copy and run the command it outputs
```

#### 5. Test Application

```bash
# Check if it's running
pm2 status

# Check logs
pm2 logs omnigcloud

# Test locally
curl http://localhost:3000
```

You should see HTML output!

---

### Part 6: Configure Nginx Reverse Proxy (10 min)

#### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/omnigcloud
```

**Paste this:**
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save**: `Ctrl+X`, `Y`, `Enter`

#### 2. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/omnigcloud /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

---

### Part 7: Configure DNS in Cloudflare (5 min)

#### 1. Update Cloudflare DNS

1. Go to: https://dash.cloudflare.com
2. Select domain: `omnigcloud.com`
3. Go to **DNS** → **Records**
4. **Delete** existing CNAME records for Vercel
5. **Add** these A records:

```
Type: A
Name: @
IPv4 address: YOUR_ORACLE_PUBLIC_IP
Proxy: Enabled (orange cloud) ← Turn ON for DDoS protection
TTL: Auto

Type: A
Name: www
IPv4 address: YOUR_ORACLE_PUBLIC_IP
Proxy: Enabled (orange cloud)
TTL: Auto
```

**Wait 5-10 minutes for DNS propagation.**

---

### Part 8: Set Up SSL with Let's Encrypt (5 min)

```bash
# Get SSL certificate
sudo certbot --nginx -d omnigcloud.com -d www.omnigcloud.com

# Follow prompts:
# - Enter email address
# - Agree to terms (Y)
# - Share email with EFF (optional)
# - Redirect HTTP to HTTPS? (2 - Yes)
```

Certbot will automatically:
- Get SSL certificate
- Configure Nginx for HTTPS
- Set up auto-renewal

#### Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

### Part 9: Verify Deployment (2 min)

#### 1. Check Application Status

```bash
# Check PM2
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check SSL certificate
sudo certbot certificates
```

#### 2. Test Your Site

Visit:
- http://omnigcloud.com (should redirect to HTTPS)
- https://omnigcloud.com (should work!)
- https://www.omnigcloud.com (should work!)

---

## 🔄 Deploying Updates

### Manual Deployment

```bash
# SSH into server
ssh -i ~/path/to/key.key ubuntu@YOUR_IP

# Navigate to project
cd ~/omnigcloud

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart omnigcloud

# Check logs
pm2 logs omnigcloud
```

### Automated Deployment (Optional)

Set up GitHub Actions to deploy automatically on push.

---

## 📊 Monitoring & Maintenance

### Check Application Logs

```bash
# PM2 logs
pm2 logs omnigcloud

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Monitor Resources

```bash
# CPU and memory usage
pm2 monit

# Disk usage
df -h

# System resources
htop  # Install with: sudo apt install htop
```

### Restart Services

```bash
# Restart application
pm2 restart omnigcloud

# Restart Nginx
sudo systemctl restart nginx

# Reboot server (if needed)
sudo reboot
```

---

## 🆘 Troubleshooting

### Site Not Loading

**Check Nginx:**
```bash
sudo systemctl status nginx
sudo nginx -t
```

**Check PM2:**
```bash
pm2 status
pm2 logs omnigcloud --lines 100
```

**Check Firewall:**
```bash
sudo ufw status
```

### SSL Certificate Issues

**Renew manually:**
```bash
sudo certbot renew
sudo systemctl restart nginx
```

### Application Crashes

**Check logs:**
```bash
pm2 logs omnigcloud --lines 200
```

**Restart:**
```bash
pm2 restart omnigcloud
```

---

## 💰 Cost Comparison

| Platform | Setup Time | Monthly Cost | Control |
|----------|------------|--------------|---------|
| **Vercel** | 15 min | $0 (100GB limit) | Low |
| **Oracle Cloud** | 1-2 hours | $0 (unlimited) | Full |

---

## ✅ Final Checklist

- [ ] Oracle Cloud instance created
- [ ] Firewall configured (Oracle + Ubuntu)
- [ ] Node.js installed
- [ ] Application cloned and built
- [ ] PM2 running application
- [ ] Nginx configured
- [ ] DNS updated in Cloudflare
- [ ] SSL certificate installed
- [ ] Site accessible at https://omnigcloud.com

---

## 🎉 You're Live!

Your site is now running on Oracle Cloud Free Tier with:
- ✅ 4 OCPUs, 24GB RAM
- ✅ Unlimited bandwidth
- ✅ HTTPS/SSL
- ✅ Auto-restart on crash
- ✅ $0/month forever

---

**Need help with any step?** Let me know! 🚀

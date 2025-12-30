# 🎯 Lead Capture System - Complete Setup Guide

**Total Time**: 30-40 minutes  
**Cost**: $0 (free tiers)  
**Result**: Email notifications + Database storage for all contact form submissions

---

## ✅ What You'll Get

- ✅ **Instant email notifications** when someone submits contact form
- ✅ **Permanent storage** of all leads in database
- ✅ **Beautiful HTML emails** with lead details
- ✅ **API endpoint** to retrieve all leads
- ✅ **Bot protection** (honeypot)
- ✅ **$0/month cost**

---

## 📋 Step-by-Step Setup

### Part 1: Upstash Redis (Database) - 15 min

#### 1. Create Upstash Account (3 min)

1. Go to: **https://upstash.com**
2. Click **"Sign Up"**
3. Sign up with GitHub or Google (easiest)
4. Verify your email

#### 2. Create Redis Database (5 min)

1. In Upstash Dashboard, click **"Create Database"**
2. Fill in:
   - **Name**: `omnigcloud-leads`
   - **Type**: **Regional** (free tier)
   - **Region**: Select closest to your users
     - US East: `us-east-1`
     - US West: `us-west-1`
     - Europe: `eu-west-1`
     - Asia: `ap-southeast-1`
   - **Eviction**: **No Eviction** (keep all data)
3. Click **"Create"**
4. Wait 10-20 seconds for database to be ready

#### 3. Get Connection Details (2 min)

1. Click on your new database (`omnigcloud-leads`)
2. Scroll down to **"REST API"** section
3. You'll see two values - **COPY BOTH**:
   - **UPSTASH_REDIS_REST_URL**
     - Looks like: `https://us1-xxx-12345.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**
     - Long string of random characters

**IMPORTANT**: Keep these values safe! You'll need them in the next step.

#### 4. Add to Vercel (5 min)

1. Go to: **https://vercel.com/dashboard**
2. Click on your `omnigcloud` project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

**Add Variable 1:**
```
Name: REDIS_URL
Value: [paste UPSTASH_REDIS_REST_URL here]
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

**Add Variable 2:**
```
Name: REDIS_TOKEN
Value: [paste UPSTASH_REDIS_REST_TOKEN here]
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

---

### Part 2: Resend (Email Notifications) - 15 min

#### 1. Create Resend Account (3 min)

1. Go to: **https://resend.com**
2. Click **"Sign Up"**
3. Sign up with email or GitHub
4. Verify your email

#### 2. Get API Key (2 min)

1. In Resend Dashboard, go to **"API Keys"** (left sidebar)
2. Click **"Create API Key"**
3. Fill in:
   - **Name**: `OmniGCloud Production`
   - **Permission**: **Full Access**
4. Click **"Create"**
5. **COPY THE API KEY** (starts with `re_`)
   - You can only see it once!
   - Save it somewhere safe

#### 3. Configure Sending Domain (10 min)

**Option A: Use Resend's Domain (Quick - 2 min)**

✅ **Recommended for testing**

- Use: `onboarding@resend.dev`
- Works immediately
- No setup needed
- Good for up to 100 emails/day

**Skip to Step 4 if using this option**

---

**Option B: Use Your Own Domain (Recommended for Production - 10 min)**

1. In Resend Dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `omnigcloud.com`
4. Click **"Add"**

5. Resend will show DNS records to add. Go to **Cloudflare**:
   - Visit: https://dash.cloudflare.com
   - Select domain: `omnigcloud.com`
   - Go to **DNS** → **Records**

6. **Add these 3 DNS records in Cloudflare**:

**Record 1: SPF (TXT)**
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.resend.com ~all
TTL: Auto
Proxy: DNS only (gray cloud)
```

**Record 2: DKIM (TXT)**
```
Type: TXT
Name: resend._domainkey
Content: [Copy from Resend dashboard - long string starting with "p="]
TTL: Auto
Proxy: DNS only (gray cloud)
```

**Record 3: MX (for bounces)**
```
Type: MX
Name: @
Mail server: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: Auto
Proxy: DNS only (gray cloud)
```

7. Click **"Save"** for each record
8. Go back to Resend dashboard
9. Click **"Verify"** next to your domain
10. Wait 2-5 minutes for verification (refresh page)
11. Once verified, you can use: `contact@omnigcloud.com`

#### 4. Add to Vercel (3 min)

1. Go to: **https://vercel.com/dashboard**
2. Click on `omnigcloud` project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

**Add Variable 1:**
```
Name: RESEND_API_KEY
Value: [paste your API key starting with re_]
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

**Add Variable 2:**
```
Name: RESEND_FROM_EMAIL
Value: onboarding@resend.dev
(or contact@omnigcloud.com if you verified your domain)
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

**Add Variable 3:**
```
Name: RESEND_TO_EMAIL
Value: [your personal email where you want to receive lead notifications]
Example: your-email@gmail.com
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

---

### Part 3: Install Dependencies & Deploy - 10 min

#### 1. Install Packages (5 min)

Open your terminal and run:

```bash
# Navigate to your project
cd c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac

# Install packages
npm install resend @upstash/redis

# Check installation
npm list resend @upstash/redis
```

You should see:
```
├── resend@X.X.X
└── @upstash/redis@X.X.X
```

#### 2. Commit and Push (5 min)

```bash
# Add changes
git add package.json package-lock.json

# Commit
git commit -m "Add lead capture dependencies (Resend + Upstash Redis)"

# Push to GitHub
git push
```

**Vercel will automatically deploy** (2-3 minutes)

---

### Part 4: Test the System - 5 min

#### 1. Wait for Deployment

1. Go to: https://vercel.com/dashboard
2. Click on `omnigcloud` project
3. Go to **Deployments** tab
4. Wait for latest deployment to show **"Ready"** (green)

#### 2. Test Contact Form

1. Go to: **https://omnigcloud.com/contact**
2. Fill out the form:
   - **First Name**: Test
   - **Last Name**: User
   - **Email**: test@example.com
   - **Message**: Testing lead capture system - this is a test submission
3. Click **"Submit"**
4. You should see success message

#### 3. Check Email (2 min)

1. Check your inbox (the email you set in `RESEND_TO_EMAIL`)
2. Look for email with subject: **"🔔 New Lead: Test User - SOV-XXXXX"**
3. Email should contain:
   - Submission ID
   - Name, Email, Message
   - Timestamp
   - Beautiful HTML formatting

**✅ If you received the email, email notifications are working!**

#### 4. Verify Database Storage (3 min)

**Option A: Check Upstash Dashboard**

1. Go to: https://console.upstash.com
2. Click on your database (`omnigcloud-leads`)
3. Go to **"Data Browser"** tab
4. In the search box, type: `lead:*`
5. Click **"Search"**
6. You should see your test lead!

**Option B: Use API Endpoint**

1. Visit: **https://omnigcloud.com/api/leads**
2. You should see JSON response:

```json
{
  "leads": [
    {
      "submissionId": "SOV-ABC1234",
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "message": "Testing lead capture system...",
      "timestamp": "2025-12-29T19:30:00.000Z",
      "source": "contact_form",
      "status": "new"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

**✅ If you see the lead data, database storage is working!**

---

## 🎉 Success Checklist

- [ ] Upstash Redis database created
- [ ] REDIS_URL and REDIS_TOKEN added to Vercel
- [ ] Resend account created
- [ ] RESEND_API_KEY added to Vercel
- [ ] RESEND_FROM_EMAIL set
- [ ] RESEND_TO_EMAIL set
- [ ] Packages installed (`resend`, `@upstash/redis`)
- [ ] Code pushed to GitHub
- [ ] Vercel deployed successfully
- [ ] Test email received ✅
- [ ] Test lead visible in database ✅

---

## 📊 What Gets Stored

### For Each Lead:

```json
{
  "submissionId": "SOV-ABC1234",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "I'm interested in OmniGCloud...",
  "timestamp": "2025-12-29T19:30:00.000Z",
  "source": "contact_form",
  "status": "new"
}
```

### Redis Keys:

- `lead:{submissionId}` - Individual lead data
- `leads:all` - List of all lead IDs (sorted by time)
- `lead:email:{email}` - Email to submission ID mapping

---

## 📧 Email Notification Features

### What You Get in Each Email:

- ✅ Beautiful HTML design with gradient header
- ✅ Submission ID with "NEW" badge
- ✅ Full name
- ✅ Email address (clickable mailto: link)
- ✅ Complete message
- ✅ Formatted timestamp
- ✅ Link to view all leads

### Example Email:

```
Subject: 🔔 New Lead: John Doe - SOV-ABC1234

[Beautiful HTML email with:]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 New Lead Captured!
OmniGCloud Contact Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submission ID: SOV-ABC1234 [NEW]

Name: John Doe
Email: john@example.com
Message: I'm interested in learning more...

Submitted At: December 29, 2025 at 7:30 PM EST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This lead has been saved to your database.
View all leads: omnigcloud.com/api/leads
```

---

## 🔍 Retrieving Your Leads

### Option 1: API Endpoint

**Get all leads:**
```
GET https://omnigcloud.com/api/leads
```

**With pagination:**
```
GET https://omnigcloud.com/api/leads?limit=20&offset=0
```

**Response format:**
```json
{
  "leads": [...],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

### Option 2: Upstash Dashboard

1. Go to: https://console.upstash.com
2. Click on your database
3. Use **Data Browser** to view/search leads
4. Search for: `lead:*` to see all leads

### Option 3: Export Leads (Future)

You can build a simple admin page to:
- View all leads in a table
- Search and filter
- Export to CSV
- Mark as contacted/closed

---

## 💰 Cost & Limits

### Free Tier Limits:

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| **Upstash Redis** | 10,000 commands/day | ~100/day | $0 |
| **Resend** | 3,000 emails/month | ~50/month | $0 |
| **Vercel** | 100 GB bandwidth | ~10 GB | $0 |
| **Total** | - | - | **$0** |

### When You'll Need to Upgrade:

**Upstash Redis:**
- Free tier good for: **10,000+ leads/month**
- Upgrade at: $0.20 per 100K commands

**Resend:**
- Free tier good for: **3,000 leads/month**
- Upgrade at: $20/month for 50K emails

**You're good for 3,000 leads/month on free tier!** 🎉

---

## 🆘 Troubleshooting

### Email Not Received

**Check:**
1. ✅ Spam/Junk folder
2. ✅ RESEND_API_KEY is correct in Vercel
3. ✅ RESEND_TO_EMAIL is correct
4. ✅ Deployment completed successfully

**Debug:**
1. Go to Resend Dashboard → **Logs**
2. Check for recent email sends
3. Look for errors or bounces

**Common Issues:**
- Wrong API key → Regenerate in Resend
- Wrong TO email → Update in Vercel
- Domain not verified → Use `onboarding@resend.dev`

---

### Lead Not Saved to Database

**Check:**
1. ✅ REDIS_URL is correct in Vercel
2. ✅ REDIS_TOKEN is correct in Vercel
3. ✅ Packages installed (`@upstash/redis`)
4. ✅ Deployment completed

**Debug:**
1. Check Vercel deployment logs
2. Look for Redis connection errors
3. Verify credentials in Upstash dashboard

**Common Issues:**
- Wrong credentials → Copy again from Upstash
- Packages not installed → Run `npm install`
- Old deployment → Redeploy in Vercel

---

### API Returns Empty Array

**Possible Causes:**
- No leads submitted yet
- Redis keys expired (check TTL)
- Wrong database selected

**Solution:**
1. Submit a test lead
2. Check Upstash Data Browser
3. Verify REDIS_URL points to correct database

---

### "Module not found: resend"

**Cause:** Packages not installed

**Solution:**
```bash
npm install resend @upstash/redis
git add package.json package-lock.json
git commit -m "Add lead capture dependencies"
git push
```

Wait for Vercel to redeploy.

---

## 🎯 Next Steps

### After Lead Capture Works:

1. **Set up Google OAuth** (30 min)
   - File: `ENHANCEMENT_ROADMAP.md` → Phase 1
   - Enable user sign-in
   - Fix authentication errors

2. **Create Admin Dashboard** (optional)
   - Build `/app/leads` page
   - View all leads in nice UI
   - Search, filter, export

3. **Add Auto-Responder** (optional)
   - Send confirmation email to user
   - "Thanks for contacting us!"
   - Professional touch

4. **Add Lead Scoring** (optional)
   - Score leads based on message
   - Priority notifications
   - CRM integration

---

## 📞 Support Resources

**Documentation:**
- Upstash Docs: https://docs.upstash.com
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs

**Need Help?**
- Check Vercel deployment logs
- Check Resend email logs
- Check Upstash Data Browser

---

## ✅ Final Checklist

**Before you start:**
- [ ] Have credit card ready (for Upstash/Resend - won't be charged)
- [ ] Have access to Cloudflare (for domain verification)
- [ ] Have terminal/command line access

**Setup:**
- [ ] Upstash account created ✅
- [ ] Redis database created ✅
- [ ] Resend account created ✅
- [ ] API key generated ✅
- [ ] Environment variables added to Vercel ✅
- [ ] Packages installed ✅
- [ ] Code deployed ✅

**Testing:**
- [ ] Contact form submitted ✅
- [ ] Email received ✅
- [ ] Lead in database ✅
- [ ] API endpoint working ✅

---

## 🎉 You're Done!

**Your lead capture system is now:**
- ✅ Capturing all contact form submissions
- ✅ Sending instant email notifications
- ✅ Storing leads permanently in database
- ✅ Providing API to retrieve leads
- ✅ Costing $0/month

**Start capturing leads!** 🚀

Every contact form submission will now:
1. Send you a beautiful email notification
2. Save to database permanently
3. Be accessible via API anytime

**Next**: Set up Google OAuth to enable user authentication!
→ Open: `ENHANCEMENT_ROADMAP.md`

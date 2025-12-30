# 🎯 Complete Lead Capture System Setup

## Email Notifications + Database Storage

**What You Get:**
- ✅ **Instant email notifications** when someone submits contact form
- ✅ **Permanent storage** of all leads in database
- ✅ **API to retrieve leads** anytime
- ✅ **Beautiful HTML emails** with lead details
- ✅ **$0 cost** (free tiers)

**Total Setup Time**: 30-45 minutes

---

## 📋 Step-by-Step Setup

### Part 1: Upstash Redis (Database) - 15 min

#### 1. Create Upstash Account (3 min)

1. Go to: https://upstash.com
2. Click "Sign Up" (use GitHub or Google)
3. Verify your email

#### 2. Create Redis Database (5 min)

1. In Upstash Dashboard, click "Create Database"
2. **Name**: `omnigcloud-leads`
3. **Type**: **Regional** (cheaper, sufficient for your needs)
4. **Region**: Select closest to your users (e.g., `us-east-1`)
5. **Eviction**: **No Eviction** (keep all data)
6. Click "Create"

#### 3. Get Connection Details (2 min)

1. Click on your new database
2. Scroll to "REST API" section
3. Copy these values:
   - **UPSTASH_REDIS_REST_URL** (looks like: `https://xxx.upstash.io`)
   - **UPSTASH_REDIS_REST_TOKEN** (long string)

#### 4. Add to Vercel (5 min)

1. Go to: https://vercel.com/dashboard
2. Click on `omnigcloud` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
Name: REDIS_URL
Value: [paste UPSTASH_REDIS_REST_URL]
Environments: ✅ Production ✅ Preview ✅ Development

Name: REDIS_TOKEN
Value: [paste UPSTASH_REDIS_REST_TOKEN]
Environments: ✅ Production ✅ Preview ✅ Development
```

5. Click "Save"

---

### Part 2: Resend (Email Notifications) - 15 min

#### 1. Create Resend Account (3 min)

1. Go to: https://resend.com
2. Click "Sign Up"
3. Verify your email

#### 2. Get API Key (2 min)

1. In Resend Dashboard, go to "API Keys"
2. Click "Create API Key"
3. **Name**: `OmniGCloud Production`
4. **Permission**: **Full Access**
5. Click "Create"
6. **Copy the API key** (starts with `re_`)

#### 3. Verify Domain (Optional - 10 min)

**Option A: Use Resend's Domain (Quick Start)**
- Use: `onboarding@resend.dev`
- Works immediately
- Good for testing

**Option B: Use Your Domain (Recommended)**
1. In Resend Dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter: `omnigcloud.com`
4. Resend will show DNS records to add
5. Go to Cloudflare → DNS → Add these records:
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [Resend provides this]
   
   Type: MX
   Name: @
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   ```
6. Wait 5-10 minutes for verification
7. Once verified, you can use: `contact@omnigcloud.com`

#### 4. Add to Vercel (3 min)

1. Vercel Dashboard → omnigcloud → Settings → Environment Variables
2. Add these variables:

```
Name: RESEND_API_KEY
Value: [paste your API key starting with re_]
Environments: ✅ Production ✅ Preview ✅ Development

Name: RESEND_FROM_EMAIL
Value: onboarding@resend.dev  (or contact@omnigcloud.com if verified)
Environments: ✅ Production ✅ Preview ✅ Development

Name: RESEND_TO_EMAIL
Value: your-email@gmail.com  (where you want to receive lead notifications)
Environments: ✅ Production ✅ Preview ✅ Development
```

3. Click "Save"

---

### Part 3: Install Dependencies - 5 min

```bash
# Navigate to your project
cd c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac

# Install packages
npm install resend @upstash/redis

# Commit and push
git add package.json package-lock.json
git commit -m "Add lead capture system (Resend + Upstash Redis)"
git push
```

**Vercel will auto-deploy** (2-3 minutes)

---

### Part 4: Test the System - 5 min

#### 1. Test Contact Form

1. Go to: https://omnigcloud.com/contact
2. Fill out the form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Message: Testing lead capture system
3. Click "Submit"

#### 2. Check Email

- Check your inbox (the email you set in `RESEND_TO_EMAIL`)
- You should receive a beautiful HTML email with the lead details!

#### 3. Verify Database Storage

**Option A: Check Upstash Dashboard**
1. Go to Upstash Dashboard
2. Click on your database
3. Go to "Data Browser"
4. Search for key: `lead:SOV-*`
5. You should see your test lead!

**Option B: Use API**
1. Visit: https://omnigcloud.com/api/leads
2. You should see JSON with all leads:
   ```json
   {
     "leads": [
       {
         "submissionId": "SOV-ABC1234",
         "firstName": "Test",
         "lastName": "User",
         "email": "test@example.com",
         "message": "Testing lead capture system",
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

**✅ If you see the email AND the data, everything is working!**

---

## 📊 What Gets Stored

### For Each Lead:

```json
{
  "submissionId": "SOV-ABC1234",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "I'm interested in...",
  "timestamp": "2025-12-29T19:30:00.000Z",
  "source": "contact_form",
  "status": "new"
}
```

### Redis Keys Structure:

- `lead:{submissionId}` - Individual lead data
- `leads:all` - List of all lead IDs (sorted by time)
- `lead:email:{email}` - Email to submission ID mapping (for deduplication)

---

## 📧 Email Notification Features

### What You Get:

- ✅ Beautiful HTML email design
- ✅ All lead details formatted nicely
- ✅ Direct mailto: link to respond
- ✅ Submission ID for tracking
- ✅ Timestamp in readable format
- ✅ "NEW" badge for new leads
- ✅ Link to view all leads

### Example Email Preview:

```
Subject: 🔔 New Lead: John Doe - SOV-ABC1234

[Beautiful HTML email with:]
- Header with gradient background
- Submission ID with "NEW" badge
- Name, Email (clickable), Message
- Formatted timestamp
- Link to view all leads
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

**Response:**
```json
{
  "leads": [...],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

### Option 2: Upstash Dashboard

1. Go to Upstash Dashboard
2. Click on your database
3. Use Data Browser to view/search leads

### Option 3: Build Admin Dashboard (Future)

Create `/app/leads` page to view all leads in a nice UI.

---

## 💰 Cost Breakdown

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| **Upstash Redis** | 10K commands/day | ~100/day | $0 |
| **Resend** | 3K emails/month | ~50/month | $0 |
| **Total** | - | - | **$0** |

**You'll stay on free tier for a long time!**

---

## 📈 Scaling

### When You Grow:

**100 leads/month**: Free tier ✅  
**1,000 leads/month**: Free tier ✅  
**10,000 leads/month**: Free tier ✅  
**100,000 leads/month**: Upgrade to paid ($20-40/month)

**You're good for 10K+ leads/month on free tier!**

---

## 🔒 Security & Privacy

### Data Protection:

- ✅ **Encrypted in transit** (HTTPS)
- ✅ **Encrypted at rest** (Upstash)
- ✅ **PII masking in logs**
- ✅ **Honeypot bot protection**
- ✅ **Rate limiting** (via API utils)
- ✅ **Input validation** (Zod schema)

### GDPR Compliance:

- ✅ Data stored in EU/US (your choice)
- ✅ Can delete leads anytime
- ✅ Privacy policy in place
- ✅ User consent via form submission

---

## 🆘 Troubleshooting

### Email Not Received

**Check:**
1. Spam/Junk folder
2. RESEND_API_KEY is correct
3. RESEND_TO_EMAIL is correct
4. Resend Dashboard → Logs (check for errors)

**Solution:**
- Verify API key
- Check Resend logs
- Try different email address

### Lead Not Saved to Database

**Check:**
1. REDIS_URL and REDIS_TOKEN are correct
2. Upstash database is active
3. Check Vercel deployment logs

**Solution:**
- Verify credentials in Upstash Dashboard
- Check Vercel environment variables
- Redeploy

### API Returns Empty Array

**Possible Causes:**
- No leads submitted yet
- Redis keys expired (check TTL)
- Wrong database selected

**Solution:**
- Submit a test lead
- Check Upstash Data Browser
- Verify REDIS_URL points to correct database

---

## ✅ Setup Checklist

### Upstash Redis:
- [ ] Account created
- [ ] Database created
- [ ] REDIS_URL copied
- [ ] REDIS_TOKEN copied
- [ ] Added to Vercel

### Resend:
- [ ] Account created
- [ ] API key generated
- [ ] RESEND_API_KEY added to Vercel
- [ ] RESEND_FROM_EMAIL set
- [ ] RESEND_TO_EMAIL set
- [ ] (Optional) Domain verified

### Code:
- [ ] `npm install resend @upstash/redis`
- [ ] Committed and pushed
- [ ] Vercel deployed successfully

### Testing:
- [ ] Submitted test lead
- [ ] Received email notification
- [ ] Verified lead in database
- [ ] Checked API endpoint

---

## 🎯 Next Steps

### After Setup Works:

1. **Add Lead Management UI** (optional)
   - Create `/app/leads` page
   - View, search, filter leads
   - Export to CSV

2. **Add Auto-Responder** (optional)
   - Send confirmation email to user
   - "Thanks for contacting us!"

3. **Add CRM Integration** (optional)
   - Sync to HubSpot, Salesforce, etc.
   - Webhook to Slack/Discord

4. **Add Lead Scoring** (optional)
   - Score leads based on message content
   - Priority notifications

---

## 📞 Support

**Issues?**
- Upstash Docs: https://docs.upstash.com
- Resend Docs: https://resend.com/docs
- Check Vercel deployment logs

**Questions?**
- Check `CONTACT_FORM_SETUP.md` for more details
- Review API code in `src/app/api/contact/route.ts`

---

## 🎉 You're Done!

**Your lead capture system is now:**
- ✅ Capturing all contact form submissions
- ✅ Sending instant email notifications
- ✅ Storing leads permanently in database
- ✅ Providing API to retrieve leads
- ✅ **Costing $0/month**

**Start capturing leads!** 🚀

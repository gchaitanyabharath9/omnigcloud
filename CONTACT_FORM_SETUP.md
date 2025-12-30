# Contact Form Setup - Email Notifications

## 🎯 Current Status

**Your contact form currently:**
- ✅ Validates input
- ✅ Logs to console
- ❌ **Does NOT save data**
- ❌ **Does NOT send emails**

**Data is lost after submission!** ⚠️

---

## 🚀 Quick Fix: Email Notifications (15 minutes)

### Step 1: Sign Up for Resend (5 min)

1. Go to: https://resend.com
2. Click "Sign Up"
3. Verify your email
4. Go to Dashboard

### Step 2: Get API Key (2 min)

1. In Resend Dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name: `OmniGCloud Production`
4. Copy the API key (starts with `re_`)

### Step 3: Verify Domain (5 min)

**Option A: Use Resend's Domain (Easiest)**
- Resend provides: `onboarding@resend.dev`
- Works immediately
- Good for testing

**Option B: Use Your Domain (Recommended for production)**
1. In Resend Dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter: `omnigcloud.com`
4. Add DNS records to Cloudflare:
   ```
   Type: TXT
   Name: @
   Value: [Resend provides this]
   
   Type: MX
   Name: @
   Value: [Resend provides this]
   Priority: 10
   ```
5. Wait for verification (5-10 min)
6. You can now send from: `contact@omnigcloud.com`

### Step 4: Add to Vercel (3 min)

1. Go to: https://vercel.com/dashboard
2. Click on `omnigcloud` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
Name: RESEND_API_KEY
Value: re_your_api_key_here
Environments: ✅ Production ✅ Preview ✅ Development

Name: RESEND_FROM_EMAIL
Value: onboarding@resend.dev  (or contact@omnigcloud.com if you verified domain)
Environments: ✅ Production ✅ Preview ✅ Development

Name: RESEND_TO_EMAIL
Value: your-email@gmail.com  (where you want to receive notifications)
Environments: ✅ Production ✅ Preview ✅ Development
```

4. Click "Save"

### Step 5: Install Resend Package (5 min)

```bash
cd c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac
npm install resend
git add package.json package-lock.json
git commit -m "Add Resend for contact form emails"
git push
```

Vercel will auto-deploy (2-3 minutes).

### Step 6: Test Contact Form (2 min)

1. Go to: https://omnigcloud.com/contact
2. Fill out the form
3. Submit
4. Check your email inbox!

**✅ You should receive an email with the form data!**

---

## 📊 What You Get

### Email Notification Includes:
- ✅ Submission ID (e.g., SOV-ABC1234)
- ✅ Name
- ✅ Email
- ✅ Message
- ✅ Timestamp

### Example Email:
```
Subject: New Contact Form Submission - SOV-ABC1234

New Contact Form Submission

Submission ID: SOV-ABC1234
Name: John Doe
Email: john@example.com
Message:
I'm interested in learning more about OmniGCloud...

Submitted at: 2025-12-29T19:30:00.000Z
```

---

## 💰 Resend Pricing

| Plan | Cost | Emails/Month | Best For |
|------|------|--------------|----------|
| **Free** | $0 | 3,000 | Your current needs ✅ |
| **Pro** | $20 | 50,000 | High volume |

**You'll stay on free tier for a long time!**

---

## 🔄 Alternative: Save to Database

### If you want to store submissions permanently:

#### Option 1: Upstash Redis (Recommended)

**Setup:**
1. Go to: https://upstash.com
2. Create Redis database (free tier)
3. Add to Vercel:
   ```
   REDIS_URL=your_upstash_url
   REDIS_TOKEN=your_upstash_token
   ```

**Code to add** (in `src/app/api/contact/route.ts`):
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

// After validation, save to Redis:
await redis.set(`contact:${submissionId}`, JSON.stringify({
  firstName,
  lastName,
  email,
  message,
  timestamp: new Date().toISOString(),
}));

// Retrieve later:
const submission = await redis.get(`contact:${submissionId}`);
```

#### Option 2: Vercel Postgres

**Setup:**
1. Vercel Dashboard → Storage → Create Database
2. Select PostgreSQL
3. Create table:
   ```sql
   CREATE TABLE contact_submissions (
     id SERIAL PRIMARY KEY,
     submission_id VARCHAR(20) UNIQUE,
     first_name VARCHAR(100),
     last_name VARCHAR(100),
     email VARCHAR(255),
     message TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

---

## 📈 Comparison

| Method | Setup Time | Cost | Pros | Cons |
|--------|------------|------|------|------|
| **Email Only** | 15 min | $0 | Instant notifications | No permanent storage |
| **Database Only** | 30 min | $0 | Permanent storage | No instant notifications |
| **Both** | 45 min | $0 | Best of both | More setup |

---

## ✅ Recommended Setup

### **Phase 1 (Now): Email Notifications**
- ⏱️ 15 minutes
- 💰 $0
- ✅ Immediate value

### **Phase 2 (Later): Add Database**
- ⏱️ 30 minutes
- 💰 $0
- ✅ When you need to review/export submissions

---

## 🆘 Troubleshooting

### Email Not Received

**Check:**
1. Spam folder
2. Resend API key is correct
3. Environment variables are set in Vercel
4. Deployment completed successfully
5. Check Resend Dashboard → Logs

### Domain Verification Failed

**Solution:**
1. Use `onboarding@resend.dev` for now
2. Verify domain later when you have time

### Build Fails

**Error**: `Cannot find module 'resend'`

**Solution:**
```bash
npm install resend
git add package.json package-lock.json
git commit -m "Add resend dependency"
git push
```

---

## 🎯 Quick Start

**Do this now (15 minutes):**

1. [ ] Sign up for Resend
2. [ ] Get API key
3. [ ] Add to Vercel env vars
4. [ ] Install resend package
5. [ ] Push to GitHub
6. [ ] Test contact form

**Result**: Email notifications working! 📧

---

## 📞 Next Steps

**After email notifications work:**

1. **Add database** (optional)
   - Store submissions permanently
   - Review all submissions
   - Export data

2. **Add auto-responder** (optional)
   - Send confirmation email to user
   - "Thanks for contacting us!"

3. **Add Slack/Discord notifications** (optional)
   - Get notified in team chat
   - Faster response time

---

**Ready to set up email notifications?** Follow the steps above! 🚀

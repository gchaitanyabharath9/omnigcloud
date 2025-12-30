# Google OAuth SSO & Social Media Integration Guide

## 🔐 Part 1: Enable Google OAuth SSO

### Step 1: Create Google OAuth Credentials (10 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Project name: `OmniGCloud`
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: **External**
   - Click "Create"
   - Fill in:
     - App name: `OmniGCloud`
     - User support email: `your-email@gmail.com`
     - Developer contact: `your-email@gmail.com`
   - Click "Save and Continue"
   - Scopes: Skip (click "Save and Continue")
   - Test users: Add your email (optional)
   - Click "Save and Continue"

5. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: **Web application**
   - Name: `OmniGCloud Web Client`
   - Authorized JavaScript origins:
     ```
     https://omnigcloud.com
     https://www.omnigcloud.com
     https://omnigcloud.vercel.app
     http://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     https://omnigcloud.com/api/auth/callback/google
     https://www.omnigcloud.com/api/auth/callback/google
     https://omnigcloud.vercel.app/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"

6. **Copy Credentials**
   - Copy **Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)
   - Copy **Client Secret** (looks like: `GOCSPX-abc123...`)
   - **Keep these safe!**

---

### Step 2: Add Credentials to Vercel (2 minutes)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on `omnigcloud` project
   - Go to **Settings** → **Environment Variables**

2. **Add Google OAuth Variables**
   - Click "Add New"
   - Add these two variables:

   ```
   Name: AUTH_GOOGLE_ID
   Value: <paste your Client ID>
   Environments: ✅ Production ✅ Preview ✅ Development
   
   Name: AUTH_GOOGLE_SECRET
   Value: <paste your Client Secret>
   Environments: ✅ Production ✅ Preview ✅ Development
   ```

3. **Save and Redeploy**
   - Click "Save"
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

### Step 3: Test Google SSO (2 minutes)

Once deployment completes:

1. **Visit Sign-In Page**
   - Go to: `https://omnigcloud.com/api/auth/signin`
   - You should see "Sign in with Google" button

2. **Test Login**
   - Click "Sign in with Google"
   - Select your Google account
   - Grant permissions
   - You should be redirected back and logged in!

3. **Verify Session**
   - Visit: `https://omnigcloud.com/app`
   - You should see your name and email

---

## 📱 Part 2: Social Media Integration

### Option A: Social Sharing Buttons (Easy)

Add share buttons to your site for users to share content.

#### 1. Install React Share (Optional)

```bash
npm install react-share
```

#### 2. Create Share Component

Create `src/components/SocialShare.tsx`:

```typescript
'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  return (
    <div className="flex gap-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={description}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
```

#### 3. Use in Your Pages

```typescript
import SocialShare from '@/components/SocialShare';

export default function Page() {
  return (
    <div>
      <h1>Share this page</h1>
      <SocialShare 
        url="https://omnigcloud.com/research"
        title="OmniGCloud Research & Innovation"
        description="Explore our technical research on cloud governance"
      />
    </div>
  );
}
```

---

### Option B: Social Login (Twitter, LinkedIn, GitHub)

Add more OAuth providers for login.

#### 1. Twitter/X OAuth

**Setup:**
1. Go to: https://developer.twitter.com/en/portal/dashboard
2. Create app
3. Get API Key and Secret
4. Add to Vercel:
   ```env
   AUTH_TWITTER_ID=your_api_key
   AUTH_TWITTER_SECRET=your_api_secret
   ```

**Update `src/auth.ts`:**
```typescript
import Twitter from "next-auth/providers/twitter"

providers: [
  Google({...}),
  Twitter({
    clientId: process.env.AUTH_TWITTER_ID,
    clientSecret: process.env.AUTH_TWITTER_SECRET,
  }),
]
```

#### 2. LinkedIn OAuth

**Setup:**
1. Go to: https://www.linkedin.com/developers/apps
2. Create app
3. Get Client ID and Secret
4. Add to Vercel:
   ```env
   AUTH_LINKEDIN_ID=your_client_id
   AUTH_LINKEDIN_SECRET=your_client_secret
   ```

**Update `src/auth.ts`:**
```typescript
import LinkedIn from "next-auth/providers/linkedin"

providers: [
  Google({...}),
  LinkedIn({
    clientId: process.env.AUTH_LINKEDIN_ID,
    clientSecret: process.env.AUTH_LINKEDIN_SECRET,
  }),
]
```

#### 3. GitHub OAuth

**Setup:**
1. Go to: https://github.com/settings/developers
2. New OAuth App
3. Get Client ID and Secret
4. Add to Vercel:
   ```env
   AUTH_GITHUB_ID=your_client_id
   AUTH_GITHUB_SECRET=your_client_secret
   ```

**Update `src/auth.ts`:**
```typescript
import GitHub from "next-auth/providers/github"

providers: [
  Google({...}),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
]
```

---

### Option C: Social Media Feed Integration

Display your social media posts on your site.

#### 1. Twitter/X Feed

**Using Twitter Embed:**

```typescript
// src/components/TwitterFeed.tsx
export default function TwitterFeed() {
  return (
    <div className="twitter-feed">
      <a 
        className="twitter-timeline" 
        data-height="500" 
        href="https://twitter.com/YourHandle"
      >
        Tweets by YourHandle
      </a>
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </div>
  );
}
```

#### 2. LinkedIn Company Feed

**Using LinkedIn Embed:**

```typescript
// Add to your page
<script src="https://platform.linkedin.com/in.js" type="text/javascript"></script>
<script type="IN/CompanyProfile" data-id="YOUR_COMPANY_ID" data-format="inline"></script>
```

---

## 🎯 Recommended Setup Order

### Week 1: Basic SSO
1. ✅ **Google OAuth** (easiest, most users have it)
2. ⏳ Test authentication flow
3. ⏳ Add sign-in button to header

### Week 2: Additional OAuth
4. ⏳ **Microsoft Entra ID** (for enterprise users)
5. ⏳ **GitHub** (for developers)
6. ⏳ **LinkedIn** (for professionals)

### Week 3: Social Sharing
7. ⏳ Add share buttons to blog posts
8. ⏳ Add share buttons to research page
9. ⏳ Add share buttons to case studies

### Week 4: Social Feeds (Optional)
10. ⏳ Add Twitter feed to homepage
11. ⏳ Add LinkedIn company updates
12. ⏳ Add social proof section

---

## 📊 Social Media Metadata (Already Done!)

Your site already has OpenGraph and Twitter Card metadata in `src/app/[locale]/layout.tsx`:

```typescript
openGraph: {
  title: 'OmniGCloud',
  description: '...',
  url: siteUrl,
  siteName: 'OmniGCloud',
  images: ['/og-image.png'],
  locale: ogLocale,
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'OmniGCloud',
  description: '...',
  images: ['/og-image.png'],
},
```

**To improve:**
1. Create custom OG image: `public/og-image.png` (1200x630px)
2. Add per-page OG images for better sharing

---

## 🔗 Social Media Links

Add to your footer (already in `src/components/Footer.tsx`):

```typescript
const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/omnigcloud', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/omnigcloud', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/gchaitanyabharath9/omnigcloud', icon: Github },
];
```

---

## ✅ Quick Start Checklist

### Google OAuth SSO (Do Now)
- [ ] Create Google Cloud project
- [ ] Enable Google+ API
- [ ] Create OAuth credentials
- [ ] Add to Vercel environment variables
- [ ] Redeploy
- [ ] Test sign-in

### Social Sharing (Week 2)
- [ ] Install react-share
- [ ] Create SocialShare component
- [ ] Add to research page
- [ ] Add to blog posts
- [ ] Add to case studies

### Additional OAuth (Week 3)
- [ ] Set up Microsoft OAuth
- [ ] Set up GitHub OAuth
- [ ] Set up LinkedIn OAuth

### Social Feeds (Optional)
- [ ] Add Twitter feed
- [ ] Add LinkedIn feed
- [ ] Create social proof section

---

## 🆘 Troubleshooting

### Google OAuth Not Working

**Error: "redirect_uri_mismatch"**
- Check redirect URIs in Google Console match exactly
- Include all variations (http/https, www/non-www)

**Error: "Access blocked"**
- Publish OAuth consent screen (move from Testing to Production)
- Or add test users in Google Console

**Error: "Invalid client"**
- Check CLIENT_ID and CLIENT_SECRET are correct
- Verify environment variables are set in Vercel

---

## 📞 Support Resources

- **Auth.js Docs**: https://authjs.dev
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **React Share**: https://github.com/nygardk/react-share
- **Twitter API**: https://developer.twitter.com
- **LinkedIn API**: https://developer.linkedin.com

---

## 🎉 Next Steps

1. **Set up Google OAuth** (15 minutes)
2. **Test sign-in flow**
3. **Add social share buttons** (30 minutes)
4. **Create OG image** (1 hour)
5. **Set up additional OAuth providers** (optional)

---

**Start with Google OAuth - it's the easiest and most users have it!** 🚀

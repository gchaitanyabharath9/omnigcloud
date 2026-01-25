# GSC SEO Fix - Validation Checklist

**Date**: January 14, 2026  
**Status**: Ready for Testing  
**Mode**: SAFE MODE (No commits, local testing only)

---

## 🧪 **LOCAL VALIDATION TESTS**

### **Test 1: 301 Redirects**

#### **Locale-less Main Pages**

```bash
# Test these URLs in browser (should redirect to /en/)
http://localhost:3000/pricing
http://localhost:3000/about
http://localhost:3000/contact
http://localhost:3000/blog
http://localhost:3000/research
http://localhost:3000/solutions
http://localhost:3000/platform
```

**Expected**: All should redirect to `/en/[page]` with 301 status

#### **Locale-less Research Papers**

```bash
# Test these URLs
http://localhost:3000/research/papers/a1-cloud-native-enterprise-reference
http://localhost:3000/research/papers/a2-high-throughput-distributed-systems
http://localhost:3000/research/papers/a3-enterprise-observability-operational-intelligence
http://localhost:3000/research/papers/a4-platform-governance-multicloud-hybrid
http://localhost:3000/research/papers/a5-monolith-to-cloud-native-modernization
http://localhost:3000/research/papers/a6-adaptive-policy-enforcement
http://localhost:3000/research/scholarly-article
http://localhost:3000/research/frameworks/aecp
```

**Expected**: All should redirect to `/en/research/...` with 301 status

---

### **Test 2: Canonical Tags**

#### **Check Homepage Canonical**

```bash
# Visit
http://localhost:3000/en

# View source, look for:
<link rel="canonical" href="https://www.omnigcloud.com/en" />
```

**Expected**: Self-canonical for each locale

#### **Check Research Paper Canonical**

```bash
# Visit
http://localhost:3000/en/research/papers/a1-cloud-native-enterprise-reference

# View source, look for:
<link rel="canonical" href="https://www.omnigcloud.com/en/research/papers/a1-cloud-native-enterprise-reference" />
```

**Expected**: Self-canonical, NOT pointing to redirect

---

### **Test 3: Hreflang Tags**

#### **Check Hreflang on Any Page**

```bash
# Visit
http://localhost:3000/en/pricing

# View source, look for:
<link rel="alternate" hreflang="en" href="https://www.omnigcloud.com/en/pricing" />
<link rel="alternate" hreflang="es" href="https://www.omnigcloud.com/es/pricing" />
<link rel="alternate" hreflang="fr" href="https://www.omnigcloud.com/fr/pricing" />
<link rel="alternate" hreflang="de" href="https://www.omnigcloud.com/de/pricing" />
<link rel="alternate" hreflang="zh" href="https://www.omnigcloud.com/zh/pricing" />
<link rel="alternate" hreflang="hi" href="https://www.omnigcloud.com/hi/pricing" />
<link rel="alternate" hreflang="ja" href="https://www.omnigcloud.com/ja/pricing" />
<link rel="alternate" hreflang="ko" href="https://www.omnigcloud.com/ko/pricing" />
<link rel="alternate" hreflang="x-default" href="https://www.omnigcloud.com/en/pricing" />
```

**Expected**: All 8 locales + x-default

---

### **Test 4: Robots Meta Tags**

#### **Public Pages (Should be indexable)**

```bash
# Visit
http://localhost:3000/en/pricing

# View source, look for:
<meta name="robots" content="index, follow" />
```

**Expected**: `index, follow` for all public pages

#### **Dashboard (Should be noindex)**

```bash
# Visit
http://localhost:3000/en/dashboard

# View source, look for:
<meta name="robots" content="noindex, nofollow" />
```

**Expected**: `noindex, nofollow` for dashboard

---

### **Test 5: Sitemap**

#### **Check Sitemap XML**

```bash
# Visit
http://localhost:3000/sitemap.xml

# Verify:
- Only localized URLs (e.g., /en/pricing, /es/pricing)
- NO locale-less URLs (e.g., /pricing)
- NO redirect URLs
- NO dashboard URLs
```

**Expected**: 144 URLs (18 routes × 8 locales)

---

### **Test 6: Robots.txt**

#### **Check Robots.txt**

```bash
# Visit
http://localhost:3000/robots.txt

# Verify:
User-agent: *
Allow: /
Allow: /docs/whitepaper
Disallow: /content/
Disallow: /private/
Disallow: /_next/
Disallow: /tmp/
Disallow: /dashboard/
Disallow: /en/dashboard/
Disallow: /es/dashboard/
... (all locale dashboards)

Sitemap: https://omnigcloud.com/sitemap.xml
```

**Expected**: Dashboard blocked, sitemap linked

---

## ✅ **VALIDATION CHECKLIST**

### **Redirects**

- [ ] `/pricing` → `/en/pricing` (301)
- [ ] `/about` → `/en/about` (301)
- [ ] `/contact` → `/en/contact` (301)
- [ ] `/research/papers/a1-...` → `/en/research/papers/a1-...` (301)
- [ ] All 17 redirects working

### **Canonicals**

- [ ] `/en/pricing` has self-canonical
- [ ] `/es/pricing` has self-canonical (not pointing to /en/)
- [ ] Research papers have self-canonical
- [ ] No canonical points to redirect

### **Hreflang**

- [ ] All pages have 8 locale alternates
- [ ] x-default points to /en/
- [ ] Hreflang URLs match canonical strategy

### **Robots Meta**

- [ ] Public pages: `index, follow`
- [ ] Dashboard: `noindex, nofollow`
- [ ] Research papers: `index, follow`

### **Sitemap**

- [ ] Only localized URLs
- [ ] No redirects in sitemap
- [ ] No noindex pages in sitemap
- [ ] 144 URLs total

### **Robots.txt**

- [ ] Dashboard blocked
- [ ] Sitemap linked
- [ ] Private paths blocked

---

## 🚀 **DEPLOYMENT CHECKLIST**

### **Pre-Deployment**

- [ ] All local tests passed
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build succeeds locally

### **Deployment**

- [ ] Commit changes to Git
- [ ] Push to main branch
- [ ] Vercel auto-deploys
- [ ] Wait for deployment to complete

### **Post-Deployment**

- [ ] Test redirects in production
- [ ] Verify canonical tags in production
- [ ] Check sitemap.xml in production
- [ ] Check robots.txt in production

---

## 📊 **GSC VALIDATION (After Deployment)**

### **Week 1**

- [ ] Request re-indexing for fixed URLs in GSC
- [ ] Monitor "Pages" report for 404 reduction
- [ ] Check for new crawl errors

### **Week 2-4**

- [ ] Export GSC data to compare before/after
- [ ] Check if "Discovered but not indexed" improved
- [ ] Monitor canonical issues

### **Week 5-8**

- [ ] Full GSC validation complete
- [ ] Document results
- [ ] Plan next optimization phase

---

## 🎯 **SUCCESS CRITERIA**

### **Immediate (After Deployment)**

- ✅ All 17 redirects working (301 status)
- ✅ No new crawl errors in GSC
- ✅ Sitemap validated in GSC

### **Short-term (1-2 weeks)**

- ✅ 404 pages reduced by 40-50%
- ✅ Noindex issues resolved (12 → 0)
- ✅ Canonical issues resolved (20 → 0)

### **Medium-term (2-4 weeks)**

- ✅ "Discovered but not indexed" improved by 30%
- ✅ Overall indexed pages increased by 10-15%
- ✅ No new duplicate content issues

---

## 📝 **NOTES**

### **What We Fixed**

1. ✅ Added 17 new 301 redirects
2. ✅ Verified noindex only on dashboard
3. ✅ Verified canonical strategy is correct
4. ✅ Verified sitemap is clean

### **What We Didn't Change**

- ❌ No UI redesign
- ❌ No page removal
- ❌ No routing changes
- ❌ No i18n breakage
- ❌ No commits/pushes (SAFE MODE)

### **What's Next**

1. Test locally using this checklist
2. Deploy to production
3. Monitor GSC for 2-4 weeks
4. Get GSC export for remaining 404s
5. Add internal links to orphan pages

---

**Document Version**: 1.0  
**Last Updated**: January 14, 2026  
**Status**: Ready for Testing  
**Next Action**: Run local validation tests

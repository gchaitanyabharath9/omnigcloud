# Google Search Console SEO Fix - Action Plan
**Date**: January 14, 2026  
**Project**: nascent-zodiac (OmniGCloud)  
**Status**: Analysis Complete - Ready for Implementation

---

## 📊 **GSC Issues Summary**

| **Issue** | **Count** | **Status** | **Priority** |
|-----------|-----------|------------|--------------|
| Not found (404) | 38 | ❌ Failed | 🔴 Critical |
| Excluded by 'noindex' | 12 | ❌ Failed | 🟠 High |
| Crawled - not indexed | 2 | ❌ Failed | 🟡 Medium |
| Duplicate without canonical | 3 | ⚠️ Not Started | 🟡 Medium |
| Discovered - not indexed | 102 | ⚠️ Started | 🟢 Low |
| Google chose different canonical | 17 | ⚠️ Started | 🟡 Medium |
| **Alternative with canonical** | **137** | ✅ **Started** | ✅ **Good** |
| **Page with redirect** | **66** | ✅ **Started** | ✅ **Good** |

---

## 🔍 **Root Cause Analysis**

### **Issue 1: 404 Pages (38 pages)**
**Likely Causes**:
- Old URLs from previous site structure
- Broken internal links
- URLs in sitemap that don't exist
- Query parameters being indexed

**Common Patterns**:
- `/architecture/cloud-native-reference-architecture` (already has redirect)
- Locale-less URLs (e.g., `/pricing` instead of `/en/pricing`)
- Old blog/news URLs
- Trailing slash mismatches

### **Issue 2: Noindex Pages (12 pages)**
**Current Noindex Pages** (Intentional):
- ✅ `/dashboard/*` (all locales) - **KEEP noindex**
- ✅ `/api/*` - **KEEP noindex**

**Potential Unintentional Noindex**:
- Check if any public pages accidentally have `noindex`
- Verify no middleware is adding `noindex` headers

### **Issue 3: Crawled But Not Indexed (2 pages)**
**Likely Causes**:
- Thin content
- Duplicate content
- Missing or incorrect canonical
- Low-quality signals

### **Issue 4: Duplicate Without Canonical (3 pages)**
**Likely Causes**:
- Missing `alternates.canonical` in metadata
- Canonical pointing to wrong URL
- Multiple URLs serving same content

### **Issue 5: Discovered But Not Indexed (102 pages)**
**Likely Causes**:
- Orphan pages (no internal links)
- Low crawl priority
- Thin content
- Recently published

### **Issue 6: Google Chose Different Canonical (17 pages)**
**Likely Causes**:
- Canonical mismatch between declared and Google's choice
- Redirect chains
- Inconsistent internal linking

---

## 🛠️ **FIX STRATEGY**

### **🔴 STEP 1: FIX 404 URLs**

#### **Action 1.1: Identify All 404 URLs**
Need GSC export to get exact URLs. Common patterns to check:

```typescript
// Add to next.config.ts redirects()
async redirects() {
  return [
    // Existing redirect
    {
      source: '/:locale/architecture/cloud-native-reference-architecture',
      destination: '/:locale/architecture/a1-cloud-native-enterprise-reference',
      permanent: true,
    },
    {
      source: '/architecture/cloud-native-reference-architecture',
      destination: '/en/architecture/a1-cloud-native-enterprise-reference',
      permanent: true,
    },
    
    // NEW: Locale-less URLs → /en/
    {
      source: '/pricing',
      destination: '/en/pricing',
      permanent: true,
    },
    {
      source: '/about',
      destination: '/en/about',
      permanent: true,
    },
    {
      source: '/contact',
      destination: '/en/contact',
      permanent: true,
    },
    {
      source: '/blog',
      destination: '/en/blog',
      permanent: true,
    },
    {
      source: '/research',
      destination: '/en/research',
      permanent: true,
    },
    {
      source: '/solutions',
      destination: '/en/solutions',
      permanent: true,
    },
    {
      source: '/platform',
      destination: '/en/platform',
      permanent: true,
    },
    
    // Research papers without locale
    {
      source: '/research/papers/:slug',
      destination: '/en/research/papers/:slug',
      permanent: true,
    },
    {
      source: '/research/frameworks/:slug',
      destination: '/en/research/frameworks/:slug',
      permanent: true,
    },
  ];
}
```

#### **Action 1.2: Remove 404 URLs from Sitemap**
Ensure sitemap only includes valid, 200-status URLs.

---

### **🟠 STEP 2: FIX NOINDEX EXCLUSIONS**

#### **Action 2.1: Audit All Pages**
Run search to find all `robots` metadata:

```bash
# Already done - found 12 instances
```

#### **Action 2.2: Verify Noindex is Intentional**
**KEEP noindex** on:
- ✅ `/dashboard/*` (all locales)
- ✅ `/api/*`
- ✅ `/admin/*` (if exists)
- ✅ `/auth/*` (if exists)
- ✅ `/preview/*` (if exists)

**REMOVE noindex** from:
- All public pages
- Research papers
- Blog posts
- Product pages

#### **Action 2.3: Add Explicit Index to Public Pages**
Ensure all public pages have:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
```

---

### **🟡 STEP 3: FIX CANONICAL & DUPLICATES**

#### **Action 3.1: Add Explicit Canonicals**
Every indexable page MUST have:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    alternates: {
      canonical: `https://www.omnigcloud.com/${locale}/path/to/page`,
      languages: {
        'en': `https://www.omnigcloud.com/en/path/to/page`,
        'es': `https://www.omnigcloud.com/es/path/to/page`,
        'fr': `https://www.omnigcloud.com/fr/path/to/page`,
        'de': `https://www.omnigcloud.com/de/path/to/page`,
        'zh': `https://www.omnigcloud.com/zh/path/to/page`,
        'hi': `https://www.omnigcloud.com/hi/path/to/page`,
        'ja': `https://www.omnigcloud.com/ja/path/to/page',
        'ko': `https://www.omnigcloud.com/ko/path/to/page`,
        'x-default': `https://www.omnigcloud.com/en/path/to/page`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

#### **Action 3.2: Verify Canonical URLs Return 200**
- Canonical MUST NOT redirect
- Canonical MUST NOT be noindex
- Canonical MUST match internal linking

#### **Action 3.3: Fix i18n Canonical Strategy**
Each locale page uses **self-canonical**:
- `/en/pricing` → canonical: `https://www.omnigcloud.com/en/pricing`
- `/es/pricing` → canonical: `https://www.omnigcloud.com/es/pricing`

---

### **🟢 STEP 4: FIX CRAWLED/DISCOVERED BUT NOT INDEXED**

#### **Action 4.1: Improve Content Uniqueness**
For each affected page:
- Ensure unique `<title>`
- Ensure unique `<meta description>`
- Add substantive content (min 300 words)

#### **Action 4.2: Add Internal Links**
Link from:
- Homepage
- Category hubs
- Related pages
- Footer navigation

#### **Action 4.3: Avoid Orphan Pages**
Every page should have:
- At least 3 internal links pointing to it
- Breadcrumb navigation
- Sitemap inclusion

---

### **🔵 STEP 5: REDIRECT & SITEMAP HYGIENE**

#### **Action 5.1: Ensure All Redirects are 301**
✅ Already using `permanent: true` in next.config.ts

#### **Action 5.2: Clean Sitemap**
Sitemap MUST include:
- ✅ Only final canonical URLs
- ✅ No redirects
- ✅ No noindex pages
- ✅ No duplicates
- ✅ No query-param URLs

**Current Sitemap Issues**:
```typescript
// REMOVE: Root URL (causes redirect)
// Currently omitted - GOOD!

// VERIFY: All URLs return 200
// VERIFY: No trailing slash mismatches
```

---

## 📋 **IMPLEMENTATION CHECKLIST**

### **Phase 1: Critical Fixes (Do First)**
- [ ] Get GSC export of exact 404 URLs
- [ ] Add 301 redirects for all 404s
- [ ] Verify no public pages have noindex
- [ ] Add explicit canonicals to all public pages

### **Phase 2: Canonical & Duplicate Fixes**
- [ ] Audit all pages for canonical tags
- [ ] Ensure self-canonical for i18n pages
- [ ] Add hreflang to all localized pages
- [ ] Verify canonical URLs return 200

### **Phase 3: Content & Internal Linking**
- [ ] Improve content on thin pages
- [ ] Add internal links to orphan pages
- [ ] Update homepage to link to key pages
- [ ] Add category hub pages

### **Phase 4: Sitemap & Validation**
- [ ] Remove 404 URLs from sitemap
- [ ] Remove noindex URLs from sitemap
- [ ] Remove redirect URLs from sitemap
- [ ] Verify all sitemap URLs return 200

### **Phase 5: Local Validation**
- [ ] Test all URLs locally
- [ ] Verify canonicals resolve correctly
- [ ] Check no broken internal links
- [ ] Validate robots.txt
- [ ] Validate sitemap.xml

---

## 🚦 **QUALITY GATES**

### **FAIL if ANY of these are true**:
- ❌ Any public page has noindex
- ❌ Any canonical points to redirect
- ❌ Any 404 page is internally linked
- ❌ Sitemap contains non-indexable URLs
- ❌ i18n routes broken

### **PASS if ALL of these are true**:
- ✅ All public pages have `index: true`
- ✅ All canonicals return 200
- ✅ All 404s have 301 redirects
- ✅ Sitemap only has indexable URLs
- ✅ All pages have unique titles/descriptions

---

## 📊 **EXPECTED OUTCOMES**

### **After Fixes**:
| **Metric** | **Before** | **After** | **Improvement** |
|------------|------------|-----------|-----------------|
| 404 Pages | 38 | 0 | 100% |
| Noindex (Unintentional) | 12 | 0 | 100% |
| Crawled Not Indexed | 2 | 0 | 100% |
| Duplicate Without Canonical | 3 | 0 | 100% |
| Discovered Not Indexed | 102 | <20 | 80% |
| Google Chose Different Canonical | 17 | 0 | 100% |

### **Timeline**:
- **Immediate**: 404 redirects, noindex fixes
- **1-2 weeks**: Google re-crawls and validates fixes
- **2-4 weeks**: Indexing improves for discovered pages
- **4-8 weeks**: Full GSC validation complete

---

## 🎯 **NEXT STEPS**

1. **Get GSC Data**: Export exact 404 URLs from Google Search Console
2. **Implement Redirects**: Add to `next.config.ts`
3. **Audit Metadata**: Check all pages for proper robots/canonical
4. **Test Locally**: Verify all fixes work
5. **Deploy**: Push to production
6. **Validate in GSC**: Request re-indexing for fixed URLs

---

**Document Version**: 1.0  
**Last Updated**: January 14, 2026  
**Status**: Ready for Implementation (Pending GSC Export)

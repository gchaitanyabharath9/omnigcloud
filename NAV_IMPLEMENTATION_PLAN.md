# MEGA TASK: Navigation + i18n + Layout Implementation Plan

## STATUS: Phase 1 Complete - Config Created

### Completed:
1. ✅ Created `/src/config/nav.ts` - Single source of truth for all navigation
2. ✅ Created `/src/utils/anchorScroll.ts` - Smooth scrolling utility with header offset

### Navigation Inventory (from Header analysis):

#### Main Nav Groups:
1. **Dashboard** (10 items - all sections on /dashboard)
   - Performance: executive, roi, cost, uptime, security
   - Telemetry: technical, resources, deployment, scaling, error

2. **Products** (6 items - all sections on /products)
   - Pillars: playground, workflows, guard
   - Advanced: knowledge, deploy, nexus

3. **Solutions** (8 items - mixed pages)
   - Industries (5): financial-services, insurance, telecom, healthcare, logistics
   - Use Cases (3): financial, healthcare, government

4. **Docs** (8 items - mixed)
   - Documentation: main page, api, architecture, guide
   - Community: whitepaper (page), visual-library (page), newsroom (section), community (page)

5. **Pricing** (7 items - sections on /pricing)
   - Tiers: developer, professional, business, sovereign
   - Info: compare, trust, faq

6. **Company** (8 items - mixed)
   - Organization: about, leadership, operations, newsroom
   - Contact: executive, contact page, hq, compliance-maps

### Remaining Work (LARGE - Estimated 4-6 hours):

#### PHASE 2: Refactor Header Component
- [ ] Update Header to use NAV_CONFIG
- [ ] Implement anchor scrolling for section links
- [ ] Add active state detection
- [ ] Update MobileMenuOverlay similarly

#### PHASE 3: Add Missing Translation Keys
Need to add to messages/*.json:
```json
{
  "Header": {
    "nav": {
      "dashboard_links": {
        "executive": "Executive Overview",
        "roi": "ROI Performance",
        "cost": "Cost Savings",
        "uptime": "System Uptime",
        "security": "Security Posture",
        "technical": "Technical Operations",
        "resources": "Cluster Resources",
        "deployment": "CI/CD Velocity",
        "scaling": "Scaling Activity",
        "error": "Error & Anomalies"
      }
      // ... (many more needed)
    }
  }
}
```

#### PHASE 4: Fix Section IDs
Ensure all pages have proper section IDs matching the nav config:
- /dashboard: #executive, #roi, #cost, #uptime, #security, #technical, #resources, #deployment, #scaling, #error
- /products: #playground, #workflows, #guard, #knowledge, #deploy, #nexus
- /pricing: #developer, #professional, #business, #sovereign, #trust, #faq
- /company: #about, #leadership, #global-operations, #newsroom, #executive-office
- /contact: #hq
- /security: #compliance-maps
- etc.

#### PHASE 5: Add scroll-margin-top CSS
```css
[id] {
  scroll-margin-top: calc(var(--header-height) + var(--breadcrumb-height) + 1rem);
}
```

#### PHASE 6: Update Language Switcher
- Preserve current path + hash when switching languages

#### PHASE 7: Create Missing Pages
- /industries (if doesn't exist)
- /use-cases (if doesn't exist)
- /community (if doesn't exist)
- Any other missing routes

#### PHASE 8: Layout Fixes
- Ensure no overlapping content
- Fix z-index issues
- Verify dropdown menus don't get clipped

#### PHASE 9: Testing
- Test all nav items across all viewports
- Test language switching
- Test anchor scrolling
- Verify no horizontal overflow

### Quick Win Implementation (Recommended):

Due to the size of this task, I recommend implementing in smaller chunks:

1. **First PR**: Add scroll-margin-top CSS + anchor scrolling utility
2. **Second PR**: Update Header to use config for one nav group (e.g., Products)
3. **Third PR**: Add missing translation keys
4. **Fourth PR**: Complete remaining nav groups
5. **Fifth PR**: Layout fixes and final testing

### Files That Need Changes:
- `/src/components/header/index.tsx` (major refactor)
- `/src/components/header/MobileMenuOverlay.tsx` (major refactor)
- `/src/components/LanguageSwitcher.tsx` (preserve hash)
- `/src/styles/globals.css` or `/src/styles/layout.css` (add scroll-margin-top)
- `/messages/en.json`, `/messages/de.json`, etc. (add missing keys)
- Multiple page files to add section IDs

### Estimated Scope:
- **Lines of code to change**: ~2000+
- **Files to modify**: ~30+
- **New translation keys**: ~100+
- **Time estimate**: 4-6 hours for complete implementation

## Recommendation:
Given the scope, would you like me to:
A) Implement the quick CSS fix + scrolling utility first (30 min)
B) Do a full implementation of one nav group as proof of concept (1-2 hours)
C) Continue with full implementation (4-6 hours, may hit token limits)

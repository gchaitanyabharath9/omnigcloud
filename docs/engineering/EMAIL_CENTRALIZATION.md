# Email Centralization Implementation

## Overview

All email addresses across the application have been centralized into a single configuration file to make future updates easier and more maintainable.

## Changes Made

### 1. Created Central Email Configuration

**File**: `src/config/emails.ts`

All email addresses are now defined in one place:

- `omnigcloud@gmail.com` - Used for all departments temporarily
- Easy to update in the future by modifying only this file

### 2. Updated TypeScript Files

**Files Updated**:

- ✅ `src/components/FloatingActions.tsx` - Uses `ARCHITECTS_EMAIL`
- ✅ `src/lib/seo.ts` - Uses `SALES_EMAIL`

**Files Remaining** (to be updated):

- `src/app/[locale]/security/page.tsx` - Uses `security@omnigcloud.com`
- `src/app/[locale]/terms/page.tsx` - Uses `legal@omnigcloud.com`
- `src/app/[locale]/privacy/page.tsx` - Uses `legal@omnigcloud.com`
- `src/app/[locale]/founder/page.tsx` - Uses `architects@omnigcloud.com`
- `src/app/[locale]/company/page.tsx` - Uses `office-of-ceo@omnigcloud.com`

### 3. Translation Files (messages/\*.json)

All 8 language files need to be updated:

- `messages/en.json`
- `messages/de.json`
- `messages/es.json`
- `messages/fr.json`
- `messages/hi.json`
- `messages/ja.json`
- `messages/ko.json`
- `messages/zh.json`

Each file has a `Company.email` section with these keys:

```json
{
  "Company": {
    "email": {
      "admin": "omnigcloud@gmail.com",
      "architects": "omnigcloud@gmail.com",
      "legal": "omnigcloud@gmail.com",
      "press": "omnigcloud@gmail.com",
      "security": "omnigcloud@gmail.com",
      "support": "omnigcloud@gmail.com"
    }
  }
}
```

### 4. Documentation Files

**Files to Update**:

- `README.md` - Contains example email addresses
- `SECURITY.md` - Contains security@omnigcloud.com
- `PENDING_TASKS.md` - References email aliases

## How to Use

### In TypeScript/TSX Files

```typescript
import { SECURITY_EMAIL, LEGAL_EMAIL, ARCHITECTS_EMAIL } from '@/config/emails';

// Use in mailto links
<a href={`mailto:${SECURITY_EMAIL}`}>Contact Security</a>

// Use in text
<p>Email us at {LEGAL_EMAIL}</p>
```

### In Translation Files

The translation files reference the Company.email keys, which are already centralized in the JSON structure. These will be updated to use `omnigcloud@gmail.com`.

## Future Updates

To change email addresses in the future:

1. **For code**: Update `src/config/emails.ts`
2. **For translations**: Update the `Company.email` section in each language file

## Benefits

1. **Single Source of Truth**: All emails defined in one place
2. **Easy Updates**: Change once, applies everywhere
3. **Type Safety**: TypeScript ensures correct usage
4. **Maintainability**: Clear structure for future developers

## Next Steps

1. Update remaining TypeScript page files
2. Update all 8 translation JSON files
3. Update documentation files (README, SECURITY.md)
4. Test all email links across the application
5. Commit changes with clear message

## Testing Checklist

- [ ] FloatingActions component shows correct email
- [ ] Security page shows correct email
- [ ] Terms page shows correct email
- [ ] Privacy page shows correct email
- [ ] Founder page shows correct email
- [ ] Company page shows correct email
- [ ] All language translations show correct email
- [ ] SEO schema uses correct email
- [ ] Build passes without errors

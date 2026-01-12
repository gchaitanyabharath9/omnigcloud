# Form Security Documentation

## Overview

All marketing forms (contact, demo, newsletter) are protected by comprehensive bot and spam prevention measures. These protections work silently without impacting legitimate users while effectively filtering automated submissions.

## Security Layers

### 1. Honeypot Fields

**Purpose**: Detect and filter bot submissions

**Implementation**: Hidden fields that humans won't fill but bots will

**Common Honeypot Fields**:
- `website` - Most effective
- `url`
- `homepage`
- `phone_number` (different from `phone`)
- `company_url`
- `fax`

**How It Works**:
1. Add hidden field to form (CSS: `display: none`)
2. Bots auto-fill all fields, including hidden ones
3. Server detects filled honeypot field
4. Returns success response (bot thinks it worked)
5. Submission is silently discarded

**Example**:
```html
<input 
    type="text" 
    name="website" 
    tabindex="-1" 
    autocomplete="off"
    style="position: absolute; left: -9999px;"
/>
```

---

### 2. Request Size Limits

**Purpose**: Prevent DoS attacks and oversized payloads

**Limits**:
- **Contact Form**: 10KB max
- **Demo Request**: 10KB max
- **Newsletter**: 5KB max

**Validation**:
- Checks `Content-Length` header
- Rejects requests exceeding limit
- Returns safe error message

**Error Response**:
```json
{
    "requestId": "...",
    "status": "error",
    "error": {
        "code": "PAYLOAD_TOO_LARGE",
        "message": "Request payload exceeds maximum size of 10240 bytes",
        "retryable": false
    }
}
```

---

### 3. Content-Type Validation

**Purpose**: Ensure requests are properly formatted JSON

**Required**: `Content-Type: application/json`

**Validation**:
- Checks request headers
- Rejects non-JSON requests
- Prevents malformed submissions

**Error Response**:
```json
{
    "requestId": "...",
    "status": "error",
    "error": {
        "code": "INVALID_CONTENT_TYPE",
        "message": "Invalid content-type. Expected application/json",
        "retryable": false
    }
}
```

---

### 4. Time-to-Submit Heuristic

**Purpose**: Detect automated form submissions

**Thresholds**:
- **Minimum**: 2 seconds (too fast = likely bot)
- **Maximum**: 5 minutes (too slow = stale form)

**Implementation**:
1. Client sends `_formStartTime` timestamp
2. Server calculates duration
3. Too fast → Silent rejection (looks like success to bot)
4. Too slow → Form expired error

**Client-Side**:
```typescript
const formStartTime = Date.now();

// On submit
const payload = {
    ...formData,
    _formStartTime: formStartTime
};
```

**Error Response** (form expired):
```json
{
    "requestId": "...",
    "status": "error",
    "error": {
        "code": "FORM_EXPIRED",
        "message": "Form submission expired. Please refresh and try again.",
        "retryable": true
    }
}
```

---

### 5. Secure Logging

**Purpose**: Prevent sensitive user data from appearing in logs

**Redacted Fields**:
- `message`
- `comment`
- `description`
- `content`
- `body`
- `text`
- `password`
- `token`
- `secret`
- `apiKey`
- `creditCard`
- `ssn`

**Example Log**:
```json
{
    "level": "info",
    "message": "Contact form submission",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "data": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "message": "[REDACTED]"
    }
}
```

---

## Protected Forms

### Contact Form (`/api/contact`)

**Protections**:
- ✅ Honeypot field (`website`)
- ✅ 10KB payload limit
- ✅ Content-type validation
- ✅ Time-to-submit heuristic
- ✅ Secure logging (message redacted)
- ✅ Rate limiting (5 requests/min)

**Schema**:
```typescript
{
    firstName: string (1-100 chars),
    lastName: string (1-100 chars),
    email: string (valid email, max 255),
    message: string (10-5000 chars),
    website?: string (honeypot),
    _formStartTime?: number (timestamp)
}
```

---

### Demo Request Form (`/api/demo`)

**Protections**:
- ✅ Honeypot field (`url`)
- ✅ 10KB payload limit
- ✅ Content-type validation
- ✅ Time-to-submit heuristic
- ✅ Secure logging
- ✅ Rate limiting (10 requests/min)

**Schema**:
```typescript
{
    name: string,
    email: string,
    company: string,
    role: string,
    url?: string (honeypot),
    _formStartTime?: number
}
```

---

### Newsletter Signup (`/api/newsletter`)

**Protections**:
- ✅ Honeypot field (`phone_number`)
- ✅ 5KB payload limit
- ✅ Content-type validation
- ✅ Secure logging
- ✅ Rate limiting (20 requests/min)

**Schema**:
```typescript
{
    email: string,
    phone_number?: string (honeypot)
}
```

---

## Implementation Guide

### Server-Side (API Route)

```typescript
import { z } from 'zod';
import { NextRequest } from 'next/server';
import { 
    withApiHarden, 
    createSuccessResponse, 
    handleZodError, 
    handleSafeError 
} from '@/lib/api-utils';
import { 
    validateFormSecurity, 
    checkHoneypot, 
    sanitizeForLogging 
} from '@/lib/form-security';
import { logger } from '@/lib/logger';

const FormSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(255),
    message: z.string().min(10).max(5000),
    website: z.string().optional(), // Honeypot
    _formStartTime: z.number().optional()
});

export async function POST(request: NextRequest) {
    return withApiHarden(request, async (req, { requestId }) => {
        try {
            const body = await req.json();

            // 1. Form Security Validation
            const securityCheck = await validateFormSecurity(req, body, {
                maxPayloadSize: 10 * 1024,
                minSubmitTime: 2000,
                honeypotFields: ['website']
            });

            if (!securityCheck.valid && securityCheck.error) {
                return handleSafeError(new Error(securityCheck.error.message), requestId);
            }

            // 2. Honeypot Check
            const honeypotCheck = checkHoneypot(body, ['website']);
            if (honeypotCheck.isBot) {
                logger.warn('Bot detected', {
                    requestId,
                    field: honeypotCheck.field,
                    data: sanitizeForLogging(body)
                });
                
                // Silent success (bot thinks it worked)
                return createSuccessResponse(requestId, { 
                    message: 'Form submitted successfully.' 
                });
            }

            // 3. Input Validation
            const validation = FormSchema.safeParse(body);
            if (!validation.success) {
                return handleZodError(validation.error, requestId);
            }

            // 4. Secure Logging
            logger.info('Form submission', {
                requestId,
                data: sanitizeForLogging(validation.data)
            });

            // 5. Process Form
            const result = await processForm(validation.data);

            return createSuccessResponse(requestId, result);

        } catch (error) {
            return handleSafeError(error, requestId);
        }
    });
}
```

### Client-Side (React Form)

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ContactForm() {
    const [formStartTime, setFormStartTime] = useState<number>(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        website: '' // Honeypot - hidden from user
    });

    useEffect(() => {
        // Record when form was loaded
        setFormStartTime(Date.now());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            _formStartTime: formStartTime
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.status === 'ok') {
                alert('Form submitted successfully!');
            } else {
                alert(data.error?.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
            />
            
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
            />
            
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
            
            <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
            />

            {/* Honeypot field - hidden from users */}
            <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                tabIndex={-1}
                autoComplete="off"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px'
                }}
                aria-hidden="true"
            />

            <button type="submit">Submit</button>
        </form>
    );
}
```

---

## Bot Detection Strategies

### Silent Rejection

When a bot is detected:
1. ✅ Return 200 OK status
2. ✅ Return success message
3. ✅ Don't process submission
4. ✅ Log attempt (without user data)

**Why?**
- Bots think submission succeeded
- They move on to next target
- Prevents retry attempts
- Reduces server load

### Logging Bot Attempts

```json
{
    "level": "warn",
    "message": "Bot detected via honeypot",
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "field": "website",
    "data": {
        "firstName": "Bot",
        "lastName": "Spammer",
        "email": "bot@spam.com",
        "message": "[REDACTED]"
    }
}
```

---

## Testing

### Test Honeypot Detection

```bash
# Bot submission (honeypot filled)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "This is a test message",
    "website": "http://spam.com"
  }'
```

**Expected**: 200 OK (silent rejection)

### Test Legitimate Submission

```bash
# Normal submission (no honeypot)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "This is a legitimate message"
  }'
```

**Expected**: 200 OK (processed)

### Test Payload Size Limit

```bash
# Oversized payload
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "Content-Length: 20000" \
  -d '{"message": "..."}'
```

**Expected**: 500 with PAYLOAD_TOO_LARGE error

### Test Time-to-Submit

```bash
# Too fast (< 2 seconds)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Fast",
    "lastName": "Bot",
    "email": "bot@example.com",
    "message": "Submitted instantly",
    "_formStartTime": '$(date +%s%3N)'
  }'
```

**Expected**: 200 OK (silent rejection)

---

## Monitoring

### Key Metrics

1. **Bot Detection Rate**: Honeypot hits / total submissions
2. **Payload Rejections**: Oversized requests / total requests
3. **Form Expiration Rate**: Expired forms / total submissions
4. **Legitimate Submissions**: Successful / total submissions

### Alerts

Set up alerts for:
- **High Bot Rate**: >20% honeypot hits
- **Payload Attacks**: Multiple oversized requests from same IP
- **Form Abuse**: High submission rate from single IP

### Dashboard Queries

```sql
-- Bot detection rate (last 24 hours)
SELECT 
    COUNT(CASE WHEN message LIKE '%Bot detected%' THEN 1 END) as bot_attempts,
    COUNT(*) as total_submissions,
    (COUNT(CASE WHEN message LIKE '%Bot detected%' THEN 1 END) * 100.0 / COUNT(*)) as bot_rate
FROM logs
WHERE timestamp > NOW() - INTERVAL '24 hours'
AND route = '/api/contact';
```

---

## Security Best Practices

### ✅ DO

- Use multiple honeypot fields
- Hide honeypot fields with CSS (not just `display: none`)
- Validate on server-side (never trust client)
- Log bot attempts (without user data)
- Return success to bots (silent rejection)
- Sanitize logs (redact sensitive fields)
- Set reasonable payload limits
- Use time-to-submit heuristics

### ❌ DON'T

- Tell bots they were detected
- Log user message content
- Use only client-side validation
- Use predictable honeypot field names
- Block IPs (they rotate)
- Return different responses for bots
- Log sensitive user data

---

## Compliance

This implementation helps meet:

- **GDPR**: No user message content in logs
- **CCPA**: Minimal data collection
- **PCI DSS**: No sensitive data logging
- **SOC 2**: Comprehensive security controls

---

## Changelog

### 2025-12-30
- ✅ Implemented honeypot validation
- ✅ Added payload size limits
- ✅ Added content-type validation
- ✅ Implemented time-to-submit heuristic
- ✅ Created secure logging utilities
- ✅ Updated contact form with all protections
- ✅ Created comprehensive documentation

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly

#!/bin/bash
set -e

DOCKERFILE="Dockerfile"
ERRORS=0

echo "🔍 Auditing Dockerfile for best practices..."

# 1. Check for non-root user
if ! grep -q "USER " "$DOCKERFILE"; then
    echo "❌ ERROR: No 'USER' instruction found. Image likely runs as root."
    ERRORS=$((ERRORS + 1))
fi

# 2. Check for telemetry disabling
if ! grep -q "NEXT_TELEMETRY_DISABLED 1" "$DOCKERFILE"; then
    echo "❌ ERROR: NEXT_TELEMETRY_DISABLED is not set to 1."
    ERRORS=$((ERRORS + 1))
fi

# 3. Check for specific port 3000
EXPOSED_PORT=$(grep "EXPOSE " "$DOCKERFILE" | awk '{print $2}')
if [ -z "$EXPOSED_PORT" ]; then
    echo "⚠️ WARNING: No EXPOSE instruction found. Defaulting to port 3000."
elif [ "$EXPOSED_PORT" != "3000" ]; then
    echo "❌ ERROR: Image exposes port $EXPOSED_PORT, but only 3000 is permitted."
    ERRORS=$((ERRORS + 1))
fi

# 4. Check for baked-in secrets
if grep -q "COPY .env" "$DOCKERFILE"; then
    echo "❌ ERROR: Found 'COPY .env*' in Dockerfile. Secrets must not be baked into the image."
    ERRORS=$((ERRORS + 1))
fi

# Final verdict
if [ $ERRORS -gt 0 ]; then
    echo "📉 Audit failed with $ERRORS error(s)."
    exit 1
else
    echo "✨ Audit passed!"
    exit 0
fi

# Multi-cloud portable Dockerfile (Container-First Strategy)
# Compatible with AWS ECS, Azure Container Apps, Google Cloud Run, and Kubernetes.

# --- Stage 1: Prune dependencies (Reduce image size) ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./
# Install dependencies (production only usually, but we need devDeps for build)
RUN npm ci

# --- Stage 2: Build the application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment for build (default to production behavior)
# APP_ENV can be overridden at build time, but usually we build generic artifacts
# and inject config via ENV/Secrets at runtime.
ENV NEXT_TELEMETRY_DISABLED=1
ENV APP_ENV=prod

# Run build
RUN npm run build

# --- Stage 3: Production Runner (Final Image) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch users
USER nextjs

# Expose port (standard for container orchestrators)
EXPOSE 3000
ENV PORT=3000

# Start application
CMD ["node", "server.js"]

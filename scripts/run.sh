#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Running localized CI pipeline..."

# 1. Run Dockerfile Static Analysis
sh "$SCRIPT_DIR/dockerfile_check.sh"

# 2. Run Local Verification (Build & Health Check)
sh "$SCRIPT_DIR/local_verify.sh"

echo "🏁 All checks passed successfully!"

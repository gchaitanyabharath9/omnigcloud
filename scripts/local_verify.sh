#!/bin/bash
set -e

# Configuration
IMAGE_NAME="omnisource-next:local"
CONTAINER_NAME="omnisource-verify"
PORT=3000
HEALTH_URL="http://localhost:$PORT/api/health"
MAX_RETRIES=10
SLEEP_INTERVAL=3

echo "🚀 Starting Local Verification for $IMAGE_NAME"

# 1. Build the image
echo "📦 Building Docker image..."
docker build -t "$IMAGE_NAME" .

# 2. Prepare Environment Variables
ENV_OPTS=""
if [ -f .env.local ]; then
    echo "📄 Found .env.local, using it for runtime..."
    ENV_OPTS="--env-file .env.local"
else
    echo "ℹ️ No .env.local found, proceeding with default env."
fi

# 3. Clean up any existing container
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🧹 Removing old container..."
    docker rm -f "$CONTAINER_NAME" > /dev/null
fi

# 4. Run the container
echo "🏃 Running container..."
docker run -d \
    --name "$CONTAINER_NAME" \
    -p "$PORT:$PORT" \
    $ENV_OPTS \
    "$IMAGE_NAME"

# 5. Health Check logic
echo "⏳ Waiting for health check ($HEALTH_URL)..."
SUCCESS=0
for i in $(seq 1 $MAX_RETRIES); do
    if curl -s -f "$HEALTH_URL" > /dev/null; then
        echo "✅ Health check passed!"
        SUCCESS=1
        break
    fi
    echo "⟳ Attempt $i/$MAX_RETRIES: Server not ready yet..."
    sleep $SLEEP_INTERVAL
done

# 6. Report and Cleanup
if [ $SUCCESS -eq 1 ]; then
    echo "🎉 Verification Successful!"
    # Print the health response for verification
    echo "Response: $(curl -s $HEALTH_URL)"
    docker stop "$CONTAINER_NAME" > /dev/null
    docker rm "$CONTAINER_NAME" > /dev/null
    exit 0
else
    echo "❌ Verification Failed: Health check timed out or failed."
    echo "📜 Container Logs:"
    docker logs "$CONTAINER_NAME"
    echo "🧹 Cleaning up..."
    docker stop "$CONTAINER_NAME" > /dev/null
    docker rm "$CONTAINER_NAME" > /dev/null
    exit 1
fi

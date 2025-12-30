#!/bin/bash

# Multi-Cloud Push Script for OmniGCloud
# Usage: ./scripts/push-to-clouds.sh <provider> [aws|azure|gcp|ocp]

PROVIDER=$1
IMAGE_NAME="omnigcloud-app"
VERSION="latest"

if [ -z "$PROVIDER" ]; then
    echo "Usage: ./scripts/push-to-clouds.sh <aws|azure|gcp|ocp>"
    exit 1
fi

echo "🚀 Building production image..."
docker build -t $IMAGE_NAME:$VERSION .

case $PROVIDER in
  aws)
    echo "☁️ Pushing to AWS ECR..."
    # AWS_ACCOUNT_ID and REGION should be set
    # aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
    # docker tag $IMAGE_NAME:$VERSION $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE_NAME:$VERSION
    # docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE_NAME:$VERSION
    echo "⚠️ Fill in your AWS_ACCOUNT_ID and REGION in the script or environment."
    ;;
    
  azure)
    echo "☁️ Pushing to Azure Container Registry..."
    # ACR_NAME should be set
    # az acr login --name $ACR_NAME
    # docker tag $IMAGE_NAME:$VERSION $ACR_NAME.azurecr.io/$IMAGE_NAME:$VERSION
    # docker push $ACR_NAME.azurecr.io/$IMAGE_NAME:$VERSION
    echo "⚠️ Fill in your ACR_NAME in the script or environment."
    ;;
    
  gcp)
    echo "☁️ Pushing to GCP Artifact Registry..."
    # PROJECT_ID and REGION should be set
    # gcloud auth configure-docker $REGION-docker.pkg.dev
    # docker tag $IMAGE_NAME:$VERSION $REGION-docker.pkg.dev/$PROJECT_ID/omnigcloud-repo/$IMAGE_NAME:$VERSION
    # docker push $REGION-docker.pkg.dev/$PROJECT_ID/omnigcloud-repo/$IMAGE_NAME:$VERSION
    echo "⚠️ Fill in your PROJECT_ID and REGION in the script or environment."
    ;;
    
  ocp)
    echo "☁️ Pushing to OpenShift Internal Registry..."
    # OC_REGISTRY_URL and NAMESPACE should be set
    # podman login -u $(oc whoami) -p $(oc whoami -t) $OC_REGISTRY_URL
    # podman tag $IMAGE_NAME:$VERSION $OC_REGISTRY_URL/$NAMESPACE/$IMAGE_NAME:$VERSION
    # podman push $OC_REGISTRY_URL/$NAMESPACE/$IMAGE_NAME:$VERSION
    echo "⚠️ Ensure you are logged in via 'oc login'."
    ;;
    
  *)
    echo "Unknown provider: $PROVIDER"
    exit 1
    ;;
esac

echo "✅ Push sequence completed for $PROVIDER"

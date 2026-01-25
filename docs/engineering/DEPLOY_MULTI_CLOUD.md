# Multi-Cloud Deployment Strategy (AWS, Azure, GCP, OCP)

OmniGCloud is designed for sovereign, multi-cloud resilience. This guide explains how to deploy the application to major cloud providers using the provided configurations.

## 📦 Containerization (Foundational)

The application is containerized using a multi-stage `Dockerfile`.

- **Build**: `docker build -t omnigcloud-app .`
- **Run**: `docker run -p 3000:3000 omnigcloud-app`

---

## ☁️ 1. Amazon Web Services (AWS)

**Strategy**: ECS Fargate (Serverless Containers)

- **Config**: `terraform/aws.tf`
- **Steps**:
  1. Initialize: `terraform init`
  2. Plan: `terraform plan -target=aws.tf`
  3. Apply: `terraform apply -target=aws.tf`
- **Networking**: Deploys into a dedicated VPC with Public Subnets and ECS Fargate.

## ☁️ 2. Microsoft Azure

**Strategy**: Azure Container Instances (ACI)

- **Config**: `terraform/azure.tf`
- **Steps**:
  1. Initialize: `terraform init`
  2. Apply: `terraform apply -target=azure.tf`
- **Advantages**: Fastest way to spin up a standalone container in Azure with a public IP.

## ☁️ 3. Google Cloud Platform (GCP)

**Strategy**: Cloud Run (Auto-scaling Serverless)

- **Config**: `terraform/gcp.tf`
- **Steps**:
  1. Initialize: `terraform init`
  2. Apply: `terraform apply -target=gcp.tf`
- **Features**: Fully managed environment with scale-to-zero capabilities.

## ☁️ 4. OpenShift Container Platform (OCP)

**Strategy**: Enterprise Kubernetes with Routes

- **Config**: `k8s/ocp-deployment.yaml`
- **Steps**:
  1. Login: `oc login`
  2. Create Project: `oc new-project omnigcloud-prod`
  3. Apply Manifests: `oc apply -f k8s/ocp-deployment.yaml`
- **Networking**: Automatically creates a TLS-terminated **Route** at the edge.

---

## 🛠 Automation Script

Use the provided push script to streamline the registry upload process:

```bash
chmod +x ./scripts/push-to-clouds.sh
./scripts/push-to-clouds.sh aws   # Push to ECR
./scripts/push-to-clouds.sh azure # Push to ACR
./scripts/push-to-clouds.sh gcp   # Push to GCR
./scripts/push-to-clouds.sh ocp   # Push to OCP Registry
```

## 🔐 Secrets Management

Regardless of the cloud provider, ensure you set the following environment variables in the respective Secret Managers (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager, or OCP Secrets):

- `REDIS_URL`
- `RESEND_API_KEY`
- `AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

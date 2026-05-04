#!/usr/bin/env bash
# Deployment script — called after OIDC authentication is already established.
# AWS credentials are injected as environment variables by the configure-aws-credentials action.
set -euo pipefail

IMAGE_TAG="${IMAGE_TAG:-latest}"
REGION="${AWS_REGION:-us-east-1}"
CLUSTER="${ECS_CLUSTER:-secure-app-cluster}"
SERVICE="${ECS_SERVICE:-secure-app-service}"

echo "==> Deploying image tag: ${IMAGE_TAG} to cluster: ${CLUSTER}"

# Push the Docker image to ECR (credentials come from OIDC token — no hardcoded secrets)
aws ecr get-login-password --region "${REGION}" \
  | docker login --username AWS --password-stdin \
      "$(aws sts get-caller-identity --query Account --output text).dkr.ecr.${REGION}.amazonaws.com"

# Force a new ECS deployment
aws ecs update-service \
  --cluster "${CLUSTER}" \
  --service "${SERVICE}" \
  --force-new-deployment \
  --region "${REGION}"

echo "==> Deployment triggered successfully. OIDC token will expire shortly — no credentials to clean up."

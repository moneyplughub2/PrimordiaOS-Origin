#!/usr/bin/env bash

echo "=== PrimordiaOS GCP Bootstrap Starting ==="

PROJECT_ID="primordial-antigravity-core"
SERVICE_ACCOUNT="primordia-pipeline@${PROJECT_ID}.iam.gserviceaccount.com"
BUCKET="primordia-artifacts"
REGION="us-central1"

echo "Using Project: $PROJECT_ID"
echo "Using Service Account: $SERVICE_ACCOUNT"
echo "Using Region: $REGION"
echo "Using Bucket: $BUCKET"

echo ""
echo "=== STEP 1: Fix Python Path for gcloud ==="

PYTHON_PATH=$(which python3 || which python)
if [ -z "$PYTHON_PATH" ]; then
  echo "ERROR: Python not found. Install Python 3.11 and rerun."
  exit 1
fi

echo "Python found at: $PYTHON_PATH"
gcloud config set core/python_path "$PYTHON_PATH"

echo ""
echo "=== STEP 2: Verify gcloud installation ==="
gcloud info

echo ""
echo "=== STEP 3: Create Artifact Bucket (if missing) ==="
gsutil mb -l $REGION gs://$BUCKET || echo "Bucket already exists, continuing..."

echo ""
echo "=== STEP 4: Grant IAM Roles to Service Account ==="

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/composer.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/dataflow.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/cloudbuild.builds.editor"

echo ""
echo "=== STEP 5: Create Composer Environment (Airflow Scheduler) ==="

gcloud composer environments create primordia-env \
  --location $REGION \
  --image-version composer-3.0.0-airflow-2.6.3 \
  --service-account $SERVICE_ACCOUNT || echo "Composer environment may already exist."

echo ""
echo "=== STEP 6: Build Dataflow Template ==="

gcloud dataflow flex-template build gs://$BUCKET/templates/primordia-pipeline.json \
  --image gcr.io/$PROJECT_ID/primordia-pipeline:latest \
  --sdk-language PYTHON

echo ""
echo "=== STEP 7: Run Dataflow Pipeline ==="

gcloud dataflow flex-template run primordia-pipeline \
  --template-file-gcs-location gs://$BUCKET/templates/primordia-pipeline.json \
  --region $REGION

echo ""
echo "=== PrimordiaOS GCP Bootstrap Complete ==="

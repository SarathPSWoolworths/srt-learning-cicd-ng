# Deployment Guide

This document provides detailed instructions for deploying the SrtLearning application across all environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Workflows](#deployment-workflows)
- [Platform Configuration](#platform-configuration)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Prerequisites

### GitHub Repository Configuration

Before deploying, ensure your GitHub repository is properly configured:

1. **GitHub Actions enabled**
2. **GitHub Pages enabled** (Settings → Pages → Source: GitHub Actions)
3. **Environments created** (Settings → Environments)

### Required Environments

Create the following environments in your repository settings:

| Environment                | Purpose                        | Required Reviewers |
| -------------------------- | ------------------------------ | ------------------ |
| `DEV`                      | Development deployments        | None               |
| `UAT`                      | UAT deployments                | None               |
| `UAT-Approval`             | UAT approval gate              | QA Team            |
| `PROD`                     | Production deployments         | None               |
| `PROD-QA-Approval`         | Production QA approval         | QA Team            |
| `PROD-Management-Approval` | Production management approval | Management Team    |

### Setting Up Required Reviewers

1. Go to **Settings** → **Environments**
2. Click on the environment (e.g., `UAT-Approval`)
3. Check **Required reviewers**
4. Add team members or teams as reviewers
5. Click **Save protection rules**

## Environment Setup

### DEV Environment

DEV deployment is fully automatic:

- Triggers on every merge to `main` branch
- No approvals required
- Deploys to GitHub Pages automatically

### UAT Environment

UAT deployment requires manual trigger and QA approval:

1. **Navigate to Actions**

   - Go to your repository → Actions tab
   - Select "🧪 Deploy to UAT"

2. **Run Workflow**

   - Click "Run workflow"
   - Enter the version tag to deploy
   - Click "Run workflow"

3. **Approval Process**

   - QA team members will receive notification
   - Reviewer goes to Actions → pending deployments
   - Review and approve/reject

4. **Monitoring**
   - Watch the workflow progress
   - Check deployment summary when complete

### PROD Environment

Production deployment requires manual trigger with multiple approvals:

1. **Pre-requisites**

   - Version must be tested in UAT
   - Change ticket created
   - Rollback plan documented

2. **Navigate to Actions**

   - Go to your repository → Actions tab
   - Select "🚀 Deploy to PROD"

3. **Fill Deployment Details**

   - **Version tag**: Enter the UAT-tested version
   - **Change ticket**: Enter ticket number (e.g., `CHG-12345`)
   - **Deployment window**: Select appropriate window
   - **Rollback plan**: Confirm checkbox

4. **Approval Process**

   - First: QA team approval
   - Second: Management team approval
   - Both must approve for deployment to proceed

5. **Post-Deployment**
   - Automated health checks run
   - GitHub release is created
   - Deployment summary generated

## Deployment Workflows

### CI/CD Pipeline Flow

```
Push to main → Build & Test → Deploy DEV → Create Version Tag
                    ↓
            Manual Trigger (with version)
                    ↓
         QA Approval → Build UAT → Deploy UAT
                    ↓
            Manual Trigger (with version + change ticket)
                    ↓
    QA Approval → Management Approval → Build PROD → Deploy PROD → Create Release
```

### Version Tag Format

Versions are automatically created with the following format:

```
<base-version>-build.<commit-count>+<short-sha>
```

Example: `1.0.0-build.42+abc1234`

### Finding Version Tags

To deploy to UAT or PROD, you need a version tag:

1. **GitHub UI**: Go to repository → Releases → Find tag
2. **Command Line**: `git tag -l | grep "v1.0"`
3. **Actions**: Check the "Create Version Tag" job output

## Platform Configuration

### GitHub Pages (Default)

Current configuration uses GitHub Pages:

```yaml
env:
  DEPLOYMENT_PLATFORM: 'github-pages'
```

### Switching to Google Cloud Platform (GCP)

#### Step 1: Update Workflow Configuration

In all workflow files (`.github/workflows/*.yml`), change:

```yaml
env:
  DEPLOYMENT_PLATFORM: 'gcp'
```

#### Step 2: Create GCP Resources

1. **Create GCP Project** (or use existing)
2. **Create Cloud Storage Buckets**:

   - `srtlearning-dev` (DEV)
   - `srtlearning-uat` (UAT)
   - `srtlearning-prod` (PROD)

3. **Configure Buckets for Static Website Hosting**:

   ```bash
   gsutil web set -m index.html -e index.html gs://BUCKET_NAME
   gsutil iam ch allUsers:objectViewer gs://BUCKET_NAME
   ```

4. **Create Service Account**:

   ```bash
   gcloud iam service-accounts create github-actions \
     --display-name="GitHub Actions Deployer"

   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.objectAdmin"
   ```

5. **Create Service Account Key**:
   ```bash
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions@PROJECT_ID.iam.gserviceaccount.com
   ```

#### Step 3: Configure GitHub Secrets

Add the following secrets to your repository:

| Secret            | Description                         |
| ----------------- | ----------------------------------- |
| `GCP_SA_KEY`      | Service account key JSON (DEV/UAT)  |
| `GCP_SA_KEY_PROD` | Production service account key JSON |

Add the following variables:

| Variable          | Example Value      |
| ----------------- | ------------------ |
| `GCP_BUCKET_DEV`  | `srtlearning-dev`  |
| `GCP_BUCKET_UAT`  | `srtlearning-uat`  |
| `GCP_BUCKET_PROD` | `srtlearning-prod` |

#### Step 4: Update Environment Files

Update `src/environments/environment.*.ts` files:

```typescript
deployment: {
  platform: 'gcp',
  baseHref: '/',
  cdnUrl: 'https://storage.googleapis.com/BUCKET_NAME/'
}
```

#### Step 5: Uncomment GCP Deployment Steps

In workflow files, uncomment the GCP deployment sections:

```yaml
- name: 🌐 Deploy to GCP
  if: env.DEPLOYMENT_PLATFORM == 'gcp'
  run: |
    echo '${{ secrets.GCP_SA_KEY }}' > key.json
    gcloud auth activate-service-account --key-file=key.json
    gsutil -m rsync -d -r dist gs://${{ vars.GCP_BUCKET_DEV }}
```

## Troubleshooting

### Common Issues

#### Build Fails

- Check Node.js version (requires 20.x)
- Verify `npm ci` runs successfully locally
- Check for TypeScript errors

#### Deployment Pending Approval

- Reviewers need to check pending deployments
- Go to Actions → Deployment → Review pending deployments

#### Version Tag Not Found

- Ensure the tag was created successfully
- Check if tag format is correct (with or without 'v' prefix)
- Run `git fetch --tags` locally to sync

#### GitHub Pages 404

- Verify GitHub Pages is enabled
- Check base-href matches repository name
- Wait 2-5 minutes for propagation

### Logs and Debugging

1. **View Workflow Logs**:

   - Actions → Select workflow run → Click job → View logs

2. **Download Artifacts**:

   - Actions → Select workflow run → Artifacts section

3. **Check Deployment Status**:
   - Environments page shows deployment history

## Rollback Procedures

### Quick Rollback (GitHub Pages)

1. Go to Actions → "🚀 Deploy to PROD"
2. Enter the previous stable version tag
3. Follow normal approval process
4. Wait for deployment

### Emergency Rollback

For critical issues requiring immediate rollback:

1. **Revert the Commit**:

   ```bash
   git revert HEAD
   git push origin main
   ```

2. **This triggers automatic DEV deployment**

3. **For UAT/PROD**: Run deployment workflow with previous stable version

### Manual Rollback (GCP)

If using GCP, you can also:

```bash
# Copy previous version from backup
gsutil -m rsync -r gs://BUCKET_NAME-backup gs://BUCKET_NAME

# Or restore from specific date
gsutil -m rsync -r "gs://BUCKET_NAME#TIMESTAMP" gs://BUCKET_NAME
```

## Security Considerations

1. **Secrets Management**

   - Never commit secrets to repository
   - Use GitHub Secrets for sensitive data
   - Rotate service account keys regularly

2. **Approval Process**

   - At least 2 reviewers for production
   - Document all approvals
   - Require change tickets for audit trail

3. **Access Control**
   - Limit who can trigger deployments
   - Use branch protection rules
   - Enable required reviews for PRs

## Support

For issues with deployment:

1. Check this documentation
2. Review workflow logs
3. Contact DevOps team
4. Create issue in repository

# SRT Learning CI/CD Angular (srt-learning-cicd-ng)

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/ci-cd-dev.yml/badge.svg)](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/ci-cd-dev.yml)
[![Deploy to UAT](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/deploy-uat.yml/badge.svg)](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/deploy-uat.yml)
[![Deploy to PROD](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/YOUR_USERNAME/srt-learning-cicd-ng/actions/workflows/deploy-prod.yml)

A professional Angular application demonstrating enterprise-grade CI/CD practices with multi-environment deployments and approval workflows.

## 🚀 Quick Start

```bash
npm install    # Install dependencies
npm start      # Start dev server at http://localhost:4200
npm test       # Run unit tests
npm run build  # Build for production
```

## 📋 Overview

This project demonstrates:
- ✅ **Auto DEV Deployment** - Deploys automatically on merge to main
- ✅ **Semantic Versioning** - Auto version bumping on each release
- ✅ **UAT Approval Gate** - QA team approval required
- ✅ **PROD Multi-Approval** - QA + Management approval required
- ✅ **Platform Flexibility** - GitHub Pages (configurable for GCP)

## 🏗️ CI/CD Pipeline

```
Merge to Main → Build & Test → Deploy DEV (auto) → Create Version Tag
                                      ↓
                        Manual Trigger + QA Approval
                                      ↓
                              Deploy UAT
                                      ↓
                   Manual Trigger + QA + Management Approval
                                      ↓
                         Deploy PROD → Create Release
```

## 📦 Environments

| Environment | Trigger | Approvals | URL |
|-------------|---------|-----------|-----|
| DEV | Auto (merge to main) | None | `https://<user>.github.io/srt-learning-cicd-ng/` |
| UAT | Manual | QA Team | `https://<user>.github.io/srt-learning-cicd-ng-uat/` |
| PROD | Manual | QA + Management | `https://<user>.github.io/srt-learning-cicd-ng/` |

## 🛠️ Technology Stack

- **Framework**: Angular 21+
- **Language**: TypeScript
- **Styling**: SCSS
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages (GCP ready)

## 📁 Project Structure

```
srt-learning-cicd-ng/
├── .github/workflows/
│   ├── ci-cd-dev.yml      # Build & deploy to DEV
│   ├── deploy-uat.yml     # Deploy to UAT (QA approval)
│   └── deploy-prod.yml    # Deploy to PROD (multi-approval)
├── src/
│   ├── app/               # Angular components
│   └── environments/      # Environment configs (dev/uat/prod)
├── docs/
│   └── DEPLOYMENT.md      # Detailed deployment guide
└── README.md
```

## ⚙️ GitHub Setup Required

1. **Enable GitHub Pages**: Settings → Pages → Source: GitHub Actions
2. **Create Environments** with reviewers:
   - `UAT-Approval` → QA team
   - `PROD-QA-Approval` → QA team
   - `PROD-Management-Approval` → Management

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed deployment instructions
- [Changelog](CHANGELOG.md) - Version history

## 📄 License

MIT License - see [LICENSE](LICENSE)

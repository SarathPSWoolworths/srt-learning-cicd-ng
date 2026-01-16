# SrtLearning - Angular Hello World with CI/CD Pipeline

## Project Overview
This is a professional Angular application with a comprehensive CI/CD pipeline that supports multi-environment deployments with approval workflows.

## Technology Stack
- **Framework**: Angular 17+
- **Language**: TypeScript
- **Styling**: SCSS
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages (configurable for GCP)

## Development Guidelines

### Code Standards
- Follow Angular style guide
- Use strict TypeScript configuration
- Implement proper error handling
- Write meaningful commit messages following Conventional Commits

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development integration branch
- `feature/*`: Feature branches
- `hotfix/*`: Emergency fixes

### Deployment Environments
1. **DEV**: Automatic deployment on merge to main
2. **UAT**: Requires QA team approval
3. **PROD**: Requires QA + Management approval

## Commands

```bash
# Development
npm start           # Start dev server
npm run build       # Build for production
npm run test        # Run unit tests
npm run lint        # Run linting

# Deployment (handled by CI/CD)
npm run build:dev   # Build for DEV environment
npm run build:uat   # Build for UAT environment
npm run build:prod  # Build for PROD environment
```

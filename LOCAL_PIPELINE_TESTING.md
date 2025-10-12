# Local Pipeline Testing Guide

This guide helps you test your CI/CD pipelines locally before pushing to GitHub.

## Quick Start

### Method 1: Using the Test Script (Recommended)

```bash
# Test both API and mobile pipelines
./test-pipelines-locally.sh

# Test only API pipeline
./test-pipelines-locally.sh --api-only

# Test only mobile pipeline
./test-pipelines-locally.sh --mobile-only

# Verbose output (see all command details)
./test-pipelines-locally.sh --verbose

# Skip dependency installation (faster re-runs)
./test-pipelines-locally.sh --skip-deps
```

### Method 2: Using npm Scripts

```bash
# Install root dependencies first
npm install

# Test complete pipeline
npm run test:pipeline

# Test individual components
npm run test:pipeline:api
npm run test:pipeline:mobile

# Quick tests (skip dependency installation)
npm run test:pipeline:quick

# Simulate CI environment
npm run ci:simulate
```

### Method 3: Manual Testing

```bash
# API Pipeline Steps
cd api
npm install
npx tsc --noEmit        # Type checking
npm run test:ci         # Unit tests
npm run build           # Build
npm run lint            # Linting (if available)

# Mobile Pipeline Steps
cd ../moovSafe-mobile
pnpm install
pnpm run check          # Code quality checks
npx tsc --noEmit        # Type checking
pnpm run build          # Build (if available)
```

## What Each Pipeline Tests

### API Pipeline (`fullstack-ci-cd.yml` & `genezio-deploy.yml`)

- ✅ **Dependencies**: Install npm packages
- ✅ **Type Checking**: TypeScript compilation without output
- ✅ **Unit Tests**: Jest test suite execution
- ✅ **Build**: Production build creation
- ✅ **Linting**: Code style and quality checks
- ✅ **Coverage**: Test coverage reporting

### Mobile Pipeline (`fullstack-ci-cd.yml`)

- ✅ **Dependencies**: Install pnpm packages
- ✅ **Code Quality**: Biome checks (lint + format)
- ✅ **Type Checking**: TypeScript validation
- ✅ **Configuration**: Expo setup validation
- ✅ **Build**: React Native compilation (simulated)

## Pipeline Triggers (GitHub)

### Full Stack Pipeline

- **Triggers**: Push/PR to `main` or `develop`
- **Paths**: Changes to `api/**` or `moovSafe-mobile/**`
- **Actions**:
  - Quality checks for changed components
  - Deploy API to production (main branch)
  - Build mobile app (main branch)
  - Preview builds (PR branches)

### API-Only Pipeline

- **Triggers**: Push/PR to `main` or `develop`
- **Paths**: Changes to `api/**` only
- **Actions**:
  - Quality checks and testing
  - Deploy to Genezio (main branch)

## Local Testing Scenarios

### Before Creating a PR

```bash
# Full pipeline test
npm run test:pipeline:verbose

# Check what will be tested
npm run quality:all
```

### After Making API Changes

```bash
npm run test:pipeline:api
# or
cd api && npm run test:ci && npx tsc --noEmit && npm run build
```

### After Making Mobile Changes

```bash
npm run test:pipeline:mobile
# or
cd moovSafe-mobile && pnpm run check && npx tsc --noEmit
```

### Quick Validation (No Dependency Install)

```bash
npm run test:pipeline:quick
```

## Troubleshooting

### Script Permission Issues

```bash
chmod +x test-pipelines-locally.sh
```

### Missing Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
npm run install:api
npm run install:mobile
```

### TypeScript Errors

```bash
# Check API types
npm run type-check:api

# Check mobile types
npm run type-check:mobile
```

### Test Failures

```bash
# Run API tests with details
cd api && npm test

# Check test coverage
cd api && npm run test:coverage
```

### Build Issues

```bash
# Test API build
npm run build:api

# Check for build errors
cd api && npm run build -- --verbose
```

## Environment Requirements

### Required Tools

- **Node.js**: >= 18.0.0
- **npm**: Latest version
- **pnpm**: Auto-installed if missing

### Optional Tools (for deployment simulation)

- **Genezio CLI**: For API deployment testing
- **Expo CLI**: For mobile build testing
- **EAS CLI**: For production mobile builds

## Pipeline Comparison

| Step           | GitHub Action      | Local Test | Command                              |
| -------------- | ------------------ | ---------- | ------------------------------------ |
| API Install    | `npm install`      | ✅         | `cd api && npm install`              |
| API Type Check | `npx tsc --noEmit` | ✅         | `npm run type-check:api`             |
| API Tests      | `npm run test:ci`  | ✅         | `npm run test:api:ci`                |
| API Build      | `npm run build`    | ✅         | `npm run build:api`                  |
| API Deploy     | `genezio deploy`   | ❌         | Requires Genezio setup               |
| Mobile Install | `pnpm install`     | ✅         | `cd moovSafe-mobile && pnpm install` |
| Mobile Quality | `pnpm run check`   | ✅         | `npm run check:mobile`               |
| Mobile Build   | `eas build`        | ❌         | Requires EAS setup                   |

## Advanced Usage

### Custom Test Scenarios

```bash
# Test specific components
./test-pipelines-locally.sh --api-only --verbose

# Simulate CI environment (no interactive prompts)
CI=true npm run ci:simulate

# Test with different Node versions (using nvm)
nvm use 18 && npm run test:pipeline
nvm use 20 && npm run test:pipeline
```

### Integration with Git Hooks

Add to `.git/hooks/pre-push`:

```bash
#!/bin/bash
./test-pipelines-locally.sh --skip-deps
```

### VS Code Integration

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Test Pipeline",
      "type": "shell",
      "command": "./test-pipelines-locally.sh",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

## Success Indicators

### ✅ API Pipeline Success

```
[SUCCESS] TypeScript type checking passed
[SUCCESS] Unit tests passed
[SUCCESS] API build completed
[SUCCESS] API linting passed
```

### ✅ Mobile Pipeline Success

```
[SUCCESS] Mobile dependencies installed
[SUCCESS] Mobile TypeScript checking passed
[SUCCESS] Mobile quality check completed
[SUCCESS] Expo configuration found
```

### ❌ Common Failure Points

- TypeScript compilation errors
- Test failures
- Linting/formatting issues
- Missing dependencies
- Build configuration problems

## Next Steps

1. **Run your first test**: `./test-pipelines-locally.sh`
2. **Fix any issues** found during local testing
3. **Commit and push** with confidence
4. **Monitor GitHub Actions** for actual pipeline execution
5. **Iterate** based on any remaining CI/CD issues

Remember: Local testing catches most issues early, but some environment-specific problems may only appear in the actual CI/CD environment.

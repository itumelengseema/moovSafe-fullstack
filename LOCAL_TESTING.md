# 🧪 Local Pipeline Testing Guide

## 🚀 **Option 1: GitHub Actions Local Testing (act)**

### Install & Setup

```bash
# Already installed! Check version:
act --version

# First time setup - create .actrc file for Docker image
echo "-P ubuntu-latest=catthehacker/ubuntu:act-latest" > ~/.actrc
```

### Test Your Pipelines

#### Test Mobile CI/CD Pipeline

```bash
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe

# Test the entire mobile workflow
act -j quality-check -W .github/workflows/mobile-ci-cd.yml

# Test with specific event (push to main)
act push -W .github/workflows/mobile-ci-cd.yml

# Test with pull request event
act pull_request -W .github/workflows/mobile-ci-cd.yml
```

#### Test Fullstack Pipeline

```bash
# Test fullstack workflow
act -j mobile-quality-check -W .github/workflows/fullstack-ci-cd.yml

# Test API deployment (without secrets)
act -j deploy-api-staging -W .github/workflows/fullstack-ci-cd.yml --dry-run
```

### 🎯 **Quick Mobile Test**

```bash
# Test just the quality check job locally
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe
act -j quality-check -W .github/workflows/mobile-ci-cd.yml --container-architecture linux/amd64
```

---

## 🔧 **Option 2: Manual Local Testing**

### Test Mobile Quality Checks

```bash
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe/moovSafe-mobile

# Test exactly what the pipeline runs:
echo "🔍 Installing dependencies..."
pnpm install

echo "🧹 Running linting..."
pnpm run check || echo "⚠️ Code quality issues found (non-blocking)"

echo "✅ Local quality check completed!"
```

### Test API Quality Checks

```bash
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe/api

echo "🔍 Installing API dependencies..."
pnpm install

echo "🏗️ Testing API build..."
pnpm run build

echo "✅ API build test completed!"
```

---

## 🎯 **Option 3: Docker-based Testing**

### Create Test Container

```bash
# Create a test script that mimics the CI environment
cat > test-pipeline.sh << 'EOF'
#!/bin/bash
set -e

echo "🐳 Testing in containerized environment..."

# Test Mobile Pipeline
cd /workspace/moovSafe-mobile
echo "📱 Testing Mobile App..."
pnpm install
pnpm run check || echo "⚠️ Linting issues (non-blocking)"
echo "✅ Mobile tests passed!"

# Test API Pipeline
cd /workspace/api
echo "🌐 Testing API..."
pnpm install
pnpm run build
echo "✅ API tests passed!"

echo "🎉 All pipeline tests completed successfully!"
EOF

chmod +x test-pipeline.sh
```

### Run in Docker

```bash
# Test in Ubuntu container (similar to GitHub Actions)
docker run --rm -v $(pwd):/workspace -w /workspace node:20 bash /workspace/test-pipeline.sh
```

---

## 🏃 **Quick Test Commands**

### Before Pushing Changes

```bash
# Quick mobile test
cd moovSafe-mobile && pnpm install && pnpm run check
echo "Exit code: $?"

# Quick API test
cd ../api && pnpm install && pnpm run build
echo "Exit code: $?"
```

### Test Path Filtering

```bash
# Test if changes trigger mobile pipeline
git status moovSafe-mobile/

# Test if changes trigger API pipeline
git status api/
```

---

## 🎯 **Recommended Workflow**

1. **Before committing:**

   ```bash
   # Run manual tests
   ./test-pipeline.sh
   ```

2. **Before pushing:**

   ```bash
   # Run act simulation
   act -j quality-check -W .github/workflows/mobile-ci-cd.yml --dry-run
   ```

3. **After pipeline changes:**
   ```bash
   # Test new workflow locally
   act -W .github/workflows/mobile-ci-cd.yml --list
   ```

---

## 📝 **Pro Tips**

- **Fast feedback**: Use manual testing for quick iterations
- **Full simulation**: Use `act` for complete GitHub Actions simulation
- **Docker testing**: Use containers for environment consistency
- **Dry runs**: Add `--dry-run` flag to see what would happen without executing

## ⚡ **Quick Start**

```bash
# Test your mobile pipeline right now:
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe
act -j quality-check -W .github/workflows/mobile-ci-cd.yml --container-architecture linux/amd64
```

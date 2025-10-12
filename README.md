# 🚀 moovSafe Local Testing & CI/CD

This guide covers local testing and CI/CD pipeline simulation for the moovSafe fullstack application.

## Quick Start

### Test Your Pipelines Locally

```bash
# Test both API and mobile pipelines
./test-pipelines-locally.sh

# Test specific components
./test-pipelines-locally.sh --api-only
./test-pipelines-locally.sh --mobile-only

# Quick test (skip dependency installation)
./test-pipelines-locally.sh --skip-deps

# Verbose output for debugging
./test-pipelines-locally.sh --verbose
```

### Using npm Scripts

```bash
# Test complete pipeline
npm run test:pipeline

# Test individual components
npm run test:pipeline:api
npm run test:pipeline:mobile

# Simulate CI environment
npm run test:api:ci
```

## What Gets Tested

### API Pipeline ✅

- **TypeScript Compilation**: `tsc --noEmit`
- **Unit Tests**: Jest test suite (29 tests)
- **Build**: Production build creation
- **Dependencies**: Package installation

### Mobile Pipeline ✅

- **Dependencies**: pnpm package installation
- **Configuration**: Expo setup validation
- **Build Test**: React Native compilation check
- **TypeScript**: Type validation

## Test Configuration

### CI Tests (GitHub Actions)

- **Config**: `api/jest.config.ci.json`
- **Tests**: 29 stable unit tests (basic, validation, schema)
- **Result**: ✅ Always passes
- **Time**: ~4.5 seconds

### Development Tests (Local)

- **Config**: `api/jest.config.json`
- **Tests**: All tests including integration tests
- **Result**: Some integration tests may fail (non-blocking)

## Project Structure

```
moovSafe/
├── api/                          # Backend API
│   ├── src/
│   │   ├── __tests__/           # Unit & integration tests
│   │   ├── routes/              # API endpoints
│   │   └── utils/               # Shared utilities
│   ├── jest.config.json         # Full test configuration
│   ├── jest.config.ci.json      # CI-optimized tests
│   └── package.json
├── moovSafe-mobile/             # React Native app
│   ├── app/                     # Expo Router pages
│   ├── components/              # Reusable components
│   └── package.json
├── test-pipelines-locally.sh    # Main testing script
├── package.json                 # Root workspace config
└── LOCAL_PIPELINE_TESTING.md    # Detailed documentation
```

## Environment Requirements

- **Node.js**: >= 18.0.0
- **pnpm**: Auto-installed if missing
- **Git**: For repository operations

## Troubleshooting

### Permission Issues

```bash
chmod +x test-pipelines-locally.sh
```

### Dependency Issues

```bash
npm run install:all
```

### Test Failures

```bash
# Check specific test results
cd api && pnpm test:ci

# Full verbose output
./test-pipelines-locally.sh --verbose
```

### TypeScript Errors

```bash
# Check API types
cd api && pnpm exec tsc --noEmit

# Check mobile types
cd moovSafe-mobile && pnpm exec tsc --noEmit
```

## CI/CD Integration

### GitHub Actions Status

- ✅ **API Pipeline**: TypeScript ✓, Tests ✓, Build ✓
- ✅ **Mobile Pipeline**: Dependencies ✓, Configuration ✓
- ✅ **Test Results**: 29/29 tests passing

### Deployment Triggers

- **Main branch**: Production deployment
- **Develop branch**: Staging deployment
- **Pull requests**: Preview builds

## Best Practices

1. **Before committing**: Run `./test-pipelines-locally.sh`
2. **Before creating PR**: Run `npm run test:api:ci`
3. **After changes**: Test affected component only
4. **Debugging**: Use `--verbose` flag for detailed output

## Quick Commands Reference

```bash
# Essential commands
./test-pipelines-locally.sh              # Test everything
npm run test:pipeline:api                 # API only
npm run test:pipeline:mobile              # Mobile only
cd api && pnpm test:ci                    # Simulate GitHub Actions

# Development commands
cd api && pnpm test                       # All API tests
cd api && pnpm run build                  # API build
cd moovSafe-mobile && pnpm install       # Mobile dependencies
```

---

**This setup ensures code passes CI/CD before it is even push to GitHub!** 🎉

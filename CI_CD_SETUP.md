# MoovSafe CI/CD Pipeline Documentation

This repository now includes comprehensive CI/CD pipelines for both the backend API and the React Native mobile application.

## 🚀 Available Workflows

### 1. Backend API CI/CD (`genezio-deploy.yml`)

- **Triggers**: Push/PR to `main` or `develop` branches when `api/**` files change
- **Ignores**: README files, documentation, .gitignore
- **Features**:
  - Quality checks (TypeScript, linting, building)
  - Staging deployment for PRs
  - Production deployment for main branch

### 2. Mobile App CI/CD (`mobile-ci-cd.yml`)

- **Triggers**: Push/PR to `main` or `develop` branches when `moovSafe-mobile/**` files change
- **Ignores**: README files, documentation, .gitignore
- **Features**:
  - Quality checks (TypeScript, Biome linting, Expo prebuild)
  - EAS Build for preview/production
  - Optional APK build for testing
  - Artifact uploads

### 3. Test Path Filtering (`test-path-filtering.yml`)

- **Triggers**: Any push to help debug which workflows should run
- **Features**:
  - Shows which files changed
  - Indicates which workflows would trigger
  - Helps debug path filtering issues

## 🔧 Setup Requirements

### 1. GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

#### For Backend API:

```
GENEZIO_TOKEN=your_genezio_token_here
```

#### For Mobile App:

```
EXPO_TOKEN=your_expo_access_token_here
```

#### Optional (for app store submissions):

```
APPLE_ID=your_apple_id
APPLE_ID_PASSWORD=your_app_specific_password
GOOGLE_SERVICE_ACCOUNT_KEY=your_google_play_service_account_json
```

### 2. Get Required Tokens

#### Genezio Token:

1. Log in to [Genezio Dashboard](https://genez.io)
2. Go to Settings > Access Tokens
3. Generate a new token
4. Add it as `GENEZIO_TOKEN` in GitHub secrets

#### Expo Token:

1. Install Expo CLI: `npm install -g @expo/cli`
2. Login: `expo login`
3. Generate token: `expo whoami --access-token`
4. Add it as `EXPO_TOKEN` in GitHub secrets

### 3. EAS Configuration

Your `eas.json` is already configured, but you can customize build profiles:

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

## 🔄 Workflow Behavior

### For Pull Requests:

1. **Quality checks** run for changed components (API/Mobile)
2. **Preview builds** are created:
   - API: Deployed to staging environment
   - Mobile: EAS preview build + APK artifact

### For Main Branch:

1. **Quality checks** run for changed components
2. **Production deployments**:
   - API: Deployed to production via Genezio
   - Mobile: Production EAS build (ready for app store submission)

## 📱 Mobile App Deployment Options

### Option 1: EAS Build (Recommended)

- Cloud-based building
- Handles iOS and Android
- Automatic signing and provisioning
- Built-in distribution

### Option 2: Self-hosted APK Build

- Builds APK directly in GitHub Actions
- Good for testing and internal distribution
- Faster for Android-only deployments

### Option 3: App Store Auto-submission

Uncomment the submission steps in the workflow to automatically submit to app stores:

```yaml
- name: Submit to App Store
  working-directory: ./moovSafe-mobile
  run: eas submit --platform ios --non-interactive
  if: success()

- name: Submit to Google Play
  working-directory: ./moovSafe-mobile
  run: eas submit --platform android --non-interactive
  if: success()
```

## 🛠 Customization

### Adding Tests

Add test steps to quality checks:

```yaml
- name: Run tests
  working-directory: ./moovSafe-mobile
  run: pnpm test
```

### Environment Variables

Add environment-specific variables:

```yaml
- name: Build with environment
  working-directory: ./moovSafe-mobile
  run: eas build --profile production
  env:
    API_URL: ${{ secrets.PRODUCTION_API_URL }}
    ENVIRONMENT: production
```

### Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify deployment
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 📊 Monitoring Builds

### EAS Dashboard

- View build progress: [EAS Dashboard](https://expo.dev/builds)
- Download builds directly from dashboard
- Monitor build logs and errors

### GitHub Actions

- View workflow runs in `Actions` tab
- Download APK artifacts from successful runs
- Monitor deployment status and logs

## 🚨 Troubleshooting

### Common Issues:

1. **Missing secrets**: Ensure all required tokens are added to GitHub secrets
2. **Build failures**: Check Expo/EAS configuration and dependencies
3. **Permission errors**: Verify Genezio and Expo account permissions
4. **Path issues**: Ensure working directories match your project structure

### Debug Commands:

```bash
# Test EAS build locally
cd moovSafe-mobile
eas build --platform android --profile preview --local

# Test Genezio deployment locally
cd api
genezio deploy --stage staging
```

## 📝 Best Practices

1. **Branch Protection**: Enable branch protection rules requiring CI checks
2. **Environment Isolation**: Use different stages for staging/production
3. **Version Management**: Let EAS handle version increments automatically
4. **Secret Management**: Rotate tokens regularly and use least-privilege access
5. **Build Optimization**: Cache dependencies and use appropriate build profiles

## 🔄 Migration from Single Workflow

The new setup provides better:

- **Parallel processing**: API and mobile builds run simultaneously
- **Smart triggers**: Only builds what changed
- **Better isolation**: Separate concerns for different components
- **Scalability**: Easy to add more services/apps

You can safely delete old workflows once you've tested the new ones.

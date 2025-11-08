<div align="center">
  <img src="./assets/logoBurna.png" alt="MoovSafe Logo" width="1584" >

  <h3>Complete Vehicle Fleet Management & Inspection System</h3>
  <p><em>Streamline vehicle inspections, track maintenance, and ensure fleet safety with ease</em></p>

  <p>
    <a href="https://github.com/itumelengseema/moovSafe-fullstack/actions/workflows/fullstack-ci-cd.yml">
      <img src="https://github.com/itumelengseema/moovSafe-fullstack/actions/workflows/fullstack-ci-cd.yml/badge.svg" alt="CI/CD Pipeline"/>
    </a>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  </p>
</div>

---

## 📱 App Preview

<div align="center">
  <img src="https://res.cloudinary.com/dm5v9praz/image/upload/v1760537979/logoWhite_kfp8tb.svg" alt="Dashboard Preview" width="300" style="margin: 10px;">
  <img src="/assets/mobile-preview.png" alt="Mobile App View" width="300" style="margin: 10px;">
  
  *Dashboard Overview & Mobile Interface*
</div>

---

## 🧭 About the Project

**MoovSafe** is a comprehensive full-stack vehicle fleet management solution designed to streamline vehicle inspections, maintenance tracking, and safety compliance. Built for modern fleet operators, individual vehicle owners, and maintenance professionals, MoovSafe combines powerful backend APIs with an intuitive mobile interface to deliver a complete vehicle management ecosystem.

The platform enables users to conduct detailed vehicle inspections, track maintenance history, manage fleet operations, and ensure regulatory compliance through automated reporting and alerts.

---

## ✨ Features

### 🔍 **Comprehensive Vehicle Inspections**

- **Digital Inspection Forms** - Complete exterior, interior, and safety checks
- **Photo Documentation** - Capture fault images and odometer readings
- **Condition Assessment** - Rate overall vehicle condition (Good/Fair/Poor)
- **Safety Compliance** - Track fire extinguisher, tools, and emergency equipment

### 🔧 **Maintenance Management**

- **Service History** - Complete maintenance records with receipts and photos
- **DIY vs Workshop** - Track both self-performed and professional services
- **Cost Tracking** - Monitor maintenance expenses and budgets
- **Next Service Alerts** - Automated reminders based on mileage and time

### 🚛 **Fleet Operations**

- **Vehicle Registration** - Add and manage multiple vehicles
- **License Plate Management** - Quick vehicle identification and lookup
- **Fleet Overview** - Dashboard with key metrics and alerts
- **Reporting System** - Generate inspection and maintenance reports

### 📊 **Analytics & Insights**

- **Maintenance Costs** - Track spending patterns across fleet
- **Inspection Trends** - Identify recurring issues and patterns
- **Fleet Performance** - Monitor vehicle utilization and condition
- **Compliance Reporting** - Ensure regulatory requirements are met

---

## 🧰 Tech Stack

### **Backend (API)**

- **Runtime:** Node.js 20.x with TypeScript
- **Framework:** Express.js with modern ES modules
- **Database:** PostgreSQL with Drizzle ORM
- **Validation:** Zod schema validation
- **File Storage:** Cloudinary for image management
- **Testing:** Jest with SuperTest (29 unit tests)
- **Deployment:** Genezio serverless platform

### **Mobile App**

- **Framework:** React Native with Expo Router 6
- **UI Library:** Gluestack UI with NativeWind (Tailwind CSS)
- **State Management:** Zustand + TanStack Query
- **Navigation:** Expo Router with tab-based navigation
- **Animations:** React Native Reanimated & Legend Motion
- **Form Handling:** React Hook Form with validation

### **DevOps & CI/CD**

- **Package Manager:** pnpm for fast, efficient installs
- **Code Quality:** Biome (ESLint + Prettier replacement)
- **Testing:** Jest for unit tests, TypeScript strict mode
- **CI/CD:** GitHub Actions with multi-environment deployment
- **Database:** Drizzle migrations with PostgreSQL (Neon)

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    Mobile[📱 React Native Mobile App] --> API[🔧 Express.js API Server]
    API --> DB[(🗄️ PostgreSQL Database)]
    API --> Cloud[☁️ Cloudinary Storage]

    subgraph "Backend Services"
        API --> Vehicle[Vehicle Management]
        API --> Inspection[Inspection System]
        API --> Maintenance[Maintenance Tracking]
    end

    subgraph "Mobile Features"
        Mobile --> Dashboard[Dashboard]
        Mobile --> Forms[Inspection Forms]
        Mobile --> Reports[Report Generation]
    end

    subgraph "Data Layer"
        DB --> VehicleData[Vehicle Records]
        DB --> InspectionData[Inspection History]
        DB --> MaintenanceData[Maintenance Records]
    end
```

### **Data Flow:**

1. **Mobile App** captures inspection/maintenance data
2. **API Server** validates and processes requests
3. **Database** stores structured vehicle records
4. **Cloud Storage** handles photos and documents
5. **Real-time Updates** sync across all interfaces

---

## ⚙️ Installation & Setup

### **Prerequisites**

- Node.js 20.x or later
- pnpm 9.x or later
- Expo CLI
- PostgreSQL database (local or cloud)

### **1. Clone the Repository**

```bash
git clone https://github.com/itumelengseema/moovSafe-fullstack.git
cd moovSafe-fullstack
```

### **2. Backend Setup**

```bash
# Navigate to API directory
cd api

# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Generate database schema
pnpm run db:generate

# Run database migrations
pnpm run db:migrate

# Start development server
pnpm run dev
```

### **3. Mobile App Setup**

```bash
# Navigate to mobile directory
cd ../moovSafe-mobile

# Install dependencies
pnpm install

# Start Expo development server
pnpm start

# Run on specific platform
pnpm run android  # Android
pnpm run ios      # iOS
```

### **4. Database Studio (Optional)**

```bash
# Open Drizzle Studio for database management
cd api
pnpm run db:studio
```

---

## 🔐 Environment Variables

### **Backend API (.env)**

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/moovsafe"

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration (if implementing auth)
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="24h"
```

### **Mobile App**

```env
# API Endpoint
EXPO_PUBLIC_API_URL="http://localhost:3000"

# Environment
EXPO_PUBLIC_ENV="development"
```

---

## 🧪 Running & Testing

### **Development Servers**

```bash
# Start backend API (port 3000)
cd api && pnpm run dev

# Start mobile app
cd moovSafe-mobile && pnpm start
```

### **Testing**

```bash
# Run API tests
cd api
pnpm test                # Run all tests
pnpm run test:watch      # Watch mode
pnpm run test:coverage   # With coverage report
pnpm run test:ci         # CI-optimized tests (29 stable tests)

# Code quality checks
pnpm run lint            # ESLint
pnpm run prettier        # Format code

# Mobile app quality
cd moovSafe-mobile
pnpm run check          # Biome linting + formatting
pnpm run type-check     # TypeScript validation
```

### **API Documentation**

#### **🌐 Live Production API:**

- **📚 Interactive Swagger UI**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs
- **🏠 API Homepage**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io

#### **🔧 Local Development:**

- **📚 Local Swagger UI**: `http://localhost:3000/api-docs`
- **🏠 Local API**: `http://localhost:3000`
- **🗄️ Database Studio**: `http://localhost:4983`
- **📱 Mobile Development**: Expo DevTools

#### **Complete API Reference**

The MoovSafe API includes full OpenAPI 3.0 documentation with:

- **Interactive Testing** - Try all endpoints directly from the browser
- **Complete Schemas** - Detailed request/response models for all data types
- **File Upload Support** - Test image uploads for inspections and maintenance
- **Real-time Validation** - See parameter requirements and constraints
- **Example Requests** - Copy-paste ready code samples

**Quick Start (Local):**

```bash
cd api && pnpm run dev
# Visit http://localhost:3000/api-docs
```

**Live Production API:**

- **Try it now**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs
- **Test endpoints** directly in production environment
- **No setup required** - fully deployed and accessible

---

## 📸 App Screenshots

<div align="center">
  <img src="https://res.cloudinary.com/dm5v9praz/image/upload/v1760537979/logoWhite_kfp8tb.svg" alt="Fleet Dashboard" width="250" style="margin: 5px;">
  <img src="/assets/screenshots/inspection-form.png" alt="Inspection Form" width="250" style="margin: 5px;">
  <img src="/assets/screenshots/maintenance-log.png" alt="Maintenance Log" width="250" style="margin: 5px;">
  
  *Fleet Dashboard • Inspection Form • Maintenance Log*
</div>

<div align="center">
  <img src="/assets/screenshots/vehicle-details.png" alt="Vehicle Details" width="250" style="margin: 5px;">
  <img src="/assets/screenshots/reports.png" alt="Reports View" width="250" style="margin: 5px;">
  <img src="/assets/screenshots/alerts.png" alt="Maintenance Alerts" width="250" style="margin: 5px;">
  
  *Vehicle Details • Reports • Maintenance Alerts*
</div>

---

## 🚀 Deployment

### **Production Deployment**

**Backend API:**

- Deployed on [Genezio](https://genezio.com) serverless platform
- PostgreSQL database hosted on Neon
- Automated deployments via GitHub Actions
- Multi-stage deployment (staging → production)

**Mobile App:**

- Built with EAS Build for iOS/Android
- Distributed via Expo Application Services
- Over-the-air updates with Expo Updates

### **CI/CD Pipeline**

```yaml
# Automated workflows:
✅ Code Quality Checks (Biome, TypeScript)
✅ Unit Testing (Jest - 29 passing tests)
✅ Build Verification (API + Mobile)
✅ Deployment to Staging
✅ Production Deployment (on main branch)
```

### **Local Pipeline Testing**

### **Local Pipeline Testing**

```bash
# Test the entire CI/CD pipeline locally
./test-pipelines-locally.sh

# Test specific components
./test-pipelines-locally.sh --api-only
./test-pipelines-locally.sh --mobile-only
```

---

## 🗺️ Future Improvements

### **Planned Features**

- [ ] **User Authentication** - Multi-tenant support with role-based access
- [ ] **Real-time Notifications** - Push alerts for maintenance due dates
- [ ] **Offline Mode** - Conduct inspections without internet connectivity
- [ ] **Advanced Analytics** - Machine learning for predictive maintenance

### **Technical Enhancements**

- [ ] **Performance Monitoring** - APM integration with Sentry
- [ ] **API Rate Limiting** - Enhanced security and usage controls

---

## 👨‍💻 Author & License

**Developed by Itumeleng Seema**

Full-Stack Developer passionate about creating efficient, scalable solutions for real-world problems. MoovSafe represents a comprehensive approach to modern fleet management, combining robust backend architecture with intuitive mobile design.

### **Connect:**

- 💼 [LinkedIn](https://linkedin.com/in/itumelengseema)
- 🐙 [GitHub](https://github.com/itumelengseema)
- 📧 [Email](mailto:itumelengseema@outlook.com)

---

### **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>⭐ Star this repository if you find it helpful!</strong></p>
  <p><em>Built with ❤️ using TypeScript, React Native, and Node.js</em></p>
</div>

# Quick test (skip dependency installation)

./test-pipelines-locally.sh --skip-deps

# Verbose output for debugging

./test-pipelines-locally.sh --verbose

````

### Using npm Scripts

```bash
# Test complete pipeline
npm run test:pipeline

# Test individual components
npm run test:pipeline:api
npm run test:pipeline:mobile

# Simulate CI environment
npm run test:api:ci
````

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

# 🧪 API Testing Setup with Jest

## ✅ **What's Installed**

Your API now has a complete testing setup with:

- **Jest**: Testing framework
- **SuperTest**: HTTP assertion library for API testing
- **ts-jest**: TypeScript support for Jest
- **@types/jest**: TypeScript definitions

## 🏗️ **Project Structure**

```
api/
├── src/
│   ├── __tests__/
│   │   ├── setup.ts              # Test configuration
│   │   ├── helpers.ts            # Test utilities
│   │   ├── app.test.ts           # App integration tests
│   │   ├── vehicleController.test.ts    # Controller unit tests
│   │   ├── vehicleRoutes.test.ts        # Route integration tests
│   │   ├── validationMiddleware.test.ts # Middleware tests
│   │   └── vehicleSchema.test.ts        # Schema validation tests
│   ├── routes/
│   ├── middleware/
│   └── db/
├── jest.config.json             # Jest configuration
└── package.json                 # Updated with test scripts
```

## 🚀 **Available Test Commands**

```bash
# Run all tests
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run tests for CI/CD (no watch, with coverage)
pnpm test:ci
```

## 🧪 **Test Categories**

### **1. Unit Tests**

- **Vehicle Controller** (`vehicleController.test.ts`)
  - Tests individual controller functions
  - Mocks database interactions
  - Validates error handling

### **2. Integration Tests**

- **Vehicle Routes** (`vehicleRoutes.test.ts`)
  - Tests complete request/response cycle
  - Validates API endpoints
  - Tests middleware integration

### **3. Middleware Tests**

- **Validation Middleware** (`validationMiddleware.test.ts`)
  - Tests input validation
  - Tests error responses
  - Tests edge cases

### **4. Schema Tests**

- **Vehicle Schema** (`vehicleSchema.test.ts`)
  - Tests data validation rules
  - Tests field constraints
  - Tests optional/required fields

### **5. App Tests**

- **Main App** (`app.test.ts`)
  - Tests basic server functionality
  - Tests CORS headers
  - Tests 404 handling

## 🎯 **Test Examples**

### **Running Specific Tests**

```bash
# Test only vehicle controller
pnpm test vehicleController

# Test only routes
pnpm test Routes

# Test with specific pattern
pnpm test --testNamePattern="should create"
```

### **Coverage Reports**

```bash
# Generate HTML coverage report
pnpm test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

## 📊 **Coverage Goals**

Current test coverage targets:

- **Functions**: 80%+
- **Statements**: 85%+
- **Branches**: 75%+
- **Lines**: 85%+

## 🔧 **Test Configuration**

### **Environment Variables**

Tests use separate environment variables:

```bash
NODE_ENV=test
DATABASE_URL=postgresql://test:test@localhost:5432/moov_safe_test
```

### **Mocking Strategy**

- **Database**: Mocked with Jest functions
- **External APIs**: Mocked (Cloudinary, etc.)
- **Console logs**: Mocked to reduce test noise

## 🚦 **CI/CD Integration**

Tests are automatically run in your GitHub Actions pipeline:

1. **Install dependencies**
2. **Run unit tests** with coverage
3. **Upload coverage** to Codecov (optional)
4. **Type checking**
5. **Linting**
6. **Build**

## 🛠️ **Writing New Tests**

### **1. Controller Test Template**

```typescript
describe('New Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    mockRes = { status: statusMock, json: jsonMock };
    mockReq = {};

    jest.clearAllMocks();
  });

  it('should handle success case', async () => {
    // Test implementation
  });
});
```

### **2. Route Test Template**

```typescript
describe('New Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/new', newRouter);
  });

  it('should return data on GET request', async () => {
    const response = await request(app).get('/api/new').expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
```

## 📝 **Best Practices**

### **1. Test Naming**

- Use descriptive test names: `"should return 404 when vehicle not found"`
- Group related tests with `describe` blocks
- Use `beforeEach` for test setup

### **2. Assertions**

```typescript
// Good: Specific assertions
expect(response.status).toBe(200);
expect(response.body).toHaveProperty('id');

// Bad: Vague assertions
expect(response).toBeTruthy();
```

### **3. Mocking**

```typescript
// Mock database responses
mockDb.select.mockResolvedValueOnce([mockVehicle]);

// Mock error conditions
mockDb.insert.mockRejectedValueOnce(new Error('Database error'));
```

## 🚀 **Quick Test Run**

Test your setup right now:

```bash
cd /home/itumelengseema/Desktop/Workspace/ReactNative_Projects/moovSafe/api
pnpm test
```

## 📈 **Next Steps**

1. **Add more tests** for inspection and maintenance controllers
2. **Test edge cases** and error scenarios
3. **Integration tests** with real database (optional)
4. **Performance tests** for API endpoints
5. **Security tests** for validation and authentication

Your API testing setup is now **production-ready**! 🎉

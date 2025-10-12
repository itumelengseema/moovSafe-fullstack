// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/moov_safe_test';
process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
process.env.CLOUDINARY_API_KEY = 'test-key';
process.env.CLOUDINARY_API_SECRET = 'test-secret';

// Global test timeout (Jest will be available globally)
if (typeof jest !== 'undefined') {
    jest.setTimeout(10000);
}

// Mock console.log to reduce noise in tests (only in test environment)
if (typeof jest !== 'undefined') {
    global.console = {
        ...console,
        log: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    };

    // Clean up after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
}

import request from 'supertest';
import express from 'express';

/**
 * Test utilities for API testing
 */

export const createMockApp = () => {
    const app = express();
    app.use(express.json());
    return app;
};

export const mockRequest = (app: express.Application) => {
    return request(app);
};

// Mock vehicle data for testing
export const mockVehicle = {
    id: 'test-vehicle-123',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    vin: 'TEST123456789',
    licensePlate: 'ABC-123',
    color: 'Blue',
    mileage: 15000,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// Mock inspection data
export const mockInspection = {
    id: 'test-inspection-123',
    vehicleId: 'test-vehicle-123',
    inspectorName: 'John Doe',
    inspectionDate: new Date().toISOString(),
    status: 'completed',
    notes: 'All systems normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// Mock maintenance history data
export const mockMaintenanceHistory = {
    id: 'test-maintenance-123',
    vehicleId: 'test-vehicle-123',
    serviceType: 'Oil Change',
    serviceDate: new Date().toISOString(),
    cost: 49.99,
    description: 'Regular oil change service',
    serviceProvider: 'Quick Lube',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// Helper to create test database connection mock
export const createMockDb = () => ({
    query: jest.fn(),
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
});

// HTTP status codes for testing
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
} as const;

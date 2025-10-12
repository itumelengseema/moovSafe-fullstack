import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validationMiddleware';
import { HTTP_STATUS } from './helpers';

// Mock lodash
jest.mock('lodash', () => ({
    default: {
        isEmpty: jest.fn()
    }
}));

describe('Validation Middleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: jest.Mock<NextFunction>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        mockNext = jest.fn();

        mockRes = {
            status: statusMock,
            json: jsonMock
        };

        mockReq = {
            body: {},
            files: undefined
        };

        jest.clearAllMocks();
    });

    describe('validateData middleware', () => {
        const testSchema = z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().email('Invalid email format'),
            age: z.number().min(18, 'Must be at least 18 years old')
        });

        it('should validate valid data successfully', () => {
            const validData = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 25
            };

            mockReq.body = validData;

            const middleware = validateData(testSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockReq.cleanBody).toEqual(validData);
            expect(mockNext).toHaveBeenCalled();
            expect(statusMock).not.toHaveBeenCalled();
        });

        it('should reject invalid data with validation errors', () => {
            const invalidData = {
                name: '', // Invalid: empty string
                email: 'invalid-email', // Invalid: not email format
                age: 16 // Invalid: under 18
            };

            mockReq.body = invalidData;

            const middleware = validateData(testSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Invalid data',
                    details: expect.any(Array)
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle missing required fields', () => {
            mockReq.body = {}; // Empty body

            const middleware = validateData(testSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Invalid data'
                })
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle partial data validation', () => {
            const partialData = {
                name: 'John Doe',
                email: 'john@example.com'
                // Missing age
            };

            mockReq.body = partialData;

            const middleware = validateData(testSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Invalid data',
                    details: expect.any(Array)
                })
            );
        });

        it('should log validation process when files are present', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            mockReq.body = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 25
            };
            mockReq.files = { image: {} } as any;

            const middleware = validateData(testSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(consoleSpy).toHaveBeenCalledWith('Available files:', ['image']);
            consoleSpy.mockRestore();
        });

        it('should handle unexpected errors gracefully', () => {
            // Force an error by passing invalid schema
            const invalidSchema = null as any;

            const middleware = validateData(invalidSchema);

            expect(() => {
                middleware(mockReq as Request, mockRes as Response, mockNext);
            }).not.toThrow();

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        });
    });

    describe('Schema validation edge cases', () => {
        it('should handle string validation', () => {
            const stringSchema = z.object({
                text: z.string().min(5, 'Must be at least 5 characters')
            });

            mockReq.body = { text: 'Hi' }; // Too short

            const middleware = validateData(stringSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Invalid data',
                    details: expect.any(Array)
                })
            );
        });

        it('should handle number validation', () => {
            const numberSchema = z.object({
                count: z.number().positive('Must be positive')
            });

            mockReq.body = { count: -5 }; // Negative number

            const middleware = validateData(numberSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it('should handle optional fields correctly', () => {
            const optionalSchema = z.object({
                required: z.string(),
                optional: z.string().optional()
            });

            mockReq.body = { required: 'test' }; // Optional field missing

            const middleware = validateData(optionalSchema);
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockReq.cleanBody).toEqual({ required: 'test' });
        });
    });
});

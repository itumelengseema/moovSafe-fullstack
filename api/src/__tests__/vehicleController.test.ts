import { Request, Response } from 'express';
import { mockVehicle, createMockDb, HTTP_STATUS } from './helpers';

// Mock all external dependencies before importing
const mockDb = createMockDb();
jest.mock('../db/index', () => ({ db: mockDb }));
jest.mock('lodash', () => ({ default: { isEmpty: jest.fn() } }));
jest.mock('../routes/vehicle/vehicleImages', () => ({ vehicleImages: [] }));

// Import controller functions after mocking dependencies
import {
    getVehicles,
    getVehicleById,
    getVehicleByLicense,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from '../routes/vehicle/vehicleController';

describe('Vehicle Controller', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        mockRes = {
            status: statusMock,
            json: jsonMock
        };

        mockReq = {};

        jest.clearAllMocks();
    });

    describe('getVehicles', () => {
        it('should return all vehicles successfully', async () => {
            const mockVehicles = [mockVehicle];
            mockDb.select.mockResolvedValueOnce(mockVehicles);

            await getVehicles(mockReq as Request, mockRes as Response);

            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(jsonMock).toHaveBeenCalledWith(mockVehicles);
        });

        it('should handle database errors', async () => {
            const errorMessage = 'Database connection failed';
            mockDb.select.mockRejectedValueOnce(new Error(errorMessage));

            await getVehicles(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getVehicleById', () => {
        it('should return vehicle by ID successfully', async () => {
            mockReq.params = { id: 'test-vehicle-123' };
            mockDb.select.mockResolvedValueOnce([mockVehicle]);

            await getVehicleById(mockReq as Request, mockRes as Response);

            expect(mockDb.select).toHaveBeenCalled();
            expect(mockDb.from).toHaveBeenCalled();
            expect(mockDb.where).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(jsonMock).toHaveBeenCalledWith(mockVehicle);
        });

        it('should return 400 when ID is missing', async () => {
            mockReq.params = {};

            await getVehicleById(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle ID is required' });
        });

        it('should return 404 when vehicle not found', async () => {
            mockReq.params = { id: 'non-existent-id' };
            mockDb.select.mockResolvedValueOnce([]);

            await getVehicleById(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle not found' });
        });

        it('should handle database errors', async () => {
            mockReq.params = { id: 'test-vehicle-123' };
            const errorMessage = 'Database error';
            mockDb.select.mockRejectedValueOnce(new Error(errorMessage));

            await getVehicleById(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getVehicleByLicense', () => {
        it('should return vehicle by license plate successfully', async () => {
            mockReq.params = { licensePlate: 'ABC-123' };
            mockDb.select.mockResolvedValueOnce([mockVehicle]);

            await getVehicleByLicense(mockReq as Request, mockRes as Response);

            expect(mockDb.select).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(jsonMock).toHaveBeenCalledWith(mockVehicle);
        });

        it('should return 400 when license plate is missing', async () => {
            mockReq.params = {};

            await getVehicleByLicense(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'License plate is required' });
        });

        it('should return 404 when vehicle not found by license', async () => {
            mockReq.params = { licensePlate: 'NON-EXIST' };
            mockDb.select.mockResolvedValueOnce([]);

            await getVehicleByLicense(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle not found' });
        });
    });

    describe('addVehicle', () => {
        it('should create vehicle successfully', async () => {
            mockReq.body = {
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                vin: 'TEST123456789',
                licensePlate: 'ABC-123'
            };

            mockDb.insert.mockResolvedValueOnce([mockVehicle]);

            await addVehicle(mockReq as Request, mockRes as Response);

            expect(mockDb.insert).toHaveBeenCalled();
            expect(mockDb.values).toHaveBeenCalled();
            expect(mockDb.returning).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(jsonMock).toHaveBeenCalledWith(mockVehicle);
        });

        it('should handle validation errors', async () => {
            mockReq.body = { make: 'Toyota' }; // Missing required fields

            await addVehicle(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        });

        it('should handle database errors during creation', async () => {
            mockReq.body = {
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                vin: 'TEST123456789',
                licensePlate: 'ABC-123'
            };

            const errorMessage = 'Duplicate VIN';
            mockDb.insert.mockRejectedValueOnce(new Error(errorMessage));

            await addVehicle(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('updateVehicle', () => {
        it('should update vehicle successfully', async () => {
            mockReq.params = { id: 'test-vehicle-123' };
            mockReq.body = { make: 'Honda', model: 'Civic' };

            mockDb.update.mockResolvedValueOnce([{ ...mockVehicle, make: 'Honda', model: 'Civic' }]);

            await updateVehicle(mockReq as Request, mockRes as Response);

            expect(mockDb.update).toHaveBeenCalled();
            expect(mockDb.set).toHaveBeenCalled();
            expect(mockDb.where).toHaveBeenCalled();
            expect(mockDb.returning).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.OK);
        });

        it('should return 400 when ID is missing', async () => {
            mockReq.params = {};
            mockReq.body = { make: 'Honda' };

            await updateVehicle(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle ID is required' });
        });
    });

    describe('deleteVehicle', () => {
        it('should delete vehicle successfully', async () => {
            mockReq.params = { id: 'test-vehicle-123' };
            mockDb.delete.mockResolvedValueOnce([mockVehicle]);

            await deleteVehicle(mockReq as Request, mockRes as Response);

            expect(mockDb.delete).toHaveBeenCalled();
            expect(mockDb.where).toHaveBeenCalled();
            expect(mockDb.returning).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(jsonMock).toHaveBeenCalledWith({
                message: 'Vehicle deleted successfully',
                vehicle: mockVehicle
            });
        });

        it('should return 400 when ID is missing', async () => {
            mockReq.params = {};

            await deleteVehicle(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle ID is required' });
        });

        it('should return 404 when vehicle not found for deletion', async () => {
            mockReq.params = { id: 'non-existent-id' };
            mockDb.delete.mockResolvedValueOnce([]);

            await deleteVehicle(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Vehicle not found' });
        });
    });
});

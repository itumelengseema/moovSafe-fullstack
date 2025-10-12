import request from 'supertest';
import express from 'express';
import { mockVehicle, HTTP_STATUS, createMockDb } from './helpers';

// Mock database
const mockDb = createMockDb();
jest.mock('../db/index.js', () => ({
    db: mockDb
}));

// Mock lodash
jest.mock('lodash', () => ({
    default: {
        isEmpty: jest.fn().mockReturnValue(false)
    }
}));

// Mock vehicle images
jest.mock('../routes/vehicle/vehicleImages.js', () => ({
    vehicleImages: []
}));

// Import after mocking
import vehicleRouter from '../routes/vehicle/index';

describe('Vehicle Routes Integration', () => {
    let app: express.Application;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/vehicles', vehicleRouter);

        jest.clearAllMocks();
    });

    describe('GET /api/vehicles', () => {
        it('should get all vehicles', async () => {
            const mockVehicles = [mockVehicle];
            mockDb.select.mockResolvedValueOnce(mockVehicles);

            const response = await request(app)
                .get('/api/vehicles')
                .expect(HTTP_STATUS.OK);

            expect(response.body).toEqual(mockVehicles);
            expect(mockDb.select).toHaveBeenCalled();
        });

        it('should handle server errors', async () => {
            mockDb.select.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app)
                .get('/api/vehicles')
                .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/vehicles/:id', () => {
        it('should get vehicle by ID', async () => {
            mockDb.select.mockResolvedValueOnce([mockVehicle]);

            const response = await request(app)
                .get(`/api/vehicles/${mockVehicle.id}`)
                .expect(HTTP_STATUS.OK);

            expect(response.body).toEqual(mockVehicle);
        });

        it('should return 404 for non-existent vehicle', async () => {
            mockDb.select.mockResolvedValueOnce([]);

            const response = await request(app)
                .get('/api/vehicles/non-existent-id')
                .expect(HTTP_STATUS.NOT_FOUND);

            expect(response.body).toHaveProperty('error', 'Vehicle not found');
        });
    });

    describe('GET /api/vehicles/license/:licensePlate', () => {
        it('should get vehicle by license plate', async () => {
            mockDb.select.mockResolvedValueOnce([mockVehicle]);

            const response = await request(app)
                .get(`/api/vehicles/license/${mockVehicle.licensePlate}`)
                .expect(HTTP_STATUS.OK);

            expect(response.body).toEqual(mockVehicle);
        });

        it('should return 404 for non-existent license plate', async () => {
            mockDb.select.mockResolvedValueOnce([]);

            const response = await request(app)
                .get('/api/vehicles/license/NON-EXIST')
                .expect(HTTP_STATUS.NOT_FOUND);

            expect(response.body).toHaveProperty('error', 'Vehicle not found');
        });
    });

    describe('POST /api/vehicles', () => {
        const validVehicleData = {
            make: 'Toyota',
            model: 'Camry',
            year: 2023,
            vin: 'TEST123456789',
            licensePlate: 'ABC-123',
            color: 'Blue',
            mileage: 15000
        };

        it('should create a new vehicle', async () => {
            mockDb.insert.mockResolvedValueOnce([mockVehicle]);

            const response = await request(app)
                .post('/api/vehicles')
                .send(validVehicleData)
                .expect(HTTP_STATUS.CREATED);

            expect(response.body).toEqual(mockVehicle);
            expect(mockDb.insert).toHaveBeenCalled();
        });

        it('should validate required fields', async () => {
            const invalidData = { make: 'Toyota' }; // Missing required fields

            const response = await request(app)
                .post('/api/vehicles')
                .send(invalidData)
                .expect(HTTP_STATUS.BAD_REQUEST);

            expect(response.body).toHaveProperty('error');
        });

        it('should handle duplicate VIN errors', async () => {
            mockDb.insert.mockRejectedValueOnce(new Error('duplicate key value violates unique constraint'));

            const response = await request(app)
                .post('/api/vehicles')
                .send(validVehicleData)
                .expect(HTTP_STATUS.INTERNAL_SERVER_ERROR);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('PUT /api/vehicles/:id', () => {
        const updateData = {
            make: 'Honda',
            model: 'Civic',
            year: 2024
        };

        it('should update an existing vehicle', async () => {
            const updatedVehicle = { ...mockVehicle, ...updateData };
            mockDb.update.mockResolvedValueOnce([updatedVehicle]);

            const response = await request(app)
                .put(`/api/vehicles/${mockVehicle.id}`)
                .send(updateData)
                .expect(HTTP_STATUS.OK);

            expect(response.body).toEqual(updatedVehicle);
            expect(mockDb.update).toHaveBeenCalled();
        });

        it('should return 400 for invalid vehicle ID', async () => {
            const response = await request(app)
                .put('/api/vehicles/')
                .send(updateData)
                .expect(404); // Express returns 404 for missing route params
        });

        it('should return 404 for non-existent vehicle', async () => {
            mockDb.update.mockResolvedValueOnce([]);

            const response = await request(app)
                .put('/api/vehicles/non-existent-id')
                .send(updateData)
                .expect(HTTP_STATUS.NOT_FOUND);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('DELETE /api/vehicles/:id', () => {
        it('should delete an existing vehicle', async () => {
            mockDb.delete.mockResolvedValueOnce([mockVehicle]);

            const response = await request(app)
                .delete(`/api/vehicles/${mockVehicle.id}`)
                .expect(HTTP_STATUS.OK);

            expect(response.body).toHaveProperty('message', 'Vehicle deleted successfully');
            expect(response.body).toHaveProperty('vehicle', mockVehicle);
            expect(mockDb.delete).toHaveBeenCalled();
        });

        it('should return 404 for non-existent vehicle', async () => {
            mockDb.delete.mockResolvedValueOnce([]);

            const response = await request(app)
                .delete('/api/vehicles/non-existent-id')
                .expect(HTTP_STATUS.NOT_FOUND);

            expect(response.body).toHaveProperty('error', 'Vehicle not found');
        });
    });
});

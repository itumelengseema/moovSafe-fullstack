import { Router } from 'express';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicleByLicense,
} from './vehicleController.js';
import { validateData } from '../../middleware/validationMiddleware.js';
import {
  createVehicleSchema,
  updateVehicleSchema,
} from '../../db/vehicleSchema.js';

const vehicleRouter = Router();

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     description: Retrieve a list of all vehicles in the fleet
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.get('/', getVehicles);

// Test endpoint to verify changes are taking effect
vehicleRouter.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!', timestamp: new Date().toISOString() });
});

// Mock vehicles endpoint for development
vehicleRouter.get('/mock', (req, res) => {
  const mockVehicles = [
    {
      id: 'mock-1',
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      vin: '1234567890ABCDEFG',
      engineNumber: 'ENG123456',
      licensePlate: 'ABC-123',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      currentMileage: 45000,
      colour: 'Silver',
      imageUrl: 'https://res.cloudinary.com/dm5v9praz/image/upload/v1728741234/moovsafe/vehicles/car.png',
      vehicleType: 'Car',
      status: 'active',
      lastInspectionDate: '2024-01-15'
    },
    {
      id: 'mock-2',
      make: 'Ford',
      model: 'F-150',
      year: 2020,
      vin: 'ABCDEFG1234567890',
      engineNumber: 'ENG789012',
      licensePlate: 'XYZ-789',
      fuelType: 'Petrol',
      transmission: 'Manual',
      currentMileage: 62000,
      colour: 'Blue',
      imageUrl: 'https://res.cloudinary.com/dm5v9praz/image/upload/v1728741234/moovsafe/vehicles/truck.png',
      vehicleType: 'Truck',
      status: 'active',
      lastInspectionDate: '2024-02-10'
    }
  ];
  res.json(mockVehicles);
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     description: Retrieve a specific vehicle by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the vehicle
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.get('/:id', getVehicleById);

/**
 * @swagger
 * /api/vehicles/license/{licensePlate}:
 *   get:
 *     summary: Get vehicle by license plate
 *     tags: [Vehicles]
 *     description: Retrieve a specific vehicle by its license plate number
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         description: License plate number of the vehicle
 *         schema:
 *           type: string
 *           example: "ABC123GP"
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.get('/license/:licensePlate', getVehicleByLicense);

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     description: Add a new vehicle to the fleet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [make, model, year, vin, engineNumber, licensePlate, fuelType, transmission, currentMileage, colour, vehicleType]
 *             properties:
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Camry"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               vin:
 *                 type: string
 *                 example: "1HGBH41JXMN109186"
 *               engineNumber:
 *                 type: string
 *                 example: "ENG123456789"
 *               licensePlate:
 *                 type: string
 *                 example: "ABC123GP"
 *               fuelType:
 *                 type: string
 *                 enum: [Petrol, Diesel, Electric, Hybrid]
 *                 example: "Petrol"
 *               transmission:
 *                 type: string
 *                 enum: [Manual, Automatic, CVT]
 *                 example: "Automatic"
 *               currentMileage:
 *                 type: integer
 *                 example: 45000
 *               colour:
 *                 type: string
 *                 example: "White"
 *               vehicleType:
 *                 type: string
 *                 enum: [Car, Truck, Van, Motorcycle, Bus]
 *                 example: "Car"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.post('/', validateData(createVehicleSchema), addVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicles]
 *     description: Update an existing vehicle's information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the vehicle
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               currentMileage:
 *                 type: integer
 *               colour:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *             example:
 *               currentMileage: 47000
 *               colour: "Blue"
 *               status: "active"
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.put('/:id', validateData(updateVehicleSchema), updateVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle
 *     tags: [Vehicles]
 *     description: Remove a vehicle from the fleet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the vehicle
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
vehicleRouter.delete('/:id', deleteVehicle);

export default vehicleRouter;

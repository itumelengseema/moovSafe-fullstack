import { Router } from 'express';
import {
  getByVehicle,
  getMaintenanceById,
  getMaintenanceHistory,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from './MaintenanceController.js';
import { upload } from '../../middleware/upload.js';
import { validateData } from '../../middleware/validationMiddleware.js';
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from '../../db/maintenance_historySchema.js';

const router = Router();

/**
 * @swagger
 * /api/maintenance/vehicle/{licensePlate}:
 *   get:
 *     summary: Get maintenance history by vehicle license plate
 *     tags: [Maintenance]
 *     description: Retrieve maintenance history for a specific vehicle using its license plate
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         description: License plate of the vehicle
 *         schema:
 *           type: string
 *           example: "ABC123GP"
 *     responses:
 *       200:
 *         description: Maintenance history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceHistory'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('vehicle/:licensePlate', getByVehicle);

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     description: Retrieve a list of all maintenance records across all vehicles
 *     parameters:
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by specific vehicle ID
 *       - in: query
 *         name: performedBy
 *         schema:
 *           type: string
 *           enum: [DIY, Workshop]
 *         description: Filter by who performed the maintenance
 *       - in: query
 *         name: typeOfMaintenance
 *         schema:
 *           type: string
 *         description: Filter by maintenance type
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: Maintenance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceHistory'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', getMaintenanceHistory);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   get:
 *     summary: Get maintenance record by ID
 *     tags: [Maintenance]
 *     description: Retrieve a specific maintenance record by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the maintenance record
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Maintenance record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceHistory'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', getMaintenanceById);

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Create a new maintenance record
 *     tags: [Maintenance]
 *     description: Add a new maintenance record with optional file uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [vehicleId, mileage, typeOfMaintenance, performedBy]
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the vehicle being maintained
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               mileage:
 *                 type: integer
 *                 minimum: 0
 *                 description: Vehicle mileage at time of maintenance
 *                 example: 45000
 *               typeOfMaintenance:
 *                 type: string
 *                 description: Type of maintenance performed
 *                 example: "Oil Change"
 *               description:
 *                 type: string
 *                 description: Detailed description of maintenance work
 *                 example: "Changed engine oil and oil filter. Used synthetic 5W-30 oil."
 *               performedBy:
 *                 type: string
 *                 enum: [DIY, Workshop]
 *                 description: Who performed the maintenance
 *                 example: "Workshop"
 *               serviceCenter:
 *                 type: string
 *                 description: Name of service center (required if performedBy is Workshop)
 *                 example: "AutoFix Service Center"
 *               cost:
 *                 type: integer
 *                 minimum: 0
 *                 description: Cost of maintenance in cents
 *                 example: 15000
 *               parts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of parts used (for DIY maintenance)
 *                 example: ["Oil Filter", "Engine Oil - 5L"]
 *               nextServiceDate:
 *                 type: string
 *                 format: date-time
 *                 description: Next scheduled service date
 *                 example: "2024-11-12T10:30:00.000Z"
 *               nextServiceMileage:
 *                 type: integer
 *                 minimum: 0
 *                 description: Next service mileage
 *                 example: 50000
 *               odometerImage:
 *                 type: string
 *                 format: binary
 *                 description: Image of vehicle odometer
 *               invoices:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *                 description: Invoice or receipt images
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *                 description: Before/after maintenance photos
 *     responses:
 *       201:
 *         description: Maintenance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceHistory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  '/',
  validateData(createMaintenanceSchema),
  upload.fields([
    { name: 'odometerImage', maxCount: 1 },
    { name: 'invoices', maxCount: 5 },
    { name: 'photos', maxCount: 5 },
  ]),
  createMaintenance,
);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   put:
 *     summary: Update maintenance record
 *     tags: [Maintenance]
 *     description: Update an existing maintenance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the maintenance record
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
 *               mileage:
 *                 type: integer
 *                 minimum: 0
 *                 description: Updated vehicle mileage
 *               typeOfMaintenance:
 *                 type: string
 *                 description: Updated maintenance type
 *               description:
 *                 type: string
 *                 description: Updated maintenance description
 *               cost:
 *                 type: integer
 *                 minimum: 0
 *                 description: Updated cost in cents
 *               nextServiceDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated next service date
 *               nextServiceMileage:
 *                 type: integer
 *                 minimum: 0
 *                 description: Updated next service mileage
 *             example:
 *               cost: 16000
 *               description: "Updated maintenance description with additional work done"
 *               nextServiceMileage: 50500
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceHistory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', validateData(updateMaintenanceSchema), updateMaintenance);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   delete:
 *     summary: Delete maintenance record
 *     tags: [Maintenance]
 *     description: Remove a maintenance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the maintenance record
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance record deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', deleteMaintenance);

export default router;

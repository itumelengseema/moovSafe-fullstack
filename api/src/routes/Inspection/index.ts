import { Router } from 'express';
import {
  getInspections,
  getInspectionByDate,
  getInspectionById,
  createInspection,
  deleteInspection,
} from './inspectionController.js';
import { upload } from '../../middleware/upload.js';
import { validateData } from '../../middleware/validationMiddleware.js';
import { parseFormData } from '../../middleware/parseFormData.js';
import { createInspectionSchema } from '../../db/inspectionSchema.js';
const router = Router();

/**
 * @swagger
 * /api/inspections:
 *   get:
 *     summary: Get all inspections
 *     tags: [Inspections]
 *     description: Retrieve a list of all vehicle inspections
 *     parameters:
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter inspections by vehicle ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of inspections to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Number of inspections to skip
 *     responses:
 *       200:
 *         description: List of inspections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inspection'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', getInspections);

/**
 * @swagger
 * /api/inspections/date:
 *   get:
 *     summary: Get inspections by date
 *     tags: [Inspections]
 *     description: Retrieve inspections filtered by date range
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *         example: "2024-10-01"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *         example: "2024-10-31"
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by specific vehicle
 *     responses:
 *       200:
 *         description: Filtered inspections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inspection'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/date', getInspectionByDate);

/**
 * @swagger
 * /api/inspections/{id}:
 *   get:
 *     summary: Get inspection by ID
 *     tags: [Inspections]
 *     description: Retrieve a specific inspection by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the inspection
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Inspection retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inspection'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', getInspectionById);

/**
 * @swagger
 * /api/inspections:
 *   post:
 *     summary: Create a new inspection
 *     tags: [Inspections]
 *     description: Create a new vehicle inspection with optional image uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [vehicleId, mileage, overallCondition]
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the vehicle being inspected
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               mileage:
 *                 type: integer
 *                 minimum: 0
 *                 description: Current vehicle mileage
 *                 example: 45000
 *               overallCondition:
 *                 type: string
 *                 enum: [Good, Fair, Poor]
 *                 description: Overall vehicle condition
 *                 example: "Good"
 *               exteriorWindshield:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Cracked, Needs Replacement]
 *                 example: "Good"
 *               exteriorMirrors:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Missing, Damaged]
 *                 example: "Good"
 *               exteriorLights:
 *                 type: string
 *                 enum: [Functional, Non-Functional, Partial]
 *                 example: "Functional"
 *               exteriorTires:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Worn, Needs Replacement]
 *                 example: "Good"
 *               engineOil:
 *                 type: string
 *                 enum: [Good, Low, Change Needed, Empty]
 *                 example: "Good"
 *               engineCoolant:
 *                 type: string
 *                 enum: [Good, Low, Change Needed, Empty]
 *                 example: "Good"
 *               engineBrakeFluid:
 *                 type: string
 *                 enum: [Good, Low, Change Needed, Empty]
 *                 example: "Good"
 *               engineTransmissionFluid:
 *                 type: string
 *                 enum: [Good, Low, Change Needed, Empty]
 *                 example: "Good"
 *               enginePowerSteering:
 *                 type: string
 *                 enum: [Good, Low, Change Needed, Empty]
 *                 example: "Good"
 *               engineBattery:
 *                 type: string
 *                 enum: [Good, Weak, Replace Soon, Dead]
 *                 example: "Good"
 *               interiorSeats:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Torn, Stained]
 *                 example: "Good"
 *               interiorSeatbelts:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Frayed, Missing]
 *                 example: "Good"
 *               interiorHorn:
 *                 type: string
 *                 enum: [Functional, Non-Functional, Weak]
 *                 example: "Functional"
 *               interiorAC:
 *                 type: string
 *                 enum: [Functional, Non-Functional, Weak, Needs Service]
 *                 example: "Functional"
 *               windows:
 *                 type: string
 *                 enum: [Functional, Non-Functional, Stuck, Cracked]
 *                 example: "Functional"
 *               brakes:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Squeaking, Grinding]
 *                 example: "Good"
 *               exhaust:
 *                 type: string
 *                 enum: [Good, Fair, Poor, Loud, Smoking]
 *                 example: "Good"
 *               lightsIndicators:
 *                 type: string
 *                 enum: [Functional, Non-Functional, Partial]
 *                 example: "Functional"
 *               spareTire:
 *                 type: string
 *                 enum: [Present, Absent, Poor, Good, Flat]
 *                 example: "Present"
 *               jack:
 *                 type: string
 *                 enum: [Present, Absent, Damaged]
 *                 example: "Present"
 *               wheelSpanner:
 *                 type: string
 *                 enum: [Present, Absent, Damaged]
 *                 example: "Present"
 *               wheelLockNutTool:
 *                 type: string
 *                 enum: [Present, Absent]
 *                 example: "Present"
 *               fireExtinguisher:
 *                 type: string
 *                 enum: [Present, Absent, Expired, Empty]
 *                 example: "Present"
 *               notes:
 *                 type: string
 *                 description: Additional inspection notes
 *                 example: "Vehicle is in excellent condition"
 *               faultsImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *                 description: Images of vehicle faults or issues
 *               odometerImage:
 *                 type: string
 *                 format: binary
 *                 description: Image of vehicle odometer
 *     responses:
 *       201:
 *         description: Inspection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inspection'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  '/',
  upload.fields([
    { name: 'faultsImages', maxCount: 5 },
    { name: 'odometerImage', maxCount: 1 },
  ]),
  parseFormData(),
  validateData(createInspectionSchema),
  createInspection,
);

/**
 * @swagger
 * /api/inspections/{id}:
 *   delete:
 *     summary: Delete inspection
 *     tags: [Inspections]
 *     description: Remove an inspection record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the inspection
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Inspection deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inspection deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', deleteInspection);

export default router;

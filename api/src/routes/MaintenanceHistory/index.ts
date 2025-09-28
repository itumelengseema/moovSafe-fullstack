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

//Routes
router.get('vehicle/:licensePlate', getByVehicle);

router.get('/', getMaintenanceHistory);
router.get('/:id', getMaintenanceById);

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
router.put('/:id', validateData(updateMaintenanceSchema), updateMaintenance);
router.delete('/:id', deleteMaintenance);

export default router;

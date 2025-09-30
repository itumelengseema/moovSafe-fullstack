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
import { createInspectionSchema } from '../../db/inspectionSchema.js';
const router = Router();

//Routes
router.get('/', getInspections);
router.get('/date', getInspectionByDate);
router.get('/:id', getInspectionById);
router.post(
  '/',
  validateData(createInspectionSchema),
  upload.fields([
    { name: 'faultsImages', maxCount: 5 },
    { name: 'odometerImage', maxCount: 1 },
  ]),
  createInspection,
);

router.delete('/:id', deleteInspection);

export default router;

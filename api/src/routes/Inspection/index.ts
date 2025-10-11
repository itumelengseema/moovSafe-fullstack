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

//Routes
router.get('/', getInspections);
router.get('/date', getInspectionByDate);
router.get('/:id', getInspectionById);
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

router.delete('/:id', deleteInspection);

export default router;

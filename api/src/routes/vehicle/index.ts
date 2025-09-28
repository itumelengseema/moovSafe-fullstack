import { Router } from 'express';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicleByLicense,
} from './vehicleController';
import { validateData } from '../../middleware/validationMiddleware';
import { createVehicleSchema,updateVehicleSchema } from '../../db/vehicleSchema';






const vehicleRouter = Router();

vehicleRouter.get('/', getVehicles);
vehicleRouter.get('/:id', getVehicleById);
vehicleRouter.get('/license/:licensePlate', getVehicleByLicense);
vehicleRouter.post('/', validateData(createVehicleSchema), addVehicle);
vehicleRouter.put('/:id', validateData(updateVehicleSchema), updateVehicle);
vehicleRouter.delete('/:id', deleteVehicle);

export default vehicleRouter;

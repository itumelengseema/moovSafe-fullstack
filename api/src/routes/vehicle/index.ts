import { Router } from 'express';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicleByLicense,
} from './vehicleController';

const vehicleRouter = Router();

vehicleRouter.get('/', getVehicles);
vehicleRouter.get('/:id', getVehicleById);
vehicleRouter.get('/license/:licensePlate', getVehicleByLicense);
vehicleRouter.post('/', addVehicle);
vehicleRouter.put('/:id', updateVehicle);
vehicleRouter.delete('/:id', deleteVehicle);

export default vehicleRouter;

import { Router } from "express";
import {
  getbyVehicle,
  getMaintenanceById,
  getMaintenanceHistory,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "./MaintenanceController";
import { upload } from "../../middleware/upload";

const router = Router();

//Routes
router.get("vehicle/:licensePlate", getbyVehicle);

router.get("/", getMaintenanceHistory);
router.get("/:id", getMaintenanceById);

router.post(
  "/",
  upload.fields([
    { name: "odometerImage", maxCount: 1 },
    { name: "invoices", maxCount: 5 },
    { name: "photos", maxCount: 5 },
  ]),
  createMaintenance
);
router.put("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

export default router;

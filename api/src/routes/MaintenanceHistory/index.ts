import { Router } from "express";
import { getMaintenanceById, getMaintenanceHistory,createMaintenanceRecord,updateMaintenanceRecord,deleteMaintenanceRecord} from "./MaintenanceController";    
import { upload } from "../../middleware/upload";
const router = Router();

//Routes
router.get("/", getMaintenanceHistory);
router.get("/:id", getMaintenanceById);
router.post("/", 
    upload.fields([
        { name: "faultsImages", maxCount: 5 },
        { name: "odometerImage", maxCount: 1 },
    ]),
    createMaintenanceRecord);
router.put("/:id", updateMaintenanceRecord);
router.delete("/:id", deleteMaintenanceRecord);



export default router;

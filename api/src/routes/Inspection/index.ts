import { Router } from "express";
import { getInspections, getInspectionByDate, getInspectionById, createInspection, updateInspection, deleteInspection } from "./inspectionController";    
import { upload } from "../../middleware/upload";
const router = Router();

//Routes
router.get("/", getInspections);
router.get("/date", getInspectionByDate);
router.get("/:id", getInspectionById);
router.post("/", 
    upload.fields([
        { name: "faultsImages", maxCount: 5 },
        { name: "odometerImage", maxCount: 1 },
    ]),
    createInspection);
router.put("/:id", updateInspection);
router.delete("/:id", deleteInspection);


export default router;

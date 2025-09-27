import { Router } from "express";
import { getInspections, getInspectionByDate, getInspectionById, createInspection, updateInspection, deleteInspection } from "./inspectionController";    

const router = Router();

//Routes
router.get("/", getInspections);
router.get("/date", getInspectionByDate);
router.get("/:id", getInspectionById);
router.post("/", createInspection);
router.put("/:id", updateInspection);
router.delete("/:id", deleteInspection);


export default router;

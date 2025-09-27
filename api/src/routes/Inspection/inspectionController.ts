import { Request,Response } from "express";


//get all inspections
export const getInspections = (req: Request, res: Response) => {
    res.send("Get all inspections");

};

//get inspectionByDate
export const getInspectionByDate = (req: Request, res: Response) => {
    res.send("Get inspection by date");
};

//get inspection by id
export const getInspectionById = (req: Request, res: Response) => {
    res.send("Get inspection by ID");
};
export const createInspection = (req: Request, res: Response) => {
  res.send("New inspection created");
};
//update inspection
export const updateInspection = (req: Request, res: Response) => {
  res.send("Inspection updated");
};
//delete inspection
export const deleteInspection = (req: Request, res: Response) => {
  res.send("Inspection deleted");
};

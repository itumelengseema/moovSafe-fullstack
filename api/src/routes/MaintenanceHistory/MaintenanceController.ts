import { Request, Response } from "express";

export const getMaintenanceHistory = (req: Request, res: Response) => {
  res.send("Maintenance history");
};

export const getMaintenanceById = (req: Request, res: Response) => {
  res.send("Maintenance record by ID");
};

export const createMaintenanceRecord = (req: Request, res: Response) => {
  res.send("Maintenance record created");
};

export const updateMaintenanceRecord = (req: Request, res: Response) => {
  res.send("Maintenance record updated");
};

export const deleteMaintenanceRecord = (req: Request, res: Response) => {
  res.send("Maintenance record deleted");
};

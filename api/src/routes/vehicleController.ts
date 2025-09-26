import e, { Request, Response } from 'express';

export function getVehicles(req: Request, res: Response) {
  res.send('Get all vehicles');
}

export function getVehicleById(req: Request, res: Response) {
  const { id } = req.params;
  res.send(`Get vehicle with ID: ${id}`);
}

export function addVehicle(req: Request, res: Response) {
  res.send('Add a vehicle');
}

export function updateVehicle(req: Request, res: Response) {
  const { id } = req.params;
  res.send(`Update vehicle with ID: ${id}`);
}

export function deleteVehicle(req: Request, res: Response) {
  const { id } = req.params;
  res.send(`Delete vehicle with ID: ${id}`);
}   
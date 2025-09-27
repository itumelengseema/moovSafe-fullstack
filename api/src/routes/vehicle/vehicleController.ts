import e, { Request, Response } from 'express';
import { db } from '../../db/index';
import { vehicles as vehiclesTable } from '../../db/vehicleSchema';
import { eq } from 'drizzle-orm';

// Get all vehicles
export async function getVehicles(req: Request, res: Response) {
 try{
  const vehicles = await db.select().from(vehiclesTable);
  res.status(200).json(vehicles);
 }catch(error){
  res.status(500).json({ error: 'Internal Server Error' });
 }
}

// Get vehicle by ID
export function getVehicleById(req: Request, res: Response) {
try {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Vehicle ID is required" });
  }

  // Fetch vehicle by ID
  const vehicle = db.select().from(vehiclesTable).where(eq(vehiclesTable.id, id));
  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.status(200).json(vehicle);
}catch(error){
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
}
// Add a new vehicle
export async function addVehicle(req: Request, res: Response) {
  try {
    const {
      ...VehicleData
    } = req.body;

    if (!Object.keys(VehicleData)) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const [newVehicle] = await db.insert(vehiclesTable).values({
      ...VehicleData
    }).returning();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update vehicle details
export async function updateVehicle(req: Request, res: Response) {
  try {
    const { id } = req.params; // UUID of the vehicle to update
    const vehicleData = req.body;

    // Check if at least one field is provided to update
    if (!Object.keys(vehicleData).length) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update" });
    }

    // Build the update object dynamically
    const updateData: any = {};
    for (const key in vehicleData) {
      if (vehicleData[key] !== undefined && vehicleData[key] !== null) {
        updateData[key] = vehicleData[key];
      }
    }

    // Type conversions / validations
    if (updateData.currentMileage) {
      updateData.currentMileage = Number(updateData.currentMileage);
    }
    if (updateData.year) {
      updateData.year = Number(updateData.year);
    }

    // Update vehicle in DB
    const [updatedVehicle] = await db
      .update(vehiclesTable)
      .set(updateData)
      .where(eq(vehiclesTable.id, id))
      .returning();

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a vehicle
export function deleteVehicle(req: Request, res: Response) {
  const { id } = req.params;
  
  db.delete(vehiclesTable)
    .where(eq(vehiclesTable.id, id))
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.status(200).json({ message: "Vehicle deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}   
// Get vehicle by license plate
export async function getVehicleByLicense(req: Request, res: Response) {
  try {
    const { licensePlate } = req.params;

    // Query the vehicle
    const [vehicle] = await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.licensePlate, licensePlate));

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
import e, { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { vehicles as vehiclesTable } from '../../db/vehicleSchema.js';
import { eq, and, or } from 'drizzle-orm';
import _ from 'lodash';
import { vehicleImages } from './vehicleImages.js';
import { HTTP_STATUS } from '../../utils/constants.js';

// Get all vehicles
export async function getVehicles(req: Request, res: Response) {
  try {
    console.log('Fetching vehicles from database...');
    const vehicles = await db.select().from(vehiclesTable);
    console.log(`✅ Found ${vehicles.length} vehicles in database`);
    res.status(HTTP_STATUS.OK).json(vehicles);
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}

// Get vehicle by ID
export async function getVehicleById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Vehicle ID is required' });
    }

    // Fetch vehicle by ID
    const [vehicle] = await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.id, id));
    if (!vehicle) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Vehicle not found' });
    }

    res.status(HTTP_STATUS.OK).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}
// Add a new vehicle
export async function addVehicle(req: Request, res: Response) {
  try {
    console.log('🚗 Adding new vehicle to database...', req.cleanBody);
    
    const { licensePlate, vin, engineNumber, vehicleType, make, model, year, fuelType, transmission, currentMileage, colour } = req.cleanBody;

    // Validate required fields before DB call
    const requiredFields = { licensePlate, vin, engineNumber, make, model, year, fuelType, transmission, currentMileage, colour, vehicleType };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value && value !== 0)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        receivedData: req.cleanBody
      });
    }

    // Check for existing vehicle with same unique fields
    const conflicts = await db
      .select()
      .from(vehiclesTable)
      .where(
        or(
          eq(vehiclesTable.licensePlate, licensePlate),
          eq(vehiclesTable.vin, vin),
          eq(vehiclesTable.engineNumber, engineNumber)
        ),
      );

    if (conflicts.length > 0) {
      const errors: string[] = [];
      conflicts.forEach((conflict) => {
        if (conflict.licensePlate === licensePlate) {
          errors.push('License plate already exists');
        }
        if (conflict.vin === vin) {
          errors.push('VIN already exists');
        }
        if (conflict.engineNumber === engineNumber) {
          errors.push('Engine number already exists');
        }
      });
      return res.status(HTTP_STATUS.CONFLICT).json({ error: errors.join(', ') });
    }

    const typeKey = vehicleType ? vehicleType.toLowerCase() : 'default';
    const imageUrl = vehicleImages[typeKey] || vehicleImages['default'];

    // Insert new vehicle into DB
    const [newVehicle] = await db
      .insert(vehiclesTable)
      .values({ ...req.cleanBody, imageUrl })
      .returning();
    console.log('✅ New vehicle added to database:', JSON.stringify(newVehicle, null, 2));
    res.status(HTTP_STATUS.CREATED).json(newVehicle);

  } catch (error) {
    console.error('❌ Error adding vehicle:', error);
    console.error('❌ Request body was:', req.cleanBody);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}


// Update vehicle details
export async function updateVehicle(req: Request, res: Response) {
  try {
    const { id } = req.params; // UUID of the vehicle to update
    const vehicleData = req.cleanBody;

    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Vehicle ID is required' });
    }

    // Check if at least one field is provided to update
    if (!Object.keys(vehicleData).length) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: 'At least one field must be provided to update' });
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
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Vehicle not found' });
    }

    res.status(HTTP_STATUS.OK).json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}

// Delete a vehicle
export async function deleteVehicle(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Vehicle ID is required' });
    }

    const [deletedVehicle] = await db
      .delete(vehiclesTable)
      .where(eq(vehiclesTable.id, id))
      .returning();

    if (!deletedVehicle) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Vehicle not found' });
    }

    res.status(HTTP_STATUS.OK).json({
      message: 'Vehicle deleted successfully',
      vehicle: deletedVehicle
    });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}
// Get vehicle by license plate
export async function getVehicleByLicense(req: Request, res: Response) {
  try {
    const { licensePlate } = req.params;

    if (!licensePlate) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'License plate is required' });
    }

    // Query the vehicle
    const [vehicle] = await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.licensePlate, licensePlate));

    if (!vehicle) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Vehicle not found' });
    }

    res.status(HTTP_STATUS.OK).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
}

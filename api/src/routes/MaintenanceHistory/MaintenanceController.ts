import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '../../db/index';
import { maintenanceHistory } from '../../db/maintenance_historySchema';
import { vehicles as vehiclesTable } from '../../db/vehicleSchema';
import { eq, desc } from 'drizzle-orm';

// Create a new maintenance record
export async function createMaintenance(req: Request, res: Response) {
  try {
    const { vehicleId, ...maintenanceData } = req.body;

    // Check if vehicle exists
    const [vehicle] = await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.id, vehicleId));
    if (!vehicle) {
      console.log('Vehicle ID received:', vehicleId);
      console.log(
        'All vehicle IDs in DB:',
        await db.select({ id: vehiclesTable.id }).from(vehiclesTable),
      );

      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Validate required fields
    if (!Object.keys(maintenanceData).length) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Handle file uploads
    let odometerImageUrl: string | null = null;
    let invoicesUrl: string[] = [];
    let photosUrl: string[] = [];

    if (req.files) {
      // Odometer Image
      // @ts-ignore
      if ((req.files as any).odometerImage?.[0]) {
        const file = (req.files as any).odometerImage[0];
        odometerImageUrl = await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'moovsafe/maintenance/odometer' },
            (error: any, result: any) => {
              if (error) return reject(error);
              resolve(result?.secure_url || '');
            },
          );
          stream.end(file.buffer);
        });
      }

      // Invoices
      // @ts-ignore
      if ((req.files as any).invoices) {
        const invoiceFiles = (req.files as any).invoices;
        invoicesUrl = await Promise.all(
          invoiceFiles.map(
            (file: Express.Multer.File) =>
              new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: 'moovsafe/maintenance/invoices' },
                  (error: any, result: any) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                  },
                );
                stream.end(file.buffer);
              }),
          ),
        );
      }

      // Photos
      // @ts-ignore
      if ((req.files as any).photos) {
        const photoFiles = (req.files as any).photos;
        photosUrl = await Promise.all(
          photoFiles.map(
            (file: Express.Multer.File) =>
              new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: 'moovsafe/maintenance/photos' },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                  },
                );
                stream.end(file.buffer);
              }),
          ),
        );
      }
    }

    // Prepare record with safe type conversions
    const recordToInsert = {
      vehicleId,
      ...maintenanceData,
      date: maintenanceData.date ? new Date(maintenanceData.date) : new Date(), // fallback to now
      nextServiceDate: maintenanceData.nextServiceDate
        ? new Date(maintenanceData.nextServiceDate)
        : null,
      odometerImageUrl,
      invoicesUrl,
      photosUrl,
    };

    // Insert into DB
    const [newMaintenanceRecord] = await db
      .insert(maintenanceHistory)
      .values(recordToInsert)
      .returning();

    res.status(201).json({
      message: 'Maintenance record created',
      newMaintenanceRecord,
    });
  } catch (error) {
    console.error('Error creating maintenance record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update an existing maintenance record
export async function updateMaintenance(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate at least one field
    if (!Object.keys(updateData).length && !req.files) {
      return res
        .status(400)
        .json({
          error: 'At least one field or file must be provided to update',
        });
    }

    // Handle file uploads
    if (req.files) {
      // Odometer image
      // @ts-ignore
      if ((req.files as any).odometerImage?.[0]) {
        const file = (req.files as any).odometerImage[0];
        updateData.odometerImageUrl = await new Promise<string>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'moovsafe/maintenance/odometer' },
              (error: any, result: any) => {
                if (error) return reject(error);
                resolve(result?.secure_url || '');
              },
            );
            stream.end(file.buffer);
          },
        );
      }

      // Invoices
      // @ts-ignore
      if ((req.files as any).invoices) {
        const invoiceFiles = (req.files as any).invoices;
        updateData.invoicesUrl = await Promise.all(
          invoiceFiles.map(
            (file: Express.Multer.File) =>
              new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: 'moovsafe/maintenance/invoices' },
                  (error: any, result: any) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                  },
                );
                stream.end(file.buffer);
              }),
          ),
        );
      }

      // Photos
      // @ts-ignore
      if ((req.files as any).photos) {
        const photoFiles = (req.files as any).photos;
        updateData.photosUrl = await Promise.all(
          photoFiles.map(
            (file: Express.Multer.File) =>
              new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: 'moovsafe/maintenance/photos' },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                  },
                );
                stream.end(file.buffer);
              }),
          ),
        );
      }
    }

    // Convert dates if provided
    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.nextServiceDate)
      updateData.nextServiceDate = new Date(updateData.nextServiceDate);

    // Update record
    const [updatedRecord] = await db
      .update(maintenanceHistory)
      .set(updateData)
      .where(eq(maintenanceHistory.id, id))
      .returning();

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }

    res
      .status(200)
      .json({ message: 'Maintenance record updated', updatedRecord });
  } catch (error) {
    console.error('Error updating maintenance record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getByVehicle(req: Request, res: Response) {
  try {
    const { licensePlate } = req.params;

    // Find vehicle by license plate
    const [vehicle] = await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.licensePlate, licensePlate));

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Get all maintenance records for this vehicle
    const records = await db
      .select()
      .from(maintenanceHistory)
      .where(eq(maintenanceHistory.vehicleId, vehicle.id));

    res.status(200).json({
      vehicle: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        licensePlate: vehicle.licensePlate,
      },
      maintenanceRecords: records,
    });
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getMaintenanceHistory(req: Request, res: Response) {
  try {
    // Fetch all maintenance records, sorted by date descending (most recent first)
    const records = await db
      .select()
      .from(maintenanceHistory)
      .orderBy(desc(maintenanceHistory.date));

    res.status(200).json({
      totalRecords: records.length,
      maintenanceRecords: records,
    });
  } catch (error) {
    console.error('Error fetching maintenance history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getMaintenanceById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Fetch the maintenance record by ID
    const [record] = await db
      .select()
      .from(maintenanceHistory)
      .where(eq(maintenanceHistory.id, id));

    if (!record) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching maintenance record by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteMaintenance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch the record first
    const [record] = await db
      .select()
      .from(maintenanceHistory)
      .where(eq(maintenanceHistory.id, id));

    if (!record) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }

    // Delete odometer image
    if (record.odometerImageUrl) {
      const publicId = record.odometerImageUrl.split('/').pop()?.split('.')[0];
      if (publicId)
        await cloudinary.uploader.destroy(
          `moovsafe/maintenance/odometer/${publicId}`,
        );
    }

    // Delete invoices
    if (record.invoicesUrl?.length) {
      const publicIds = record.invoicesUrl.map(
        (url) =>
          `moovsafe/maintenance/invoices/${url.split('/').pop()?.split('.')[0]}`,
      );
      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete photos
    if (record.photosUrl?.length) {
      const publicIds = record.photosUrl.map(
        (url) =>
          `moovsafe/maintenance/photos/${url.split('/').pop()?.split('.')[0]}`,
      );
      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete the DB record
    await db.delete(maintenanceHistory).where(eq(maintenanceHistory.id, id));

    res
      .status(200)
      .json({ message: 'Maintenance record and images deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

import { Request, Response } from 'express';
import { db } from '../../db/index';
import { inspections as inspectionsTable } from '../../db/inspectionSchema';
import { v2 as cloudinary } from 'cloudinary';

import { eq } from 'drizzle-orm';
import { validate as isUUID } from 'uuid';

//get all inspections
export async function getInspections(req: Request, res: Response) {
  try {
    const inspectionData = await db.select().from(inspectionsTable);
    res.json(inspectionData);

    if (!inspectionData) {
      return res.status(404).json({ error: 'No inspections found' });
    }
  } catch (error) {
    console.error('Error fetching inspections:', error);
    res
      .status(500)
      .json({
        error: 'Smothing went Wrong While trying to retrive inspections',
      });
  }
}

//get inspectionByDate
export async function getInspectionByDate(req: Request, res: Response) {
  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid or missing date parameter' });
    }

    const startDate = new Date(`${date}T00:00:00Z`);
    const endDate = new Date(`${date}T23:59:59Z`);

    const { gte, lte, and } = require('drizzle-orm/expressions');
    const inspections = await db
      .select()
      .from(inspectionsTable)
      .where(
        and(
          gte(inspectionsTable.date, startDate),
          lte(inspectionsTable.date, endDate),
        ),
      );

    if (!inspections.length) {
      return res
        .status(404)
        .json({ error: 'No inspections found for the given date' });
    }

    res.status(200).json(inspections);
  } catch (error) {
    console.error('Error fetching inspection by date:', error);
    res
      .status(500)
      .json({
        error: 'Smothing went Wrong While trying to retrive inspection by date',
      });
  }
}

//get inspection by id
export async function getInspectionById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: 'Invalid inspection ID' });
    }

    const [inspectionData] = await db
      .select()
      .from(inspectionsTable)
      .where(eq(inspectionsTable.id, id));
    if (!inspectionData) {
      return res.status(404).json({ error: 'Inspection not found' });
    }
    res.json(inspectionData);
  } catch (error) {
    console.error('Error fetching inspection by ID:', error);
    res
      .status(500)
      .json({
        error: 'Smothing went Wrong While trying to retrive inspection',
      });
  }
}

//create new inspection
export async function createInspection(req: Request, res: Response) {
  try {
    const { vehicleId, ...inspectionData } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ error: 'Vehicle ID is required' });
    }

    let faultsImagesUrl: string[] = [];
    let odometerImageUrl: string | null = null;

    // Handle fault images (multiple)
    if (req.files && (req.files as any).faultsImages) {
      const faultFiles = (req.files as any).faultsImages;
      faultsImagesUrl = await Promise.all(
        faultFiles.map(
          (file: Express.Multer.File) =>
            new Promise<string>((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: 'moovsafe/inspections/faults' },
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

    // Handle odometer image (single)
    if (req.files && (req.files as any).odometerImage) {
      const odometerFile = (req.files as any).odometerImage[0];
      odometerImageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'moovsafe/inspections/odometer' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url || '');
          },
        );
        stream.end(odometerFile.buffer);
      });
    }

    // Insert into DB
    const [newInspection] = await db
      .insert(inspectionsTable)
      .values({
        vehicleId,
        ...inspectionData,
        faultsImagesUrl,
        odometerImageUrl,
      })
      .returning();

    res.status(201).json(newInspection);
  } catch (error) {
    console.error('Error creating inspection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//delete inspection
export const deleteInspection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch the inspection first
    const [inspection] = await db
      .select()
      .from(inspectionsTable)
      .where(eq(inspectionsTable.id, id));

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    // Delete odometer image
    if (inspection.odometerImageUrl) {
      const publicId = inspection.odometerImageUrl
        .split('/')
        .pop()
        ?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(
          `moovsafe/inspections/odometer/${publicId}`,
        );
      }
    }

    // Delete fault images
    if (inspection.faultsImagesUrl?.length) {
      const publicIds = inspection.faultsImagesUrl.map(
        (url) =>
          `moovsafe/inspections/faults/${url.split('/').pop()?.split('.')[0]}`,
      );
      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete the DB record
    await db.delete(inspectionsTable).where(eq(inspectionsTable.id, id));

    res
      .status(200)
      .json({ message: 'Inspection record and images deleted successfully' });
  } catch (error) {
    console.error('Error deleting inspection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

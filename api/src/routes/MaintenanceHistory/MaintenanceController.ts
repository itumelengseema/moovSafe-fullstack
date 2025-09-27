import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { db } from "../../db/index";
import  { maintenanceHistory } from "../../db/maintenance_historySchema";


export async function createMaintenance(req: Request, res: Response) {
  try {
    const { ...maintenanceData } = req.body;

    // Validate required fields
    if (!Object.keys(maintenanceData).length) {
      return res.status(400).json({ error: "All fields are required" });
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
            { folder: "moovsafe/maintenance/odometer" },
            (error: any, result: any) => {
              if (error) return reject(error);
              resolve(result?.secure_url || "");
            }
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
                  { folder: "moovsafe/maintenance/invoices" },
                  (error: any, result: any) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || "");
                  }
                );
                stream.end(file.buffer);
              })
          )
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
                  { folder: "moovsafe/maintenance/photos" },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || "");
                  }
                );
                stream.end(file.buffer);
              })
          )
        );
      }
    }

    // Prepare record with safe type conversions
    const recordToInsert = {
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
      message: "Maintenance record created",
      newMaintenanceRecord,
    });
  } catch (error) {
    console.error("Error creating maintenance record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

        



export function getbyVehicle(req: Request, res: Response) {
    res.send("Maintenance records by vehicle");
}

export function getMaintenanceHistory(req: Request, res: Response) {
    res.send("Maintenance history");
};

export function getMaintenanceById(req: Request, res: Response) {
    res.send("Maintenance record by ID");
};


export function updateMaintenance(req: Request, res: Response) {
    res.send("Maintenance record updated");
};

export const deleteMaintenance = (req: Request, res: Response) => {
    res.send("Maintenance record deleted");
};

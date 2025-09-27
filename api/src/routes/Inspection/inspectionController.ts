import { Request,Response } from "express";
import { db } from "../../db/index";
import {inspections as inspectionsTable} from "../../db/inspectionSchema";
import { v2 as cloudinary } from "cloudinary";
import  { upload } from "../../middleware/upload";
import { buffer } from "stream/consumers";



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

//create new inspection
export async function createInspection(req: Request, res: Response) {
  try {
    const { vehicleId, ...inspectionData } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ error: "Vehicle ID is required" });
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
                { folder: "moovsafe/inspections/faults" },
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

    // Handle odometer image (single)
    if (req.files && (req.files as any).odometerImage) {
      const odometerFile = (req.files as any).odometerImage[0];
      odometerImageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "moovsafe/inspections/odometer" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url || "");
          }
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
    console.error("Error creating inspection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


//update inspection
export const updateInspection = (req: Request, res: Response) => {
  res.send("Inspection updated");
};
//delete inspection
export const deleteInspection = (req: Request, res: Response) => {
  res.send("Inspection deleted");
};

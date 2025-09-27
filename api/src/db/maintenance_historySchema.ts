import { pgTable, text, uuid, integer, varchar ,timestamp} from "drizzle-orm/pg-core";

export  const maintenanceHistory = pgTable("maintenance_historyTable", {
  id: uuid("id").defaultRandom().primaryKey(),
  vehicleId: uuid("vehicle_id").notNull(),


  date: timestamp("date").defaultNow().notNull(),
  mileage: integer("mileage").notNull(),// Mileage at the time of maintenance
  odometerImageUrl: varchar("odometer_image_url", { length: 255 }), // URL to odometer image
  typeOfMaintenance: varchar("maintenance_type", { length: 100 }).notNull(), // e.g., Oil Change, Brake Replacement, DIY, Workshop
  description: text("description"),// Detailed description of the maintenance work done

  performedBy: varchar("performed_by", { length: 50 }).notNull(), // "DIY" | "Workshop"
  serviceCenter: varchar("service_center", { length: 255 }), // If workshop
  cost: integer("cost"),

  // Photos and documents
  parts: text("parts").array(), // If DIY, list of parts used
  invoicesUrl: text("invoices_url").array(), // Uploaded invoices/receipts
  photosUrl: text("photos_url").array(), // Extra photos (before/after repair, odometer, etc.)

  // Next service 
  nextServiceDate: timestamp("next_service_date"), // Optional
  nextServiceMileage: integer("next_service_mileage"), // Optional
});

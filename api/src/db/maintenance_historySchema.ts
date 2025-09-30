import {
  pgTable,
  text,
  uuid,
  integer,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { da } from 'zod/v4/locales/index.cjs';

export const maintenanceHistory = pgTable('maintenance_historyTable', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').notNull(),

  date: timestamp('date').defaultNow(),
  mileage: integer('mileage').notNull(), // Mileage at the time of maintenance
  odometerImageUrl: varchar('odometer_image_url', { length: 255 }), // URL to odometer image
  typeOfMaintenance: varchar('maintenance_type', { length: 100 }).notNull(), // e.g., Oil Change, Brake Replacement, DIY, Workshop
  description: text('description'), // Detailed description of the maintenance work done

  performedBy: varchar('performed_by', { length: 50 }).notNull(), // "DIY" | "Workshop"
  serviceCenter: varchar('service_center', { length: 255 }), // If workshop
  cost: integer('cost'),

  // Photos and documents
  parts: text('parts').array(), // If DIY, list of parts used
  invoicesUrl: text('invoices_url').array(), // Uploaded invoices/receipts
  photosUrl: text('photos_url').array(), // Extra photos (before/after repair, odometer, etc.)

  // Next service
  nextServiceDate: timestamp('next_service_date'), // Optional
  nextServiceMileage: integer('next_service_mileage'), // Optional
});

export const createMaintenanceSchema = createInsertSchema(maintenanceHistory)
  .omit({ id: true })
  .extend({
    vehicleId: z.string().uuid('vehicleId must be a valid UUID'),
    mileage: z.number().min(0, 'Mileage must be non-negative'),
    cost: z.number().min(0, 'Cost must be non-negative').optional(),
    nextServiceMileage: z
      .number()
      .min(0, 'Next service mileage must be non-negative')
      .optional(),
    nextServiceDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
  });

export const updateMaintenanceSchema = createInsertSchema(maintenanceHistory)
  .omit({ id: true })
  .extend({
    vehicleId: z.string().uuid('vehicleId must be a valid UUID'),
    mileage: z.number().min(0, 'Mileage must be non-negative'),
    cost: z.number().min(0, 'Cost must be non-negative').optional(),
    nextServiceMileage: z
      .number()
      .min(0, 'Next service mileage must be non-negative')
      .optional(),
    nextServiceDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
  })
  .partial();

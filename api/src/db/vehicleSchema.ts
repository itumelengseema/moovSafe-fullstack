import {
  pgTable,
  text,
  uuid,
  integer,
  varchar,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const vehicles = pgTable('vehiclesTable', {
  id: uuid('id').defaultRandom().primaryKey(),
  make: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  year: integer('year').notNull(),
  vin: varchar({ length: 50 }).notNull().unique(),
  engineNumber: varchar({ length: 50 }).notNull(),
  licensePlate: varchar({ length: 20 }).notNull().unique(),
  fuelType: varchar({ length: 100 }).notNull(),
  transmission: varchar({ length: 50 }).notNull(),
  currentMileage: integer('currentMileage').notNull(),
  colour: varchar({ length: 50 }).notNull(),
});

export const createVehicleSchema = createInsertSchema(vehicles).omit({
  id: true, // Omit id for creation as it is auto-generated
});

export const updateVehicleSchema = createInsertSchema(vehicles)
  .omit({
    id: true, // Omit id for updates as it should not be changed
  })
  .partial(); // Make all fields optional for updates

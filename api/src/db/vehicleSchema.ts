// drizzle/schema/vehicle.ts
import { pgTable, text, uuid, integer, varchar } from "drizzle-orm/pg-core";


export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(), 
  make: varchar( { length: 255 }).notNull(),
  model: varchar( { length: 255 }).notNull(),
  year: integer("year").notNull(),
  vin: varchar( { length: 50 }).notNull().unique(), 
  engineNumber: varchar( { length: 50 }).notNull(),
  licensePlate: varchar( { length: 20 }).notNull().unique(),
  fuelType: varchar( { length: 100 }).notNull(),
  transmission: varchar( { length: 50 }).notNull(),
  currentMileage: integer("current_mileage").notNull(),
  colour: varchar( { length: 50 }).notNull(),
});

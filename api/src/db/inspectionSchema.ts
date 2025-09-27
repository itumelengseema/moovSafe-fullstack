// drizzle/schema/inspection.ts
import { pgTable, uuid, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";

export const inspections = pgTable("inspectionTable", {
  id: uuid("id").defaultRandom().primaryKey(),
  vehicleId: uuid("vehicle_id").notNull(), // FK to vehicles.id
  date: timestamp("date").defaultNow().notNull(),
  mileage: integer("mileage").notNull(),

  // Overall condition
  overallCondition: varchar("overall_condition", { length: 100 }).notNull(), // Good | Fair | Poor

  // Exterior
  exteriorWindshield: varchar("exterior_windshield", { length: 50 }),
  exteriorMirrors: varchar("exterior_mirrors", { length: 50 }),
  exteriorLights: varchar("exterior_lights", { length: 50 }),
  exteriorTires: varchar("exterior_tires", { length: 50 }),

  // Engine & fluids
  engineOil: varchar("engine_oil", { length: 50 }), // Good | Low | Change Needed
  engineCoolant: varchar("engine_coolant", { length: 50 }), // Good | Low | Change Needed
  engineBrakeFluid: varchar("engine_brake_fluid", { length: 50 }), // Good | Low | Change Needed
  engineTransmissionFluid: varchar("engine_transmission_fluid", { length: 50 }), // Good | Low | Change Needed
  enginePowerSteering: varchar("engine_power_steering", { length: 50 }), // Good | Low | Change Needed
  engineBattery: varchar("engine_battery", { length: 50 }), // Good | Low | Change Needed

  // Interior
  interiorSeats: varchar("interior_seats", { length: 50 }), // Good | Fair | Poor
  interiorSeatbelts: varchar("interior_seatbelts", { length: 50 }), // Good | Fair | Poor
  interiorHorn: varchar("interior_horn", { length: 50 }), // Functional | Non-Functional
  interiorAC: varchar("interior_ac", { length: 50 }), // Functional | Non-Functional
  windows: varchar("windows", { length: 50 }), // Functional | Non-Functional

  // Mechanical / Safety
  brakes: varchar("brakes", { length: 50 }), // Good | Fair | Poor
  exhaust: varchar("exhaust", { length: 50 }), // Good | Fair | Poor
  lightsIndicators: varchar("lights_indicators", { length: 50 }), // Functional | Non-Functional

  // Optional / Other
  spareTire: varchar("spare_tire", { length: 50 }), // Present | Absent | Poor | Good
  jack: varchar("jack", { length: 50 }), // Present | Absent
  wheelSpanner: varchar("wheel_spanner", { length: 50 }), // Present | Absent
  wheelLockNutTool: varchar("wheel_lock_nut_tool", { length: 50 }), // Present | Absent
  fireExtinguisher: varchar("fire_extinguisher", { length: 50 }), // Present | Absent

  // Notes
  notes: text("notes"), // General notes about the inspection

  // Photos
  faultsImagesUrl: text("faults_images_url").array(), // Array of URLs to fault images
  odometerImageUrl: varchar("odometer_image_url", { length: 255 }), // URL to odometer image
});

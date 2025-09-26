ALTER TABLE "vehicles" RENAME TO "vehiclesTable";--> statement-breakpoint
ALTER TABLE "vehiclesTable" DROP CONSTRAINT "vehicles_vin_unique";--> statement-breakpoint
ALTER TABLE "vehiclesTable" DROP CONSTRAINT "vehicles_licensePlate_unique";--> statement-breakpoint
ALTER TABLE "vehiclesTable" ADD CONSTRAINT "vehiclesTable_vin_unique" UNIQUE("vin");--> statement-breakpoint
ALTER TABLE "vehiclesTable" ADD CONSTRAINT "vehiclesTable_licensePlate_unique" UNIQUE("licensePlate");
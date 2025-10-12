ALTER TABLE "vehiclesTable" ADD COLUMN "status" varchar(20) DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "vehiclesTable" ADD COLUMN "lastInspectionDate" varchar(50);
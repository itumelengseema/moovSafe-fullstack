CREATE TABLE "maintenance_historyTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"mileage" integer NOT NULL,
	"odometer_image_url" varchar(255),
	"maintenance_type" varchar(100) NOT NULL,
	"description" text,
	"performed_by" varchar(50) NOT NULL,
	"service_center" varchar(255),
	"cost" integer,
	"parts" text[],
	"invoices_url" text[],
	"photos_url" text[],
	"next_service_date" timestamp,
	"next_service_mileage" integer
);

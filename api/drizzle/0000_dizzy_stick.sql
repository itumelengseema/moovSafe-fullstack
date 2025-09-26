CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"make" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"vin" varchar(50) NOT NULL,
	"engineNumber" varchar(50) NOT NULL,
	"licensePlate" varchar(20) NOT NULL,
	"fuelType" varchar(100) NOT NULL,
	"transmission" varchar(50) NOT NULL,
	"current_mileage" integer NOT NULL,
	"colour" varchar(50) NOT NULL,
	CONSTRAINT "vehicles_vin_unique" UNIQUE("vin"),
	CONSTRAINT "vehicles_licensePlate_unique" UNIQUE("licensePlate")
);

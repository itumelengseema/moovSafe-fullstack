-- Insert sample vehicles into the database
INSERT INTO "vehiclesTable" (
  "make", "model", "year", "vin", "engineNumber", "licensePlate", 
  "fuelType", "transmission", "currentMileage", "colour", "imageUrl", 
  "vehicleType", "status", "lastInspectionDate"
) VALUES
-- Toyota Camry
(
  'Toyota', 'Camry', 2021, '1234567890ABCDEFG', 'ENG123456', 'ABC-123',
  'Petrol', 'Automatic', 45000, 'Silver', 
  'https://res.cloudinary.com/dm5v9praz/image/upload/v1760046545/2_dsulb9.png',
  'Sedan', 'active', '2024-01-15'
),
-- Ford F-150
(
  'Ford', 'F-150', 2020, 'ABCDEFG1234567890', 'ENG789012', 'XYZ-789',
  'Petrol', 'Manual', 62000, 'Blue',
  'https://res.cloudinary.com/dm5v9praz/image/upload/v1760046563/5_yuras8.png',
  'Truck', 'active', '2024-02-10'
),
-- Honda Accord
(
  'Honda', 'Accord', 2022, 'HND567890123456XX', 'ENG345678', 'DEF-456',
  'Hybrid', 'Automatic', 25000, 'White',
  'https://res.cloudinary.com/dm5v9praz/image/upload/v1760046545/2_dsulb9.png',
  'Sedan', 'active', '2024-03-20'
),
-- BMW X5
(
  'BMW', 'X5', 2023, 'BMW123456789ABCDE', 'ENG456789', 'GHI-789',
  'Petrol', 'Automatic', 15000, 'Black',
  'https://res.cloudinary.com/dm5v9praz/image/upload/v1760046562/3_kl0gid.png',
  'SUV', 'active', '2024-04-05'
),
-- Volkswagen Golf
(
  'Volkswagen', 'Golf', 2021, 'VW9876543210FEDCB', 'ENG567890', 'JKL-012',
  'Petrol', 'Manual', 38000, 'Red',
  'https://res.cloudinary.com/dm5v9praz/image/upload/v1760046545/1_qgdrxu.png',
  'Hatchback', 'active', NULL
);

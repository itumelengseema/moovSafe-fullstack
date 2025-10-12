// Shared type definitions for the moovSafe mobile app

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  imageUrl: string;
  currentMileage: number;
  fuelType: string;
  vin?: string;
  engineNumber?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  vin: string;
  engineNumber: string;
  licensePlate: string;
  fuelType: string;
  currentMileage: string;
  imageUrl?: string;
}

export interface Inspection {
  id: string;
  vehicleId: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  mileage?: number;
  notes?: string;
  faultsImages?: string[];
}

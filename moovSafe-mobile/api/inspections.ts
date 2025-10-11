// API functions for inspections
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io';

export interface CreateInspectionData {
    vehicleId: string;
    mileage: number;
    overallCondition: string;
    exteriorWindshield?: string;
    exteriorMirrors?: string;
    exteriorLights?: string;
    exteriorTires?: string;
    engineOil?: string;
    engineCoolant?: string;
    engineBrakeFluid?: string;
    engineTransmissionFluid?: string;
    enginePowerSteering?: string;
    engineBattery?: string;
    interiorSeats?: string;
    interiorSeatbelts?: string;
    interiorHorn?: string;
    interiorAC?: string;
    windows?: string;
    brakes?: string;
    exhaust?: string;
    lightsIndicators?: string;
    spareTire?: string;
    jack?: string;
    wheelSpanner?: string;
    wheelLockNutTool?: string;
    fireExtinguisher?: string;
    notes?: string;
    faultsImages?: File[];
    odometerImage?: File;
}

export interface Inspection {
    id: string;
    vehicleId: string;
    date: string;
    mileage: number;
    overallCondition: string;
    exteriorWindshield?: string;
    exteriorMirrors?: string;
    exteriorLights?: string;
    exteriorTires?: string;
    engineOil?: string;
    engineCoolant?: string;
    engineBrakeFluid?: string;
    engineTransmissionFluid?: string;
    enginePowerSteering?: string;
    engineBattery?: string;
    interiorSeats?: string;
    interiorSeatbelts?: string;
    interiorHorn?: string;
    interiorAC?: string;
    windows?: string;
    brakes?: string;
    exhaust?: string;
    lightsIndicators?: string;
    spareTire?: string;
    jack?: string;
    wheelSpanner?: string;
    wheelLockNutTool?: string;
    fireExtinguisher?: string;
    notes?: string;
    faultsImagesUrl?: string[];
    odometerImageUrl?: string;
}

// Fetch all inspections
export const fetchInspections = async (): Promise<Inspection[]> => {
    const response = await fetch(`${API_BASE_URL}/api/inspections`);

    if (!response.ok) {
        throw new Error('Failed to fetch inspections');
    }

    return response.json();
};

// Fetch inspection by ID
export const fetchInspectionById = async (id: string): Promise<Inspection> => {
    const response = await fetch(`${API_BASE_URL}/api/inspections/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch inspection');
    }

    return response.json();
};

// Fetch inspections by date
export const fetchInspectionsByDate = async (date: string): Promise<Inspection[]> => {
    const response = await fetch(`${API_BASE_URL}/api/inspections/date?date=${date}`);

    if (!response.ok) {
        throw new Error('Failed to fetch inspections by date');
    }

    return response.json();
};

// Create new inspection
export const createInspection = async (inspectionData: CreateInspectionData): Promise<Inspection> => {
    const formData = new FormData();

    // Add text fields
    Object.entries(inspectionData).forEach(([key, value]) => {
        if (key !== 'faultsImages' && key !== 'odometerImage' && value !== undefined) {
            formData.append(key, value.toString());
        }
    });

    // Add fault images
    if (inspectionData.faultsImages) {
        inspectionData.faultsImages.forEach((file, index) => {
            formData.append('faultsImages', file);
        });
    }

    // Add odometer image
    if (inspectionData.odometerImage) {
        formData.append('odometerImage', inspectionData.odometerImage);
    }

    const response = await fetch(`${API_BASE_URL}/api/inspections`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to create inspection');
    }

    return response.json();
};

// Delete inspection
export const deleteInspection = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/inspections/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete inspection');
    }
};

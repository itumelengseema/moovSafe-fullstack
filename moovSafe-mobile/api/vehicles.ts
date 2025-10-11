const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function vehiclesList() {
    try {

        if (!API_URL) {
            throw new Error("API URL is not configured");
        }

        const res = await fetch(`${API_URL}/api/vehicles`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error in vehiclesList:", error);
        throw error;
    }
}


export async function fetchVehicleById(id: string) {
    try {
        if (!API_URL) {
            throw new Error("API URL is not configured");
        }

        const res = await fetch(`${API_URL}/api/vehicles/${id}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error in fetchVehicleById:", error);
        throw error;
    }
}

export async function createVehicle(vehicleData: {
    make: string;
    model: string;
    year: string;
    vin: string;
    engineNumber: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    currentMileage: string;
    colour: string;
    vehicleType: string;
}) {
    try {
        if (!API_URL) {
            throw new Error("API URL is not configured");
        }

        const response = await fetch(`${API_URL}/api/vehicles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...vehicleData,
                year: parseInt(vehicleData.year),
                currentMileage: parseInt(vehicleData.currentMileage),
                status: "active", // Default status
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in createVehicle:", error);
        throw error;
    }
}

export async function updateVehicle(id: string, vehicleData: {
    make: string;
    model: string;
    year: string;
    vin: string;
    engineNumber: string;
    licensePlate: string;
    fuelType: string;
    transmission: string;
    currentMileage: string;
    colour: string;
    vehicleType: string;
    status: string;
}) {
    try {
        if (!API_URL) {
            throw new Error("API URL is not configured");
        }

        const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...vehicleData,
                year: parseInt(vehicleData.year),
                currentMileage: parseInt(vehicleData.currentMileage),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in updateVehicle:", error);
        throw error;
    }
}

export async function deleteVehicle(id: string) {
    try {
        if (!API_URL) {
            throw new Error("API URL is not configured");
        }

        const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in deleteVehicle:", error);
        throw error;
    }
}
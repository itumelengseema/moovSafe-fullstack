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
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function vehiclesList() {
  try {
    if (!API_URL) {
      console.error('Vehicle API Error: API URL is not configured');
      throw new Error('API URL is not configured. Please check your environment variables.');
    }

    console.log('Fetching vehicles from:', `${API_URL}/api/vehicles`);

    const res = await fetch(`${API_URL}/api/vehicles`);

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.error(`Vehicle API Error: HTTP ${res.status}:`, errorText);
      throw new Error(`Failed to fetch vehicles: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Vehicles fetched successfully:', data?.length || 0, 'items');

    return data;
  } catch (error) {
    console.error('Vehicle fetch error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching vehicles');
  }
}

export async function fetchVehicleById(id: string) {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const res = await fetch(`${API_URL}/api/vehicles/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data;
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
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${API_URL}/api/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...vehicleData,
      year: parseInt(vehicleData.year, 10),
      currentMileage: parseInt(vehicleData.currentMileage, 10),
      status: 'active', // Default status
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

export async function updateVehicle(
  id: string,
  vehicleData: {
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
  }
) {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...vehicleData,
      year: parseInt(vehicleData.year, 10),
      currentMileage: parseInt(vehicleData.currentMileage, 10),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

export async function deleteVehicle(id: string) {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

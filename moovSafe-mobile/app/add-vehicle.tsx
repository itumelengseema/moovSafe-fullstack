import { useRouter } from 'expo-router';
import { useEffect } from 'react';

// Redirect component to maintain backward compatibility
export default function AddVehicleRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new vehicle management page
    router.replace('/vehicle');
  }, [router]);

  return null;
}

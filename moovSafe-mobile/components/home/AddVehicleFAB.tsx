import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';

export default function AddVehicleFAB() {
  return (
    <Link href="/vehicle" asChild>
      <Fab size="lg" placement="bottom right" className="mb-6 mr-6">
        <FabIcon>
          <Ionicons name="add" size={24} color="white" />
        </FabIcon>
        <FabLabel>Add Vehicle</FabLabel>
      </Fab>
    </Link>
  );
}

import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface VehicleStatsProps {
  vehicleCount: number;
  maxVehicles?: number;
}

export default function VehicleStats({ vehicleCount, maxVehicles = 5 }: VehicleStatsProps) {
  return (
    <HStack className="justify-between items-center">
      <Heading size="xl" className="font-bold text-typography-900">
        My Vehicles
      </Heading>
      <Badge variant="outline" action="muted">
        <Text className="text-xs font-medium">
          {vehicleCount}/{maxVehicles} vehicles
        </Text>
      </Badge>
    </HStack>
  );
}

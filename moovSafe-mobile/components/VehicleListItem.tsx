import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Badge } from '@/components//ui/badge';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface VehicleListItemProps {
  vehicle: any;
}

export default function VehicleListItem({ vehicle }: VehicleListItemProps) {
  return (
    <Link href={`/vehicle/${vehicle.id}`} asChild>
      <Pressable>
        <Card size="lg" variant="filled" className="mx-2 p-6 bg-gray-100 w-80">
          <VStack space="md">
            {/* Header Section */}
            <HStack className="justify-between items-center">
              <VStack space="xs" className="flex-1">
                <Heading size="md" className="text-typography-900 font-semibold">
                  {vehicle.make} {vehicle.model}
                </Heading>
                <Text className="text-sm text-typography-600">{vehicle.licensePlate}</Text>
              </VStack>

              {/* Status Badge using Gluestack Badge */}
              <Box className="flex-row items-center space-x-2">
                {/* Add your action buttons here if needed */}
                <Badge
                  size="sm"
                  variant={vehicle.status === 'active' ? 'solid' : 'outline'}
                  action={vehicle.status === 'active' ? 'success' : 'muted'}
                  className={
                    vehicle.status === 'active'
                      ? 'bg-green-600 border-green-600'
                      : 'bg-gray-300 border-gray-400'
                  }
                >
                  <Text className="text-xs font-medium text-white">
                    {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                  </Text>
                </Badge>
              </Box>
            </HStack>

            {/* Stats Section */}
            <VStack space="sm">
              {/* Mileage */}
              <HStack space="sm" className="items-center">
                <Ionicons name="speedometer-outline" size={16} color="black" />
                <Text className="text-sm text-typography-900 font-medium">
                  {vehicle.currentMileage?.toLocaleString() || 0} km
                </Text>
              </HStack>

              {/* Fuel Type */}
              <HStack space="sm" className="items-center">
                <FontAwesome5 name="gas-pump" size={14} color="black" />
                <Text className="text-sm text-typography-900 font-medium capitalize">
                  {vehicle.fuelType || 'N/A'} • {vehicle.transmission || 'N/A'}
                </Text>
              </HStack>

              {/* Year */}
              {vehicle.year && (
                <HStack space="sm" className="items-center">
                  <Ionicons name="calendar-outline" size={16} color="black" />
                  <Text className="text-sm text-typography-900 font-medium">{vehicle.year}</Text>
                </HStack>
              )}

              {/* Last Inspection Date */}
              <HStack space="sm" className="items-center">
                <Ionicons name="checkmark-circle-outline" size={16} color="black" />
                <Text className="text-sm text-typography-900 font-medium">
                  Last:{' '}
                  {vehicle.lastInspectionDate
                    ? new Date(vehicle.lastInspectionDate).toLocaleDateString()
                    : 'Never'}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </Pressable>
    </Link>
  );
}

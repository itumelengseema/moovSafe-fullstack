import { Ionicons } from '@expo/vector-icons';
import type React from 'react';
import { TouchableOpacity } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import type { Vehicle } from '@/types/index';

interface VehicleCardProps extends React.ComponentProps<typeof Card> {
  vehicle: Vehicle;
  onEdit: (vehicleId: string) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onEdit, onDelete, ...props }: VehicleCardProps) {
  return (
    <Card className="p-4 mb-3">
      <HStack space="md" className="items-center">
        {/* Vehicle Image */}
        <Image
          source={{ uri: vehicle.imageUrl }}
          className="w-16 h-16 rounded-lg"
          alt={`${vehicle.make} ${vehicle.model}`}
        />

        {/* Vehicle Info */}
        <VStack space="xs" className="flex-1">
          <Text className="font-semibold text-lg">
            {vehicle.make} {vehicle.model}
          </Text>
          <Text className="text-gray-600">{vehicle.licensePlate}</Text>
          <HStack space="sm" className="items-center">
            <Text className="text-gray-500 text-sm">
              {vehicle.currentMileage?.toLocaleString()} km • {vehicle.fuelType}
            </Text>
            <Badge
              size="sm"
              variant="solid"
              action={vehicle.status === 'active' ? 'success' : 'muted'}
            >
              <Text className="text-xs font-medium text-white">
                {vehicle.status === 'active' ? 'Active' : 'Inactive'}
              </Text>
            </Badge>
          </HStack>
        </VStack>

        {/* Action Buttons */}
        <HStack space="xs">
          <TouchableOpacity
            onPress={() => onEdit(vehicle.id)}
            className="bg-gray-900 px-3 py-2 rounded-md"
          >
            <HStack space="xs" className="items-center">
              <Ionicons name="pencil" size={14} color="white" />
              <Text className="text-white text-xs font-medium">Edit</Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(vehicle)}
            className="bg-red-600 px-3 py-2 rounded-md"
          >
            <HStack space="xs" className="items-center">
              <Ionicons name="trash" size={14} color="white" />
              <Text className="text-white text-xs font-medium">Delete</Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </Card>
  );
}

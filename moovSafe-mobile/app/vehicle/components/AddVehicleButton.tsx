import { Ionicons } from '@expo/vector-icons';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface AddVehicleButtonProps {
  onPress: () => void;
  canAddMore: boolean;
  vehicleCount: number;
  maxVehicles: number;
}

export default function AddVehicleButton({
  onPress,
  canAddMore,
  vehicleCount,
  maxVehicles,
}: AddVehicleButtonProps) {
  return (
    <VStack space="md">
      <Button
        variant="solid"
        action="primary"
        onPress={onPress}
        disabled={!canAddMore}
        className="mt-4"
      >
        <HStack space="sm" className="items-center">
          <Ionicons name="add" size={20} color="white" />
          <ButtonText className="text-white font-medium">Add Vehicle</ButtonText>
        </HStack>
      </Button>

      {!canAddMore && (
        <Card size="sm" variant="outline" className="bg-error-50">
          <Box className="p-3">
            <Text className="text-error-600 text-sm text-center">
              You've reached the maximum limit of {maxVehicles} vehicles.
            </Text>
          </Box>
        </Card>
      )}
    </VStack>
  );
}

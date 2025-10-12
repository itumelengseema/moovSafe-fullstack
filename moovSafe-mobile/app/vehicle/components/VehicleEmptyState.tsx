import { Ionicons } from '@expo/vector-icons';

import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function VehicleEmptyState() {
  return (
    <Card size="lg" variant="outline" className="bg-white">
      <VStack space="md" className="items-center p-8">
        <Box className="bg-background-100 p-6 rounded-full">
          <Ionicons name="car-outline" size={48} color="#9CA3AF" />
        </Box>
        <VStack space="sm" className="items-center">
          <Heading size="md" className="text-typography-900">
            No Vehicles Yet
          </Heading>
          <Text className="text-center text-typography-600">
            Add your first vehicle to get started with vehicle management
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}

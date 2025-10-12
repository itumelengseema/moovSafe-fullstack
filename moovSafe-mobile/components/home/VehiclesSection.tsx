import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import VehicleListItem from './VehicleListItem';

interface Vehicle {
  id: string;
  [key: string]: any;
}

interface VehiclesSectionProps {
  vehicles?: Vehicle[];
}

export default function VehiclesSection({ vehicles }: VehiclesSectionProps) {
  return (
    <VStack space="md">
      <HStack className="justify-between items-center">
        <Heading size="lg" className="font-semibold text-typography-900">
          Your Vehicles
        </Heading>
        <Text className="text-sm text-typography-600">{vehicles?.length || 0} vehicles</Text>
      </HStack>

      {vehicles?.length ? (
        <FlatList
          data={vehicles}
          renderItem={({ item }: { item: Vehicle }) => <VehicleListItem vehicle={item} />}
          keyExtractor={(item: any) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        />
      ) : (
        <Card size="lg" variant="elevated" className="bg-white">
          <VStack space="lg" className="items-center p-8">
            <Box className="bg-typography-50 p-4 rounded-full">
              <Ionicons name="car-outline" size={32} color="black" />
            </Box>
            <VStack space="sm" className="items-center">
              <Heading size="lg" className="text-typography-900">
                No Vehicles Found
              </Heading>
              <Text className="text-typography-500 text-center">
                Add your first vehicle to get started with fleet management
              </Text>
            </VStack>
          </VStack>
        </Card>
      )}
    </VStack>
  );
}

import { useState } from 'react';
import { FlatList } from 'react-native';
import alertsData from '@/assets/alerts.json';
import AlertsListItem from '@/components/AlertsListItem';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  carId: string;
  licensePlate: string;
  priority: string;
}

export default function AlertsSection() {
  const [_selectedIndex, setSelectedIndex] = useState(0);

  return (
    <VStack space="md">
      <HStack className="justify-between items-center">
        <Heading size="lg" className="font-semibold text-typography-900">
          Recent Alerts
        </Heading>
        <Text className="text-sm text-typography-600">{alertsData.length} alerts</Text>
      </HStack>

      <Card size="lg" variant="elevated" className="bg-white">
        <FlatList
          data={alertsData}
          renderItem={({ item, index }: { item: Alert; index: number }) => (
            <AlertsListItem alert={item} onPress={() => setSelectedIndex(index)} />
          )}
          keyExtractor={(item: Alert) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </Card>
    </VStack>
  );
}

import { ScrollView, FlatList } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import Vehicles from '../assets/vehicles.json';
import vehicleImages from '../assets/Vehicles/vehicleImages.js';
import alerts from '../assets/alerts.json';
import VehicleListItem from '../components/VehicleListItem';
import AlertsItem from '../components/AlertsListItem';
import QuickStatsListItem from '@/components/QuickStatsListItem';

export default function HomeScreen() {
  return (
    <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
            <Heading size="xl">Quick Stats</Heading>
<FlatList
  horizontal
  data={[
    { stat: " Total Vehicles", value: Vehicles.length, type: "fuel" as const },
    { stat: " Total Alerts", value: alerts.length, type: "alerts" as const },
    { stat: " Avg Mileage (km)", value: Math.floor(Vehicles.reduce((acc, v) => acc + v.currentMileage, 0) / Vehicles.length), type: "mileage" as const },
  ]}
  keyExtractor={(item) => item.stat}
  renderItem={({ item }) => (
    <QuickStatsListItem stat={item.stat} value={item.value} type={item.type} />
  )}
/>
      <VStack space="md">
        <Heading size="xl">My Vehicles</Heading>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VehicleListItem vehicle={item} vehicleImages={vehicleImages} />
          )}
        />

        <Heading size="xl">Attention Required</Heading>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AlertsItem alert={item} />}
          scrollEnabled={false} // disable inner scroll so ScrollView scrolls
        />

  
      </VStack>
    </ScrollView>
  );
}

import { Link } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import QuickStatsListItem from "@/components/QuickStatsListItem";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import alerts from "../../assets/alerts.json";
import vehicleImages from "../../assets/Vehicles/vehicleImages.js";

import AlertsItem from "../../components/AlertsListItem";
import VehicleListItem from "../../components/VehicleListItem";

import { vehiclesList } from "@/api/vehicles";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";

interface Vehicle {
  id: string;
  [key: string]: any;
}

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehiclesList,
  });
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <ScrollView className="p-5 flex-1" showsVerticalScrollIndicator={false}>
        <Text>
          Error fetching vehicles:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView className="p-5 flex-1" showsVerticalScrollIndicator={false}>
      {/* <Heading size="xl">Quick Stats</Heading>
      <FlatList
        horizontal
        data={[
          {
            stat: ' Total Vehicles',
            value: Vehicles.length,
            type: 'fuel' as const,
          },
          {
            stat: ' Total Alerts',
            value: alerts.length,
            type: 'alerts' as const,
          },
          {
            stat: ' Avg Mileage (km)',
            value: Math.floor(
              Vehicles.reduce((acc, v) => acc + v.currentMileage, 0) /
                Vehicles.length,
            ),
            type: 'mileage' as const,
          },
        ]}
        keyExtractor={(item) => item.stat}
        renderItem={({ item }) => (
          <QuickStatsListItem
            stat={item.stat}
            value={item.value}
            type={item.type}
          />
        )}
      /> */}
      <VStack space="md">
        <Heading size="xl">My Vehicles</Heading>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
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

        <Link href="/reports">Go to Reports Screen</Link>
      </VStack>
    </ScrollView>
  );
}

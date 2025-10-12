import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { vehiclesList } from "@/api/vehicles";
import AddVehicleFAB from "@/components/home/AddVehicleFAB";
import AlertsSection from "@/components/home/AlertsSection";
import ErrorState from "@/components/home/ErrorState";
import LoadingState from "@/components/home/LoadingState";
import ReportsNavButton from "@/components/home/ReportsNavButton";
import VehiclesSection from "@/components/home/VehiclesSection";
import { VStack } from "@/components/ui/vstack";
import { useHomeStats } from "@/hooks/useHomeStats";

interface Vehicle {
  id: string;
  [key: string]: any;
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: vehicles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehiclesList,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const _statsData = useHomeStats(vehicles);

  if (isLoading && !vehicles) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <View className="flex-1 bg-background-0">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack space="lg" className="p-5">
          <VehiclesSection vehicles={vehicles} />
          <AlertsSection />
          <ReportsNavButton />
        </VStack>
      </ScrollView>

      <AddVehicleFAB />
    </View>
  );
}

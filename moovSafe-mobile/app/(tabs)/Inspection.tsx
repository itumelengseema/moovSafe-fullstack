import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useInspectionStore } from "@/store/inspectionStore";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { vehiclesList } from "@/api/vehicles";
import LogoIcon from "@/assets/icons/logo8.svg";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
  imageUrl: string;
  currentMileage: number;
  fuelType: string;
}

export default function Inspection() {
  const { currentInspection, setCurrentInspection, clearCurrentInspection } =
    useInspectionStore();

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehiclesList,
  });

  const startInspectionForVehicle = (vehicle: Vehicle) => {
    // Initialize a new inspection for the selected vehicle
    setCurrentInspection({
      vehicleId: vehicle.id,
      mileage: 0,
      overallCondition: "",
    });

    // Navigate to inspection form
    router.push("/inspection/form");
  };

  const renderVehicleItem = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity onPress={() => startInspectionForVehicle(item)}>
      <Card className="p-4 mb-3">
        <HStack space="md" className="items-center">
          <Image
            source={{ uri: item.imageUrl }}
            className="w-16 h-16 rounded-lg"
            alt={`${item.make} ${item.model}`}
          />

          <VStack space="xs" className="flex-1">
            <Text className="font-semibold text-lg">
              {item.make} {item.model}
            </Text>
            <Text className="text-gray-600">{item.licensePlate}</Text>
            <Text className="text-gray-500 text-sm">
              {item.currentMileage.toLocaleString()} km • {item.fuelType}
            </Text>
          </VStack>

          <Button size="sm" className="bg-blue-600">
            <Text className="text-white text-xs">Inspect</Text>
          </Button>
        </HStack>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Box className="bg-primary-50 p-6 rounded-full mb-4">
          <LogoIcon width={40} height={40} />
        </Box>
        <Text className="text-typography-600">Loading vehicles...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-center">
          Error loading vehicles:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <VStack space="md" className="flex-1">
        <VStack space="sm">
          <Heading size="xl">Vehicle Inspection</Heading>
          <Text className="text-gray-600">
            Select a vehicle to start an inspection
          </Text>
        </VStack>

        {currentInspection && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <VStack space="sm">
              <Text className="font-semibold text-blue-800">
                🔄 Inspection in Progress
              </Text>
              <Text className="text-blue-700">
                Vehicle ID: {currentInspection.vehicleId}
              </Text>
              <HStack space="sm">
                <Button
                  onPress={() => router.push("/inspection/form")}
                  size="sm"
                  className="flex-1"
                >
                  <Text className="text-white">Continue</Text>
                </Button>
                <Button
                  onPress={clearCurrentInspection}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Text>Cancel</Text>
                </Button>
              </HStack>
            </VStack>
          </Card>
        )}

        {vehicles && vehicles.length > 0 ? (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            renderItem={renderVehicleItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <VStack className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-center">
              No vehicles available for inspection.
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Please add vehicles first.
            </Text>
          </VStack>
        )}
      </VStack>
    </View>
  );
}

import { useLocalSearchParams, router } from "expo-router";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ActivityIndicator, View } from "react-native";
import LogoIcon from "@/assets/icons/logo8.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleById } from "@/api/vehicles";
import { A } from "@expo/html-elements";
import { useInspectionStore } from "@/store/inspectionStore";
export default function VehicleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setCurrentInspection } = useInspectionStore();
  const {
    data: vehicle,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles", id],
    queryFn: () => fetchVehicleById(String(id)),
  });

  const startInspection = () => {
    // Initialize a new inspection for this vehicle
    setCurrentInspection({
      vehicleId: String(id),
      mileage: 0,
      overallCondition: "",
    });

    // Navigate to inspection form
    router.push("/inspection/form");
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Box className="bg-primary-50 p-6 rounded-full mb-4">
          <LogoIcon width={40} height={40} />
        </Box>
        <Text className="text-typography-600">Loading vehicle details...</Text>
      </VStack>
    );
  }
  if (error || !vehicle) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-lg">
          {error instanceof Error
            ? `Error fetching vehicle: ${error.message}`
            : "Vehicle not found"}
        </Text>
        <A href=".." className="mt-4 text-blue-500 underline">
          Go Back
        </A>
      </View>
    );
  }
  return (
    <Card
      size="sm"
      variant="elevated"
      className="p-8 rounded-xl max-w-[560px] m-3 "
    >
      {/* Vehicle Image */}
      <Image
        source={{ uri: vehicle.imageUrl }}
        className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
        alt="vehicle image"
      />

      {/* Make, Model & License Plate */}
      <HStack className="flex flex-row justify-between items-start mb-2">
        <Heading size="lg" className="text-xl font-bold text-typography-700">
          {vehicle.make} | {vehicle.model}
        </Heading>
        <Heading size="lg" className="text-xl font-bold text-typography-700">
          {vehicle.licensePlate}
        </Heading>
      </HStack>

      {/* Fuel, Mileage & Transmission */}
      <VStack space="md">
        <HStack className="flex flex-row justify-between items-center ">
          <HStack space="sm" className="items-center">
            <Text className="text-sm text-typography-700">
              Fuel: {vehicle.fuelType}
            </Text>
          </HStack>

          <HStack space="sm" className="items-center">
            <Text className="text-sm text-typography-700">
              CURRENT MILEAGE: {vehicle.currentMileage} km
            </Text>
          </HStack>
        </HStack>

        <HStack className="flex flex-row justify-between items-center ">
          <HStack space="sm" className="items-center">
            <Text className="text-sm text-typography-700">
              COLOUR: {vehicle.colour}
            </Text>
          </HStack>

          <HStack space="sm" className="items-center">
            <Text className="text-sm text-typography-700">
              YEAR MODEL: {vehicle.year}
            </Text>
          </HStack>
        </HStack>
        <HStack space="sm" className="items-center">
          <Text className="text-sm text-typography-700">
            Transmission: {vehicle.transmission.toUpperCase()}
          </Text>
        </HStack>
        <HStack space="sm" className="items-center">
          <Text className="text-sm text-typography-700">
            Vin: {vehicle.vin}
          </Text>
        </HStack>
        <HStack space="sm" className="items-center">
          <Text className="text-sm text-typography-700">
            Engine Number: {vehicle.engineNumber}
          </Text>
        </HStack>

        {/* Inspection Button */}
        <Button
          onPress={startInspection}
          className="mt-6 bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Text className="text-white font-semibold">Start Inspection</Text>
        </Button>
      </VStack>
    </Card>
  );
}

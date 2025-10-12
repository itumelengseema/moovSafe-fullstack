import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, ScrollView } from "react-native";
import { deleteVehicle, vehiclesList } from "@/api/vehicles";
import { VStack } from "@/components/ui/vstack";
import type { Vehicle } from "@/types/index";
import {
  AddVehicleButton,
  VehicleCard,
  VehicleEmptyState,
  VehicleLoadingState,
  VehicleStats,
} from "./components";

const MAX_VEHICLES = 5;

export default function VehicleManagementPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehiclesList,
  });

  const vehicleCount = vehicles?.length || 0;
  const canAddMoreVehicles = vehicleCount < MAX_VEHICLES;

  const deleteVehicleMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      Alert.alert("Success", "Vehicle deleted successfully!");
    },
    onError: (error: Error) => {
      Alert.alert("Error", `Failed to delete vehicle: ${error.message}`);
    },
  });

  const handleEditVehicle = (vehicleId: string) => {
    router.push(`/vehicle/edit/${vehicleId}`);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    Alert.alert(
      "Delete Vehicle",
      `Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteVehicleMutation.mutate(vehicle.id),
        },
      ]
    );
  };

  const handleAddVehicle = () => {
    if (!canAddMoreVehicles) {
      Alert.alert(
        "Limit Reached",
        `You can only add up to ${MAX_VEHICLES} vehicles.`
      );
      return;
    }
    router.push("/vehicle/add");
  };

  if (isLoading) {
    return <VehicleLoadingState />;
  }

  return (
    <VStack className="flex-1 bg-background-0">
      <ScrollView className="flex-1">
        <VStack space="lg" className="p-5">
          <VehicleStats
            vehicleCount={vehicleCount}
            maxVehicles={MAX_VEHICLES}
          />

          {/* Vehicle List */}
          {vehicles && vehicles.length > 0 ? (
            <VStack space="md">
              {vehicles.map((vehicle: any, index: number) => (
                <VehicleCard
                  key={`vehicle-${vehicle.id || index}`}
                  vehicle={vehicle}
                  onEdit={handleEditVehicle}
                  onDelete={handleDeleteVehicle}
                />
              ))}
            </VStack>
          ) : (
            <VehicleEmptyState />
          )}

          <AddVehicleButton
            onPress={handleAddVehicle}
            canAddMore={canAddMoreVehicles}
            vehicleCount={vehicleCount}
            maxVehicles={MAX_VEHICLES}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}

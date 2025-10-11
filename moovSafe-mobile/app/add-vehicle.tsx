import { useState } from "react";
import { ScrollView, Alert, TouchableOpacity } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LogoIcon from "@/assets/icons/logo8.svg";

import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { vehiclesList } from "@/api/vehicles";

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
  const canAddMoreVehicles = vehicleCount < 5;

  const deleteVehicleMutation = useMutation({
    mutationFn: async (vehicleId: string) => {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/vehicles/${vehicleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      Alert.alert("Success", "Vehicle deleted successfully!");
    },
    onError: (error: Error) => {
      Alert.alert("Error", `Failed to delete vehicle: ${error.message}`);
    },
  });

  const handleEditVehicle = (vehicleId: string) => {
    router.push(`/edit-vehicle/${vehicleId}`);
  };

  const handleDeleteVehicle = (vehicle: any) => {
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
      Alert.alert("Limit Reached", "You can only add up to 5 vehicles.");
      return;
    }
    router.push("/add-vehicle-form");
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 bg-background-0 justify-center items-center p-5">
        <Box className="bg-primary-50 p-6 rounded-full mb-4">
          <LogoIcon width={40} height={40} />
        </Box>
        <Text className="text-typography-600">Loading vehicles...</Text>
      </VStack>
    );
  }

  return (
    <VStack className="flex-1 bg-background-0">
      <ScrollView className="flex-1">
        <VStack space="lg" className="p-5">
          {/* Header */}
          <HStack className="justify-between items-center">
            <Heading size="xl" className="font-bold text-typography-900">
              My Vehicles
            </Heading>
            <Badge variant="outline" action="muted">
              <Text className="text-xs font-medium">
                {vehicleCount}/5 vehicles
              </Text>
            </Badge>
          </HStack>

          {/* Vehicle List */}
          {vehicles && vehicles.length > 0 ? (
            <VStack space="md">
              {vehicles.map((vehicle: any) => (
                <Card key={vehicle.id} className="p-4 mb-3">
                  <HStack space="md" className="items-center">
                    {/* Vehicle Image */}
                    <Image
                      source={{ uri: vehicle.imageUrl }}
                      className="w-16 h-16 rounded-lg"
                      alt={`${vehicle.make} ${vehicle.model}`}
                    />

                    {/* Vehicle Info */}
                    <VStack space="xs" className="flex-1">
                      <Text className="font-semibold text-lg">
                        {vehicle.make} {vehicle.model}
                      </Text>
                      <Text className="text-gray-600">
                        {vehicle.licensePlate}
                      </Text>
                      <HStack space="sm" className="items-center">
                        <Text className="text-gray-500 text-sm">
                          {vehicle.currentMileage?.toLocaleString()} km •{" "}
                          {vehicle.fuelType}
                        </Text>
                        <Badge
                          size="sm"
                          variant="solid"
                          action={
                            vehicle.status === "active" ? "success" : "muted"
                          }
                        >
                          <Text className="text-xs font-medium text-white">
                            {vehicle.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Text>
                        </Badge>
                      </HStack>
                    </VStack>

                    {/* Action Buttons */}
                    <HStack space="xs">
                      <TouchableOpacity
                        onPress={() => handleEditVehicle(vehicle.id)}
                        className="bg-gray-900 px-3 py-2 rounded-md"
                      >
                        <HStack space="xs" className="items-center">
                          <Ionicons name="pencil" size={14} color="white" />
                          <Text className="text-white text-xs font-medium">
                            Edit
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteVehicle(vehicle)}
                        className="bg-red-600 px-3 py-2 rounded-md"
                      >
                        <HStack space="xs" className="items-center">
                          <Ionicons name="trash" size={14} color="white" />
                          <Text className="text-white text-xs font-medium">
                            Delete
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                    </HStack>
                  </HStack>
                </Card>
              ))}
            </VStack>
          ) : (
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
                    Add your first vehicle to get started with vehicle
                    management
                  </Text>
                </VStack>
              </VStack>
            </Card>
          )}

          {/* Add Vehicle Button */}
          <Button
            variant="solid"
            action="primary"
            onPress={handleAddVehicle}
            disabled={!canAddMoreVehicles}
            className="mt-4"
          >
            <HStack space="sm" className="items-center">
              <Ionicons name="add" size={20} color="white" />
              <ButtonText className="text-white font-medium">
                Add Vehicle
              </ButtonText>
            </HStack>
          </Button>

          {!canAddMoreVehicles && (
            <Card size="sm" variant="outline" className="bg-error-50">
              <Box className="p-3">
                <Text className="text-error-600 text-sm text-center">
                  You've reached the maximum limit of 5 vehicles.
                </Text>
              </Box>
            </Card>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

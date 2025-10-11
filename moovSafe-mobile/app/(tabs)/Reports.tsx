import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import InspectionListItem from "@/components/InspectionListItem";
import { fetchInspections } from "@/api/inspections";

interface Inspection {
  id: string;
  vehicleId: string;
  date: string;
  mileage: number;
  overallCondition: string;
  notes?: string | null;
  faultsImagesUrl?: string[];
  odometerImageUrl?: string | null;
}

export default function ReportsScreen() {
  const {
    data: inspections,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["inspections"],
    queryFn: fetchInspections,
  });

  const testApiConnection = async () => {
    try {
      Alert.alert("Testing API Connection...", "Please wait...");
      await refetch();
      Alert.alert("Success!", "API connection is working correctly!");
    } catch (error) {
      Alert.alert(
        "API Test Failed",
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const handleInspectionPress = (inspection: Inspection) => {
    // Navigate to inspection details
    // For now, show alert until navigation is set up
    Alert.alert(
      "Inspection Details",
      `Inspection from ${new Date(inspection.date).toLocaleDateString()}\nCondition: ${inspection.overallCondition}\nMileage: ${inspection.mileage} km${inspection.notes ? `\n\nNotes: ${inspection.notes}` : ""}`,
      [{ text: "OK" }]
    );
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2">Loading inspections...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-center">
          Error loading inspections:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack className="flex-1 p-5">
      <HStack className="justify-between items-center mb-4">
        <Heading size="xl">Inspection Reports</Heading>

        <Button onPress={testApiConnection} size="sm" variant="outline">
          <Text className="text-xs">Test API</Text>
        </Button>
      </HStack>

      {inspections && inspections.length > 0 ? (
        <FlatList
          data={inspections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InspectionListItem
              inspection={item}
              onPress={handleInspectionPress}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <VStack className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center">
            No inspections found.
          </Text>
          <Text className="text-gray-400 text-center mt-2">
            Create your first inspection by selecting a vehicle and starting an
            inspection.
          </Text>
        </VStack>
      )}
    </VStack>
  );
}

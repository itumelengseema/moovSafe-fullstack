import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import LogoIcon from "@/assets/icons/logo8.svg";

import { fetchInspectionById } from "@/api/inspections";

const INSPECTION_SECTIONS = [
  {
    title: "Exterior",
    fields: [
      { key: "exteriorWindshield", label: "Windshield" },
      { key: "exteriorMirrors", label: "Mirrors" },
      { key: "exteriorLights", label: "Lights" },
      { key: "exteriorTires", label: "Tires" },
    ],
  },
  {
    title: "Engine & Fluids",
    fields: [
      { key: "engineOil", label: "Engine Oil" },
      { key: "engineCoolant", label: "Coolant" },
      { key: "engineBrakeFluid", label: "Brake Fluid" },
      { key: "engineTransmissionFluid", label: "Transmission Fluid" },
      { key: "enginePowerSteering", label: "Power Steering" },
      { key: "engineBattery", label: "Battery" },
    ],
  },
  {
    title: "Interior",
    fields: [
      { key: "interiorSeats", label: "Seats" },
      { key: "interiorSeatbelts", label: "Seatbelts" },
      { key: "interiorHorn", label: "Horn" },
      { key: "interiorAC", label: "Air Conditioning" },
      { key: "windows", label: "Windows" },
    ],
  },
  {
    title: "Mechanical & Safety",
    fields: [
      { key: "brakes", label: "Brakes" },
      { key: "exhaust", label: "Exhaust" },
      { key: "lightsIndicators", label: "Lights & Indicators" },
    ],
  },
  {
    title: "Equipment",
    fields: [
      { key: "spareTire", label: "Spare Tire" },
      { key: "jack", label: "Jack" },
      { key: "wheelSpanner", label: "Wheel Spanner" },
      { key: "wheelLockNutTool", label: "Wheel Lock Nut Tool" },
      { key: "fireExtinguisher", label: "Fire Extinguisher" },
    ],
  },
];

export default function InspectionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: inspection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inspection", id],
    queryFn: () => fetchInspectionById(String(id)),
    enabled: Boolean(id),
  });

  const getConditionColor = (condition: string | null) => {
    if (!condition) return "bg-gray-100 text-gray-500";

    switch (condition.toLowerCase()) {
      case "good":
      case "functional":
      case "present":
        return "bg-green-100 text-green-800";
      case "fair":
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
      case "non-functional":
      case "absent":
      case "change needed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Box className="bg-primary-50 p-6 rounded-full mb-4">
          <LogoIcon width={40} height={40} />
        </Box>
        <Text className="text-typography-600">
          Loading inspection details...
        </Text>
      </VStack>
    );
  }

  if (error || !inspection) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-center">
          Error loading inspection:{" "}
          {error instanceof Error ? error.message : "Inspection not found"}
        </Text>
      </VStack>
    );
  }

  return (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <VStack space="lg">
        {/* Header */}
        <Card className="p-4">
          <VStack space="sm">
            <Heading size="lg">Inspection Details</Heading>
            <Text className="text-gray-600">
              Date: {new Date(inspection.date).toLocaleDateString()}
            </Text>
            <Text className="text-gray-600">
              Mileage: {inspection.mileage.toLocaleString()} km
            </Text>
            <HStack className="items-center">
              <Text className="mr-2">Overall Condition:</Text>
              <Badge className={getConditionColor(inspection.overallCondition)}>
                <Text className="text-xs font-medium">
                  {inspection.overallCondition}
                </Text>
              </Badge>
            </HStack>
          </VStack>
        </Card>

        {/* Inspection Sections */}
        {INSPECTION_SECTIONS.map((section) => (
          <Card key={section.title} className="p-4">
            <VStack space="sm">
              <Heading size="md">{section.title}</Heading>
              <VStack space="xs">
                {section.fields.map((field) => {
                  const value =
                    inspection[field.key as keyof typeof inspection];
                  if (!value) return null;

                  return (
                    <HStack
                      key={field.key}
                      className="justify-between items-center"
                    >
                      <Text className="flex-1">{field.label}</Text>
                      <Badge className={getConditionColor(value as string)}>
                        <Text className="text-xs">{value}</Text>
                      </Badge>
                    </HStack>
                  );
                })}
              </VStack>
            </VStack>
          </Card>
        ))}

        {/* Images */}
        {(inspection.odometerImageUrl ||
          (inspection.faultsImagesUrl &&
            inspection.faultsImagesUrl.length > 0)) && (
          <Card className="p-4">
            <VStack space="sm">
              <Heading size="md">Images</Heading>

              {inspection.odometerImageUrl && (
                <VStack space="sm">
                  <Text className="font-semibold">Odometer</Text>
                  <Image
                    source={{ uri: inspection.odometerImageUrl }}
                    className="w-full h-48 rounded-lg"
                    alt="Odometer"
                  />
                </VStack>
              )}

              {inspection.faultsImagesUrl &&
                inspection.faultsImagesUrl.length > 0 && (
                  <VStack space="sm">
                    <Text className="font-semibold">Fault Images</Text>
                    {inspection.faultsImagesUrl.map((url, index) => (
                      <VStack key={index} space="xs">
                        <Text className="text-sm text-gray-600">
                          Fault {index + 1}
                        </Text>
                        <Image
                          source={{ uri: url }}
                          className="w-full h-48 rounded-lg"
                          alt={`Fault ${index + 1}`}
                        />
                      </VStack>
                    ))}
                  </VStack>
                )}
            </VStack>
          </Card>
        )}

        {/* Notes */}
        {inspection.notes && (
          <Card className="p-4">
            <VStack space="sm">
              <Heading size="md">Notes</Heading>
              <Text className="text-gray-700">{inspection.notes}</Text>
            </VStack>
          </Card>
        )}

        {/* Bottom padding */}
        <VStack className="h-10" />
      </VStack>
    </ScrollView>
  );
}

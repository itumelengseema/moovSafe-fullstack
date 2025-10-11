import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

import { useInspectionStore } from "@/store/inspectionStore";
import { useQueryClient } from "@tanstack/react-query";

const CONDITION_OPTIONS = ["Good", "Fair", "Poor"];
const FLUID_OPTIONS = ["Good", "Low", "Change Needed"];
const FUNCTIONAL_OPTIONS = ["Functional", "Non-Functional"];
const PRESENT_OPTIONS = ["Present", "Absent"];

interface FormField {
  key: string;
  label: string;
  options: string[];
}

const INSPECTION_FIELDS: FormField[] = [
  // Exterior
  {
    key: "exteriorWindshield",
    label: "Windshield",
    options: CONDITION_OPTIONS,
  },
  { key: "exteriorMirrors", label: "Mirrors", options: CONDITION_OPTIONS },
  {
    key: "exteriorLights",
    label: "Exterior Lights",
    options: FUNCTIONAL_OPTIONS,
  },
  { key: "exteriorTires", label: "Tires", options: CONDITION_OPTIONS },

  // Engine & Fluids
  { key: "engineOil", label: "Engine Oil", options: FLUID_OPTIONS },
  { key: "engineCoolant", label: "Engine Coolant", options: FLUID_OPTIONS },
  { key: "engineBrakeFluid", label: "Brake Fluid", options: FLUID_OPTIONS },
  {
    key: "engineTransmissionFluid",
    label: "Transmission Fluid",
    options: FLUID_OPTIONS,
  },
  {
    key: "enginePowerSteering",
    label: "Power Steering",
    options: FLUID_OPTIONS,
  },
  { key: "engineBattery", label: "Battery", options: CONDITION_OPTIONS },

  // Interior
  { key: "interiorSeats", label: "Seats", options: CONDITION_OPTIONS },
  { key: "interiorSeatbelts", label: "Seatbelts", options: CONDITION_OPTIONS },
  { key: "interiorHorn", label: "Horn", options: FUNCTIONAL_OPTIONS },
  { key: "interiorAC", label: "Air Conditioning", options: FUNCTIONAL_OPTIONS },
  { key: "windows", label: "Windows", options: FUNCTIONAL_OPTIONS },

  // Mechanical / Safety
  { key: "brakes", label: "Brakes", options: CONDITION_OPTIONS },
  { key: "exhaust", label: "Exhaust", options: CONDITION_OPTIONS },
  {
    key: "lightsIndicators",
    label: "Lights & Indicators",
    options: FUNCTIONAL_OPTIONS,
  },

  // Optional / Other
  {
    key: "spareTire",
    label: "Spare Tire",
    options: [...CONDITION_OPTIONS, "Absent"],
  },
  { key: "jack", label: "Jack", options: PRESENT_OPTIONS },
  { key: "wheelSpanner", label: "Wheel Spanner", options: PRESENT_OPTIONS },
  {
    key: "wheelLockNutTool",
    label: "Wheel Lock Nut Tool",
    options: PRESENT_OPTIONS,
  },
  {
    key: "fireExtinguisher",
    label: "Fire Extinguisher",
    options: PRESENT_OPTIONS,
  },
];

export default function InspectionFormScreen() {
  const { currentInspection, updateCurrentInspection, clearCurrentInspection } =
    useInspectionStore();
  const queryClient = useQueryClient();

  const [faultImages, setFaultImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [odometerImage, setOdometerImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [mileage, setMileage] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestCameraPermissions = async () => {
    if (Platform.OS !== "web") {
      // Request camera permissions
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "Please allow camera access to take photos for the inspection."
        );
        return false;
      }
    }
    return true;
  };

  const takeFaultPhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        const newImage = result.assets[0];
        setFaultImages((prev) => [...prev, newImage].slice(0, 5));

        // Show success message
        Alert.alert(
          "Photo Captured",
          "Fault photo has been added successfully!",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const takeOdometerPhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setOdometerImage(result.assets[0]);

        // Show success message
        Alert.alert(
          "Photo Captured",
          "Odometer photo has been captured successfully!",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const removeImage = (index: number, type: "fault" | "odometer") => {
    const message =
      type === "odometer"
        ? "Are you sure you want to remove the odometer photo? This is required for the inspection."
        : "Are you sure you want to remove this fault photo?";

    Alert.alert("Remove Photo", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          if (type === "fault") {
            setFaultImages((prev) => prev.filter((_, i) => i !== index));
          } else {
            setOdometerImage(null);
          }
        },
      },
    ]);
  };

  const handleFieldChange = (key: string, value: string) => {
    updateCurrentInspection({ [key]: value });
  };

  const submitInspection = async () => {
    if (!currentInspection?.vehicleId) {
      Alert.alert("Error", "Vehicle ID is missing");
      return;
    }

    if (!mileage || !currentInspection.overallCondition) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!odometerImage) {
      Alert.alert("Error", "Odometer image is required");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("=== SUBMITTING INSPECTION ===");
      console.log("Vehicle ID:", currentInspection.vehicleId);
      console.log("Mileage:", mileage);
      console.log("Overall Condition:", currentInspection.overallCondition);
      console.log("Notes:", notes || "None");
      console.log("Fault images count:", faultImages.length);
      console.log("Has odometer image:", !!odometerImage);

      const formData = new FormData();

      // Add required fields
      formData.append("vehicleId", currentInspection.vehicleId);
      formData.append("mileage", parseInt(mileage).toString());
      formData.append("overallCondition", currentInspection.overallCondition);

      // Add optional notes
      if (notes && notes.trim()) {
        formData.append("notes", notes.trim());
      }

      // Add other inspection fields that have values
      const systemFields = [
        "vehicleId",
        "faultsImagesUrl",
        "odometerImageUrl",
        "id",
        "date",
      ];
      Object.entries(currentInspection).forEach(([key, value]) => {
        if (
          !systemFields.includes(key) &&
          value !== null &&
          value !== undefined &&
          value !== ""
        ) {
          console.log(`Adding inspection field: ${key} = ${value}`);
          formData.append(key, String(value));
        }
      });

      // Add odometer image (required)
      formData.append("odometerImage", {
        uri: odometerImage.uri,
        type: odometerImage.type || "image/jpeg",
        name: odometerImage.fileName || "odometer.jpg",
      } as any);

      // Add fault images (optional)
      faultImages.forEach((asset, index) => {
        formData.append("faultsImages", {
          uri: asset.uri,
          type: asset.type || "image/jpeg",
          name: asset.fileName || `fault_${index}.jpg`,
        } as any);
      });

      console.log("Sending FormData to API...");

      // Send to API
      const response = await fetch(
        "https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/inspections",
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header - let React Native handle it
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorText;
        try {
          errorText = await response.text();
          console.log("Error response text:", errorText);

          // Try to parse as JSON for better error details
          try {
            const errorJson = JSON.parse(errorText);
            console.log("Error response JSON:", errorJson);
          } catch (e) {
            console.log("Error response is not valid JSON");
          }
        } catch (e) {
          errorText = "Unable to read error response";
        }
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      // Update the store and navigate back
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
      // Invalidate vehicles cache to update mileage from the new inspection
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      Alert.alert("Success", "Inspection created successfully!");
      clearCurrentInspection();
      router.back();
    } catch (error) {
      console.error("Inspection submission error:", error);
      Alert.alert(
        "Error",
        `Failed to create inspection: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentInspection) {
    return (
      <ScrollView className="flex-1 p-4">
        <Card className="p-6">
          <Text>
            No inspection in progress. Please start an inspection from a vehicle
            page.
          </Text>
          <Button onPress={() => router.back()} className="mt-4">
            <Text>Go Back</Text>
          </Button>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <VStack space="lg">
        <Heading size="xl">Vehicle Inspection Form</Heading>

        {/* Basic Info Card */}
        <Card className="p-4">
          <VStack space="md">
            <Heading size="md">Basic Information</Heading>

            {/* Mileage Input */}
            <VStack space="sm">
              <Text className="font-semibold">Current Mileage *</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-lg p-3"
                onPress={() => {
                  Alert.prompt(
                    "Enter Mileage",
                    "Please enter the current mileage",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "OK",
                        onPress: (value?: string) => {
                          if (value !== undefined) setMileage(value);
                        },
                      },
                    ],
                    "plain-text",
                    mileage
                  );
                }}
              >
                <Text className={mileage ? "text-black" : "text-gray-400"}>
                  {mileage || "Tap to enter mileage"}
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Overall Condition */}
            <VStack space="sm">
              <Text className="font-semibold">Overall Condition *</Text>
              <HStack space="sm" className="flex-wrap">
                {CONDITION_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      handleFieldChange("overallCondition", option)
                    }
                    className={`px-4 py-2 rounded-lg border ${
                      currentInspection.overallCondition === option
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={
                        currentInspection.overallCondition === option
                          ? "text-white"
                          : "text-black"
                      }
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Inspection Fields */}
        <Card className="p-4">
          <VStack space="md">
            <Heading size="md">Inspection Points</Heading>

            {INSPECTION_FIELDS.map((field) => (
              <VStack key={field.key} space="sm">
                <Text className="font-semibold">{field.label}</Text>
                <HStack space="sm" className="flex-wrap">
                  {field.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleFieldChange(field.key, option)}
                      className={`px-3 py-2 rounded-lg border ${
                        currentInspection[
                          field.key as keyof typeof currentInspection
                        ] === option
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <Text
                        className={
                          currentInspection[
                            field.key as keyof typeof currentInspection
                          ] === option
                            ? "text-white text-xs"
                            : "text-black text-xs"
                        }
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </HStack>
              </VStack>
            ))}
          </VStack>
        </Card>

        {/* Images Section */}
        <Card className="p-4">
          <VStack space="md">
            <Heading size="md">Images</Heading>

            {/* Odometer Image */}
            <VStack space="sm">
              <Text className="font-semibold">Odometer Image * (Required)</Text>
              {odometerImage ? (
                <VStack space="sm">
                  <Image
                    source={{ uri: odometerImage.uri }}
                    className="w-full h-40 rounded-lg"
                    alt="Odometer"
                  />
                  <HStack space="sm">
                    <Button
                      onPress={takeOdometerPhoto}
                      size="sm"
                      className="flex-1 bg-blue-600"
                    >
                      <Text className="text-white">📷 Retake</Text>
                    </Button>
                    <Button
                      onPress={() => removeImage(0, "odometer")}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Text>🗑️ Remove</Text>
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <Button onPress={takeOdometerPhoto} variant="outline">
                  <Text>📷 Take Odometer Photo</Text>
                </Button>
              )}
            </VStack>

            {/* Fault Images */}
            <VStack space="sm">
              <Text className="font-semibold">
                Fault Images (Optional - Max 5)
              </Text>
              {faultImages.length > 0 && (
                <VStack space="sm">
                  {faultImages.map((image, index) => (
                    <VStack key={index} space="sm">
                      <Text className="text-sm font-medium text-gray-700">
                        Fault Photo {index + 1}
                      </Text>
                      <Image
                        source={{ uri: image.uri }}
                        className="w-full h-40 rounded-lg"
                        alt={`Fault ${index + 1}`}
                      />
                      <HStack space="sm">
                        <Button
                          onPress={() => {
                            // Replace this specific image
                            takeFaultPhoto();
                            removeImage(index, "fault");
                          }}
                          size="sm"
                          className="flex-1 bg-blue-600"
                        >
                          <Text className="text-white">📷 Retake</Text>
                        </Button>
                        <Button
                          onPress={() => removeImage(index, "fault")}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Text>🗑️ Remove</Text>
                        </Button>
                      </HStack>
                    </VStack>
                  ))}
                </VStack>
              )}
              {faultImages.length < 5 && (
                <Button onPress={takeFaultPhoto} variant="outline">
                  <Text>📷 Take Fault Photo ({faultImages.length}/5)</Text>
                </Button>
              )}
            </VStack>
          </VStack>
        </Card>

        {/* Notes Section */}
        <Card className="p-4">
          <VStack space="sm">
            <Text className="font-semibold">Additional Notes</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-lg p-3 min-h-[80px]"
              onPress={() => {
                Alert.prompt(
                  "Add Notes",
                  "Enter any additional notes about the inspection",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "OK",
                      onPress: (value?: string) => {
                        if (value !== undefined) setNotes(value);
                      },
                    },
                  ],
                  "plain-text",
                  notes
                );
              }}
            >
              <Text className={notes ? "text-black" : "text-gray-400"}>
                {notes || "Tap to add notes..."}
              </Text>
            </TouchableOpacity>
          </VStack>
        </Card>

        {/* Submit Button */}
        <HStack space="md">
          <Button
            onPress={() => router.back()}
            variant="outline"
            className="flex-1"
          >
            <Text>Cancel</Text>
          </Button>

          <Button
            onPress={submitInspection}
            className="flex-1 bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white">Submit Inspection</Text>
            )}
          </Button>
        </HStack>

        {/* Bottom padding */}
        <VStack className="h-10" />
      </VStack>
    </ScrollView>
  );
}

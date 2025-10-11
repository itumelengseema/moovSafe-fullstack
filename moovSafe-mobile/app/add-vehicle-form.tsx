import { useState } from "react";
import {
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createVehicle } from "@/api/vehicles";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  vin: string;
  engineNumber: string;
  licensePlate: string;
  fuelType: string;
  transmission: string;
  currentMileage: string;
  colour: string;
  vehicleType: string;
}

const fuelTypeOptions = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "LPG",
  "CNG",
];
const transmissionOptions = ["Manual", "Automatic", "CVT", "Semi-Automatic"];
const vehicleTypeOptions = ["Car", "SUV", "Truck", "Van", "Motorcycle", "Bus"];

const initialFormData: VehicleFormData = {
  make: "",
  model: "",
  year: "",
  vin: "",
  engineNumber: "",
  licensePlate: "",
  fuelType: "Petrol",
  transmission: "Manual",
  currentMileage: "",
  colour: "",
  vehicleType: "Car",
};

export default function AddVehicleFormPage() {
  const [formData, setFormData] = useState<VehicleFormData>(initialFormData);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const addVehicleMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      Alert.alert("Success", "Vehicle added successfully!");
      router.back();
    },
    onError: (error: Error) => {
      Alert.alert("Error", `Failed to add vehicle: ${error.message}`);
    },
  });

  const handleInputChange = (field: keyof VehicleFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDropdownSelect = (
    field: keyof VehicleFormData,
    value: string
  ) => {
    handleInputChange(field, value);
    setDropdownVisible(null);
  };

  const renderDropdownItem = (item: string, field: keyof VehicleFormData) => (
    <TouchableOpacity
      key={item}
      onPress={() => handleDropdownSelect(field, item)}
      className="px-4 py-3 border-b border-outline-100 active:bg-background-100"
    >
      <Text size="md" className="text-typography-900">
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleSubmit = async () => {
    // Basic validation
    const requiredFields = [
      "make",
      "model",
      "year",
      "vin",
      "engineNumber",
      "licensePlate",
      "currentMileage",
      "colour",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof VehicleFormData]) {
        Alert.alert(
          "Error",
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return;
      }
    }

    addVehicleMutation.mutate(formData);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background-0"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="lg" className="p-5">
          {/* Header */}
          <HStack className="items-center justify-between">
            <HStack space="md" className="items-center">
              <Box className="bg-neutral-950 p-2 rounded">
                <Ionicons name="car" size={24} color="white" />
              </Box>
              <Heading size="xl" className="font-bold text-typography-900">
                Add New Vehicle
              </Heading>
            </HStack>
          </HStack>

          {/* Vehicle Form */}
          <Card variant="elevated" className="bg-white">
            <VStack space="xl" className="p-6">
              {/* Header Section */}
              <VStack space="sm">
                <Heading size="lg" className="text-typography-900">
                  Vehicle Information
                </Heading>
                <Text size="sm" className="text-typography-600">
                  Fill in the details for your new vehicle
                </Text>
              </VStack>

              {/* Basic Vehicle Details */}
              <VStack space="lg">
                <VStack space="md">
                  <Text size="sm" className="font-semibold text-typography-800">
                    Basic Details
                  </Text>

                  <VStack space="md">
                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        Make *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.make}
                          onChangeText={(text) =>
                            handleInputChange("make", text)
                          }
                          placeholder="e.g., Toyota, Honda, BMW"
                          placeholderTextColor="#9CA3AF"
                          className="text-typography-900 text-base"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          autoCapitalize="words"
                          autoCorrect={false}
                        />
                      </Box>
                    </VStack>

                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        Model *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.model}
                          onChangeText={(text) =>
                            handleInputChange("model", text)
                          }
                          placeholder="e.g., Camry, Civic, X3"
                          placeholderTextColor="#9CA3AF"
                          className="text-typography-900 text-base"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          autoCapitalize="words"
                          autoCorrect={false}
                        />
                      </Box>
                    </VStack>
                  </VStack>
                </VStack>

                <HStack space="md">
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="text-typography-700 font-medium">
                      Year *
                    </Text>
                    <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                      <TextInput
                        value={formData.year}
                        onChangeText={(text) => handleInputChange("year", text)}
                        placeholder="2020"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        maxLength={4}
                        className="text-typography-900 text-base"
                      />
                    </Box>
                  </VStack>

                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="text-typography-700 font-medium">
                      Color *
                    </Text>
                    <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                      <TextInput
                        value={formData.colour}
                        onChangeText={(text) =>
                          handleInputChange("colour", text)
                        }
                        placeholder="White"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCapitalize="words"
                        className="text-typography-900 text-base"
                      />
                    </Box>
                  </VStack>
                </HStack>

                {/* Vehicle Identification */}
                <VStack space="md">
                  <Text size="sm" className="font-semibold text-typography-800">
                    Vehicle Identification
                  </Text>

                  <VStack space="md">
                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        License Plate *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.licensePlate}
                          onChangeText={(text) =>
                            handleInputChange("licensePlate", text)
                          }
                          placeholder="ABC-123-GP"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="characters"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          autoCorrect={false}
                          className="text-typography-900 text-base"
                        />
                      </Box>
                    </VStack>

                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        VIN Number *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.vin}
                          onChangeText={(text) =>
                            handleInputChange("vin", text)
                          }
                          placeholder="1HGCM82633A123456"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="characters"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          autoCorrect={false}
                          maxLength={17}
                          className="text-typography-900 text-base"
                        />
                      </Box>
                    </VStack>

                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        Engine Number *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.engineNumber}
                          onChangeText={(text) =>
                            handleInputChange("engineNumber", text)
                          }
                          placeholder="123ABC456"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="characters"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          autoCorrect={false}
                          className="text-typography-900 text-base"
                        />
                      </Box>
                    </VStack>

                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        Current Mileage *
                      </Text>
                      <Box className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50">
                        <TextInput
                          value={formData.currentMileage}
                          onChangeText={(text) =>
                            handleInputChange("currentMileage", text)
                          }
                          placeholder="50000"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="numeric"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          className="text-typography-900 text-base"
                        />
                      </Box>
                    </VStack>
                  </VStack>
                </VStack>

                {/* Vehicle Specifications */}
                <VStack space="md">
                  <Text size="sm" className="font-semibold text-typography-800">
                    Vehicle Specifications
                  </Text>

                  <VStack space="md">
                    <HStack space="md">
                      <VStack space="xs" className="flex-1">
                        <Text
                          size="sm"
                          className="text-typography-700 font-medium"
                        >
                          Fuel Type *
                        </Text>
                        <TouchableOpacity
                          onPress={() => setDropdownVisible("fuelType")}
                          className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50"
                        >
                          <HStack className="justify-between items-center">
                            <Text
                              className={`text-base ${formData.fuelType ? "text-typography-900" : "text-gray-400"}`}
                            >
                              {formData.fuelType || "Select fuel type"}
                            </Text>
                            <Ionicons
                              name="chevron-down"
                              size={16}
                              color="#6B7280"
                            />
                          </HStack>
                        </TouchableOpacity>
                      </VStack>

                      <VStack space="xs" className="flex-1">
                        <Text
                          size="sm"
                          className="text-typography-700 font-medium"
                        >
                          Transmission *
                        </Text>
                        <TouchableOpacity
                          onPress={() => setDropdownVisible("transmission")}
                          className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50"
                        >
                          <HStack className="justify-between items-center">
                            <Text
                              className={`text-base ${formData.transmission ? "text-typography-900" : "text-gray-400"}`}
                            >
                              {formData.transmission || "Select transmission"}
                            </Text>
                            <Ionicons
                              name="chevron-down"
                              size={16}
                              color="#6B7280"
                            />
                          </HStack>
                        </TouchableOpacity>
                      </VStack>
                    </HStack>

                    <VStack space="xs">
                      <Text
                        size="sm"
                        className="text-typography-700 font-medium"
                      >
                        Vehicle Type *
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDropdownVisible("vehicleType")}
                        className="border border-outline-200 rounded-lg px-4 py-3 bg-background-50"
                      >
                        <HStack className="justify-between items-center">
                          <Text
                            className={`text-base ${formData.vehicleType ? "text-typography-900" : "text-gray-400"}`}
                          >
                            {formData.vehicleType || "Select vehicle type"}
                          </Text>
                          <Ionicons
                            name="chevron-down"
                            size={16}
                            color="#6B7280"
                          />
                        </HStack>
                      </TouchableOpacity>
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>

              {/* Action Buttons */}
              <HStack space="md" className="pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  action="secondary"
                  onPress={() => router.back()}
                  className="flex-1 border-outline-300"
                >
                  <ButtonText className="text-typography-600 font-medium">
                    Cancel
                  </ButtonText>
                </Button>
                <Button
                  variant="solid"
                  size="lg"
                  action="primary"
                  onPress={handleSubmit}
                  disabled={addVehicleMutation.isPending}
                  className="flex-1"
                >
                  <ButtonText className="text-white font-semibold">
                    {addVehicleMutation.isPending ? "Adding..." : "Add Vehicle"}
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>

      {/* Dropdown Modal */}
      <Modal
        visible={!!dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(null)}
      >
        <Box className="flex-1 bg-black/50 justify-center items-center px-4">
          <TouchableOpacity
            className="flex-1 w-full"
            activeOpacity={1}
            onPress={() => setDropdownVisible(null)}
          />
          <Card variant="elevated" className="w-full max-w-sm bg-white">
            <VStack space="md" className="p-6">
              <Heading size="md" className="text-typography-900">
                Select {dropdownVisible === "fuelType" && "Fuel Type"}
                {dropdownVisible === "transmission" && "Transmission"}
                {dropdownVisible === "vehicleType" && "Vehicle Type"}
              </Heading>
              <Box className="max-h-60">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <VStack space="xs">
                    {dropdownVisible === "fuelType" &&
                      fuelTypeOptions.map((item) =>
                        renderDropdownItem(item, "fuelType")
                      )}
                    {dropdownVisible === "transmission" &&
                      transmissionOptions.map((item) =>
                        renderDropdownItem(item, "transmission")
                      )}
                    {dropdownVisible === "vehicleType" &&
                      vehicleTypeOptions.map((item) =>
                        renderDropdownItem(item, "vehicleType")
                      )}
                  </VStack>
                </ScrollView>
              </Box>
            </VStack>
          </Card>
          <TouchableOpacity
            className="flex-1 w-full"
            activeOpacity={1}
            onPress={() => setDropdownVisible(null)}
          />
        </Box>
      </Modal>
    </KeyboardAvoidingView>
  );
}

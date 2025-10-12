import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Box } from "@/components/ui/box";
import { fetchVehicleById } from "@/api/vehicles";
import LogoIcon from "@/assets/icons/logo8.svg";
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
  status: string;
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

export default function EditVehiclePage() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState<VehicleFormData>({
    make: "",
    model: "",
    year: "",
    vin: "",
    engineNumber: "",
    licensePlate: "",
    fuelType: "",
    transmission: "",
    currentMileage: "",
    colour: "",
    vehicleType: "",
    status: "active",
  });
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch vehicle details
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleById(id as string),
    enabled: !!id,
  });

  // Update form data when vehicle is loaded
  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year?.toString() || "",
        vin: vehicle.vin || "",
        engineNumber: vehicle.engineNumber || "",
        licensePlate: vehicle.licensePlate || "",
        fuelType: vehicle.fuelType || "",
        transmission: vehicle.transmission || "",
        currentMileage: vehicle.currentMileage?.toString() || "",
        colour: vehicle.colour || "",
        vehicleType: vehicle.vehicleType || "",
        status: vehicle.status || "active",
      });
    }
  }, [vehicle]);

  const updateVehicleMutation = useMutation({
    mutationFn: async (vehicleData: any) => {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...vehicleData,
          year: parseInt(vehicleData.year, 10),
          currentMileage: parseInt(vehicleData.currentMileage, 10),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      Alert.alert("Success", "Vehicle updated successfully!");
      router.back();
    },
    onError: (error: Error) => {
      Alert.alert("Error", `Failed to update vehicle: ${error.message}`);
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
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
      }}
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

    updateVehicleMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <VStack
        style={{
          flex: 1,
          backgroundColor: "#F9FAFB",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Box
          style={{
            backgroundColor: "#EEF2FF",
            padding: 24,
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          <LogoIcon width={40} height={40} />
        </Box>
        <Text style={{ color: "#6B7280" }}>Loading vehicle details...</Text>
      </VStack>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="lg" className="p-5">
          {/* Header */}
          <HStack className="items-center justify-between">
            <HStack space="md" className="items-center">
              <Box className="bg-primary-50 p-2 rounded-full">
                <Ionicons name="pencil" size={24} color="#6366F1" />
              </Box>
              <VStack>
                <Heading size="xl" className="font-bold text-typography-900">
                  Edit Vehicle
                </Heading>
                <Text className="text-sm text-typography-600">
                  {vehicle?.make} {vehicle?.model}
                </Text>
              </VStack>
            </HStack>
          </HStack>

          {/* Vehicle Form */}
          <Card size="lg" variant="elevated" className="bg-white">
            <VStack space="lg" className="p-6">
              {/* Status Toggle */}
              <VStack space="md">
                <Heading
                  size="lg"
                  className="font-semibold text-typography-900"
                >
                  Vehicle Status
                </Heading>
                <HStack space="md">
                  <Button
                    variant={formData.status === "active" ? "solid" : "outline"}
                    action={
                      formData.status === "active" ? "success" : "secondary"
                    }
                    onPress={() => handleInputChange("status", "active")}
                    className="flex-1"
                  >
                    <ButtonText
                      className={
                        formData.status === "active"
                          ? "text-white"
                          : "text-typography-600"
                      }
                    >
                      Active
                    </ButtonText>
                  </Button>
                  <Button
                    variant={
                      formData.status === "inactive" ? "solid" : "outline"
                    }
                    action={
                      formData.status === "inactive" ? "muted" : "secondary"
                    }
                    onPress={() => handleInputChange("status", "inactive")}
                    className="flex-1"
                  >
                    <ButtonText
                      className={
                        formData.status === "inactive"
                          ? "text-white"
                          : "text-typography-600"
                      }
                    >
                      Inactive
                    </ButtonText>
                  </Button>
                </HStack>
              </VStack>

              {/* Basic Info */}
              <VStack space="md">
                <Heading
                  size="lg"
                  className="font-semibold text-typography-900"
                >
                  Vehicle Information
                </Heading>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    Make *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.make}
                      onChangeText={(text) => handleInputChange("make", text)}
                      placeholder="e.g., Toyota, Honda, BMW"
                      style={{ color: "#111827" }}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </Box>
                </VStack>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    Model *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.model}
                      onChangeText={(text) => handleInputChange("model", text)}
                      placeholder="e.g., Camry, Civic, X3"
                      style={{ color: "#111827" }}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </Box>
                </VStack>

                <HStack space="md">
                  <VStack space="sm" className="flex-1">
                    <Text className="text-sm font-medium text-typography-700">
                      Year *
                    </Text>
                    <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                      <TextInput
                        value={formData.year}
                        onChangeText={(text) => handleInputChange("year", text)}
                        placeholder="2020"
                        keyboardType="numeric"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        maxLength={4}
                        style={{ color: "#111827" }}
                      />
                    </Box>
                  </VStack>

                  <VStack space="sm" className="flex-1">
                    <Text className="text-sm font-medium text-typography-700">
                      Color *
                    </Text>
                    <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                      <TextInput
                        value={formData.colour}
                        onChangeText={(text) =>
                          handleInputChange("colour", text)
                        }
                        placeholder="White"
                        style={{ color: "#111827" }}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCapitalize="words"
                      />
                    </Box>
                  </VStack>
                </HStack>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    License Plate *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.licensePlate}
                      onChangeText={(text) =>
                        handleInputChange("licensePlate", text)
                      }
                      placeholder="ABC-123-GP"
                      style={{ color: "#111827" }}
                      autoCapitalize="characters"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      autoCorrect={false}
                    />
                  </Box>
                </VStack>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    VIN Number *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.vin}
                      onChangeText={(text) => handleInputChange("vin", text)}
                      placeholder="1HGCM82633A123456"
                      style={{ color: "#111827" }}
                      autoCapitalize="characters"
                      returnKeyType="done"
                      blurOnSubmit={true}
                      autoCorrect={false}
                      maxLength={17}
                    />
                  </Box>
                </VStack>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    Engine Number *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.engineNumber}
                      onChangeText={(text) =>
                        handleInputChange("engineNumber", text)
                      }
                      placeholder="123ABC456"
                      style={{ color: "#111827" }}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      autoCapitalize="characters"
                      autoCorrect={false}
                    />
                  </Box>
                </VStack>

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    Current Mileage *
                  </Text>
                  <Box className="border border-border-200 rounded-md p-3 bg-background-0">
                    <TextInput
                      value={formData.currentMileage}
                      onChangeText={(text) =>
                        handleInputChange("currentMileage", text)
                      }
                      placeholder="50000"
                      keyboardType="numeric"
                      returnKeyType="next"
                      blurOnSubmit={false}
                      style={{ color: "#111827" }}
                    />
                  </Box>
                </VStack>

                <HStack space="md">
                  <VStack space="sm" className="flex-1">
                    <Text className="text-sm font-medium text-typography-700">
                      Fuel Type *
                    </Text>
                    <TouchableOpacity
                      onPress={() => setDropdownVisible("fuelType")}
                      style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 8,
                        padding: 12,
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      <HStack className="justify-between items-center">
                        <Text
                          className={`${formData.fuelType ? "text-typography-900" : "text-gray-400"}`}
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

                  <VStack space="sm" className="flex-1">
                    <Text className="text-sm font-medium text-typography-700">
                      Transmission *
                    </Text>
                    <TouchableOpacity
                      onPress={() => setDropdownVisible("transmission")}
                      style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 8,
                        padding: 12,
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      <HStack className="justify-between items-center">
                        <Text
                          className={`${formData.transmission ? "text-typography-900" : "text-gray-400"}`}
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

                <VStack space="sm">
                  <Text className="text-sm font-medium text-typography-700">
                    Vehicle Type *
                  </Text>
                  <TouchableOpacity
                    onPress={() => setDropdownVisible("vehicleType")}
                    style={{
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      borderRadius: 8,
                      padding: 12,
                      backgroundColor: "#F9FAFB",
                    }}
                  >
                    <HStack className="justify-between items-center">
                      <Text
                        className={`${formData.vehicleType ? "text-typography-900" : "text-gray-400"}`}
                      >
                        {formData.vehicleType || "Select vehicle type"}
                      </Text>
                      <Ionicons name="chevron-down" size={16} color="#6B7280" />
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </VStack>

              {/* Action Buttons */}
              <HStack space="md" className="mt-4">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={() => router.back()}
                  className="flex-1"
                >
                  <ButtonText className="text-typography-600">
                    Cancel
                  </ButtonText>
                </Button>
                <Button
                  variant="solid"
                  action="primary"
                  onPress={handleSubmit}
                  disabled={updateVehicleMutation.isPending}
                  className="flex-1"
                >
                  <ButtonText className="text-white font-medium">
                    {updateVehicleMutation.isPending
                      ? "Updating..."
                      : "Update Vehicle"}
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
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setDropdownVisible(null)}
        >
          <Card
            style={{ width: "80%", maxHeight: 320, backgroundColor: "#fff" }}
          >
            <VStack style={{ padding: 16 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  marginBottom: 12,
                  color: "#111827",
                }}
              >
                Select {dropdownVisible === "fuelType" && "Fuel Type"}
                {dropdownVisible === "transmission" && "Transmission"}
                {dropdownVisible === "vehicleType" && "Vehicle Type"}
              </Text>
              <ScrollView style={{ maxHeight: 240 }}>
                <VStack>
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
            </VStack>
          </Card>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { Pressable } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";

interface VehicleListItemProps {
  vehicle: any;
}

export default function VehicleListItem({ vehicle }: VehicleListItemProps) {
  return (
    <Link href={`/vehicle/${vehicle.id}`} asChild>
      <Pressable className="flex-1">
        <Card
          size="sm"
          variant="elevated"
          className="p-6 rounded-xl max-w-[560px] m-3"
        >
          {/* Vehicle Image */}
          {/* <Image
            source={""}
            className="mb-6 h-[240px] w-full rounded-md aspect-[2/1]"
            alt="vehicle image"
          /> */}

          {/* Make, Model & License Plate */}
          <HStack className="flex flex-row justify-between items-start mb-2">
            <Heading
              size="lg"
              className="text-xl font-bold text-typography-700"
            >
              {vehicle.make} {vehicle.model} |
            </Heading>
            <Heading
              size="lg"
              className="text-xl font-bold text-typography-700"
            >
              {vehicle.licensePlate}
            </Heading>
          </HStack>

          {/* Fuel, Mileage & Transmission */}
          <VStack space="md">
            <HStack className="flex flex-row justify-between items-center mb-2">
              <HStack space="sm" className="items-center">
                <FontAwesome5 name="gas-pump" size={20} color="black" />
                <Text className="text-sm text-typography-700">
                  {vehicle.fuelType}
                </Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Ionicons name="speedometer" size={20} color="black" />
                <Text className="text-sm text-typography-700">
                  {vehicle.currentMileage} km
                </Text>
              </HStack>
            </HStack>

            <HStack space="sm" className="items-center">
              <FontAwesome5
                name={vehicle.transmission === "manual" ? "cog" : "cogs"}
                size={20}
                color="black"
              />
              <Text className="text-sm text-typography-700">
                {vehicle.transmission}
              </Text>
            </HStack>
          </VStack>
        </Card>
      </Pressable>
    </Link>
  );
}

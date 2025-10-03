import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

// Add a props type
interface VehicleListItemProps {
  vehicle: any;
  vehicleImages: any;
}

export default function VehicleListItem({
  vehicle,
  vehicleImages,
}: VehicleListItemProps) {
  const imageSource = vehicleImages[vehicle.id];
  console.log("vehicle.id:", vehicle.id, "imageSource:", imageSource);

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Card size="xm" variant="elevated" className="p-6 rounded-xl max-w-[360px] m-3 ">
        // Vehicle Image
        <Image
          source={imageSource}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt="image"
        />
        {/* Make & Year */}
        <HStack
          
          className="flex flex-row justify-between items-start "
        >
          <Heading
            size="lg"
            className="text-xl font-bold mb-1 text-typography-700"
          >
            {vehicle.make} | {vehicle.model}
          </Heading>
          <Heading
            size="lg"
            className="text-xl font-bold mb-1 text-typography-700"
          >
            {vehicle.licensePlate}
          </Heading>
        </HStack>
        {/* Model */}
        <VStack space="md" >
          {/* Fuel & Mileage */}
          <HStack
           
            className="flex flex-row justify-between items-center "
          >
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

          <HStack className="items-center">
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
    </TouchableOpacity>
  );
}

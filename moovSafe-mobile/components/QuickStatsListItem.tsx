import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface QuickStatsListItemProps {
  stat: string;
  value: string | number;
  type: "mileage" | "alerts" | "fuel"; 
}

export default function QuickStatsListItem({ stat, value, type }: QuickStatsListItemProps) {
  // Determine icon and background color based on type
  const getIcon = () => {
    switch (type) {
      case "mileage":
        return (
          <Box className="p-3 bg-black rounded-md mb-2">
            <Ionicons name="speedometer" size={24} color="white" />
          </Box>
        );
      case "alerts":
        return (
          <Box className="p-3 bg-black rounded-md mb-2">
            <MaterialIcons name="error-outline" size={24} color="white" />
          </Box>
        );
      case "fuel":
        return (
          <Box className="p-3 bg-black rounded-md mb-2">
            <FontAwesome5 name="car" size={24} color="white" />
          </Box>
        );
      default:
        return (
          <Box className="p-3  bg-black rounded-md mb-2">
            <FontAwesome5 name="car" size={24} color="white" />
          </Box>
        );
    }
  };

  return (
    <Card variant="ghost" size="sm" className="w-40 h-40 p-0 m-0 justify-center items-center ">
      <VStack className="justify-center items-center">
        {getIcon()}
        <Text className="text-center font-bold mb-1">{stat}</Text>
        <Text className="text-lg text-gray-700">{value} </Text>
      </VStack>
    </Card>
  );
}

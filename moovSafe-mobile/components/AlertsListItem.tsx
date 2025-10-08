import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface AlertsItemProps {
	alert: any;
	onPress?: (alert: any) => void;
}

export default function AlertsItem({ alert, onPress }: AlertsItemProps) {
	// Icon based on type
	const getAlertIcon = (type: string) => {
		switch (type) {
			case "upcoming_service":
				return <MaterialIcons name="build" size={25} color="white" />;
			case "past_due":
				return <MaterialIcons name="error-outline" size={25} color="orange" />;
			case "inspection_fault":
				return (
					<FontAwesome5 name="exclamation-triangle" size={25} color="#bb1214" />
				);
			case "reminder":
				return <MaterialIcons name="alarm" size={25} color="white" />;
			default:
				return <MaterialIcons name="notifications" size={25} color="#6b7280" />;
		}
	};

	// Badge color based on priority
	const getBadgeAction = (priority: string) => {
		switch (priority.toLowerCase()) {
			case "high":
				return "error";
			case "medium":
				return "warning";
			case "low":
				return "muted";
			default:
				return "info";
		}
	};

	return (
		<VStack space="md" className="mt-1">
			<TouchableOpacity activeOpacity={0.7} onPress={() => onPress?.(alert)}>
				<Card className="p-4 mb-2 flex-row items-center">
					<Box className="p-2 bg-black rounded-md">
						{getAlertIcon(alert.type)}
					</Box>

					<VStack className="ml-3 flex-1">
						<Text size="xl" className="font-bold">
							{`${alert.title} | ${alert.licensePlate}`}
						</Text>
						<Text className="text-gray-500">{alert.description}</Text>
					</VStack>
				</Card>
			</TouchableOpacity>
		</VStack>
	);
}

import { Link } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import QuickStatsListItem from "@/components/QuickStatsListItem";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import alerts from "../../assets/alerts.json";
import vehicleImages from "../../assets/Vehicles/vehicleImages.js";
import Vehicles from "../../assets/vehicles.json";
import AlertsItem from "../../components/AlertsListItem";
import VehicleListItem from "../../components/VehicleListItem";

export default function HomeScreen() {
	return (
		<ScrollView className="p-5 flex-1" showsVerticalScrollIndicator={false}>
			<Heading size="xl">Quick Stats</Heading>
			<FlatList
				horizontal
				data={[
					{
						stat: " Total Vehicles",
						value: Vehicles.length,
						type: "fuel" as const,
					},
					{
						stat: " Total Alerts",
						value: alerts.length,
						type: "alerts" as const,
					},
					{
						stat: " Avg Mileage (km)",
						value: Math.floor(
							Vehicles.reduce((acc, v) => acc + v.currentMileage, 0) /
								Vehicles.length,
						),
						type: "mileage" as const,
					},
				]}
				keyExtractor={(item) => item.stat}
				renderItem={({ item }) => (
					<QuickStatsListItem
						stat={item.stat}
						value={item.value}
						type={item.type}
					/>
				)}
			/>
			<VStack space="md">
				<Heading size="xl">My Vehicles</Heading>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={Vehicles}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<VehicleListItem vehicle={item} vehicleImages={vehicleImages} />
					)}
				/>

				<Heading size="xl">Attention Required</Heading>
				<FlatList
					data={alerts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <AlertsItem alert={item} />}
					scrollEnabled={false} // disable inner scroll so ScrollView scrolls
				/>

				<Link href="/reports">Go to Reports Screen</Link>
			</VStack>
		</ScrollView>
	);
}

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import LogoIcon from "@/assets/icons/logo8.svg";

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<LogoIcon
							width={36}
							height={36}
							fill={focused ? "black" : "gray"}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="Reports"
				options={{
					title: "Reports",
					tabBarIcon: ({ focused }) => (
						<Ionicons name="documents" size={24} color="black" />
					),
				}}
			/>

			<Tabs.Screen
				name="Inspection"
				options={{
					title: "Inspection",
					tabBarIcon: ({ focused }) => (
						<FontAwesome name="plus-square" size={24} color="black" />
					),
				}}
			/>

			<Tabs.Screen
				name="Profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => (
						<Ionicons name="person-sharp" size={24} color="black" />
					),
				}}
			/>
		</Tabs>
	);
}

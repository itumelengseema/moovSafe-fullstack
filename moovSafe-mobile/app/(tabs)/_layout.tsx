import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />

  
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

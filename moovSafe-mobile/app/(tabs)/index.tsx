import { Link } from "expo-router";
import { FlatList, ScrollView, RefreshControl, View } from "react-native";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LogoIcon from "@/assets/icons/logo8.svg";

import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import VehicleListItem from "@/components/VehicleListItem";
import AlertsListItem from "@/components/AlertsListItem";

import { vehiclesList } from "@/api/vehicles";
import alertsData from "@/assets/alerts.json";

interface Vehicle {
  id: string;
  [key: string]: any;
}

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: vehicles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: vehiclesList,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const statsData = useMemo(() => {
    if (!vehicles?.length) return { total: 0, active: 0, maintenance: 0 };

    return {
      total: vehicles.length,
      active:
        vehicles.filter((v: any) => v.status === "active").length ||
        vehicles.length,
      maintenance:
        vehicles.filter((v: any) => v.status === "maintenance").length || 0,
    };
  }, [vehicles]);

  if (isLoading && !vehicles) {
    return (
      <VStack className="flex-1 bg-background-0 justify-center items-center p-5">
        <Box className="bg-primary-50 p-6 rounded-full mb-4">
          <LogoIcon width={40} height={40} />
        </Box>
        <Text className="text-typography-600">Loading your vehicles...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 bg-background-0 justify-center items-center p-5">
        <Box className="bg-error-50 p-4 rounded-full mb-4">
          <Ionicons name="warning-outline" size={32} color="#DC2626" />
        </Box>
        <Text className="text-error-600 text-center">
          Error loading vehicles:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </VStack>
    );
  }

  return (
    <View className="flex-1 bg-background-0">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack space="lg" className="p-5">
          {/* Vehicles Section */}
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Heading size="lg" className="font-semibold text-typography-900">
                Your Vehicles
              </Heading>
              <Text className="text-sm text-typography-600">
                {vehicles?.length || 0} vehicles
              </Text>
            </HStack>

            {vehicles?.length ? (
              <FlatList
                data={vehicles}
                renderItem={({ item }) => <VehicleListItem vehicle={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
              />
            ) : (
              <Card size="lg" variant="elevated" className="bg-white">
                <VStack space="lg" className="items-center p-8">
                  <Box className="bg-typography-50 p-4 rounded-full">
                    <Ionicons name="car-outline" size={32} color="black" />
                  </Box>
                  <VStack space="sm" className="items-center">
                    <Heading size="lg" className="text-typography-900">
                      No Vehicles Found
                    </Heading>
                    <Text className="text-typography-500 text-center">
                      Add your first vehicle to get started with fleet
                      management
                    </Text>
                  </VStack>
                </VStack>
              </Card>
            )}
          </VStack>

          {/* Alerts Section */}
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Heading size="lg" className="font-semibold text-typography-900">
                Recent Alerts
              </Heading>
              <Text className="text-sm text-typography-600">
                {alertsData.length} alerts
              </Text>
            </HStack>

            <Card size="lg" variant="elevated" className="bg-white">
              <FlatList
                data={alertsData}
                renderItem={({ item, index }) => (
                  <AlertsListItem
                    alert={item}
                    onPress={() => setSelectedIndex(index)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </Card>
          </VStack>

          {/* Navigation Button */}
          <Link href="/reports" asChild>
            <Button variant="outline" className="self-center">
              <HStack space="sm" className="items-center">
                <Ionicons name="analytics" size={16} color="black" />
                <ButtonText className="text-typography-900">
                  View Detailed Reports
                </ButtonText>
              </HStack>
            </Button>
          </Link>
        </VStack>
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <Link href="/add-vehicle" asChild>
        <Fab size="lg" placement="bottom right" className="mb-6 mr-6">
          <FabIcon>
            <Ionicons name="add" size={24} color="white" />
          </FabIcon>
          <FabLabel>Add Vehicle</FabLabel>
        </Fab>
      </Link>
    </View>
  );
}

import { Slot, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="inspection/form"
            options={{
              title: "Vehicle Inspection",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="inspection/[id]"
            options={{
              title: "Inspection Details",
              headerShown: true,
            }}
          />

          <Slot />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

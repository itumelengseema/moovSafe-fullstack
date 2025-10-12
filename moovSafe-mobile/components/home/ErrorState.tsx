import { Ionicons } from '@expo/vector-icons';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface ErrorStateProps {
  error: Error | unknown;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <VStack className="flex-1 bg-background-0 justify-center items-center p-5">
      <Box className="bg-error-50 p-4 rounded-full mb-4">
        <Ionicons name="warning-outline" size={32} color="#DC2626" />
      </Box>
      <Text className="text-error-600 text-center">
        Error loading vehicles: {error instanceof Error ? error.message : 'Unknown error'}
      </Text>
    </VStack>
  );
}

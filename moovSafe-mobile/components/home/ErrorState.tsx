import { Ionicons } from '@expo/vector-icons';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface ErrorStateProps {
  error: Error | unknown;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  // Log the error for debugging
  console.error('ErrorState received:', error);

  const getErrorMessage = (err: Error | unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    if (typeof err === 'string') {
      return err;
    }
    return 'Unknown error occurred';
  };

  const getErrorDetails = (err: Error | unknown): string[] => {
    const details: string[] = [];

    if (err instanceof Error) {
      if (err.message.includes('API URL is not configured')) {
        details.push('Check your environment configuration');
        details.push('Ensure EXPO_PUBLIC_API_URL is set');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('Network')) {
        details.push('Check your internet connection');
        details.push('Verify the API server is running');
      } else if (err.message.includes('HTTP')) {
        details.push('Server returned an error');
        details.push('Contact support if this persists');
      }
    }

    return details;
  };

  const errorMessage = getErrorMessage(error);
  const errorDetails = getErrorDetails(error);

  return (
    <VStack className="flex-1 bg-background-0 justify-center items-center p-5" space="md">
      <Box className="bg-error-50 p-4 rounded-full mb-4">
        <Ionicons name="warning-outline" size={32} color="#DC2626" />
      </Box>

      <Text className="text-error-600 text-center font-semibold text-lg">
        Error loading vehicles
      </Text>

      <Text className="text-error-500 text-center">{errorMessage}</Text>

      {errorDetails.length > 0 && (
        <VStack space="xs" className="mt-2">
          {errorDetails.map((detail, index) => (
            <Text key={index} className="text-gray-600 text-center text-sm">
              • {detail}
            </Text>
          ))}
        </VStack>
      )}

      {onRetry && (
        <Button variant="outline" action="secondary" onPress={onRetry} className="mt-4">
          <ButtonText>Try Again</ButtonText>
        </Button>
      )}
    </VStack>
  );
}

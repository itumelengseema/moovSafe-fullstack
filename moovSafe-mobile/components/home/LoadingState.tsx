import LogoIcon from '@/assets/icons/logo8.svg';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function LoadingState() {
  return (
    <VStack className="flex-1 bg-background-0 justify-center items-center p-5">
      <Box className="bg-primary-50 p-6 rounded-full mb-4">
        <LogoIcon width={40} height={40} />
      </Box>
      <Text className="text-typography-600">Loading your vehicles...</Text>
    </VStack>
  );
}

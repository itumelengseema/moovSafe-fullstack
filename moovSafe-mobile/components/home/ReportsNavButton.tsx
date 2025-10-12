import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

export default function ReportsNavButton() {
  return (
    <Link href="/reports" asChild>
      <Button variant="outline" className="self-center">
        <HStack space="sm" className="items-center">
          <Ionicons name="analytics" size={16} color="black" />
          <ButtonText className="text-typography-900">View Detailed Reports</ButtonText>
        </HStack>
      </Button>
    </Link>
  );
}

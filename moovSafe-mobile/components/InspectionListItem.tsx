import { TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface Inspection {
  id: string;
  vehicleId: string;
  date: string;
  mileage: number;
  overallCondition: string;
  notes?: string | null;
  faultsImagesUrl?: string[];
  odometerImageUrl?: string | null;
}

interface InspectionListItemProps {
  inspection: Inspection;
  onPress?: (inspection: Inspection) => void;
}

export default function InspectionListItem({ inspection, onPress }: InspectionListItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const hasFaults = inspection.faultsImagesUrl && inspection.faultsImagesUrl.length > 0;
  const hasOdometerImage = Boolean(inspection.odometerImageUrl);

  return (
    <TouchableOpacity onPress={() => onPress?.(inspection)}>
      <Card className="p-4 mb-3">
        <VStack space="sm">
          {/* Header */}
          <HStack className="justify-between items-start">
            <VStack space="xs">
              <Text className="font-semibold text-lg">Inspection #{inspection.id.slice(-8)}</Text>
              <Text className="text-gray-600 text-sm">{formatDate(inspection.date)}</Text>
            </VStack>

            <Badge className={getConditionColor(inspection.overallCondition)}>
              <Text className="text-xs font-medium">{inspection.overallCondition}</Text>
            </Badge>
          </HStack>

          {/* Mileage */}
          <HStack className="items-center">
            <Text className="text-gray-700">Mileage: {inspection.mileage.toLocaleString()} km</Text>
          </HStack>

          {/* Images and Notes indicators */}
          <HStack space="sm" className="items-center">
            {hasOdometerImage && (
              <Badge className="bg-blue-100">
                <Text className="text-blue-800 text-xs">📷 Odometer</Text>
              </Badge>
            )}

            {hasFaults && (
              <Badge className="bg-orange-100">
                <Text className="text-orange-800 text-xs">
                  ⚠️ {inspection.faultsImagesUrl?.length || 0} Fault
                  {(inspection.faultsImagesUrl?.length || 0) > 1 ? 's' : ''}
                </Text>
              </Badge>
            )}

            {inspection.notes && (
              <Badge className="bg-gray-100">
                <Text className="text-gray-800 text-xs">📝 Notes</Text>
              </Badge>
            )}
          </HStack>

          {/* Notes preview */}
          {inspection.notes && (
            <Text className="text-gray-600 text-sm" numberOfLines={2}>
              {inspection.notes}
            </Text>
          )}
        </VStack>
      </Card>
    </TouchableOpacity>
  );
}

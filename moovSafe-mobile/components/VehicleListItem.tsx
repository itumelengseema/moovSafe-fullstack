import { Text } from 'react-native';
export default function VehicleListItem({ vehicle }: any) {
  return (
    <Text>
      {vehicle.make} {vehicle.model} ({vehicle.year}) 
  
    </Text>
  );
}

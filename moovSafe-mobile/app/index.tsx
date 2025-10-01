import { View, Text, FlatList } from 'react-native';
import Vehicles from '../assets/vehicles.json';


import VehicleListItem from '../components/VehicleListItem';

export default function App() {
  return (
    <View>
      <Text>Vehicle List:</Text>
      <FlatList
        data={Vehicles}
        renderItem={({ item }) => <VehicleListItem vehicle={item} />}
     
      />

    </View>
  );
}
          
   

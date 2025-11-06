// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabSiswa from './components/TabSiswa';
import LoginSiswa from './screens/LoginSiswa';
import RegisterSiswa from './screens/RegisterSiswa';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSiswa" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginSiswa" component={LoginSiswa} />
        
        <Stack.Screen name="RegisterSiswa" component={RegisterSiswa} />
        
        <Stack.Screen name="TabSiswa" component={TabSiswa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

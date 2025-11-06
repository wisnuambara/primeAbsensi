// navigations/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSiswa from '../screens/LoginSiswa';
import RegisterSiswa from '../screens/RegisterSiswa';
import LoginAdmin from '../screens/LoginAdmin';
import RegisterAdmin from '../screens/RegisterAdmin';

export type AuthStackParamList = {
  LoginSiswa: undefined;
  RegisterSiswa: undefined;
  LoginAdmin: undefined;
  RegisterAdmin: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginSiswa" component={LoginSiswa} />
      <Stack.Screen name="RegisterSiswa" component={RegisterSiswa} />
      <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
      <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
    </Stack.Navigator>
  );
}

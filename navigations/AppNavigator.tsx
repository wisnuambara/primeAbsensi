// navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Admin Screens
import DashboardAdmin from '../screens/DashboardAdmin';
import LoginAdmin from '../screens/LoginAdmin';
import RegisterAdmin from '../screens/RegisterAdmin';

// Siswa Screens
import AbsensiSiswa from '../screens/AbsensiSiswa';
import HomeSiswa from '../screens/HomeSiswa';
import LoginSiswa from '../screens/LoginSiswa';
import ProfilSiswa from '../screens/ProfilSiswa';
import RegisterSiswa from '../screens/RegisterSiswa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabSiswa() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeSiswa" component={HomeSiswa} />
      <Tab.Screen name="Absensi" component={AbsensiSiswa} />
      <Tab.Screen name="Profil" component={ProfilSiswa} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Admin */}
      <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
      <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
      <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} />

      {/* Siswa */}
      <Stack.Screen name="LoginSiswa" component={LoginSiswa} />
      <Stack.Screen name="RegisterSiswa" component={RegisterSiswa} />
      <Stack.Screen name="TabSiswa" component={TabSiswa} />
    </Stack.Navigator>
  );
}

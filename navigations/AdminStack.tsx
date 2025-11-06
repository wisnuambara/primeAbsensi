// navigations/AdminStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardAdmin from '../screens/DashboardAdmin';
import TambahKelas from '../screens/TambahKelas';
import UbahKelas from '../screens/UbahKelas';
import HapusKelas from '../screens/HapusKelas';
import InformasiKelas from '../screens/InformasiKelas';
import DetailKelas from '../screens/DetailKelas';
import DetailAbsensiSiswa from '../screens/DetailAbsensiSiswa';
import ProfileAdmin from '../screens/ProfileAdmin';

export type AdminStackParamList = {
  DashboardAdmin: undefined;
  TambahKelas: undefined;
  UbahKelas: undefined;
  HapusKelas: undefined;
  InformasiKelas: undefined;
  DetailKelas: { kodeKelas: string };
  DetailAbsensiSiswa: { uid: string; kodeKelas: string };
  ProfileAdmin: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} />
      <Stack.Screen name="TambahKelas" component={TambahKelas} />
      <Stack.Screen name="UbahKelas" component={UbahKelas} />
      <Stack.Screen name="HapusKelas" component={HapusKelas} />
      <Stack.Screen name="InformasiKelas" component={InformasiKelas} />
      <Stack.Screen name="DetailKelas" component={DetailKelas} />
      <Stack.Screen name="DetailAbsensiSiswa" component={DetailAbsensiSiswa} />
      <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />
    </Stack.Navigator>
  );
}

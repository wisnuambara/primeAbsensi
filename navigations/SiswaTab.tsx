// navigations/SiswaTab.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSiswa from '../screens/HomeSiswa';
import Absensi from '../screens/AbsensiSiswa';
import ProfileSiswa from '../screens/ProfilSiswa';

export type SiswaTabParamList = {
  HomeSiswa: undefined;
  Absensi: undefined;
  ProfileSiswa: undefined;
};

const Tab = createBottomTabNavigator<SiswaTabParamList>();

export default function SiswaTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeSiswa" component={HomeSiswa} />
      <Tab.Screen name="Absensi" component={Absensi} />
      <Tab.Screen name="ProfileSiswa" component={ProfileSiswa} />
    </Tab.Navigator>
  );
}

// components/TabSiswa.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import BerandaSiswa from '../screens/BerandaSiswa';
import ProfilSiswa from '../screens/ProfilSiswa';

const Tab = createBottomTabNavigator();

export default function TabSiswa() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Beranda') {
            iconName = 'home-outline';
          } else if (route.name === 'Profil') {
            iconName = 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3369bd',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Beranda" component={BerandaSiswa} />
      <Tab.Screen name="Profil" component={ProfilSiswa} />
    </Tab.Navigator>
  );
}
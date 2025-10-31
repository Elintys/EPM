import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import GuestList from '../containers/guestList';
import ProfileScreen from '../containers/profileScreen';
import EventStack from './EventStack';
import QRScannerScreen from '../containers/QRScannerScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
      }}
    >
      <Tab.Screen name="Events" component={EventStack} options={{ title: 'Événements', headerShown: false }} />
      <Tab.Screen name="Home" component={GuestList} options={{ title: 'Guests List' }} />
      <Tab.Screen name="Guests" component={QRScannerScreen} options={{ title: 'QRCode Scanner' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

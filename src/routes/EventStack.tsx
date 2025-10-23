import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailsScreen from '../containers/EventDetailsScreen';
import EventsScreen from '../containers/EventsScreen';
import { Colors } from '../constants/styles/theme';

const Stack = createNativeStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
  <Stack.Screen
    name="EventsList"
    component={EventsScreen}
    options={{
      title: 'Mes événements',
      headerStyle: { backgroundColor: Colors.primaryLight },
      headerTintColor: '#fff', // facultatif : couleur du texte et des icônes
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerShadowVisible: false,
    }}
  />
  <Stack.Screen
    name="EventDetails"
    component={EventDetailsScreen}
    options={{
      title: 'Détails de l’événement',
    }}
  />
</Stack.Navigator>

  );
}

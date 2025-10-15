import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailsScreen from '../containers/EventDetailsScreen';
import EventsScreen from '../containers/EventsScreen';

const Stack = createNativeStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventsList"
        component={EventsScreen}
        options={{ title: 'Mes événements', headerShown: true, headerBackButtonDisplayMode: 'minimal', headerShadowVisible: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ title: 'Détails de l’événement'}}
      />
    </Stack.Navigator>
  );
}

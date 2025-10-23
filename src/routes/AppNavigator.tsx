import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    // On récupère les infos utilisateur depuis Redux
  const { user } = useSelector((state: RootState) => state.user);
  // const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Main" component={MainNavigator} /> */}
      {/* <Stack.Screen name="Auth" component={AuthNavigator} /> */}
      {user ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

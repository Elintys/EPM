import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../containers/login';
import Register from '../containers/register';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

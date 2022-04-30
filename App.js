import { StatusBar } from 'expo-status-bar';

import React from 'react'
import { Provider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import  RegisterScreen from './screens/RegisterScreen'
import  LoginScreen from './screens/LoginScreen'
import  Home from './screens/Home'
import  Event from './screens/Event'
import  MesCommandes from './screens/MesCommandes'
import  Profile from './screens/Profile'
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="MesCommandes" component={MesCommandes} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


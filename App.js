import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import Formulario from './Formulario';
import Lista from './Lista';
import DetallePlato from './DetallePlato'
import { ContextProvider } from './contextState';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Formulario} />
        <Stack.Screen name="buscador" component={Lista} />
        <Stack.Screen name="detalle" component={DetallePlato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


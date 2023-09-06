import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import Formulario from './Formulario';
import Lista from './Lista';
import { ContextProvider } from './contextState';

export default function App() {
  return (
      <ContextProvider>
        <Lista/>
      </ContextProvider>
  );
}

const styles = StyleSheet.create({
  
});

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput 
      style={styles.input}
      placeholder='ingrese su email...'
      value='email'/>
      <Text>Contraseña</Text>
      <TextInput 
      style={styles.input}
      placeholder='ingrese su contraseña...'
      value='contraseña'/>
      <Button 
      title='Enviar'
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:12,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 1,
  }
});

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import Formulario from './Formulario';
import Lista from './Lista';
import DetallePlato from './DetallePlato'
import { ContextProvider } from './contextState';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
      <ContextProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/" index element={<Formulario/>}></Route>
        <Route path="/lista" element={<Lista/>}></Route>
        <Route path="/detalle" element={<DetallePlato/>}></Route>
        </Routes>
        </BrowserRouter>
      </ContextProvider>
  );
}

const styles = StyleSheet.create({
  
});

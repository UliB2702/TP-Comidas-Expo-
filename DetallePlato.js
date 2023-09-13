import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { useState } from 'react';
import { useContextState, ContextProvider } from "./contextState";


const Menu = () => {
  const { contextState, setContextState } = useContextState();
  const { plato, seleccionarPlato } = useState();


  const agregaMenu = (plato) => {
    return menu.some((item) => item.id === dish.id);
  };

  return (
    <ContextProvider>
      <View>
        {dishes.map((plato) => (
          <View key={plato.id}>
            <Text>{plato.name}</Text>
            {seleccionarPlato === plato.id ? (
              <Text>{plato.descripcion}</Text>
            ) : (
              <Button title="Agregar al menu" onPress={() => agregaMenu(plato)} />
            )}
            <Button
              title="Mostrar detalles"
              onPress={() => setSeleccionarPlato(plato.id)}
            />
          </View>
        ))}
        <Text>Menu:</Text>
        {menu.map((menuItem) => (
          <Text key={menuItem.id}>{menuItem.name}</Text>
        ))}
      </View>
    </ContextProvider>
  );
};

export default Menu;

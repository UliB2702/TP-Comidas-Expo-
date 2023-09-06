import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';


const Menu = () => {
  const {contextState, setContextState} = useContextState();


  const plato = [
    { id: 1, name: 'Plato 1', description: 'Descripcion 1' },
    { id: 2, name: 'Plato 2', description: 'Descripcion 2' },
    { id: 3, name: 'Plato 3', description: 'Descripcion 3' },
  ];

  const agregaMenu = (plato) => {
        setContextState({
            newValue: plato,
            type: ActionTypes.setMenu,
        })
  };

  return (
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
  );
};

export default Menu;

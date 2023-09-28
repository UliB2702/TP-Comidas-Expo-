import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { ActionTypes, useContextState } from './contextState';

const Detallado = ({ route, navigation }) => {
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
    const response = fetch(
      `https://api.spoonacular.com/recipes/${route.params.id}/information?apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(async (response) => {
        const resetas = await response.json();
        setContextState({
          newValue: resetas,
          type: ActionTypes.setDetallado,
        });
        setContextState({ newValue: false, type: 'SET_LOADING' });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, []);

  const agregaMenu = () => {
    const reseta = contextState.detallado;
    setContextState({
      newValue: reseta,
      type: ActionTypes.setMenu,
    });
    navigation.navigate('menu');
  };

  const vegan = (vegan) => {
    if (vegan === true) {
      return <Text>Sí</Text>;
    } else {
      return <Text>No</Text>;
    }
  };

  return contextState.detallado ? (
    <View style={styles.container2}>
      <Text style={styles.title}>{contextState.detallado.title}</Text>
      <Text style={styles.price}>$ {contextState.detallado.pricePerServing}</Text>
      <Image style={styles.image} source={{ uri: contextState.detallado.image }} />
      <Text style={styles.score}>Puntaje de salud: {contextState.detallado.healthScore}</Text>
      <Text style={styles.score}>¿Vegano? : {vegan(contextState.detallado.vegan)}</Text>
      <Text style={styles.score}>Mas informacion: {contextState.detallado.spoonacularSourceUrl}</Text>
      <Button title="Agregar a menú" onPress={() => agregaMenu()} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.alerta}>La información está cargando, por favor, espere...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#634fe3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: '#634fe3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  price: {
    fontSize: 18,
    marginTop: 10,
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  score: {
    fontSize: 16,
    marginTop: 10,
    color: '#fff',
  },
  alerta: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
});

export default Detallado;

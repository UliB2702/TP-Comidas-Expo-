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
import LoadingAnimation from "./LoadingAnimation.js";

const Detallado = ({ route, navigation }) => {
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
    const response = fetch(
      `https://api.spoonacular.com/recipes/${route.params.id}/information?apiKey=865afe1ad4854b108e30ecd98b6f6135&includeNutrition=true`,
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
      })
      setContextState({
        newValue: undefined,
        type: ActionTypes.setDetallado
      })
      navigation.navigate('menu');
  };

  const Boton = () => {
    console.log(contextState.detallado.id, contextState.menu)
    if(!contextState.menu.find(elem => elem.id === contextState.detallado.id)){
      return(
      <Button title="Agregar a menú" onPress={() => agregaMenu()} style={[styles.button, styles.buttonText]} />
      )
    }
    else{
      return(
        <Text style={styles.alertText}> Esta comida ya esta en tu menu! No la puedes volver a agregar</Text>
      )
    }
  }

  const vegan = (vegan) => {
    if (vegan === true) {
      return <Text>Es vegano 🍃</Text>;
    } else {
      return <Text>No es vegano ❌</Text>;
    }
  };

  return contextState.detallado ? (
    <View style={styles.container}>
      <Text style={styles.title}>{contextState.detallado.title}</Text>
      <Text style={styles.price}>$ {contextState.detallado.pricePerServing}</Text>
      <Image style={styles.image} source={{ uri: contextState.detallado.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Puntaje de salud: {contextState.detallado.healthScore}</Text>
        <Text style={styles.detailsText}>{vegan(contextState.detallado.vegan)}</Text>
        <Text style={styles.link}>Mas informacion:</Text>
        <Text style={styles.link}>{contextState.detallado.spoonacularSourceUrl}</Text>
      </View>
      <Boton/>
    </View>
  ) : (
    <View style={styles.loadingContainer}>
      <LoadingAnimation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e638c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'Lobster-Regular'
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fffad3',
    borderRadius: 15,
    padding: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  spinnerContainer: {
    width: 40,
    height: 40,
  },
  detailsText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontFamily: 'Lobster-Regular'
  },
  alertText: {
    fontSize: 20,
    color: '#e61919',
    marginBottom: 5,
    fontFamily: 'Lobster-Regular',
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Lobster-Regular'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  score: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Lobster-Regular'
  },
  link: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    fontFamily: 'Lobster-Regular'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cargando: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Lobster-Regular'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: 'center',
    fontFamily: 'Lobster-Regular'
  },
});

export default Detallado;



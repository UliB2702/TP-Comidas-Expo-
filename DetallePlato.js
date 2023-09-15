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
import { useState, React, useEffect  } from 'react';
import { ActionTypes,useContextState} from "./contextState";


const Menu = ({route,navigation}) => {
  const { contextState, setContextState } = useContextState();

  useEffect(() => {

      const response = fetch(
        `https://api.spoonacular.com/recipes/${route.params.id}/information?apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (response) => {
          const resetas = await response.json();
          setContextState({
            newValue: resetas,
            type: ActionTypes.setDetallado,
          });
          setContextState({ newValue: false, type: "SET_LOADING" });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });
  }, []);

  const agregaMenu = (plato) => {
    return menu.some((item) => item.id === plato.id);
  };

  return contextState.detallado ? (

      <View style={styles.container2}>
        <Text style={styles.title}>
         {contextState.detallado.title}
        </Text>
        <Text> $ {contextState.detallado.pricePerServing} </Text>
        <Image source={{ uri: contextState.detallado.image }} />
        
      </View>
  ): (
    <View style={styles.container}>
      <Text style={styles.alerta}>
        La informacion esta cargando, por favor, espere...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  container2: {
    marginTop: StatusBar.currentHeight || 0, 
    backgroundColor: "#634fe3",
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  alerta: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Menu;

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Button,
} from "react-native";
import { ActionTypes, useContextState } from "./contextState";

const Menu = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [maxHealthScore, setMaxHealthScore] = useState(undefined);

  useEffect(() => {
      const response = fetch(
        `https://api.spoonacular.com/recipes/complexSearch?&number=2&apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true.`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (response) => {
          const resetas = await response.json();
          setContextState({
            newValue: resetas.results,
            type: ActionTypes.setMenu,
          });
          setContextState({ newValue: false, type: "SET_LOADING" });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });
    
  }, []);

  // falta hacer por Id para que me de los datos del precio y puntaje de salud
  useEffect(() => {
    const response = fetch(
      `https://api.spoonacular.com/recipes/complexSearch?&number=2&apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true&diet=vegan.`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (response) => {
        const resetas = await response.json();
        setContextState({
          newValue: resetas.results,
          type: ActionTypes.setMenu,
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  
}, []);

const sum = contextState.menu.reduce((accumulator, value) => {
    return accumulator + value.pricePerServing;
}, 0);

const hPrice = contextState.menu.reduce((accumulator, value) => {
    return accumulator + value.pricePerServing;
}, 0);


  const Item = ({ title, image, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: image}} />
      <Button
        title="Mas detalle"
        onPress={() => navigation.navigate("verdetalle", {id})}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Menú</Text>
        <FlatList
        data={contextState?.menu ?? []}
        renderItem={({ item }) => (
          <Item title={item.title} image={item.image} id={item.id} />
        )}
        keyExtractor={(item) => item.id}
        />
        <Text style={styles.totalPrice}>Total: ${sum}</Text>
        <Text style={styles.totalPrice}>Puntaje de salud total: {contextState.menu.reduce((accumulator, value) => {
            console.log(value)
    return accumulator + value.healthScore;
}, 0)}</Text>
        <Button title="Agregar Plato" onPress={() => navigation.navigate("buscador")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#634fe3",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight || 30,
    },
  container2: {
    backgroundColor: "#634fe3",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  price: {
    fontSize: 18,
    marginTop: 10,
  },
  image: {
    width: 460,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  score: {
    fontSize: 16,
    marginTop: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
    item: {
      backgroundColor: "#ccc2ff",
      paddingTop: 10,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      maxWidth: 500,
      maxHeight: 500,
    },
    alerta: {
      fontWeight: "bold",
      fontSize: 20,
    },
  });

export default Menu;
